import React from 'react';
import { motion } from 'motion/react';
import { Server, Code, Brain, Settings } from 'lucide-react';

const services = [
  {
    title: 'AI Consultation & Architecture',
    description: 'Expert guidance on AI strategy, system architecture, and implementation roadmaps.',
    icon: Brain,
  },
  {
    title: 'AI Environment Setup',
    description: 'Configuring robust infrastructure and environments optimized for AI model training and deployment.',
    icon: Settings,
  },
  {
    title: 'Custom Web Development',
    description: 'Tailored web solutions that integrate seamlessly with your business processes and AI systems.',
    icon: Code,
  },
  {
    title: 'App Development',
    description: 'Native and cross-platform mobile applications designed for performance and user experience.',
    icon: Server,
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Comprehensive solutions for your digital transformation journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <service.icon className="text-indigo-600" size={24} />
              </div>
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
