import React from 'react';

interface LogoProps {
  className?: string;
  isDarkMode?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-8", isDarkMode = true }) => (
  <span className={`${className} inline-flex items-center flex-shrink-0`} style={{ width: 'auto' }}>
    {/* Full-colour orange→green mark on light; clean white silhouette on dark */}
    <img
      src={isDarkMode ? "/assets/logo-white.png" : "/assets/logo.png"}
      alt="LayerSync AI Logo"
      className="h-full w-auto object-contain transition-all duration-300"
      style={{ maxWidth: '100%' }}
      loading="eager"
      draggable="false"
    />
  </span>
);