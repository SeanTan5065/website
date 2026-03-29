import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Language = 'en' | 'zh' | 'ms';

export const translations = {
  en: {
    // Header
    navHome: 'Home',
    navAbout: 'About Us',
    navServices: 'Services',
    navContact: 'Contact',
    bookConsultation: 'Book Consultation',
    
    // Hero
    heroSlide1Title: 'AI Consultation & Architecture',
    heroSlide1Subtitle: 'Building the future with intelligent systems designed for your business.',
    heroSlide2Title: 'Custom Web & App Development',
    heroSlide2Subtitle: 'Tailored digital solutions to elevate your brand and operations.',
    heroSlide3Title: 'AI Environment Setup',
    heroSlide3Subtitle: 'Optimized infrastructure for seamless AI integration and performance.',
    
    // About
    aboutTitle: 'About Vosme International',
    aboutP1: 'Vosme International Sdn Bhd is a premier AI consultation firm dedicated to transforming businesses through intelligent technology. We specialize in architectural design and implementation of AI systems, ensuring that your organization is ready for the future.',
    aboutP2: 'Our expertise extends beyond consultation; we provide comprehensive environment setup for AI workloads and develop customized web and mobile applications tailored to your specific needs. Located in Muar, Johor, we serve clients with a commitment to innovation and excellence.',
    
    // Services
    servicesTitle: 'Our Services',
    servicesSubtitle: 'Comprehensive solutions for your digital transformation journey.',
    service1Title: 'AI Consultation & Architecture',
    service1Desc: 'Expert guidance on AI strategy, system architecture, and implementation roadmaps.',
    service2Title: 'AI Environment Setup',
    service2Desc: 'Configuring robust infrastructure and environments optimized for AI model training and deployment.',
    service3Title: 'Custom Web Development',
    service3Desc: 'Tailored web solutions that integrate seamlessly with your business processes and AI systems.',
    service4Title: 'App Development',
    service4Desc: 'Native and cross-platform mobile applications designed for performance and user experience.',
    
    // AISuggestion
    aiTitle: 'Discover Your AI Potential',
    aiSubtitle: 'Tell us about your company, and our AI will instantly suggest how you can leverage artificial intelligence to transform your business.',
    aiLabel: 'Describe your company, industry, and current challenges:',
    aiFieldIndustry: 'Industry',
    aiFieldBusinessType: 'Business Type (B2B / B2C / Both)',
    aiFieldTeamSize: 'Team Size',
    aiFieldWorkflow: 'Current Workflow (brief)',
    aiFieldChallenges: 'Biggest Challenges (max 3)',
    aiFieldTools: 'Current Tools (if any)',
    aiFieldEstimatedImpact: 'Estimated Impact (Optional)',
    aiFieldEstimatedImpactPlaceholder: 'e.g. Potential monthly cost saving, reduction in manpower, increase in response speed/conversion...',
    aiPlaceholder: 'e.g., We are a mid-sized logistics company struggling with route optimization and customer support response times...',
    aiErrorEmpty: 'Please fill in the required fields.',
    aiErrorFail: 'Failed to generate suggestions. Please try again.',
    aiErrorGeneral: 'An error occurred while generating suggestions. Please try again later.',
    aiErrorNetwork: 'Network error. Please check your internet connection and try again.',
    aiErrorRateLimit: 'We are receiving too many requests right now. Please wait a moment and try again.',
    aiErrorFallback: 'If this issue persists, please contact our team directly for a personalized consultation.',
    aiButtonLoading: 'Analyzing...',
    aiButtonGenerate: 'Generate AI Suggestions',
    aiResultTitle: 'Your Custom AI Opportunities',
    aiReadyTitle: 'Ready to implement these solutions?',
    aiReadyDesc: 'Contact our experts to turn these ideas into reality.',
    aiDiscussBtn: 'Discuss on WhatsApp',
    
    // Contact
    contactTitle: 'Contact Us',
    contactSubtitle: 'Get in touch with us to discuss your project.',
    contactAddress: 'Address',
    contactPhone: 'Phone',
    contactEmail: 'Email',
    
    // Footer
    footerDesc: 'Empowering businesses with cutting-edge AI consultation, architectural design, and custom software development.',
    footerQuickLinks: 'Quick Links',
    footerConnect: 'Connect With Us',
    footerRights: 'Vosme International Sdn Bhd. All rights reserved.',
    
    // BookingModal
    bookingTitle: 'Book a Consultation',
    bookingName: 'Name',
    bookingNameReq: 'Name is required',
    bookingNamePlaceholder: 'Your Name',
    bookingEmail: 'Email',
    bookingEmailReq: 'Email is required',
    bookingEmailInvalid: 'Invalid email',
    bookingEmailPlaceholder: 'john@example.com',
    bookingPhone: 'Phone',
    bookingPhoneReq: 'Phone is required',
    bookingPhonePlaceholder: '+60...',
    bookingService: 'Service Interest',
    bookingServiceReq: 'Please select a service',
    bookingServiceSelect: 'Select a service...',
    bookingDate: 'Preferred Date',
    bookingDetails: 'Additional Details',
    bookingDetailsPlaceholder: 'Tell us more about your project...',
    bookingSubmit: 'Send Booking Request',
    
    // Chatbot
    chatHeader: 'Vosme AI Assistant',
    chatOnline: 'Online',
    chatInputPlaceholder: 'Type your message...',
    chatError: 'Sorry, I encountered an error. Please try again.',
    chatErrorNetwork: 'Network error. Please check your internet connection.',
    chatErrorRateLimit: 'I am receiving too many messages right now. Please try again in a minute.',
    chatErrorFallback: 'If I am still unavailable, please reach out to our human team at sean@vosme-international.com.',
    chatInitial: 'Hello! I am the Vosme AI Assistant. How can I help you today?',
    
    // SEO
    seoTitle: 'Vosme International - AI Consultation & Custom Software Development',
    seoDescription: 'Premier AI consultation and software development firm in Muar, Johor, Malaysia. We specialize in AI architecture, environment setup, and custom web/app development.',
    seoKeywords: 'AI consultation Malaysia, Custom software development Johor, AI architecture, Web development Muar, App development Malaysia, Vosme International',
    
    // FAQ
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Find answers to common questions about our services and processes.',
    faqQ1: 'What services does Vosme International provide?',
    faqA1: 'We provide AI consultation, AI environment setup, custom web development, and mobile app development tailored to your business needs.',
    faqQ2: 'Where is Vosme International located?',
    faqA2: 'We are headquartered in Muar, Johor, Malaysia, but we serve clients globally with our digital solutions.',
    faqQ3: 'How can AI improve my business?',
    faqA3: 'AI can automate repetitive tasks, provide data-driven insights, enhance customer experience, and optimize operational efficiency, giving you a competitive edge.',
    faqQ4: 'Do you build custom software from scratch?',
    faqA4: 'Yes, we specialize in building custom web and mobile applications from scratch, ensuring they integrate seamlessly with your existing processes and AI systems.',
  },
  zh: {
    // Header
    navHome: '首页',
    navAbout: '关于我们',
    navServices: '服务',
    navContact: '联系我们',
    bookConsultation: '预约咨询',
    
    // Hero
    heroSlide1Title: 'AI 咨询与架构',
    heroSlide1Subtitle: '利用为您企业量身定制的智能系统共创未来。',
    heroSlide2Title: '定制网站与应用开发',
    heroSlide2Subtitle: '量身定制的数字解决方案，提升您的品牌和运营。',
    heroSlide3Title: 'AI 环境搭建',
    heroSlide3Subtitle: '优化的基础设施，实现无缝的 AI 集成和性能。',
    
    // About
    aboutTitle: '关于 Vosme International',
    aboutP1: 'Vosme International Sdn Bhd 是一家首屈一指的 AI 咨询公司，致力于通过智能技术实现企业转型。我们专注于 AI 系统的架构设计和实施，确保您的组织为未来做好准备。',
    aboutP2: '我们的专业领域不仅限于咨询；我们还为 AI 工作负载提供全面的环境设置，并开发量身定制的 Web 和移动应用程序以满足您的特定需求。我们位于柔佛州麻坡，致力于以创新和卓越服务客户。',
    
    // Services
    servicesTitle: '我们的服务',
    servicesSubtitle: '为您数字化转型之旅提供全面的解决方案。',
    service1Title: 'AI 咨询与架构',
    service1Desc: '关于 AI 战略、系统架构和实施路线图的专家指导。',
    service2Title: 'AI 环境搭建',
    service2Desc: '配置针对 AI 模型训练和部署进行优化的强大基础设施和环境。',
    service3Title: '定制网站开发',
    service3Desc: '量身定制的 Web 解决方案，与您的业务流程和 AI 系统无缝集成。',
    service4Title: '应用开发',
    service4Desc: '专为性能和用户体验设计的原生和跨平台移动应用程序。',
    
    // AISuggestion
    aiTitle: '发现您的 AI 潜力',
    aiSubtitle: '告诉我们关于您的公司，我们的 AI 将立即建议您如何利用人工智能来转变您的业务。',
    aiLabel: '描述您的公司、行业和当前面临的挑战：',
    aiFieldIndustry: '所属行业',
    aiFieldBusinessType: '业务类型 (B2B / B2C / 两者兼有)',
    aiFieldTeamSize: '团队规模',
    aiFieldWorkflow: '当前工作流程 (简述)',
    aiFieldChallenges: '面临的最大挑战 (最多3个)',
    aiFieldTools: '目前使用的工具 (如果有)',
    aiFieldEstimatedImpact: '预估影响 (选填)',
    aiFieldEstimatedImpactPlaceholder: '例如：潜在的月度成本节约、人力减少、响应速度或转化率提升...',
    aiPlaceholder: '例如：我们是一家中型物流公司，在路线优化和客户支持响应时间方面遇到困难...',
    aiErrorEmpty: '请填写必填字段。',
    aiErrorFail: '生成建议失败。请重试。',
    aiErrorGeneral: '生成建议时发生错误。请稍后重试。',
    aiErrorNetwork: '网络错误。请检查您的互联网连接并重试。',
    aiErrorRateLimit: '我们目前收到的请求过多。请稍等片刻再试。',
    aiErrorFallback: '如果此问题持续存在，请直接联系我们的团队进行个性化咨询。',
    aiButtonLoading: '分析中...',
    aiButtonGenerate: '生成 AI 建议',
    aiResultTitle: '您的定制 AI 机会',
    aiReadyTitle: '准备好实施这些解决方案了吗？',
    aiReadyDesc: '联系我们的专家，将这些想法变为现实。',
    aiDiscussBtn: '在 WhatsApp 上讨论',
    
    // Contact
    contactTitle: '联系我们',
    contactSubtitle: '与我们联系以讨论您的项目。',
    contactAddress: '地址',
    contactPhone: '电话',
    contactEmail: '电子邮件',
    
    // Footer
    footerDesc: '通过尖端的 AI 咨询、架构设计和定制软件开发为企业赋能。',
    footerQuickLinks: '快速链接',
    footerConnect: '关注我们',
    footerRights: 'Vosme International Sdn Bhd. 保留所有权利。',
    
    // BookingModal
    bookingTitle: '预约咨询',
    bookingName: '姓名',
    bookingNameReq: '姓名为必填项',
    bookingNamePlaceholder: '您的姓名',
    bookingEmail: '电子邮件',
    bookingEmailReq: '电子邮件为必填项',
    bookingEmailInvalid: '无效的电子邮件',
    bookingEmailPlaceholder: 'john@example.com',
    bookingPhone: '电话',
    bookingPhoneReq: '电话为必填项',
    bookingPhonePlaceholder: '+60...',
    bookingService: '感兴趣的服务',
    bookingServiceReq: '请选择一项服务',
    bookingServiceSelect: '选择服务...',
    bookingDate: '首选日期',
    bookingDetails: '其他详情',
    bookingDetailsPlaceholder: '告诉我们更多关于您的项目...',
    bookingSubmit: '发送预约请求',
    
    // Chatbot
    chatHeader: 'Vosme AI 助手',
    chatOnline: '在线',
    chatInputPlaceholder: '输入您的消息...',
    chatError: '抱歉，我遇到错误。请重试。',
    chatErrorNetwork: '网络错误。请检查您的互联网连接。',
    chatErrorRateLimit: '我目前收到的消息过多。请稍后再试。',
    chatErrorFallback: '如果我仍然无法使用，请通过 sean@vosme-international.com 联系我们的人工团队。',
    chatInitial: '你好！我是 Vosme AI 助手。今天我能为您提供什么帮助？',
    
    // SEO
    seoTitle: 'Vosme International - AI 咨询与定制软件开发',
    seoDescription: '位于马来西亚柔佛州麻坡的首屈一指的 AI 咨询和软件开发公司。我们专注于 AI 架构、环境搭建以及定制网站和应用开发。',
    seoKeywords: '马来西亚 AI 咨询, 柔佛定制软件开发, AI 架构, 麻坡网站开发, 马来西亚应用开发, Vosme International',
    
    // FAQ
    faqTitle: '常见问题解答',
    faqSubtitle: '查找有关我们服务和流程的常见问题解答。',
    faqQ1: 'Vosme International 提供哪些服务？',
    faqA1: '我们提供量身定制的 AI 咨询、AI 环境搭建、定制网站开发和移动应用开发服务。',
    faqQ2: 'Vosme International 位于哪里？',
    faqA2: '我们的总部位于马来西亚柔佛州麻坡，但我们为全球客户提供数字解决方案。',
    faqQ3: 'AI 如何改善我的业务？',
    faqA3: 'AI 可以自动执行重复性任务、提供数据驱动的洞察力、增强客户体验并优化运营效率，从而为您带来竞争优势。',
    faqQ4: '你们从头开始构建定制软件吗？',
    faqA4: '是的，我们专注于从头开始构建定制的 Web 和移动应用程序，确保它们与您现有的流程和 AI 系统无缝集成。',
  },
  ms: {
    // Header
    navHome: 'Utama',
    navAbout: 'Tentang Kami',
    navServices: 'Perkhidmatan',
    navContact: 'Hubungi Kami',
    bookConsultation: 'Tempah Konsultasi',
    
    // Hero
    heroSlide1Title: 'Konsultasi & Senibina AI',
    heroSlide1Subtitle: 'Membina masa depan dengan sistem pintar yang direka untuk perniagaan anda.',
    heroSlide2Title: 'Pembangunan Web & Aplikasi Tersuai',
    heroSlide2Subtitle: 'Penyelesaian digital yang disesuaikan untuk meningkatkan jenama dan operasi anda.',
    heroSlide3Title: 'Penyediaan Persekitaran AI',
    heroSlide3Subtitle: 'Infrastruktur yang dioptimumkan untuk integrasi dan prestasi AI yang lancar.',
    
    // About
    aboutTitle: 'Tentang Vosme International',
    aboutP1: 'Vosme International Sdn Bhd adalah firma perundingan AI terkemuka yang berdedikasi untuk mengubah perniagaan melalui teknologi pintar. Kami pakar dalam reka bentuk seni bina dan pelaksanaan sistem AI, memastikan organisasi anda bersedia untuk masa depan.',
    aboutP2: 'Kepakaran kami melangkaui perundingan; kami menyediakan persediaan persekitaran yang komprehensif untuk beban kerja AI dan membangunkan aplikasi web dan mudah alih tersuai yang disesuaikan dengan keperluan khusus anda. Terletak di Muar, Johor, kami melayani pelanggan dengan komitmen terhadap inovasi dan kecemerlangan.',
    
    // Services
    servicesTitle: 'Perkhidmatan Kami',
    servicesSubtitle: 'Penyelesaian komprehensif untuk perjalanan transformasi digital anda.',
    service1Title: 'Konsultasi & Senibina AI',
    service1Desc: 'Bimbingan pakar mengenai strategi AI, seni bina sistem, dan peta jalan pelaksanaan.',
    service2Title: 'Penyediaan Persekitaran AI',
    service2Desc: 'Mengkonfigurasi infrastruktur dan persekitaran yang mantap yang dioptimumkan untuk latihan dan penggunaan model AI.',
    service3Title: 'Pembangunan Web Tersuai',
    service3Desc: 'Penyelesaian web tersuai yang berintegrasi dengan lancar dengan proses perniagaan dan sistem AI anda.',
    service4Title: 'Pembangunan Aplikasi',
    service4Desc: 'Aplikasi mudah alih asli dan merentas platform yang direka untuk prestasi dan pengalaman pengguna.',
    
    // AISuggestion
    aiTitle: 'Temui Potensi AI Anda',
    aiSubtitle: 'Beritahu kami tentang syarikat anda, dan AI kami akan segera mencadangkan bagaimana anda boleh memanfaatkan kecerdasan buatan untuk mengubah perniagaan anda.',
    aiLabel: 'Terangkan syarikat, industri, dan cabaran semasa anda:',
    aiFieldIndustry: 'Industri',
    aiFieldBusinessType: 'Jenis Perniagaan (B2B / B2C / Kedua-duanya)',
    aiFieldTeamSize: 'Saiz Pasukan',
    aiFieldWorkflow: 'Aliran Kerja Semasa (ringkas)',
    aiFieldChallenges: 'Cabaran Terbesar (maksimum 3)',
    aiFieldTools: 'Alat Semasa (jika ada)',
    aiFieldEstimatedImpact: 'Anggaran Impak (Pilihan)',
    aiFieldEstimatedImpactPlaceholder: 'cth. Potensi penjimatan kos bulanan, pengurangan tenaga kerja, peningkatan kelajuan tindak balas / penukaran...',
    aiPlaceholder: 'cth., Kami adalah syarikat logistik bersaiz sederhana yang bergelut dengan pengoptimuman laluan dan masa tindak balas sokongan pelanggan...',
    aiErrorEmpty: 'Sila isi ruangan yang diperlukan.',
    aiErrorFail: 'Gagal menjana cadangan. Sila cuba lagi.',
    aiErrorGeneral: 'Ralat berlaku semasa menjana cadangan. Sila cuba lagi nanti.',
    aiErrorNetwork: 'Ralat rangkaian. Sila periksa sambungan internet anda dan cuba lagi.',
    aiErrorRateLimit: 'Kami menerima terlalu banyak permintaan sekarang. Sila tunggu sebentar dan cuba lagi.',
    aiErrorFallback: 'Jika masalah ini berterusan, sila hubungi pasukan kami secara terus untuk perundingan peribadi.',
    aiButtonLoading: 'Menganalisis...',
    aiButtonGenerate: 'Jana Cadangan AI',
    aiResultTitle: 'Peluang AI Tersuai Anda',
    aiReadyTitle: 'Bersedia untuk melaksanakan penyelesaian ini?',
    aiReadyDesc: 'Hubungi pakar kami untuk menjadikan idea ini satu realiti.',
    aiDiscussBtn: 'Bincang di WhatsApp',
    
    // Contact
    contactTitle: 'Hubungi Kami',
    contactSubtitle: 'Hubungi kami untuk membincangkan projek anda.',
    contactAddress: 'Alamat',
    contactPhone: 'Telefon',
    contactEmail: 'E-mel',
    
    // Footer
    footerDesc: 'Memperkasakan perniagaan dengan perundingan AI yang canggih, reka bentuk seni bina, dan pembangunan perisian tersuai.',
    footerQuickLinks: 'Pautan Pantas',
    footerConnect: 'Berhubung Dengan Kami',
    footerRights: 'Vosme International Sdn Bhd. Hak cipta terpelihara.',
    
    // BookingModal
    bookingTitle: 'Tempah Konsultasi',
    bookingName: 'Nama',
    bookingNameReq: 'Nama diperlukan',
    bookingNamePlaceholder: 'Nama Anda',
    bookingEmail: 'E-mel',
    bookingEmailReq: 'E-mel diperlukan',
    bookingEmailInvalid: 'E-mel tidak sah',
    bookingEmailPlaceholder: 'john@example.com',
    bookingPhone: 'Telefon',
    bookingPhoneReq: 'Telefon diperlukan',
    bookingPhonePlaceholder: '+60...',
    bookingService: 'Minat Perkhidmatan',
    bookingServiceReq: 'Sila pilih perkhidmatan',
    bookingServiceSelect: 'Pilih perkhidmatan...',
    bookingDate: 'Tarikh Pilihan',
    bookingDetails: 'Butiran Tambahan',
    bookingDetailsPlaceholder: 'Beritahu kami lebih lanjut tentang projek anda...',
    bookingSubmit: 'Hantar Permintaan Tempahan',
    
    // Chatbot
    chatHeader: 'Pembantu AI Vosme',
    chatOnline: 'Dalam Talian',
    chatInputPlaceholder: 'Taip mesej anda...',
    chatError: 'Maaf, saya menghadapi ralat. Sila cuba lagi.',
    chatErrorNetwork: 'Ralat rangkaian. Sila periksa sambungan internet anda.',
    chatErrorRateLimit: 'Saya menerima terlalu banyak mesej sekarang. Sila cuba lagi sebentar lagi.',
    chatErrorFallback: 'Jika saya masih tidak tersedia, sila hubungi pasukan manusia kami di sean@vosme-international.com.',
    chatInitial: 'Helo! Saya Pembantu AI Vosme. Bagaimana saya boleh membantu anda hari ini?',
    
    // SEO
    seoTitle: 'Vosme International - Konsultasi AI & Pembangunan Perisian Tersuai',
    seoDescription: 'Firma perundingan AI dan pembangunan perisian terkemuka di Muar, Johor, Malaysia. Kami pakar dalam seni bina AI, penyediaan persekitaran, dan pembangunan web/aplikasi tersuai.',
    seoKeywords: 'Konsultasi AI Malaysia, Pembangunan perisian tersuai Johor, Seni bina AI, Pembangunan web Muar, Pembangunan aplikasi Malaysia, Vosme International',
    
    // FAQ
    faqTitle: 'Soalan Lazim',
    faqSubtitle: 'Cari jawapan kepada soalan lazim tentang perkhidmatan dan proses kami.',
    faqQ1: 'Apakah perkhidmatan yang disediakan oleh Vosme International?',
    faqA1: 'Kami menyediakan perundingan AI, penyediaan persekitaran AI, pembangunan web tersuai, dan pembangunan aplikasi mudah alih yang disesuaikan dengan keperluan perniagaan anda.',
    faqQ2: 'Di manakah lokasi Vosme International?',
    faqA2: 'Ibu pejabat kami terletak di Muar, Johor, Malaysia, tetapi kami melayani pelanggan di seluruh dunia dengan penyelesaian digital kami.',
    faqQ3: 'Bagaimanakah AI boleh meningkatkan perniagaan saya?',
    faqA3: 'AI boleh mengautomasikan tugas berulang, memberikan pandangan dipacu data, meningkatkan pengalaman pelanggan, dan mengoptimumkan kecekapan operasi, memberikan anda kelebihan daya saing.',
    faqQ4: 'Adakah anda membina perisian tersuai dari awal?',
    faqA4: 'Ya, kami pakar dalam membina aplikasi web dan mudah alih tersuai dari awal, memastikan ia berintegrasi dengan lancar dengan proses sedia ada dan sistem AI anda.',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: keyof typeof translations['en']) => {
    return translations[language][key] || translations['en'][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
