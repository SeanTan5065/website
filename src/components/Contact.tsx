import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Get in touch with us to discuss your project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center p-8 bg-gray-50 rounded-xl text-center"
          >
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <MapPin className="text-indigo-600" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Address</h3>
            <p className="text-gray-600">
              Jalan Bakri Jaya 13,<br />
              Taman Bakri Jaya,<br />
              84200 Muar Johor
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center p-8 bg-gray-50 rounded-xl text-center"
          >
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <Phone className="text-indigo-600" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600">
              <a href="tel:+60187607799" className="hover:text-indigo-600 transition-colors">
                +60 18-760 7799
              </a>
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center p-8 bg-gray-50 rounded-xl text-center"
          >
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="text-indigo-600" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">
              <a href="mailto:sean@vosme-international.com" className="hover:text-indigo-600 transition-colors">
                sean@vosme-international.com
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
