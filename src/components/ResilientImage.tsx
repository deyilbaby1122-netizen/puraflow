import React, { useState } from 'react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle = 'PuraFlow Mineral Water',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#ECEAE3] via-[#E4E1D8] to-[#D8D4C9] text-[#4A4E52] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg
          width="36"
          height="56"
          viewBox="0 0 36 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-3 opacity-60"
          aria-hidden="true"
        >
          <rect x="12" y="2" width="12" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <path
            d="M11 10C11 8.89543 11.8954 8 13 8H23C24.1046 8 25 8.89543 25 10V13L29 18V51C29 52.6569 27.6569 54 26 54H10C8.34315 54 7 52.6569 7 51V18L11 13V10Z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
        <span className="font-serif text-sm tracking-wide text-[#121417]/75">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
};
