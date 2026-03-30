import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from "../_shared/cors.ts"; // Need to create this
import { GoogleGenAI } from "npm:@google/genai";

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { industry, businessType, teamSize, workflow, challenges, tools, estimatedImpact, recaptchaToken, languageInstruction } = await req.json();

    // 1. Verify reCAPTCHA token
    const recaptchaSecret = Deno.env.get("RECAPTCHA_SECRET_KEY");
    
    if (recaptchaSecret && recaptchaToken) {
      const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
      const recaptchaResponse = await fetch(verifyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
      });
      const recaptchaData = await recaptchaResponse.json();

      if (!recaptchaData.success || recaptchaData.score < 0.5) {
        return new Response(JSON.stringify({ error: "reCAPTCHA verification failed or score too low." }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    } else {
       // Allow skipping if explicitly empty in dev env (never in prod!)
       if (!recaptchaSecret) {
          console.warn("RECAPTCHA_SECRET_KEY is missing, skipping recaptcha validation.");
       } else {
          return new Response(JSON.stringify({ error: "Missing reCAPTCHA token." }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
       }
    }

    // 2. Build the Prompt for Gemini
    const fullDescription = `
Industry: ${industry}
Business Type: ${businessType}
Team Size: ${teamSize}
Current Workflow: ${workflow}
Biggest Challenges: ${challenges}
Current Tools: ${tools}
Estimated Impact: ${estimatedImpact}
    `.trim();

    const geminiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiKey) {
        throw new Error("GEMINI_API_KEY is not configured on the server.");
    }

    // 3. Call Gemini Securely
    const ai = new GoogleGenAI({ apiKey: geminiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `ROLE\n\nYou are a senior AI automation consultant and sales strategist.\n\nYour job is to:\n- Analyze the user’s business\n- Identify real operational and revenue problems\n- Map AI automation opportunities\n- Convert the analysis into 3 implementation packages\n- Generate a WhatsApp semi-automation conversation flow to convert the lead\n\n⚠️ STRICT RULES\n- No generic advice (avoid vague terms like “improve efficiency”)\n- Every point must tie to business impact (time, cost, revenue)\n- Keep output concise and skimmable\n- Use bullet points\n- Sound like a human consultant, not an AI tool\n\n📊 INPUT (from user form)\n"${fullDescription}"\n\n📊 OUTPUT STRUCTURE\n🔴 1. Key Pain Points\nIdentify 2–4 real problems:\n[Pain point] → business impact\n[Pain point] → root cause\n\n🤖 2. AI Automation Plan\nFor each problem:\nProblem\n→ AI Solution (specific system: chatbot / CRM / automation)\n→ How it works (real workflow steps)\n→ Expected impact\n\n📦 3. Implementation Packages\n🟢 Basic Plan\nFocus: Fix most urgent issue\nIncludes: 1 core automation system, simple workflow\nOutcome: faster response / reduced manual work\nTimeline: 1–2 weeks\nPrice: RM3,000 – RM6,000\n\n🟡 Growth Plan\nFocus: Improve workflow & conversion\nIncludes: chatbot + follow-up automation, CRM pipeline\nOutcome: better lead handling + higher conversion\nTimeline: 2–4 weeks\nPrice: RM8,000 – RM15,000\n\n🔴 Advanced Plan\nFocus: Full automation & scaling\nIncludes: full funnel automation, CRM + reporting dashboard, integrations\nOutcome: reduce manpower + increase revenue\nTimeline: 4–8 weeks\nPrice: RM20,000 – RM50,000\n\n💰 4. Estimated Impact\nTime saved: [estimate]\nCost reduction: [estimate]\nRevenue potential: [estimate]\n\n🧠Hidden Logic (DO NOT OUTPUT)\n- Prioritize sales, lead handling, and operations\n- Make recommendations feel tailored\n- Keep WhatsApp flow interactive\n- Avoid overwhelming the user\n\n${languageInstruction || "Please respond in English."}`,
    });

    if (!response.text) {
        throw new Error("Failed to generate text from Gemini.");
    }

    return new Response(JSON.stringify({ text: response.text }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message || "Internal Server Error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
