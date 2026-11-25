import React from 'react';

interface PuraFlowLogoProps {
  variant?: 'dark' | 'light';
  className?: string;
}

export const PuraFlowLogo: React.FC<PuraFlowLogoProps> = ({
  variant = 'dark',
  className = '',
}) => {
  const isLight = variant === 'light';
  const primaryText = isLight ? 'text-white' : 'text-[#0B1F3A]';
  const accentText = isLight ? 'text-[#93C5FD]' : 'text-[#007CBB]';
  const dropletStroke = isLight ? '#FFFFFF' : '#0B1F3A';
  const flowAccent = isLight ? '#93C5FD' : '#E41B5B';

  return (
    <span className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Minimal luxury water droplet silhouette */}
        <path
          d="M12 2.5C12 2.5 5.5 10.1 5.5 14.5C5.5 18.0899 8.41015 21 12 21C15.5899 21 18.5 18.0899 18.5 14.5C18.5 10.1 12 2.5 12 2.5Z"
          stroke={dropletStroke}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Subtle inner water flow ribbon */}
        <path
          d="M8.5 15.2C9.6 14.2 10.9 14.2 12 15.1C13.1 16 14.4 16 15.5 15"
          stroke={flowAccent}
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
      <span
        className={`font-display text-[22px] font-semibold tracking-[-0.025em] leading-none whitespace-nowrap ${primaryText}`}
      >
        Pura<span className={`font-medium ${accentText}`}>Flow</span>
      </span>
    </span>
  );
};
