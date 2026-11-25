import React from 'react';

interface PuraFlowLogoProps {
  variant?: 'dark' | 'light';
  className?: string;
}

export const PuraFlowLogo: React.FC<PuraFlowLogoProps> = ({
  variant = 'dark',
  className = '',
}) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-[#0B1F3A]';
  const peakStroke = variant === 'light' ? '#FFFFFF' : '#E41B5B';

  return (
    <span className={`inline-flex items-center gap-2 select-none ${className}`}>
      <svg
        width="26"
        height="18"
        viewBox="0 0 26 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Minimalist Evian-inspired twin alpine ridge */}
        <path
          d="M1.5 15.5L8.2 4.5L13 11.2L17.4 3L24.5 15.5"
          stroke={peakStroke}
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.5 15.5H24.5"
          stroke={variant === 'light' ? 'rgba(255,255,255,0.45)' : 'rgba(11,31,58,0.22)'}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      <span
        className={`font-display text-[22px] font-semibold tracking-[-0.03em] leading-none whitespace-nowrap ${textColor}`}
      >
        puraflow
      </span>
    </span>
  );
};
