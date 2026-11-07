import React from 'react';
import { Logo } from './Logo';
import { useContact, WhatsAppGlyph } from './contact/ContactProvider';
import { PHONE_DISPLAY, PHONE_E164 } from '../lib/contact';

interface FooterProps {
  isDarkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  const { openContact } = useContact();

  return (
    <footer className={`relative py-20 border-t text-center z-20 ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
      <Logo isDarkMode={isDarkMode} className="h-12 mx-auto mb-8" />
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-10">
        <button
          type="button"
          onClick={() => openContact({ cta: 'footer' })}
          className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-bold ${isDarkMode ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-black'}`}
        >
          <WhatsAppGlyph className="w-4 h-4 text-brand-green" /> WhatsApp us
        </button>
        <a
          href={`tel:${PHONE_E164}`}
          className={`text-[11px] uppercase tracking-[0.25em] font-bold ${isDarkMode ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-black'}`}
        >
          {PHONE_DISPLAY}
        </a>
      </div>
      <p className={`text-[10px] tracking-[0.4em] font-black uppercase ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>© 2025 LAYER SYNC TECHNOLGIES (PRIVATE) LIMITED</p>
    </footer>
  );
};
