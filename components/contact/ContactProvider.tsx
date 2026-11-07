import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Phone, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import {
    PHONE_DISPLAY,
    PHONE_E164,
    enquiryMessage,
    saveEnquiry,
    toE164,
    whatsAppLink,
} from '../../lib/contact';

/**
 * "Get in touch" for the whole site.
 *
 * Any button calls `useContact().openContact({ interest, cta })`. The dialog
 * takes a name and phone number, saves them (lib/contact.ts) and opens a
 * WhatsApp chat with LayerSync, prefilled with who they are and what they
 * asked about. A floating WhatsApp button opens the same dialog from any page.
 */

export type ContactOptions = {
    /** What they're asking about, e.g. "SyncEstate" or "a website audit". */
    interest?: string;
    /** Which button they pressed, kept with the enquiry. */
    cta?: string;
};

type ContactContextValue = { openContact: (options?: ContactOptions) => void };

const ContactContext = createContext<ContactContextValue>({ openContact: () => undefined });

export const useContact = () => useContext(ContactContext);

export const WhatsAppGlyph: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
        <path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path
            d="M9.1 8.2c-.2-.5-.4-.5-.6-.5h-.5a1 1 0 0 0-.7.3c-.3.3-1 1-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 4.9 4.2 2.4.9 2.9.8 3.4.7.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4l-.5-.3-1.7-.8c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.3-.1-1-.4-2-1.2a7.3 7.3 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.4.3-.5v-.5l-.8-1.9Z"
            fill="currentColor"
        />
    </svg>
);

/** Open WhatsApp in a new tab; if that's blocked, wait briefly for the save and go there in this tab. */
async function openWhatsApp(link: string, saving: Promise<unknown>) {
    const win = window.open(link, '_blank');
    if (win) {
        win.opener = null;
        return;
    }
    await Promise.race([saving, new Promise((r) => setTimeout(r, 1500))]);
    window.location.assign(link);
}

type Stage = { kind: 'form' } | { kind: 'sent'; firstName: string; link: string };

const ContactDialog: React.FC<{
    open: boolean;
    options: ContactOptions;
    isDarkMode: boolean;
    onClose: () => void;
}> = ({ open, options, isDarkMode, onClose }) => {
    const { pathname } = useLocation();
    const panelRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
    const [stage, setStage] = useState<Stage>({ kind: 'form' });

    useEffect(() => {
        if (!open) return;
        setErrors({});
        setStage({ kind: 'form' });
        const t = window.setTimeout(() => nameRef.current?.focus(), 60);

        // Lock the page behind the dialog.
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
                return;
            }
            // Keep Tab inside the dialog.
            if (e.key === 'Tab' && panelRef.current) {
                const focusable = panelRef.current.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled]), input:not([disabled])',
                );
                if (!focusable.length) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        window.addEventListener('keydown', onKey);
        return () => {
            window.clearTimeout(t);
            document.body.style.overflow = prev;
            window.removeEventListener('keydown', onKey);
        };
    }, [open, onClose]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cleanName = name.replace(/\s+/g, ' ').trim().slice(0, 80);
        const e164 = toE164(phone);
        const next: { name?: string; phone?: string } = {};
        if (cleanName.length < 2) next.name = 'Please enter your name.';
        if (!e164) next.phone = 'Please enter a phone number we can reach you on.';
        if (next.name || next.phone) {
            setErrors(next);
            (next.name ? nameRef.current : phoneRef.current)?.focus();
            return;
        }
        const link = whatsAppLink(enquiryMessage({ name: cleanName, phone: e164!, interest: options.interest }));
        const saving = saveEnquiry({ name: cleanName, phone: e164!, interest: options.interest, cta: options.cta, page: pathname });
        setStage({ kind: 'sent', firstName: cleanName.split(' ')[0], link });
        void openWhatsApp(link, saving);
    };

    const surface = isDarkMode ? 'bg-[#0d0d0d] border-white/10 text-white' : 'bg-white border-black/10 text-gray-900';
    const muted = isDarkMode ? 'text-white/60' : 'text-gray-500';
    const faint = isDarkMode ? 'text-white/40' : 'text-gray-400';
    const input = `w-full h-12 px-4 rounded-2xl border text-base outline-none transition-colors focus:border-brand-green focus:ring-2 focus:ring-brand-green/30 ${
        isDarkMode ? 'bg-white/5 border-white/10 text-white placeholder:text-white/30' : 'bg-black/[0.03] border-black/10 text-gray-900 placeholder:text-gray-400'
    }`;
    const errorCls = 'mt-1.5 text-[13px] text-[#f97066]';

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
                    <motion.div
                        ref={panelRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="contact-title"
                        initial={{ opacity: 0, y: 24, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.98 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className={`relative w-full max-w-[440px] max-h-[calc(100svh-32px)] overflow-y-auto rounded-[32px] border p-7 sm:p-8 shadow-2xl ${surface}`}
                    >
                        <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-brand-green/20 blur-[80px]" />
                        <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-brand-orange/15 blur-[80px]" />
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close"
                            className={`absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'}`}
                        >
                            <X className="h-4 w-4" />
                        </button>

                        {stage.kind === 'form' ? (
                            <form onSubmit={onSubmit} noValidate className="relative">
                                <p className={`text-[10px] uppercase tracking-[0.3em] font-bold ${faint} flex items-center gap-2`}>
                                    <span className="h-1.5 w-1.5 rounded-full bg-brand-green shadow-[0_0_10px_rgba(127,176,105,0.8)]" />
                                    Get in touch
                                </p>
                                <h2 id="contact-title" className="mt-4 text-[26px] sm:text-[28px] font-light leading-tight tracking-[-0.02em]">
                                    {options.interest ? <>Let&apos;s talk about {options.interest}.</> : <>Tell us about your operation.</>}
                                </h2>
                                <p className={`mt-2 text-[15px] leading-relaxed ${muted}`}>
                                    Leave your name and number, and we&apos;ll pick it up with you on WhatsApp.
                                </p>

                                <div className="mt-6 space-y-4">
                                    <div>
                                        <label htmlFor="contact-name" className="text-sm font-medium">Your name</label>
                                        <input
                                            ref={nameRef}
                                            id="contact-name"
                                            name="name"
                                            autoComplete="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            maxLength={80}
                                            placeholder="Tendai Moyo"
                                            aria-invalid={!!errors.name}
                                            aria-describedby={errors.name ? 'contact-name-error' : undefined}
                                            className={`${input} mt-1.5 ${errors.name ? '!border-[#f97066]' : ''}`}
                                        />
                                        {errors.name && <p id="contact-name-error" className={errorCls}>{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="contact-phone" className="text-sm font-medium">Phone number</label>
                                        <input
                                            ref={phoneRef}
                                            id="contact-phone"
                                            name="phone"
                                            type="tel"
                                            inputMode="tel"
                                            autoComplete="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            maxLength={24}
                                            placeholder="077 123 4567"
                                            aria-invalid={!!errors.phone}
                                            aria-describedby={errors.phone ? 'contact-phone-error' : 'contact-phone-hint'}
                                            className={`${input} mt-1.5 ${errors.phone ? '!border-[#f97066]' : ''}`}
                                        />
                                        {errors.phone ? (
                                            <p id="contact-phone-error" className={errorCls}>{errors.phone}</p>
                                        ) : (
                                            <p id="contact-phone-hint" className={`mt-1.5 text-xs ${faint}`}>Zimbabwe numbers get +263 automatically.</p>
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn-glow mt-7 w-full h-14 rounded-full bg-brand-green text-[#0b1408] font-bold uppercase tracking-[0.18em] text-[11px] inline-flex items-center justify-center gap-3 hover:brightness-110"
                                >
                                    <WhatsAppGlyph className="h-5 w-5" /> Continue to WhatsApp <ArrowRight className="h-4 w-4" />
                                </button>
                                <p className={`mt-4 text-center text-xs leading-relaxed ${faint}`}>
                                    We only use your details to reply to you.
                                    <br />
                                    Prefer to call?{' '}
                                    <a href={`tel:${PHONE_E164}`} className="underline underline-offset-2">
                                        {PHONE_DISPLAY}
                                    </a>
                                </p>
                            </form>
                        ) : (
                            <div role="status" className="relative">
                                <p className={`text-[10px] uppercase tracking-[0.3em] font-bold ${faint}`}>Opening WhatsApp</p>
                                <h2 id="contact-title" className="mt-4 text-[28px] font-light leading-tight tracking-[-0.02em]">
                                    Thanks, {stage.firstName}.
                                </h2>
                                <p className={`mt-2 text-[15px] leading-relaxed ${muted}`}>
                                    WhatsApp is opening with your message to LayerSync. Just press send. If it didn&apos;t open, use the button below.
                                </p>
                                <a
                                    href={stage.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-glow mt-7 w-full h-14 rounded-full bg-brand-green text-[#0b1408] font-bold uppercase tracking-[0.18em] text-[11px] inline-flex items-center justify-center gap-3 hover:brightness-110"
                                >
                                    <WhatsAppGlyph className="h-5 w-5" /> Open WhatsApp
                                </a>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className={`mt-3 w-full h-12 rounded-full border text-sm ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-black/5'}`}
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

/** The floating "Get in touch" button, bottom right on every page. */
const FloatingContact: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button
        type="button"
        onClick={onClick}
        aria-label={`Get in touch on WhatsApp (${PHONE_DISPLAY})`}
        className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-[80] inline-flex items-center gap-2.5 h-14 pl-4 pr-4 sm:pr-6 rounded-full bg-brand-green text-[#0b1408] shadow-[0_12px_40px_-8px_rgba(127,176,105,0.6)] hover:brightness-110"
    >
        <WhatsAppGlyph className="h-6 w-6" />
        <span className="hidden sm:inline font-bold uppercase tracking-[0.18em] text-[10px]">Get in touch</span>
    </button>
);

export const ContactProvider: React.FC<{ isDarkMode: boolean; children: React.ReactNode }> = ({ isDarkMode, children }) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<ContactOptions>({});
    const returnFocus = useRef<HTMLElement | null>(null);

    const openContact = useCallback((o: ContactOptions = {}) => {
        returnFocus.current = document.activeElement as HTMLElement | null;
        setOptions(o);
        setOpen(true);
    }, []);

    const close = useCallback(() => {
        setOpen(false);
        window.setTimeout(() => returnFocus.current?.focus?.(), 0);
    }, []);

    return (
        <ContactContext.Provider value={{ openContact }}>
            {children}
            <FloatingContact onClick={() => openContact({ cta: 'floating' })} />
            <ContactDialog open={open} options={options} isDarkMode={isDarkMode} onClose={close} />
        </ContactContext.Provider>
    );
};

/** Small helper for links styled as text: "WhatsApp +263 77 518 7682". */
export const PhoneLink: React.FC<{ className?: string }> = ({ className }) => (
    <a href={`tel:${PHONE_E164}`} className={className}>
        <Phone className="inline h-3.5 w-3.5 mr-1.5 -mt-0.5" />
        {PHONE_DISPLAY}
    </a>
);
