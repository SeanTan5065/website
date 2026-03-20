import React from 'react';
import { motion } from 'motion/react';
import { Server, Code, Brain, Settings } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Services: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      title: t('service1Title'),
      description: t('service1Desc'),
      icon: Brain,
    },
    {
      title: t('service2Title'),
      description: t('service2Desc'),
      icon: Settings,
    },
    {
      title: t('service3Title'),
      description: t('service3Desc'),
      icon: Code,
    },
    {
      title: t('service4Title'),
      description: t('service4Desc'),
      icon: Server,
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {t('servicesTitle')}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            {t('servicesSubtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6"
              >
                <service.icon className="text-indigo-600" size={24} />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
