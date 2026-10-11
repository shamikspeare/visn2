import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TiltedGridHero from './TiltedGridHero';

const CLIENT_WORK = [
  { src: '/healthy eats co kolkata/landing page.webp', alt: 'Healthy Eats Co website', objectPosition: '78% 50%' },
  { src: '/Calcutta Bungalow/Dekstop view.webp', alt: 'Calcutta Bungalow website', objectPosition: '65% 50%' },
  { src: '/images/ongoing1.png', alt: 'Ongoing client project', objectPosition: '50% 50%' },
  { src: '/rajbari bawali/rajbari landing page.webp', alt: 'Rajbari Bawali website', objectPosition: '50% 50%' },
  { src: '/images/blockscroll.webp', alt: 'Blockscroll application', objectPosition: '50% 50%' },
  { src: '/images/docnow.webp', alt: 'DocNow healthcare platform', objectPosition: '65% 50%' },
  { src: '/images/snenterprises.webp', alt: 'SN Enterprises website', objectPosition: '62% 50%' },
  { src: '/images/aadi-shakti.webp', alt: 'Aadi Shakti Foundation website', objectPosition: '65% 50%' },
  { src: '/healthy eats co kolkata/selection page.webp', alt: 'Healthy Eats Co product selection', objectPosition: '68% 25%' },
  { src: '/Calcutta Bungalow/Rooms section.webp', alt: 'Calcutta Bungalow rooms experience', objectPosition: '50% 50%' },
];

const MOBILE_STATS = [
  { value: '10', accent: '+', label: ['Projects', 'delivered'] },
  { value: '7', accent: '+', label: ['Businesses', 'trusted'] },
  { value: '10', accent: 'day', label: ['Average', 'delivery'] },
  { value: '100', accent: '%', label: ['Client', 'trust'] },
];

const SERVICES = [
  {
    title: 'Web Development',
    description: 'Scalable digital experiences designed around your business and your users.',
    image: '/images/web-dev.webp',
    mobileImage: '/images/web-dev-2.webp',
    className: 'md:col-span-2',
    imagePosition: 'object-top',
  },
  {
    title: 'App Development',
    description: 'Custom applications built for fast, intuitive, and seamless user experiences.',
    image: '/images/app-dev.webp',
    className: 'md:col-span-1',
    imagePosition: 'object-center',
  },
  {
    title: 'Business Consulting',
    description: 'Clear digital strategy that connects your goals, customers, and growth.',
    image: '/images/bc.webp',
    className: 'md:col-span-1',
    imagePosition: 'object-center',
  },
  {
    title: 'Marketing',
    description: 'Focused campaigns that reach the right audience and convert more customers.',
    image: '/images/marketing.webp',
    mobileImage: '/images/marketing-2.webp',
    className: 'md:col-span-2',
    imagePosition: 'object-[85%_155%]',
  },
];

const ServiceCard = ({ service }) => (
  <article
    className={`group relative h-[390px] overflow-hidden rounded-3xl border border-white/10 bg-[#111111] shadow-2xl ${service.className}`}
  >
    <picture>
      {service.mobileImage ? (
        <source media="(max-width: 767px)" srcSet={service.mobileImage} />
      ) : null}
      <img
        src={service.image}
        alt={service.title}
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${service.imagePosition}`}
      />
    </picture>
    <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black via-black/90 to-transparent p-6 pt-28 md:p-8 md:pt-32">
      <h3 className="font-sans text-xl font-bold uppercase tracking-wide text-white md:text-2xl">
        {service.title}
      </h3>
      <p className="mt-2 max-w-lg font-sans text-sm leading-relaxed text-white/65">
        {service.description}
      </p>
    </div>
  </article>
);

const useDesktopHero = () => {
  const [isDesktop, setIsDesktop] = useState(() => (
    typeof window === 'undefined'
      ? true
      : window.matchMedia('(min-width: 768px)').matches
  ));

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const updateLayout = (event) => setIsDesktop(event.matches);

    setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener('change', updateLayout);

    return () => mediaQuery.removeEventListener('change', updateLayout);
  }, []);

  return isDesktop;
};

const MobileHero = ({ onBookMeetingClick }) => (
  <section
    id="landing-hero"
    aria-labelledby="mobile-hero-title"
    className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#0A0A0A] text-white"
  >
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-[8%] top-0 h-[66svh] w-[96vw] max-w-[580px]"
      style={{
        background: 'radial-gradient(ellipse 88% 74% at 8% 0%, rgba(91, 35, 255, 0.411) 0%, rgba(91, 35, 255, 0.347) 28%, rgba(69, 6, 147, 0.254) 48%, rgba(27, 8, 52, 0.133) 64%, transparent 80%), radial-gradient(ellipse 42% 58% at 0% 42%, rgba(91, 35, 255, 0.11) 0%, rgba(69, 6, 147, 0.07) 42%, transparent 76%)',
      }}
    />

    <div className="absolute inset-x-0 bottom-0 top-[4.25rem] z-[2] flex justify-end overflow-hidden">
      <TiltedGridHero
        images={CLIENT_WORK}
        speed={6.5}
        tileHeight={46}
        aspectRatio={16 / 9}
        gap={25}
        axis={80}
        curve={72}
        fade={30}
        orientation="vertical"
        surface="convex"
        maxTileWidth={105}
        edgeBlur={12}
        className="h-full w-[min(100vw,430px)] shrink-0"
      />
    </div>

    <div className="relative z-10 min-h-[100svh] w-full px-5">
      <div
        className="absolute left-5 right-5 flex flex-col items-start"
        style={{ bottom: 'calc(max(18px, env(safe-area-inset-bottom)) + 40px)' }}
      >
        <h1
          id="mobile-hero-title"
          className="order-3 mt-[40px] select-none text-left font-sans text-[clamp(31px,9.8vw,42px)] font-bold leading-[0.96] tracking-[-0.04em] text-white"
        >
          <span className="block whitespace-nowrap">Digital Experiences</span>
          <span className="block whitespace-nowrap">
            That Grow<span className="text-[#26CCC2]">.</span>
          </span>
        </h1>

        <div className="order-1 flex w-[200px] flex-col gap-5">
          <button
            type="button"
            onClick={onBookMeetingClick}
            className="group relative isolate flex h-11 w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-[#26CCC2]/60 bg-[#26CCC2]/[0.18] px-5 font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl backdrop-saturate-150 transition-colors before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-gradient-to-br before:from-white/20 before:via-white/[0.04] before:to-transparent hover:bg-[#26CCC2]/[0.26] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26CCC2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
          >
            <span className="relative z-10">Book a Meeting</span>
            <ArrowRight aria-hidden="true" className="relative z-10 h-3.5 w-3.5" />
          </button>

          <Link
            to="/work"
            className="group relative isolate flex h-11 w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-white/20 bg-white/[0.06] px-5 font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl backdrop-saturate-150 transition-colors before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-gradient-to-br before:from-white/20 before:via-white/[0.035] before:to-transparent hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
          >
            <span className="relative z-10">Explore Our Work</span>
            <ArrowRight aria-hidden="true" className="relative z-10 h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="order-2 mt-9 flex w-[170px] select-none flex-col gap-[30px]">
          {MOBILE_STATS.map((stat) => (
            <div
              key={stat.label.join('-')}
              role="group"
              aria-label={`${stat.value}${stat.accent === 'day' ? ' day' : stat.accent} ${stat.label.join(' ')}`}
              className="grid w-full min-w-0 grid-cols-[48px_minmax(0,1fr)] items-center gap-x-2.5 text-left"
            >
              <p aria-hidden="true" className="font-sans text-[18px] font-bold leading-none text-white">
                {stat.value}
                <span
                  className={stat.accent === 'day'
                    ? 'ml-1 text-[10px] text-[#26CCC2]'
                    : 'text-[#26CCC2]'}
                >
                  {stat.accent}
                </span>
              </p>
              <p aria-hidden="true" className="font-sans text-[8px] font-semibold uppercase leading-none tracking-[0.06em] text-white">
                {stat.label.join(' ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Hero = ({ onBookMeetingClick }) => {
  const isDesktop = useDesktopHero();

  return (
    <div id="hero" className="w-full bg-[#0A0A0A]">
      {isDesktop ? (
        <TiltedGridHero
          id="landing-hero"
          images={CLIENT_WORK}
          speed={4.5}
          tileHeight={25}
          aspectRatio={16 / 9}
          gap={7}
          axis={58}
          curve={80}
          fade={10}
          className="h-[100svh] min-h-[680px] w-full bg-[#0A0A0A] text-white"
        >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 58% 80% at 50% 0%, rgba(91, 35, 255, 0.189) 0%, rgba(91, 35, 255, 0.185) 18%, rgba(69, 6, 147, 0.185) 38%, rgba(27, 8, 52, 0.167) 55%, #0A0A0A 72%)',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[38%] bg-gradient-to-b from-[#0A0A0A]/80 via-[#0A0A0A]/45 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[30%] bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/85 to-transparent" />

      <div className="relative z-10 flex h-full flex-col items-center justify-between px-6 pb-5 pt-28 text-center sm:px-8 sm:pb-7 md:pt-32">
        <div className="max-w-4xl select-none">
          <h1 className="font-sans text-[clamp(2.25rem,4.6vw,4.4rem)] font-bold leading-[0.94] tracking-[-0.04em] text-white lg:whitespace-nowrap">
            Digital Experiences That Grow<span className="text-[#26CCC2]">.</span>
          </h1>
        </div>

        <div className="grid w-[86%] max-w-xl grid-cols-4 gap-3 select-none sm:gap-7">
          <div className="text-center">
            <p className="font-sans text-lg font-bold text-white/55 sm:text-2xl">
              10<span className="text-[#26CCC2]">+</span>
            </p>
            <p className="mt-2 font-sans text-[7px] font-semibold uppercase tracking-[0.08em] text-white/35 sm:text-[9px] sm:tracking-wider">
              Projects delivered
            </p>
          </div>
          <div className="text-center">
            <p className="font-sans text-lg font-bold text-white/55 sm:text-2xl">
              7<span className="text-[#26CCC2]">+</span>
            </p>
            <p className="mt-2 font-sans text-[7px] font-semibold uppercase tracking-[0.08em] text-white/35 sm:text-[9px] sm:tracking-wider">
              Businesses trusted
            </p>
          </div>
          <div className="text-center">
            <p className="font-sans text-lg font-bold text-white/55 sm:text-2xl">
              10 <span className="text-sm text-[#26CCC2] sm:text-base">day</span>
            </p>
            <p className="mt-2 font-sans text-[7px] font-semibold uppercase tracking-[0.08em] text-white/35 sm:text-[9px] sm:tracking-wider">
              Average delivery
            </p>
          </div>
          <div className="text-center">
            <p className="font-sans text-lg font-bold text-white/55 sm:text-2xl">
              100<span className="text-[#26CCC2]">%</span>
            </p>
            <p className="mt-2 font-sans text-[7px] font-semibold uppercase tracking-[0.08em] text-white/35 sm:text-[9px] sm:tracking-wider">
              Client trust
            </p>
          </div>
        </div>
      </div>
        </TiltedGridHero>
      ) : (
        <MobileHero onBookMeetingClick={onBookMeetingClick} />
      )}

    <section id="what-we-build" className="relative overflow-hidden bg-[#0A0A0A] py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.14) 2px, transparent 2px)',
          backgroundSize: '80px 80px',
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-8">
        <header className="mb-14 text-center md:mb-16">
          <h2 className="font-sans text-3xl font-bold uppercase tracking-[0.14em] text-white md:text-5xl">
            What We Build<span className="text-[#26CCC2]">.</span>
          </h2>
          <p className="mt-3 font-sans text-xs uppercase tracking-wider text-white/35 md:text-sm">
            A deep-dive into our core creative capabilities.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};

export default Hero;
