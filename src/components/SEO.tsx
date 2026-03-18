import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';

const SEO: React.FC = () => {
  const { t, language } = useLanguage();

  const title = t('seoTitle');
  const description = t('seoDescription');
  const keywords = t('seoKeywords');

  // Structured Data for LocalBusiness
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Vosme International Sdn Bhd",
    "image": "https://vosme.com/logo.png", // Placeholder, ideally replace with actual logo URL
    "@id": "https://vosme.com",
    "url": "https://vosme.com",
    "telephone": "+60187607799",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Muar",
      "addressRegion": "Johor",
      "addressCountry": "MY"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 2.0442,
      "longitude": 102.5689
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  // Structured Data for FAQPage (AEO)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": t('faqQ1'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('faqA1')
        }
      },
      {
        "@type": "Question",
        "name": t('faqQ2'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('faqA2')
        }
      },
      {
        "@type": "Question",
        "name": t('faqQ3'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('faqA3')
        }
      },
      {
        "@type": "Question",
        "name": t('faqQ4'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('faqA4')
        }
      }
    ]
  };

  return (
    <Helmet htmlAttributes={{ lang: language }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Vosme International" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
