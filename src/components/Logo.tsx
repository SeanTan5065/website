import React, { useState } from 'react';
import { Building2 } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-10 w-auto" }) => {
  const [error, setError] = useState(false);

  // Try the thumbnail URL first as it's often more permissive for embedding
  const logoUrl = "https://drive.google.com/thumbnail?id=1X3nMOVBbDv4ejmjj36nYGwBsKWmFraJL&sz=w1000";

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-md ${className}`} style={{ aspectRatio: '1/1' }}>
        <Building2 size={24} />
      </div>
    );
  }

  return (
    <img 
      src={logoUrl} 
      alt="Vosme International Logo" 
      className={className}
      onError={() => setError(true)}
      referrerPolicy="no-referrer"
    />
  );
};

export default Logo;
