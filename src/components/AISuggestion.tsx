import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Loader2, MessageCircle, AlertCircle } from 'lucide-react';
import Markdown from 'react-markdown';
import { useLanguage } from '../contexts/LanguageContext';

const AISuggestion: React.FC = () => {
  const [industry, setIndustry] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [workflow, setWorkflow] = useState('');
  const [challenges, setChallenges] = useState('');
  const [tools, setTools] = useState('');
  const [estimatedImpact, setEstimatedImpact] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { t, language } = useLanguage();
  const handleGenerate = async () => {
    if (!industry.trim() || !workflow.trim() || !challenges.trim()) {
      setError(t('aiErrorEmpty') || 'Please fill in the required fields.');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuggestion('');

    const fullDescription = `
Industry: ${industry}
Business Type: ${businessType}
Team Size: ${teamSize}
Current Workflow: ${workflow}
Biggest Challenges: ${challenges}
Current Tools: ${tools}
Estimated Impact: ${estimatedImpact}
    `.trim();

    const wpUrl = import.meta.env.VITE_WP_URL || 'https://vosme-international.com/ai';

    try {
      const languageInstruction = language === 'zh' ? 'Please respond in Simplified Chinese.' : language === 'ms' ? 'Please respond in Bahasa Malaysia.' : 'Please respond in English.';

      const response = await fetch(`${wpUrl}/wp-json/vosme/v1/suggest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          industry,
          businessType,
          teamSize,
          workflow,
          challenges,
          tools,
          estimatedImpact,
          languageInstruction
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      if (data.text) {
        setSuggestion(data.text);
      } else {
        throw new Error('No response generated');
      }
    } catch (err) {
      console.error('Error generating AI suggestion:', err);
      let errorMessage = t('aiErrorGeneral') || 'Failed to generate suggestions.';
      if (err instanceof Error) {
        const errorMsg = err.message.toLowerCase();
        if (errorMsg.includes('fetch') || errorMsg.includes('network')) {
          errorMessage = t('aiErrorNetwork') || 'Network Error';
        } else if (errorMsg.includes('429') || errorMsg.includes('quota')) {
          errorMessage = t('aiErrorRateLimit') || 'Rate Limit Exceeded';
        }
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const description = `Industry: ${industry}\nBusiness Type: ${businessType}\nTeam Size: ${teamSize}\nWorkflow: ${workflow}\nChallenges: ${challenges}\nTools: ${tools}\nEstimated Impact: ${estimatedImpact}`;
    const message = `*AI Implementation Inquiry*\n\n*Company Description:*\n${description}\n\nI would like to discuss implementing AI solutions for my business based on the suggestions provided.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=+60187607799&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="ai-suggestion" className="py-20 bg-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">{t('aiTitle')}</h2>
          <p className="text-lg text-gray-600">
            {t('aiSubtitle')}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6 sm:p-10">
            <div className="mb-6">
            <div className="mb-8 space-y-4 text-left">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('aiFieldIndustry')}</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={industry} onChange={e => setIndustry(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('aiFieldBusinessType')}</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. B2B, B2C" value={businessType} onChange={e => setBusinessType(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('aiFieldTeamSize')}</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. 1-10" value={teamSize} onChange={e => setTeamSize(e.target.value)} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('aiFieldWorkflow')}</label>
                <textarea rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none" value={workflow} onChange={e => setWorkflow(e.target.value)} />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('aiFieldChallenges')}</label>
                <textarea rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none" value={challenges} onChange={e => setChallenges(e.target.value)} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('aiFieldTools')}</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={tools} onChange={e => setTools(e.target.value)} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  💰 {t('aiFieldEstimatedImpact')}
                </label>
                <textarea rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none" placeholder={t('aiFieldEstimatedImpactPlaceholder')} value={estimatedImpact} onChange={e => setEstimatedImpact(e.target.value)} />
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  id="ai-suggestion-error" 
                  className="mt-3 p-4 bg-red-50 border border-red-100 rounded-xl"
                >
                  <p className="text-sm text-red-600 font-medium flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                    {error}
                  </p>
                  <div className="mt-3 pt-3 border-t border-red-100/50">
                    <p className="text-sm text-gray-700 mb-2">{t('aiErrorFallback')}</p>
                    <button 
                      onClick={handleWhatsApp} 
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-sm"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {t('aiDiscussBtn')}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isLoading || !industry.trim() || !workflow.trim() || !challenges.trim()}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 hover:scale-105 hover:shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              aria-busy={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>{t('aiButtonLoading')}</span>
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  <span>{t('aiButtonGenerate')}</span>
                </>
              )}
            </button>



            {suggestion && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 pt-8 border-t border-gray-100"
                aria-live="polite"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Sparkles className="text-indigo-600 mr-2" size={24} />
                  {t('aiResultTitle')}
                </h3>
                
                <div className="prose prose-indigo max-w-none text-gray-700 mb-8">
                  <Markdown>{suggestion}</Markdown>
                </div>

                <div className="bg-indigo-50 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{t('aiReadyTitle')}</h4>
                    <p className="text-sm text-gray-600">{t('aiReadyDesc')}</p>
                  </div>
                  <button
                    onClick={handleWhatsApp}
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#128C7E] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
                  >
                    <MessageCircle size={20} />
                    <span>{t('aiDiscussBtn')}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AISuggestion;
