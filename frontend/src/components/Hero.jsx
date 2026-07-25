import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Magnetic from './Magnetic';
import AnimatedGradientBackground from './AnimatedGradientBackground';

// slideFrom: 'left' | 'right'
const bentoItems = [
  {
    id: 1,
    title: "Web Development",
    description: "Scalable apps designed around your business and your users.",
    image: "/images/web-dev.png",
    className: "md:col-span-2 h-[350px]",
    imagePosition: "object-top",
    slideFrom: "left",
  },
  {
    id: 2,
    title: "App Development",
    description: "Custom applications built for seamless user experiences.",
    image: "/images/app-dev.png",
    className: "md:col-span-1 h-[350px]",
    imagePosition: "object-center",
    slideFrom: "right",
  },
  {
    id: 3,
    title: "Branding",
    description: "Create a brand people recognize, remember, and trust.",
    image: "/images/branding.png",
    className: "md:col-span-1 h-[350px]",
    imagePosition: "object-center",
    slideFrom: "left",
  },
  {
    id: 4,
    title: "Marketing",
    description: "Reach the right audience and convert more customers",
    image: "/images/marketing.png",
    className: "md:col-span-2 h-[350px]",
    imagePosition: "object-[85%_155%]",
    imageScale: "scale-[1.03] group-hover:scale-[1.08]",
    slideFrom: "right",
  }
];

const BentoCard = ({ item, cardRef }) => {
  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden bg-[#111111] transition-all duration-500 rounded-3xl shadow-2xl select-none cursor-pointer ${item.className}`}
    >
      {/* Background Image */}
      <img
        src={item.image}
        alt={item.title}
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 z-0 ${item.imageScale || 'group-hover:scale-105'} ${item.imagePosition || ''}`}
      />

      {/* Text Overlay at the Bottom */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 pt-24 md:pt-32 bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col justify-end z-10 transition-all duration-500 rounded-b-3xl">
        <h4 className="text-xl md:text-2xl font-sans font-bold text-white uppercase tracking-wide mb-2">
          {item.title}
        </h4>
        <p className="text-xs md:text-sm text-gray-200 font-sans leading-relaxed max-w-lg">
          {item.description}
        </p>
      </div>
    </div>
  );
};

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ isLoaded, onBookMeetingClick }) => {
  const scrollWrapperRef = useRef(null);
  const pinContainerRef = useRef(null);
  const overlayRef = useRef(null);
  const wwbLayerRef = useRef(null);

  // Hero content refs for entrance animation
  const headlineRef = useRef(null);
  const subheadRef = useRef(null);
  const bodyRef = useRef(null);
  const ctaRef = useRef(null);

  // Stats refs
  const statsContainerRef = useRef(null);
  const count1Ref = useRef(null);
  const count2Ref = useRef(null);
  const count3Ref = useRef(null);
  const count4Ref = useRef(null);

  // WWB section refs
  const wwbHeadingRef = useRef(null);
  const bentoCard1Ref = useRef(null);
  const bentoCard2Ref = useRef(null);
  const bentoCard3Ref = useRef(null);
  const bentoCard4Ref = useRef(null);

  // 1. Entrance animation (runs once on load)
  useEffect(() => {
    if (!isLoaded) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    gsap.set(headlineRef.current, { opacity: 0, y: 48 });
    gsap.set(subheadRef.current, { opacity: 0, y: 32 });
    gsap.set(bodyRef.current, { opacity: 0, y: 24 });
    gsap.set(ctaRef.current, { opacity: 0, y: 20 });

    tl
      .to(headlineRef.current, { opacity: 1, y: 0, duration: 1.1 }, 0.1)
      .to(subheadRef.current, { opacity: 1, y: 0, duration: 0.95 }, '-=0.7')
      .to(bodyRef.current, { opacity: 1, y: 0, duration: 0.85 }, '-=0.65')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.75 }, '-=0.55');

  }, [isLoaded]);

  // 2. Scroll timeline: black circle expands → WWB content animates in
  useEffect(() => {
    if (!isLoaded) return;

    const wrapper = scrollWrapperRef.current;
    const pinContainer = pinContainerRef.current;
    const overlay = overlayRef.current;
    const wwbLayer = wwbLayerRef.current;

    if (!wrapper || !pinContainer || !overlay || !wwbLayer) return;

    // Pre-set WWB layer and all its children to hidden start states
    gsap.set(wwbLayer, { autoAlpha: 0 });
    gsap.set(wwbHeadingRef.current, { opacity: 0, y: 40 });
    gsap.set(bentoCard1Ref.current, { opacity: 0, x: -60 });
    gsap.set(bentoCard2Ref.current, { opacity: 0, x: 60 });
    gsap.set(bentoCard3Ref.current, { opacity: 0, x: -60 });
    gsap.set(bentoCard4Ref.current, { opacity: 0, x: 60 });

    // WWB content entrance — fires after the layer fades in
    const fireWWBEntrance = () => {
      const entryTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Heading pops up first
      entryTl.to(wwbHeadingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.75,
      });

      // Top row cards slide in together, slight stagger
      entryTl.to(
        [bentoCard1Ref.current, bentoCard2Ref.current],
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.08,
        },
        '-=0.35'
      );

      // Bottom row cards slide in together, slight stagger
      entryTl.to(
        [bentoCard3Ref.current, bentoCard4Ref.current],
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.08,
        },
        '-=0.45'
      );
    };

    let entranceFired = false;

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: '1px top',
        end: '+=80%', // Reduced scroll distance for faster transition
        scrub: 1, // Smooth scrubbing
        pin: pinContainer,
        pinSpacing: true,
        onUpdate: (self) => {
          // Fire the entrance animation as soon as the screen starts turning black
          // without waiting for the user to finish scrolling
          if (self.progress > 0.5 && !entranceFired) {
            entranceFired = true;
            fireWWBEntrance();
          }
        }
      }
    });

    // Phase 1: Expand black circle to completely cover screen
    scrollTl.fromTo(overlay,
      { scale: 0 },
      { scale: 2.5, ease: 'power2.inOut', duration: 1 }
    );

    // Phase 2: Fade in WhatWeBuild layer
    scrollTl.to(wwbLayer, {
      autoAlpha: 1,
      duration: 0.5,
    }, "-=0.3"); // Overlap the fade in with the circle expansion


    return () => {
      if (scrollTl.scrollTrigger) scrollTl.scrollTrigger.kill();
      scrollTl.kill();
    };
  }, [isLoaded]);

  // 3. Stats counter animation
  useEffect(() => {
    if (!isLoaded || !statsContainerRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        gsap.to(count1Ref.current, { innerHTML: 10, duration: 0.8, snap: { innerHTML: 1 }, ease: 'power2.out' });
        gsap.to(count2Ref.current, { innerHTML: 7, duration: 0.8, snap: { innerHTML: 1 }, ease: 'power2.out' });
        gsap.to(count3Ref.current, { innerHTML: 10, duration: 0.8, snap: { innerHTML: 1 }, ease: 'power2.out' });
        gsap.to(count4Ref.current, { innerHTML: 100, duration: 0.8, snap: { innerHTML: 1 }, ease: 'power2.out' });
        observer.disconnect();
      }
    }, { threshold: 0.3 });

    observer.observe(statsContainerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isLoaded]);

  const handleScrollClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target && window.lenis) {
      window.lenis.scrollTo(target, { offset: -60, duration: 1.8 });
    }
  };

  const bentoRefs = [bentoCard1Ref, bentoCard2Ref, bentoCard3Ref, bentoCard4Ref];

  return (
    <div
      ref={scrollWrapperRef}
      id="hero"
      className="relative w-full bg-[#0A0A0A]"
    >
      {/* Viewport Pinned Box */}
      <div
        ref={pinContainerRef}
        className="w-full relative"
      >
        {/* Static Hero slide content */}
        <div
          className="relative w-full h-screen z-10 flex flex-col justify-center overflow-hidden"
          style={{ background: '#0A0A0A' }}
        >
          {/* Animated gradient background */}
          <AnimatedGradientBackground
            Breathing={true}
            animationSpeed={0.01}
            breathingRange={5}
            gradientColors={[
              '#0A0A0A',
              '#450693',
              '#5B23FF',
              '#0A0A0A',
            ]}
            gradientStops={[30, 55, 75, 100]}
            gradientOrigin="50% 20%"
          />

          {/* Hero center content */}
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 select-none relative" style={{ zIndex: 1 }}>

            <h1
              ref={headlineRef}
              className="font-sans font-bold leading-[1.05] tracking-[0.25em] mb-5 flex items-baseline justify-center"
              style={{
                fontSize: 'clamp(3.5rem, 8vw, 8rem)',
                color: '#ffffff',
              }}
            >
              VISN
              <span className="text-[#26CCC2] ml-2" style={{ fontSize: 'clamp(3.5rem, 8vw, 8rem)' }}>.</span>
            </h1>

            {/* ── Sub-heading ── */}
            <p
              ref={subheadRef}
              className="font-serif mb-7"
              style={{
                fontSize: 'clamp(1.5rem, 3.5vw, 3rem)',
                color: '#ffffff',
                letterSpacing: '0.01em',
              }}
            >
              Digital Experiences That Grow<span className="text-[#26CCC2]">.</span>
            </p>

            {/* ── Body copy ── */}
            <p
              ref={bodyRef}
              className="max-w-lg leading-relaxed mb-12 font-sans"
              style={{
                fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)',
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.6,
              }}
            >
              We build fast, beautiful, and effective<br />digital solutions for ambitious brands.
            </p>

            {/* ── CTA Buttons ── */}
            <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-5">

              {/* Primary — teal base, dark sweep on hover */}
              <Magnetic strength={0.2} range={50}>
                <motion.button
                  type="button"
                  onClick={onBookMeetingClick}
                  whileHover="hover"
                  whileTap="tap"
                  variants={{
                    initial: { scale: 1 },
                    tap: { scale: 0.95 },
                  }}
                  data-cursor="magnetic"
                  className="group relative overflow-hidden z-10 w-[18em] h-[4.5em] rounded-[30em] font-sans text-[14px] font-bold uppercase tracking-[0.15em] border-none outline-none text-black bg-[#26CCC2] cursor-none flex items-center justify-center gap-3 transition-colors duration-500 before:content-[''] before:absolute before:-top-1 before:-left-1 before:w-0 before:h-[calc(100%+8px)] before:bg-[#151515] before:transition-all before:duration-500 before:ease-in-out before:-z-10 hover:before:w-[calc(100%+8px)] hover:text-white"
                >
                  <span>Book a Meeting</span>
                  <motion.div
                    variants={{
                      initial: { x: 0 },
                      hover: { x: 8 },
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              </Magnetic>

              {/* Secondary — dark base, teal sweep on hover */}
              <Magnetic strength={0.2} range={50}>
                <Link to="/work" onClick={() => window.scrollTo(0, 0)}>
                  <motion.div
                    whileHover="hover"
                    whileTap="tap"
                    variants={{
                      initial: { scale: 1 },
                      tap: { scale: 0.95 },
                    }}
                    data-cursor="magnetic"
                    className="group relative overflow-hidden z-10 w-[18em] h-[4.5em] rounded-[30em] font-sans text-[14px] font-bold uppercase tracking-[0.15em] border-none outline-none text-white bg-[#151515] cursor-none flex items-center justify-center gap-3 transition-colors duration-500 before:content-[''] before:absolute before:-top-1 before:-left-1 before:w-0 before:h-[calc(100%+8px)] before:bg-[#26CCC2] before:transition-all before:duration-500 before:ease-in-out before:-z-10 hover:before:w-[calc(100%+8px)] hover:text-black"
                  >
                    <span>Explore Our Work</span>
                    <motion.div
                      variants={{
                        initial: { x: 0 },
                        hover: { x: 8 },
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </motion.div>
                </Link>
              </Magnetic>

            </div>
          </div>
        </div>

        {/* Black expanding circle overlay — originates from top-center */}
        <div
          ref={overlayRef}
          className="absolute rounded-full pointer-events-none z-20"
          style={{
            width: '280vmax',
            height: '280vmax',
            left: '50%',
            top: '0%',
            transform: 'translate(-50%, -50%) scale(0)',
            transformOrigin: 'center center',
            background: 'radial-gradient(circle, #0A0A0A 0%, #0A0A0A 55%, rgba(10,10,10,0.6) 75%, transparent 100%)',
            filter: 'blur(60px)',
            willChange: 'transform',
          }}
        />

        {/* WhatWeBuild Fade-in Layer */}
        <div
          ref={wwbLayerRef}
          className="relative w-full z-30 block bg-[#0A0A0A]"
          style={{ marginTop: '-100vh', visibility: 'hidden', opacity: 0 }}
        >
          <section className="bg-[#0A0A0A] w-full pt-[calc(50vh-8.9rem)] md:pt-[calc(50vh-12.4rem)] pb-28 relative z-20" id="what-we-build">
            {/* Static dots background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-50 z-30"
              style={{
                backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 3px, transparent 3px)',
                backgroundSize: '80px 80px',
              }}
            />
            <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-40">

              {/* Section Heading — animated ref */}
              <div ref={wwbHeadingRef} className="w-full flex flex-col items-center justify-center mb-16 select-none">
                <h2
                  className="font-sans font-bold text-center text-white leading-tight uppercase tracking-[0.15em]"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
                >
                  what we build<span className="text-[#26CCC2]">.</span>
                </h2>
                <p className="text-xs md:text-sm text-gray-500 font-sans mt-3 text-center tracking-wider uppercase">
                  A deep-dive into our core creative capabilities.
                </p>
              </div>

              {/* Bento Grid layout — each card gets its own ref */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {bentoItems.map((item, index) => (
                  <BentoCard key={item.id} item={item} cardRef={bentoRefs[index]} />
                ))}
              </div>

              {/* Stats Section */}
              <div ref={statsContainerRef} className="w-full flex justify-center z-40 mt-16 md:mt-24 px-2 md:px-0">
                <div className="flex flex-row justify-between items-center w-full max-w-5xl gap-2 md:gap-8 text-white">
                  {/* Stat 1 */}
                  <div className="flex flex-col items-center text-center">
                    <div className="text-gray-500 mb-1 md:mb-2">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 md:w-8 md:h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div className="font-sans font-bold text-xl md:text-5xl mb-0.5 md:mb-1 flex items-baseline">
                      <span ref={count1Ref}>0</span><span className="text-[#26CCC2] text-lg md:text-3xl ml-0.5 md:ml-1">+</span>
                    </div>
                    <div className="font-sans text-[9px] md:text-sm text-gray-400 uppercase tracking-wider md:tracking-widest font-semibold leading-tight">
                      Projects<br className="md:hidden"/> Delivered
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div className="flex flex-col items-center text-center">
                    <div className="text-gray-500 mb-1 md:mb-2">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 md:w-8 md:h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="font-sans font-bold text-xl md:text-5xl mb-0.5 md:mb-1 flex items-baseline">
                      <span ref={count2Ref}>0</span><span className="text-[#26CCC2] text-lg md:text-3xl ml-0.5 md:ml-1">+</span>
                    </div>
                    <div className="font-sans text-[9px] md:text-sm text-gray-400 uppercase tracking-wider md:tracking-widest font-semibold leading-tight">
                      Businesses<br className="md:hidden"/> Trusted
                    </div>
                  </div>

                  {/* Stat 3 */}
                  <div className="flex flex-col items-center text-center">
                    <div className="text-gray-500 mb-1 md:mb-2">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 md:w-8 md:h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v8l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="font-sans font-bold text-xl md:text-5xl mb-0.5 md:mb-1 flex items-baseline">
                      <span ref={count3Ref}>0</span><span className="text-[#26CCC2] text-sm md:text-2xl ml-1 uppercase tracking-wide">Day</span>
                    </div>
                    <div className="font-sans text-[9px] md:text-sm text-gray-400 uppercase tracking-wider md:tracking-widest font-semibold leading-tight">
                      Avg.<br className="md:hidden"/> Delivery
                    </div>
                  </div>

                  {/* Stat 4 */}
                  <div className="flex flex-col items-center text-center">
                    <div className="text-gray-500 mb-1 md:mb-2">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 md:w-8 md:h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="font-sans font-bold text-xl md:text-5xl mb-0.5 md:mb-1 flex items-baseline">
                      <span ref={count4Ref}>0</span><span className="text-[#26CCC2] text-lg md:text-3xl ml-0.5 md:ml-1">%</span>
                    </div>
                    <div className="font-sans text-[9px] md:text-sm text-gray-400 uppercase tracking-wider md:tracking-widest font-semibold leading-tight">
                      Client<br className="md:hidden"/> Trust
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>

      </div>
    </div>
  );
};

export default Hero;