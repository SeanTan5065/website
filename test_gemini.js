import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function test() {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    console.log("Testing with gemini-2.5-flash...");
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Say hello',
    });
    console.log('Success (2.5):', response.text);
  } catch (err) {
    console.error('Error with gemini-2.5-flash:', err.message);
  }
}
test();
