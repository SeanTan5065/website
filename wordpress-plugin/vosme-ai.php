<?php
/**
 * Plugin Name: Vosme AI Backend
 * Description: Headless CMS REST API Endpoints for Google Gemini Chatbot & AI Suggestions for Vosme React.
 * Version: 1.0.0
 * Author: Vosme Architect
 */

// Prevent direct access to this file
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// ------------------------------------------------------------------
// 1. ADD SETTINGS PAGE IN WORDPRESS ADMIN FOR THE GEMINI API KEY
// ------------------------------------------------------------------
add_action('admin_menu', 'vosme_ai_admin_menu');
function vosme_ai_admin_menu() {
    add_options_page('Vosme AI Settings', 'Vosme AI', 'manage_options', 'vosme-ai', 'vosme_ai_settings_page');
}

add_action('admin_init', 'vosme_ai_settings_init');
function vosme_ai_settings_init() {
    register_setting('vosme_ai_settings', 'vosme_gemini_api_key');
    add_settings_section('vosme_ai_settings_section', 'Gemini API Configuration', null, 'vosme-ai');
    add_settings_field('vosme_gemini_api_key', 'Gemini API Key', 'vosme_ai_api_key_render', 'vosme-ai', 'vosme_ai_settings_section');
}

function vosme_ai_api_key_render() {
    $api_key = get_option('vosme_gemini_api_key');
    echo "<input type='password' name='vosme_gemini_api_key' value='" . esc_attr($api_key) . "' size='50' />";
    echo "<p class='description'>Enter your Google Gemini API Key here. It will be securely stored in your database.</p>";
}

function vosme_ai_settings_page() {
    ?>
    <div class="wrap">
        <h1>Vosme AI Settings</h1>
        <form action="options.php" method="post">
            <?php
            settings_fields('vosme_ai_settings');
            do_settings_sections('vosme-ai');
            submit_button();
            ?>
        </form>
    </div>
    <?php
}

// ------------------------------------------------------------------
// 2. REGISTER CUSTOM REST API ENDPOINTS
// ------------------------------------------------------------------
add_action('rest_api_init', function () {
    // Check CORS (Allow requests from our React app)
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function( $value ) {
        header('Access-Control-Allow-Origin: *'); // For dev (React localhost). Change to specific URL in production
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
        return $value;
    });

    // Endpoint 1: Chatbot
    register_rest_route('vosme/v1', '/chat', array(
        'methods' => 'POST',
        'callback' => 'vosme_handle_ai_chat',
        'permission_callback' => '__return_true', // Publicly accessible
    ));

    // Endpoint 2: AI Suggestion (Strategy Form)
    register_rest_route('vosme/v1', '/suggest', array(
        'methods' => 'POST',
        'callback' => 'vosme_handle_ai_suggest',
        'permission_callback' => '__return_true', // Publicly accessible
    ));
});

// ------------------------------------------------------------------
// 3. CORE LOGIC FOR GEMINI API
// ------------------------------------------------------------------
function call_gemini_api($contents, $systemInstruction) {
    $api_key = get_option('vosme_gemini_api_key');
    if (empty($api_key)) {
        return new WP_Error('missing_api_key', 'GEMINI_API_KEY is not configured in WordPress settings.', array('status' => 500));
    }

    $url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' . $api_key;

    $body = array(
        'contents' => $contents,
        'systemInstruction' => array(
            'parts' => array(
                array('text' => $systemInstruction)
            )
        )
    );

    $args = array(
        'method'      => 'POST',
        'headers'     => array('Content-Type' => 'application/json'),
        'body'        => wp_json_encode($body),
        'timeout'     => 60,
    );

    $response = wp_remote_request($url, $args);

    if (is_wp_error($response)) {
        return new WP_Error('api_network_error', $response->get_error_message(), array('status' => 500));
    }

    $code = wp_remote_retrieve_response_code($response);
    $response_body = json_decode(wp_remote_retrieve_body($response), true);

    if ($code !== 200) {
        $error_msg = isset($response_body['error']['message']) ? $response_body['error']['message'] : 'Unknown Gemini error';
        return new WP_Error('gemini_api_error', 'API Key not valid or Google API error.', array('status' => $code));
    }

    $text = '';
    if (isset($response_body['candidates'][0]['content']['parts'][0]['text'])) {
        $text = $response_body['candidates'][0]['content']['parts'][0]['text'];
    }

    return array('text' => $text);
}

// --- Chatbot Handler ---
function vosme_handle_ai_chat(WP_REST_Request $request) {
    $params = $request->get_json_params();
    $history_contents = isset($params['contents']) ? $params['contents'] : array();
    $language_ins = isset($params['languageInstruction']) ? $params['languageInstruction'] : '';

    $system_prompt = "You are a chatbot for a software development and AI consulting & implementation company.\n
1. Scope Control (STRICT)\nOnly respond to topics related to:\nSoftware development\nAI solutions / automation\nSystem integration\nDigital transformation\nCompany services, case studies, or website content\nIf the message is unrelated, vague nonsense, spam, or random text -> treat as out-of-scope.\n
2. Tone & Style\nKeep replies very short, clear, human-like\nUse neutral, professional tone\nNo long explanations, no \"sales fluff\"\nAvoid technical overload unless asked\nOptional light emoji (🙂👍) only when natural\n
3. Website Context\nPrioritize answers based on website content\nIf unsure -> stay general + guide to contact team\nDo NOT hallucinate services\n
4. Pricing Rule (IMPORTANT)\nIf user asks about price, cost, budget:\nRespond with EXACTLY this sentence:\n\"Pricing depends on your requirements 🙂 Let's walk you through it in a quick demo. Please connect with our team on WhatsApp here: [Chat with Vosme](https://wa.me/60187607799)\"\n
5. Nonsense / Spam Handling (Auto-Stop Logic)\nStep 1 — First nonsense input: Reply: \"I can only help with software & AI solutions 🙂\"\nStep 2 — Repeated nonsense: Reply: \"Let me know when you have a business-related question 👍\"\nStep 3 — Continued nonsense: STOP responding / Enter silent mode\n
6. Silent Mode Behavior\nStay silent indefinitely.\nONLY resume when a valid topic detected.\n
7. General Contact & Demos\nIf the user agrees to a demo, you MUST explicitly provide the WhatsApp link.\nExample: \"Great! Please connect with our team on WhatsApp to proceed: [Click here to chat](https://wa.me/60187607799)\"\n
8. Response Length Rule\nMax: 1-2 short sentences\n
" . $language_ins;

    $result = call_gemini_api($history_contents, $system_prompt);

    if (is_wp_error($result)) {
        return $result;
    }
    return rest_ensure_response($result);
}

// --- AI Suggestion Form Handler ---
function vosme_handle_ai_suggest(WP_REST_Request $request) {
    $params = $request->get_json_params();
    $industry = isset($params['industry']) ? $params['industry'] : '';
    $businessType = isset($params['businessType']) ? $params['businessType'] : '';
    $teamSize = isset($params['teamSize']) ? $params['teamSize'] : '';
    $workflow = isset($params['workflow']) ? $params['workflow'] : '';
    $challenges = isset($params['challenges']) ? $params['challenges'] : '';
    $tools = isset($params['tools']) ? $params['tools'] : '';
    $estimatedImpact = isset($params['estimatedImpact']) ? $params['estimatedImpact'] : '';
    $language_ins = isset($params['languageInstruction']) ? $params['languageInstruction'] : '';

    $fullDescription = "Industry: $industry\nBusiness Type: $businessType\nTeam Size: $teamSize\nWorkflow: $workflow\nChallenges: $challenges\nTools: $tools\nEstimated Impact: $estimatedImpact";

    $system_prompt = "You are an expert AI implementation strategist for Vosme.\nThe user will provide details about their business, team, workflows, and challenges.\nYour goal is to provide 2-3 specific, actionable AI implementation suggestions that would genuinely help them.\nDo not hallucinate. Be extremely concise but professional. Tell them EXACTLY what AI tool or system to use to solve their problem.\n\n" . $language_ins;

    $contents = array(
        array(
            'role' => 'user',
            'parts' => array( array('text' => $fullDescription) )
        )
    );

    $result = call_gemini_api($contents, $system_prompt);

    if (is_wp_error($result)) {
        return $result;
    }
    return rest_ensure_response($result);
}
