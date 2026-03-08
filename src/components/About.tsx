import React from 'react';
import { motion } from 'motion/react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 lg:mb-0"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
              About Vosme International
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Vosme International Sdn Bhd is a premier AI consultation firm dedicated to transforming businesses through intelligent technology. We specialize in architectural design and implementation of AI systems, ensuring that your organization is ready for the future.
            </p>
            <p className="text-lg text-gray-600">
              Our expertise extends beyond consultation; we provide comprehensive environment setup for AI workloads and develop customized web and mobile applications tailored to your specific needs. Located in Muar, Johor, we serve clients with a commitment to innovation and excellence.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden shadow-xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Team collaboration" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
