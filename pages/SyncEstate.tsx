import React, { useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Bell, Check, ChevronDown, LayoutDashboard, LayoutGrid, Play, ToggleRight, Users, X } from 'lucide-react';
import { CTAButton, Eyebrow, SectionHeader } from '../components/site/Primitives';
import { Aurora, ConicHalo, Reveal } from '../components/site/Backgrounds';
import { DeviceShowcase, type ShowcaseItem } from '../components/site/DeviceShowcase';
import { useContact } from '../components/contact/ContactProvider';
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
 * SyncEstate — the flagship product page (it replaces the SynCRM page:
 * SynCRM is now one of SyncEstate's seven modules). Copy comes from the
 * SyncEstate product site via components/sync-estate/content.ts; the VSL
 * lives in public/vsl/. Every call to action opens the Get in touch dialog.
 */

/** Real screens from a live SynCRM instance (contact details redacted). */
const productShots: ShowcaseItem[] = [
  { title: 'SynCRM · pipeline dashboard', desc: 'Total, open, won and lost leads with live win rate and lead scoring', image: '/syncrm-dashboard.webp', tag: 'Live product', badge: 'Live product' },
  { title: 'SynCRM · agent performance', desc: 'Assigned, contacted, viewings, offers and conversion by agent', image: '/syncrm-reports.webp', tag: 'Live product', badge: 'Live product' },
  { title: 'SynCRM Copilot', desc: 'Ask questions about your pipeline and act on leads in plain language', image: '/syncrm-copilot.webp', tag: 'Live product', badge: 'Live product' },
];

/** The site's headline accent: the second part in light italic grey. */
const Accent: React.FC<{ h: Headline }> = ({ h }) => (
  <>
    {h[0]}
    <span className="italic font-extralight text-gray-400 dark:text-dark-text-secondary">{h[1]}</span>
    {h[2] ?? null}
  </>
);

/** The VSL. Loads only its poster until the visitor presses play. */
const VslPlayer: React.FC = () => {
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
    <div className="relative overflow-hidden rounded-[24px] md:rounded-[32px] border border-black/10 dark:border-white/10 bg-black shadow-2xl">
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
            style={{ background: '#9bd83d', boxShadow: '0 0 60px rgba(155,216,61,0.45)' }}
          >
            <Play className="h-8 w-8 translate-x-0.5" fill="currentColor" strokeWidth={0} />
          </span>
        </button>
      )}
    </div>
  );
};

const card = 'glass-card rounded-[32px] border border-black/5 dark:border-white/5';
const h3 = 'text-gray-900 dark:text-dark-text-primary';
const body = 'text-gray-600 dark:text-dark-text-secondary';

export const SyncEstate: React.FC = () => {
  const { isDarkMode } = useOutletContext<{ isDarkMode: boolean }>();
  const dark = isDarkMode ?? true;
  const { openContact } = useContact();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className={`relative z-20 ${dark ? 'bg-[#050505]' : 'bg-[#f5f5f7]'}`}>
      {/* ===== HERO: narrative left, the VSL right ===== */}
      <section className="relative pt-36 md:pt-48 pb-20 md:pb-28 px-4 md:px-6 overflow-hidden">
        <Aurora accent="green" />
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-14 items-center">
          <div>
            <Reveal>
              <img
                src={dark ? '/sync-estate/lockup-reversed.svg' : '/sync-estate/lockup.svg'}
                alt="SyncEstate"
                width={190}
                height={44}
                className="h-9 md:h-10 w-auto mb-8"
              />
            </Reveal>
            <Reveal delay={0.03}><Eyebrow>Real estate operating system · by LayerSync</Eyebrow></Reveal>
            <Reveal delay={0.05}>
              <h1 className="hero-heading mb-8 text-shimmer">
                {hero.lines[0]}{' '}
                <span className="italic font-extralight text-gray-400 dark:text-dark-text-secondary">{hero.lines[1]}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="sub-heading max-w-xl mb-10">{hero.sub}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <CTAButton interest="SyncEstate" cta="se-hero" />
                <a
                  href="#modules"
                  className="group px-8 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] md:text-xs inline-flex items-center justify-center gap-3 border border-black/10 dark:border-white/15 text-gray-700 dark:text-dark-text-secondary hover:border-black/30 dark:hover:border-white/40 transition-all duration-300"
                >
                  See every module <ArrowDown className="w-4 h-4" />
                </a>
              </div>
              <p className="mt-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 dark:text-dark-text-tertiary">{hero.micro}</p>
            </Reveal>
          </div>
          <Reveal delay={0.2} y={32} className="relative" >
            <div id="tour" className="scroll-mt-28" />
            <ConicHalo accent="green" className="-inset-8" />
            <div className="relative">
              <VslPlayer />
              <p className="mt-4 text-center text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 dark:text-dark-text-tertiary">
                {tour.eyebrow} · two minutes
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== THE PROBLEM ===== */}
      <section className="py-20 md:py-28 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <SectionHeader eyebrow={problem.eyebrow} title={<Accent h={problem.headline} />} sub={problem.body} />
          <div className="flex flex-col gap-3">
            {problem.captions.map((c, i) => (
              <Reveal key={c} delay={i * 0.06}>
                <div className={`${card} !rounded-[22px] flex items-center gap-4 px-5 py-4`} style={{ marginLeft: `${[0, 28, 8, 40, 16][i]}px` }}>
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-brand-orange/15 text-brand-orange">
                    <X className="h-4 w-4" />
                  </span>
                  <span className={`font-mono text-sm ${h3}`}>{c}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="max-w-4xl mx-auto text-center mt-24 md:mt-32">
          <p className="text-3xl sm:text-5xl font-light tracking-[-0.03em] leading-tight text-gray-900 dark:text-dark-text-primary">
            <Accent h={problem.turn} />
          </p>
          <p className={`mt-6 max-w-2xl mx-auto sub-heading`}>{problem.turnBody}</p>
        </Reveal>
      </section>

      {/* ===== THE HUB ===== */}
      <section className="py-20 md:py-28 px-4 md:px-6 relative overflow-hidden">
        <div className="ambient-glow absolute bottom-[5%] right-[5%] w-[40vw] h-[40vw] blur-[150px] bg-brand-green/10 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeader eyebrow={<><LayoutGrid className="w-3 h-3" /> {hub.eyebrow}</>} title={<Accent h={hub.headline} />} />
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-16">
            {hub.tiles.map((t, i) => {
              const Icon = [LayoutGrid, ToggleRight, Users, Bell][i];
              return (
                <Reveal key={t.title} delay={i * 0.08}>
                  <div className={`${card} card-hover-glow p-8 md:p-10 h-full`}>
                    <div className="w-14 h-14 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className={`text-xl md:text-2xl font-light mb-3 ${h3}`}>{t.title}</h3>
                    <p className={`text-sm leading-relaxed ${body}`}>{t.body}</p>
                    {i === 2 && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {['Director', 'Sales manager', 'Property manager', 'Accounts', 'Marketing', 'Valuer'].map((r) => (
                          <span key={r} className="rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/5 px-3 py-1.5 text-xs text-gray-700 dark:text-dark-text-secondary">{r}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== MODULES ===== */}
      <section id="modules" className="py-20 md:py-28 px-4 md:px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeader align="center" eyebrow={modules.eyebrow} title={<Accent h={modules.headline} />} sub={modules.sub} />
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-16">
            {modules.items.map((m, i) => (
              <Reveal key={m.name} delay={(i % 2) * 0.08} className={i === 0 ? 'md:col-span-2' : ''}>
                <article className={`${card} card-hover-glow p-8 md:p-10 h-full flex flex-col`}>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-brand-green px-3 py-1 text-[11px] font-bold tracking-wide text-[#0b1408]">{m.name}</span>
                    <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-400 dark:text-dark-text-tertiary">{m.eyebrow}</span>
                  </div>
                  <h3 className={`mt-6 text-2xl md:text-3xl font-light leading-tight ${h3}`}>
                    <Accent h={m.headline} />
                  </h3>
                  <p className={`mt-4 text-sm md:text-base leading-relaxed ${body}`}>{m.body}</p>
                  <ul className={`mt-6 grid gap-3 ${i === 0 ? 'md:grid-cols-3' : ''}`}>
                    {m.proof.map((p) => (
                      <li key={p} className={`flex gap-3 text-sm leading-snug ${h3}`}>
                        <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-brand-green text-[#0b1408]">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => openContact({ interest: m.name === 'Viewings' ? 'SynCRM viewing forms' : m.name, cta: `se-module-${m.name.toLowerCase()}` })}
                    className="group mt-8 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-brand-orange"
                  >
                    Ask about {m.name}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REAL SCREENS ===== */}
      <section className="py-20 md:py-28 px-4 md:px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeader
            align="center"
            eyebrow={<><LayoutDashboard className="w-3 h-3" /> Inside the product</>}
            title={<>This is SyncEstate, <span className="italic font-extralight text-gray-400 dark:text-dark-text-secondary">actually running.</span></>}
            sub="Not mockups: screens from a live SynCRM instance, one of SyncEstate's seven modules. Contact details are blurred for privacy."
            className="mb-14"
          />
          <Reveal y={32}>
            <DeviceShowcase items={productShots} isDarkMode={dark} />
          </Reveal>
        </div>
      </section>

      {/* ===== BEYOND THE MODULES ===== */}
      <section className="py-20 md:py-28 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow={beyond.eyebrow} title={<Accent h={beyond.headline} />} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-16">
            {beyond.cards.map((c, i) => (
              <Reveal key={i} delay={(i % 3) * 0.08}>
                <div className={`${card} p-8 h-full`}>
                  <h3 className={`text-xl font-light leading-snug ${h3}`}><Accent h={c.title} /></h3>
                  <p className={`mt-4 text-sm leading-relaxed ${body}`}>{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHO IT'S FOR ===== */}
      <section className="py-20 md:py-28 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow={who.eyebrow} title={<Accent h={who.headline} />} />
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {who.cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <article className="group relative overflow-hidden rounded-[28px] border border-black/10 dark:border-white/10 aspect-[3/4]">
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
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BUILT IN ZIMBABWE ===== */}
      <section className="py-20 md:py-28 px-4 md:px-6">
        <Reveal>
          <div className={`${card} !rounded-[40px] relative overflow-hidden max-w-6xl mx-auto p-8 md:p-16 text-center`}>
            <div className="ambient-glow absolute inset-0 bg-gradient-to-br from-brand-green/10 to-brand-orange/5 pointer-events-none" />
            <h2 className="relative hero-heading mb-6"><Accent h={zimbabwe.headline} /></h2>
            <p className="relative sub-heading max-w-2xl mx-auto">{zimbabwe.body}</p>
            <div className="relative mt-10 flex flex-wrap justify-center gap-2.5">
              {zimbabwe.chips.map((c) => (
                <span key={c} className="inline-flex items-center rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-2 text-xs text-gray-700 dark:text-dark-text-secondary">
                  <Check className="mr-2 h-3.5 w-3.5 text-brand-green" strokeWidth={3} />
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 md:py-28 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow={how.eyebrow} title={<Accent h={how.headline} />} sub={how.body} />
          <ol className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {how.steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <li className={`${card} p-8 h-full list-none`}>
                  <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-orange">Step {i + 1}</div>
                  <h3 className={`mt-4 text-xl font-light ${h3}`}>{s.title}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${body}`}>{s.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-20 md:py-28 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeader align="center" title={<Accent h={faq.headline} />} />
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
                      className={`flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base md:text-lg font-light ${h3}`}
                    >
                      {item.q}
                      <ChevronDown className={`h-5 w-5 flex-none transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </h3>
                  <div id={`se-faq-${i}`} hidden={!isOpen} className={`px-6 pb-6 text-sm md:text-base leading-relaxed ${body}`}>
                    {item.a}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 md:py-40 px-4 md:px-6 max-w-7xl mx-auto">
        <Reveal>
          <div className="p-10 md:p-24 rounded-[40px] md:rounded-[64px] border border-black/5 dark:border-white/5 glass-card text-center relative overflow-hidden">
            <div className="ambient-glow absolute inset-0 bg-gradient-to-br from-brand-orange/10 to-brand-green/10 pointer-events-none" />
            <div className="relative z-10">
              <h3 className="hero-heading mb-8 text-shimmer"><Accent h={finalCta.headline} /></h3>
              <p className="sub-heading mb-12 max-w-2xl mx-auto">{finalCta.body}</p>
              <CTAButton interest="SyncEstate" cta="se-final" />
              <p className="mt-8 text-[10px] uppercase tracking-widest text-gray-400 dark:text-dark-text-tertiary font-bold">
                Already on SyncEstate?{' '}
                <a href={`${SYNC_ESTATE_URL}/login`} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-orange">Log in</a>
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};
