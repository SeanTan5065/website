import React, { useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import AISuggestion from './components/AISuggestion';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import Chatbot from './components/Chatbot';
import SEO from './components/SEO';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <HelmetProvider>
      <LanguageProvider>
        <SEO />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-white focus:text-indigo-600 focus:font-bold rounded-br-lg shadow-md">
          Skip to main content
        </a>
        <div className="min-h-screen bg-gray-50 font-sans">
          <Header onBookingClick={() => setIsBookingOpen(true)} />
          <main id="main-content" tabIndex={-1} className="outline-none">
            <Hero />
            <About />
            <Services />
            <AISuggestion />
            <FAQ />
            <Contact />
          </main>
          <Footer />
          <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
          <Chatbot />
        </div>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
