import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || '*' })); // Restrict in production

// Initialize Supabase Client for Admin Database access
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// --- Rate Limiting for AI Endpoint ---
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: { error: 'Too many requests from this IP, please try again later.' }
});

// --- Middleware: Verify Admin JWT Role ---
const requireAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized: No token provided' });

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !user) return res.status(401).json({ error: 'Unauthorized: Invalid token' });

  const { data: roleData } = await supabaseAdmin
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single();

  if (!roleData || roleData.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }

  req.user = user;
  next();
};

// --- ROUTES ---

// 1. AI Suggestion Endpoint (Public, Rate Limited, reCAPTCHA protected)
app.post('/api/suggest', apiLimiter, async (req, res) => {
  try {
    const { industry, businessType, teamSize, workflow, challenges, tools, estimatedImpact, recaptchaToken, languageInstruction } = req.body;

    // Verify reCAPTCHA
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret && recaptchaToken) {
      const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
      const recaptchaResponse = await fetch(verifyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
      });
      const recaptchaData = await recaptchaResponse.json();

      if (!recaptchaData.success || recaptchaData.score < 0.5) {
        return res.status(403).json({ error: 'reCAPTCHA verification failed or score too low.' });
      }
    }

    // Call Gemini API Safely
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const fullDescription = `Industry: ${industry}\nBusiness Type: ${businessType}\nTeam Size: ${teamSize}\nWorkflow: ${workflow}\nChallenges: ${challenges}\nTools: ${tools}\nEstimated Impact: ${estimatedImpact}`.trim();

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `ROLE\nYou are a senior AI consulting expert...\nINPUT: "${fullDescription}"\n${languageInstruction || ""}`,
    });

    res.json({ text: response.text });
  } catch (error) {
    console.error('Suggest Error:', error);
    res.status(500).json({ error: 'Internal server error generating suggestion.' });
  }
});

// 2. Fetch Page Content (Public)
app.get('/api/content/:pageKey', async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('page_content')
    .select('*')
    .eq('page_key', req.params.pageKey)
    .single();

  if (error) return res.status(404).json({ error: 'Content not found' });
  res.json(data);
});

// 3. Update Page Content & Photos (Admin Only)
app.put('/api/content/:pageKey', requireAdmin, async (req, res) => {
  const { text_content, image_url } = req.body;
  
  const { data, error } = await supabaseAdmin
    .from('page_content')
    .upsert({ 
      page_key: req.params.pageKey, 
      text_content, 
      image_url, 
      updated_at: new Date() 
    })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend securely running on port ${PORT}`));
