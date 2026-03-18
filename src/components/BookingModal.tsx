import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BookingFormInputs {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  details: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<BookingFormInputs>();
  const { t } = useLanguage();

  const onSubmit: SubmitHandler<BookingFormInputs> = (data) => {
    const message = `*New Booking Request*\n\n*Name:* ${data.name}\n*Email:* ${data.email}\n*Phone:* ${data.phone}\n*Service:* ${data.service}\n*Preferred Date:* ${data.date}\n*Details:* ${data.details}`;
    const whatsappUrl = `https://wa.me/60187607799?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0">
              <h3 id="booking-modal-title" className="text-xl font-bold text-gray-900">{t('bookingTitle')}</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md p-1" aria-label="Close modal">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label htmlFor="booking-name" className="block text-sm font-medium text-gray-700 mb-1">{t('bookingName')}</label>
                <input
                  id="booking-name"
                  {...register('name', { required: t('bookingNameReq') })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder={t('bookingNamePlaceholder')}
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "booking-name-error" : undefined}
                />
                {errors.name && <span id="booking-name-error" className="text-red-500 text-xs">{errors.name.message}</span>}
              </div>

              <div>
                <label htmlFor="booking-email" className="block text-sm font-medium text-gray-700 mb-1">{t('bookingEmail')}</label>
                <input
                  id="booking-email"
                  type="email"
                  {...register('email', { required: t('bookingEmailReq'), pattern: { value: /^\S+@\S+$/i, message: t('bookingEmailInvalid') } })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder={t('bookingEmailPlaceholder')}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "booking-email-error" : undefined}
                />
                {errors.email && <span id="booking-email-error" className="text-red-500 text-xs">{errors.email.message}</span>}
              </div>

              <div>
                <label htmlFor="booking-phone" className="block text-sm font-medium text-gray-700 mb-1">{t('bookingPhone')}</label>
                <input
                  id="booking-phone"
                  type="tel"
                  {...register('phone', { required: t('bookingPhoneReq') })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder={t('bookingPhonePlaceholder')}
                  aria-invalid={errors.phone ? "true" : "false"}
                  aria-describedby={errors.phone ? "booking-phone-error" : undefined}
                />
                {errors.phone && <span id="booking-phone-error" className="text-red-500 text-xs">{errors.phone.message}</span>}
              </div>

              <div>
                <label htmlFor="booking-service" className="block text-sm font-medium text-gray-700 mb-1">{t('bookingService')}</label>
                <select
                  id="booking-service"
                  {...register('service', { required: t('bookingServiceReq') })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  aria-invalid={errors.service ? "true" : "false"}
                  aria-describedby={errors.service ? "booking-service-error" : undefined}
                >
                  <option value="">{t('bookingServiceSelect')}</option>
                  <option value="AI Consultation">AI Consultation</option>
                  <option value="AI Environment Setup">AI Environment Setup</option>
                  <option value="Web Development">Web Development</option>
                  <option value="App Development">App Development</option>
                </select>
                {errors.service && <span id="booking-service-error" className="text-red-500 text-xs">{errors.service.message}</span>}
              </div>

              <div>
                <label htmlFor="booking-date" className="block text-sm font-medium text-gray-700 mb-1">{t('bookingDate')}</label>
                <input
                  id="booking-date"
                  type="date"
                  {...register('date')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="booking-details" className="block text-sm font-medium text-gray-700 mb-1">{t('bookingDetails')}</label>
                <textarea
                  id="booking-details"
                  {...register('details')}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder={t('bookingDetailsPlaceholder')}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                {t('bookingSubmit')}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
