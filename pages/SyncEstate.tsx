import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, Bell, Check, ChevronDown, LayoutGrid, Play, ToggleRight, Users, X } from 'lucide-react';
import { useContact, WhatsAppGlyph } from '../components/contact/ContactProvider';
import { SYNC_ESTATE_URL } from '../lib/contact';
import {
    beyond,
    faq,
    finalCta,
    hero,
    how,
    hub,
    modules,
    problem,
    tour,
    who,
    zimbabwe,
    type Headline,
} from '../components/sync-estate/content';

/**
 * SyncEstate: LayerSync's all-in-one platform for estate agencies.
 * Copy comes from the SyncEstate product site (components/sync-estate/content.ts);
 * the VSL lives in public/vsl/. Every call to action opens the "Get in touch"
 * dialog, which saves the visitor's details and continues to WhatsApp.
 */

const LIME = '#9bd83d';

type Theme = { dark: boolean };

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const Accent: React.FC<{ h: Headline; dark: boolean }> = ({ h, dark }) => (
    <>
        {h[0]}
        <span style={{ color: dark ? LIME : '#3b6812' }}>{h[1]}</span>
        {h[2] ?? null}
    </>
);

const Eyebrow: React.FC<Theme & { children: React.ReactNode }> = ({ dark, children }) => (
    <div
        className={`inline-flex items-center gap-2 py-2 px-5 rounded-full border text-[10px] uppercase tracking-[0.3em] font-bold ${
            dark ? 'border-white/10 bg-white/5 text-white/50' : 'border-black/10 bg-black/5 text-gray-500'
        }`}
    >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: LIME, boxShadow: `0 0 10px ${LIME}` }} />
        {children}
    </div>
);

const H2: React.FC<Theme & { h: Headline; className?: string; id?: string }> = ({ dark, h, className, id }) => (
    <h2
        id={id}
        className={`text-[34px] sm:text-5xl lg:text-6xl font-light tracking-[-0.035em] leading-[1.05] ${dark ? 'text-white' : 'text-gray-900'} ${className ?? ''}`}
    >
        <Accent h={h} dark={dark} />
    </h2>
);

const PrimaryButton: React.FC<{ onClick: () => void; children: React.ReactNode; size?: 'md' | 'lg' }> = ({ onClick, children, size = 'md' }) => (
    <button
        type="button"
        onClick={onClick}
        className={`btn-glow inline-flex items-center justify-center gap-3 rounded-full font-bold uppercase tracking-[0.18em] text-[#0f1419] hover:brightness-110 ${
            size === 'lg' ? 'h-16 px-10 text-xs' : 'h-14 px-8 text-[11px]'
        }`}
        style={{ background: LIME, boxShadow: '0 12px 40px -10px rgba(155,216,61,0.55)' }}
    >
        <WhatsAppGlyph className="h-5 w-5" />
        {children}
    </button>
);

/* ------------------------------------------------------------------ VSL */

const VslPlayer: React.FC<Theme> = ({ dark }) => {
    const ref = useRef<HTMLVideoElement>(null);
    const [started, setStarted] = useState(false);
    const play = () => {
        const v = ref.current;
        if (!v) return;
        setStarted(true);
        v.controls = true;
        void v.play().catch(() => undefined);
    };
    return (
        <div className="relative w-full">
            <div
                aria-hidden
                className="pointer-events-none absolute -inset-10 rounded-[60px] blur-3xl opacity-70"
                style={{ background: 'radial-gradient(closest-side, rgba(155,216,61,0.22), transparent)' }}
            />
            <div className={`relative overflow-hidden rounded-[24px] md:rounded-[32px] border bg-black shadow-2xl ${dark ? 'border-white/10' : 'border-black/10'}`}>
                <video
                    ref={ref}
                    className="block w-full aspect-video"
                    poster={tour.poster}
                    preload="none"
                    playsInline
                    aria-label="SyncEstate in two minutes: a video tour of every module"
                    onPlay={() => setStarted(true)}
                >
                    <source src={tour.src} type="video/mp4" />
                </video>
                {!started && (
                    <button
                        type="button"
                        onClick={play}
                        aria-label="Play the two-minute SyncEstate tour"
                        className="group absolute inset-0 grid place-items-center bg-black/20 hover:bg-black/10"
                    >
                        <span
                            className="grid h-20 w-20 md:h-24 md:w-24 place-items-center rounded-full text-[#0f1419] transition-transform duration-300 group-hover:scale-105"
                            style={{ background: LIME, boxShadow: '0 0 60px rgba(155,216,61,0.45)' }}
                        >
                            <Play className="h-8 w-8 translate-x-0.5" fill="currentColor" strokeWidth={0} />
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
};

/* ------------------------------------------------------------------ page */

export const SyncEstate: React.FC = () => {
    const { isDarkMode } = useOutletContext<{ isDarkMode: boolean }>();
    const dark = isDarkMode ?? true;
    const { openContact } = useContact();
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const ask = (interest = 'SyncEstate', cta = 'sync-estate') => openContact({ interest, cta });

    const text = dark ? 'text-white' : 'text-gray-900';
    const muted = dark ? 'text-white/60' : 'text-gray-600';
    const faint = dark ? 'text-white/40' : 'text-gray-500';
    const card = `glass-card rounded-[28px] md:rounded-[32px] border ${dark ? 'border-white/[0.06]' : 'border-black/[0.06] bg-white/60'}`;
    const chip = `inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs ${dark ? 'border-white/10 bg-white/5 text-white/80' : 'border-black/10 bg-white text-gray-700'}`;

    return (
        <div className={`relative overflow-x-hidden transition-colors duration-700 ${dark ? 'bg-[#050505]' : 'bg-[#f5f5f7]'}`}>
            {/* ===== HERO + VSL ===== */}
            <section aria-labelledby="se-hero" className="relative pt-32 md:pt-40 pb-16 md:pb-24 px-4 md:px-6">
                <div aria-hidden className="pointer-events-none absolute left-1/2 top-24 h-[700px] w-[1100px] -translate-x-1/2 rounded-full blur-[140px] opacity-60"
                    style={{ background: dark ? 'radial-gradient(closest-side, #0f2a28, transparent)' : 'radial-gradient(closest-side, #e1ecdc, transparent)' }} />
                <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center">
                    <motion.img
                        {...fadeUp}
                        src={dark ? '/sync-estate/lockup-reversed.svg' : '/sync-estate/lockup.svg'}
                        alt="SyncEstate"
                        width={190}
                        height={44}
                        className="h-10 md:h-11 w-auto mb-8"
                    />
                    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }}>
                        <Eyebrow dark={dark}>{hero.eyebrow}</Eyebrow>
                    </motion.div>
                    <motion.h1
                        id="se-hero"
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.1 }}
                        className={`mt-8 text-[44px] sm:text-6xl lg:text-[88px] font-light leading-[0.98] tracking-[-0.045em] ${text}`}
                    >
                        {hero.lines[0]}
                        <br />
                        <span style={{ color: dark ? LIME : '#3b6812' }}>{hero.lines[1]}</span>
                    </motion.h1>
                    <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className={`mt-7 max-w-[60ch] text-base md:text-xl font-light leading-relaxed ${muted}`}>
                        {hero.sub}
                    </motion.p>

                    <motion.div id="tour" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="mt-12 md:mt-14 w-full scroll-mt-28">
                        <VslPlayer dark={dark} />
                    </motion.div>

                    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.25 }} className="mt-10 flex w-full flex-col sm:w-auto sm:flex-row items-stretch sm:items-center justify-center gap-3">
                        <PrimaryButton onClick={() => ask('SyncEstate', 'se-hero')}>Get in touch</PrimaryButton>
                        <a
                            href="#modules"
                            className={`inline-flex h-14 items-center justify-center gap-2 rounded-full border px-8 text-[11px] font-bold uppercase tracking-[0.18em] ${dark ? 'border-white/15 text-white/80 hover:bg-white/5' : 'border-black/15 text-gray-800 hover:bg-black/5'}`}
                        >
                            See every module <ArrowDown className="h-4 w-4" />
                        </a>
                    </motion.div>
                    <p className={`mt-6 font-mono text-[11px] ${faint}`}>{hero.micro}</p>
                </div>
            </section>

            {/* ===== THE PROBLEM ===== */}
            <section aria-labelledby="se-problem" className="relative py-20 md:py-32 px-4 md:px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <motion.div {...fadeUp}>
                        <Eyebrow dark={dark}>{problem.eyebrow}</Eyebrow>
                        <H2 id="se-problem" dark={dark} h={problem.headline} className="mt-6" />
                        <p className={`mt-6 max-w-xl text-base md:text-lg font-light leading-relaxed ${muted}`}>{problem.body}</p>
                    </motion.div>
                    <div className="relative flex flex-col gap-3">
                        {problem.captions.map((c, i) => (
                            <motion.div
                                key={c}
                                initial={{ opacity: 0, x: 40, rotate: 0 }}
                                whileInView={{ opacity: 1, x: 0, rotate: [-1.5, 1, -0.8, 1.4, -1.2][i] }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className={`${card} flex items-center gap-4 px-5 py-4`}
                                style={{ marginLeft: `${[0, 28, 8, 40, 16][i]}px` }}
                            >
                                <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-[#d92d20]/15 text-[#f97066]">
                                    <X className="h-4 w-4" />
                                </span>
                                <span className={`font-mono text-sm ${text}`}>{c}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <motion.div {...fadeUp} className="max-w-4xl mx-auto text-center mt-24 md:mt-32">
                    <p className={`text-3xl sm:text-5xl font-light tracking-[-0.03em] leading-tight ${text}`}>
                        <Accent h={problem.turn} dark={dark} />
                    </p>
                    <p className={`mt-6 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed ${muted}`}>{problem.turnBody}</p>
                </motion.div>
            </section>

            {/* ===== THE HUB ===== */}
            <section aria-labelledby="se-hub" className="py-20 md:py-32 px-4 md:px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className="max-w-3xl">
                        <Eyebrow dark={dark}>{hub.eyebrow}</Eyebrow>
                        <H2 id="se-hub" dark={dark} h={hub.headline} className="mt-6" />
                    </motion.div>
                    <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-5 md:gap-6">
                        {hub.tiles.map((t, i) => {
                            const Icon = [LayoutGrid, ToggleRight, Users, Bell][i];
                            return (
                                <motion.div key={t.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }} className={`${card} p-8 md:p-10`}>
                                    <span className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: 'rgba(155,216,61,0.12)', color: dark ? LIME : '#3b6812' }}>
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <h3 className={`mt-6 text-xl md:text-2xl font-light ${text}`}>{t.title}</h3>
                                    <p className={`mt-3 text-sm md:text-base leading-relaxed ${muted}`}>{t.body}</p>
                                    {i === 2 && (
                                        <div className="mt-6 flex flex-wrap gap-2">
                                            {['Director', 'Sales manager', 'Property manager', 'Accounts', 'Marketing', 'Valuer'].map((r) => (
                                                <span key={r} className={chip}>{r}</span>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== MODULES ===== */}
            <section id="modules" aria-labelledby="se-modules" className="py-20 md:py-32 px-4 md:px-6 scroll-mt-20">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto">
                        <Eyebrow dark={dark}>{modules.eyebrow}</Eyebrow>
                        <H2 id="se-modules" dark={dark} h={modules.headline} className="mt-6" />
                        <p className={`mt-5 text-base md:text-lg font-light ${muted}`}>{modules.sub}</p>
                    </motion.div>
                    <div className="mt-14 md:mt-20 grid md:grid-cols-2 gap-5 md:gap-6">
                        {modules.items.map((m, i) => (
                            <motion.article
                                key={m.name}
                                {...fadeUp}
                                transition={{ ...fadeUp.transition, delay: (i % 2) * 0.08 }}
                                className={`${card} card-hover-glow p-8 md:p-10 flex flex-col ${i === 0 ? 'md:col-span-2' : ''}`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="rounded-full px-3 py-1 text-[11px] font-bold tracking-wide text-[#0f1419]" style={{ background: LIME }}>{m.name}</span>
                                    <span className={`text-[10px] uppercase tracking-[0.25em] font-bold ${faint}`}>{m.eyebrow}</span>
                                </div>
                                <h3 className={`mt-6 text-2xl md:text-3xl font-light tracking-[-0.02em] leading-tight ${text}`}>
                                    <Accent h={m.headline} dark={dark} />
                                </h3>
                                <p className={`mt-4 text-sm md:text-base leading-relaxed ${muted}`}>{m.body}</p>
                                <ul className={`mt-6 grid gap-3 ${i === 0 ? 'md:grid-cols-3' : ''}`}>
                                    {m.proof.map((p) => (
                                        <li key={p} className={`flex gap-3 text-sm leading-snug ${text}`}>
                                            <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full text-[#0f1419]" style={{ background: LIME }}>
                                                <Check className="h-3 w-3" strokeWidth={3} />
                                            </span>
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    type="button"
                                    onClick={() => ask(m.name === 'Viewings' ? 'SynCRM viewing forms' : m.name, `se-module-${m.name.toLowerCase()}`)}
                                    className="group mt-8 inline-flex w-fit items-center gap-1.5 text-sm font-medium"
                                    style={{ color: dark ? '#b5e46a' : '#3b6812' }}
                                >
                                    Ask about {m.name}
                                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </button>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== BEYOND THE MODULES ===== */}
            <section aria-labelledby="se-beyond" className="py-20 md:py-32 px-4 md:px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className="max-w-3xl">
                        <Eyebrow dark={dark}>{beyond.eyebrow}</Eyebrow>
                        <H2 id="se-beyond" dark={dark} h={beyond.headline} className="mt-6" />
                    </motion.div>
                    <div className="mt-12 md:mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                        {beyond.cards.map((c, i) => (
                            <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: (i % 3) * 0.08 }} className={`${card} p-8`}>
                                <h3 className={`text-xl font-light leading-snug ${text}`}>
                                    <Accent h={c.title} dark={dark} />
                                </h3>
                                <p className={`mt-4 text-sm leading-relaxed ${muted}`}>{c.body}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== WHO IT'S FOR ===== */}
            <section aria-labelledby="se-who" className="py-20 md:py-32 px-4 md:px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className="max-w-3xl">
                        <Eyebrow dark={dark}>{who.eyebrow}</Eyebrow>
                        <H2 id="se-who" dark={dark} h={who.headline} className="mt-6" />
                    </motion.div>
                    <div className="mt-12 md:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {who.cards.map((c, i) => (
                            <motion.article
                                key={c.title}
                                {...fadeUp}
                                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                                className={`group relative overflow-hidden rounded-[28px] border aspect-[3/4] ${dark ? 'border-white/10' : 'border-black/10'}`}
                            >
                                <img src={c.image} alt={c.alt} loading="lazy" decoding="async" width={1200} height={1604} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 p-6">
                                    <div className="flex flex-wrap gap-1.5">
                                        {c.chips.map((ch) => (
                                            <span key={ch} className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] text-white backdrop-blur">{ch}</span>
                                        ))}
                                    </div>
                                    <h3 className="mt-3 text-2xl font-light text-white">{c.title}</h3>
                                    <p className="mt-1.5 text-sm leading-snug text-white/75">{c.body}</p>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== BUILT IN ZIMBABWE ===== */}
            <section aria-labelledby="se-zim" className="py-20 md:py-32 px-4 md:px-6">
                <motion.div {...fadeUp} className={`${card} relative overflow-hidden max-w-6xl mx-auto p-8 md:p-16 text-center`}>
                    <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[700px] -translate-x-1/2 rounded-full blur-[100px]" style={{ background: 'rgba(155,216,61,0.14)' }} />
                    <H2 id="se-zim" dark={dark} h={zimbabwe.headline} className="relative max-w-4xl mx-auto" />
                    <p className={`relative mt-6 max-w-2xl mx-auto text-base md:text-lg font-light ${muted}`}>{zimbabwe.body}</p>
                    <div className="relative mt-10 flex flex-wrap justify-center gap-2.5">
                        {zimbabwe.chips.map((c) => (
                            <span key={c} className={chip}>
                                <Check className="mr-2 h-3.5 w-3.5" style={{ color: dark ? LIME : '#3b6812' }} strokeWidth={3} />
                                {c}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ===== HOW IT WORKS ===== */}
            <section aria-labelledby="se-how" className="py-20 md:py-32 px-4 md:px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className="max-w-3xl">
                        <Eyebrow dark={dark}>{how.eyebrow}</Eyebrow>
                        <H2 id="se-how" dark={dark} h={how.headline} className="mt-6" />
                        <p className={`mt-6 text-base md:text-lg font-light leading-relaxed ${muted}`}>{how.body}</p>
                    </motion.div>
                    <ol className="mt-12 md:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {how.steps.map((s, i) => (
                            <motion.li key={s.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }} className={`${card} p-8`}>
                                <span className="font-mono text-sm" style={{ color: dark ? LIME : '#3b6812' }}>0{i + 1}</span>
                                <h3 className={`mt-4 text-xl font-light ${text}`}>{s.title}</h3>
                                <p className={`mt-2 text-sm leading-relaxed ${muted}`}>{s.body}</p>
                            </motion.li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* ===== FAQ ===== */}
            <section aria-labelledby="se-faq" className="py-20 md:py-32 px-4 md:px-6">
                <div className="max-w-3xl mx-auto">
                    <motion.div {...fadeUp} className="text-center">
                        <H2 id="se-faq" dark={dark} h={faq.headline} />
                    </motion.div>
                    <div className="mt-12 space-y-3">
                        {faq.items.map((item, i) => {
                            const isOpen = openFaq === i;
                            return (
                                <div key={item.q} className={`${card} !rounded-[22px] overflow-hidden`}>
                                    <h3>
                                        <button
                                            type="button"
                                            aria-expanded={isOpen}
                                            aria-controls={`se-faq-${i}`}
                                            onClick={() => setOpenFaq(isOpen ? null : i)}
                                            className={`flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base md:text-lg font-light ${text}`}
                                        >
                                            {item.q}
                                            <ChevronDown className={`h-5 w-5 flex-none transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                    </h3>
                                    <div id={`se-faq-${i}`} hidden={!isOpen} className={`px-6 pb-6 text-sm md:text-base leading-relaxed ${muted}`}>
                                        {item.a}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== FINAL CTA ===== */}
            <section aria-labelledby="se-final" className="relative py-20 md:py-32 px-4 md:px-6">
                <motion.div {...fadeUp} className={`${card} relative overflow-hidden max-w-6xl mx-auto px-6 py-16 md:p-24 text-center`}>
                    <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" style={{ background: 'radial-gradient(closest-side, rgba(155,216,61,0.22), transparent)' }} />
                    <H2 id="se-final" dark={dark} h={finalCta.headline} className="relative max-w-4xl mx-auto" />
                    <p className={`relative mt-6 max-w-xl mx-auto text-base md:text-lg font-light ${muted}`}>{finalCta.body}</p>
                    <div className="relative mt-10 flex flex-col items-center gap-5">
                        <PrimaryButton size="lg" onClick={() => ask('SyncEstate', 'se-final')}>
                            Get in touch <ArrowRight className="h-4 w-4" />
                        </PrimaryButton>
                        <a href={`${SYNC_ESTATE_URL}/login`} target="_blank" rel="noopener noreferrer" className={`text-sm underline-offset-4 hover:underline ${muted}`}>
                            Already on SyncEstate? Log in
                        </a>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};
