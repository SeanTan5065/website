import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { useLanguage } from '../contexts/LanguageContext';

const Chatbot: React.FC = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: t('chatInitial') || 'Hello! I am the Vosme AI Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update initial message when language changes, but only if it's the only message
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'model') {
      setMessages([{ role: 'model', text: t('chatInitial') || 'Hello! I am the Vosme AI Assistant. How can I help you today?' }]);
    }
  }, [language, t, messages.length]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      
      const languageInstruction = language === 'zh' ? 'Please respond in Simplified Chinese.' : language === 'ms' ? 'Please respond in Bahasa Malaysia.' : 'Please respond in English.';
      const systemPrompt = `You are a chatbot for a software development and AI consulting & implementation company.

1. Scope Control (STRICT)
Only respond to topics related to:
Software development
AI solutions / automation
System integration
Digital transformation
Company services, case studies, or website content
If the message is unrelated, vague nonsense, spam, or random text -> treat as out-of-scope.

2. Tone & Style
Keep replies very short, clear, human-like
Use neutral, professional tone
No long explanations, no “sales fluff”
Avoid technical overload unless asked
Optional light emoji (🙂👍) only when natural

3. Website Context
Prioritize answers based on website content
If unsure -> stay general + guide to contact team
Do NOT hallucinate services

4. Pricing Rule (IMPORTANT)
If user asks about price, cost, budget:
Respond with EXACTLY this sentence:
"Pricing depends on your requirements 🙂 Let’s walk you through it in a quick demo. Please connect with our team on WhatsApp here: [Chat with Vosme](https://wa.me/60187607799)"
DO NOT paraphrase.
DO NOT:
Give numbers
Estimate ranges
Over-explain pricing

5. Nonsense / Spam Handling (Auto-Stop Logic)
Step 1 — First nonsense input:
Reply:
“I can only help with software & AI solutions 🙂”
Step 2 — Repeated nonsense (2–3 times):
Reply:
“Let me know when you have a business-related question 👍”
Step 3 — Continued nonsense:
STOP responding
Enter silent mode

6. Silent Mode Behavior
Do NOT reply to further messages
Stay silent indefinitely
ONLY resume when:
A message clearly relates to:
software development
AI
business solutions
company services
When valid topic detected:
Reply normally again (no mention of silent mode)

7. General Contact & Demos (MANDATORY RULE)
If the user agrees to a demo, wants to contact a human, or gets to the end of a conversation, you MUST explicitly provide the WhatsApp link.
Example response: "Great! Please connect with our team on WhatsApp to proceed: [Click here to chat](https://wa.me/60187607799)"
NEVER forget to include the link https://wa.me/60187607799 when directing them to WhatsApp.

7. Fallback Handling
If message is unclear but possibly relevant:
Ask ONE short clarifying question only
Example:
“Can you share more details about your project?”

8. Response Length Rule
Max: 1–2 short sentences
Prefer direct answers or CTA
Avoid paragraphs

9. Goal
Filter out low-quality users
Convert serious leads to WhatsApp demo
Keep conversation efficient and professional

${languageInstruction}`;

      // Convert messages to Content format for the API
      // Note: The API expects 'user' and 'model' roles.
      // Filter out the initial greeting if it exists (it's usually the first message and is from 'model')
      const historyMessages = messages.filter((_, index) => index !== 0);
      
      const history = historyMessages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      // Add the new message
      const contents = [
        ...history,
        { role: 'user', parts: [{ text: userMessage }] }
      ];

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemPrompt,
        },
      });

      const responseText = response.text || t('chatError') || 'No response generated.';

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error('Error sending message:', error);
      let errorMessage = t('chatError') || 'Sorry, I encountered an error. Please try again.';
      if (error instanceof Error) {
        const errorMsg = error.message.toLowerCase();
        if (errorMsg.includes('fetch') || errorMsg.includes('network')) {
          errorMessage = t('chatErrorNetwork') || 'Network error. Please check your internet connection.';
        } else if (errorMsg.includes('429') || errorMsg.includes('quota')) {
          errorMessage = t('chatErrorRateLimit') || 'I am receiving too many messages right now. Please try again in a minute.';
        } else {
          errorMessage = `System Error: ${error.message}`;
        }
      }
      
      setMessages(prev => [
        ...prev, 
        { role: 'model', text: errorMessage },
        { role: 'model', text: t('chatErrorFallback') || 'If I am still unavailable, please reach out to our human team at sean@vosme-international.com.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open AI Assistant"
        aria-expanded={isOpen}
      >
        <MessageCircle size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[calc(100vh-6rem)] sm:h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
            role="dialog"
            aria-label="AI Assistant Chat"
          >
            {/* Header */}
            <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
              <div className="flex items-center space-x-2">
                <MessageCircle size={20} />
                <span className="font-semibold">{t('chatHeader') || 'Vosme AI Assistant'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="hover:bg-indigo-500 p-1 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="Close AI Assistant"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" aria-live="polite">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <div className="prose prose-sm w-full max-w-none prose-p:leading-relaxed prose-a:text-blue-600 hover:prose-a:text-blue-500">
                      <Markdown>{msg.text}</Markdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start" aria-label="AI is typing">
                  <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-200 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t('chatInputPlaceholder') || 'Type your message...'}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  disabled={isLoading}
                  aria-label="Type your message"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                  aria-label="Send message"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
