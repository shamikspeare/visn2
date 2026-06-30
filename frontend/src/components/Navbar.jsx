import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Magnetic from './Magnetic';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Works', href: '/work' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Pricing', href: '/pricing' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const hamburgerRef = useRef(null);
  const [origin, setOrigin] = useState({ x: '100%', y: '0%' });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const toggleMenu = useCallback(() => {
    // Capture hamburger button position for radial origin
    if (hamburgerRef.current) {
      const rect = hamburgerRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      setOrigin({ x: `${x}px`, y: `${y}px` });
    }
    setMenuOpen((prev) => !prev);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-black'
        }`}
      >
        <div className="w-full px-6 sm:px-8 md:px-16 flex items-center justify-between h-16 relative">
          {/* Hamburger — mobile only, positioned left */}
          <button
            ref={hamburgerRef}
            onClick={toggleMenu}
            className="md:hidden relative z-[60] w-10 h-10 flex flex-col items-center justify-center gap-[5px] focus:outline-none"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7, backgroundColor: '#000' } : { rotate: 0, y: 0, backgroundColor: '#fff' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block w-6 h-[2px] rounded-full origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-[2px] rounded-full bg-white origin-center"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7, backgroundColor: '#000' } : { rotate: 0, y: 0, backgroundColor: '#fff' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block w-6 h-[2px] rounded-full origin-center"
            />
          </button>

          {/* Logo — centered on mobile, left on desktop */}
          <div className="absolute left-1/2 -translate-x-1/2 md:relative md:left-auto md:translate-x-0">
            <Magnetic strength={0.3} range={50}>
              <Link
                to="/"
                className="flex items-center text-2xl font-serif font-bold tracking-wider group select-none text-white"
                data-cursor="magnetic"
              >
                VISN
                <span className="text-[#26CCC2] group-hover:animate-pulse inline-block ml-0.5 select-none font-bold">.</span>
              </Link>
            </Magnetic>
          </div>

          {/* Nav Links — desktop only */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isCurrentPage =
                (item.href === '/' && location.pathname === '/' && !location.hash) ||
                (item.href === location.pathname) ||
                (item.href.includes('#') && location.hash === item.href.replace('/', ''));

              return (
                <Magnetic key={item.name} strength={0.15} range={25}>
                  <Link
                    to={item.href}
                    onClick={(e) => {
                      // Smooth scroll for hash links if already on the same page
                      if (item.href.includes('#') && location.pathname === '/') {
                        e.preventDefault();
                        const hash = item.href.replace('/', '');
                        if (window.lenis) {
                          window.lenis.scrollTo(hash, { duration: 1.5 });
                        } else {
                          document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
                        }
                        window.history.pushState(null, '', hash);
                      }
                    }}
                    className={`relative text-xs font-sans font-bold uppercase tracking-[0.2em] transition-colors duration-300 cursor-none pb-1 ${
                      isCurrentPage
                        ? 'text-[#26CCC2]'
                        : 'text-white/60 hover:text-white'
                    }`}
                    data-cursor="magnetic"
                  >
                    {item.name}
                    {/* Active underline indicator */}
                    <span
                      className={`absolute left-0 bottom-0 h-[2px] bg-[#26CCC2] rounded-full transition-all duration-300 ease-out ${
                        isCurrentPage ? 'w-full' : 'w-0'
                      }`}
                    />
                  </Link>
                </Magnetic>
              );
            })}
          </div>

          {/* Spacer for mobile to balance the hamburger on the left */}
          <div className="w-10 md:hidden" />
        </div>

        {/* Scroll Progress Indicator */}
        <motion.div
          className="h-1 bg-[#26CCC2] w-full origin-left"
          style={{ scaleX }}
        />
      </nav>

      {/* ── MOBILE FULLSCREEN MENU OVERLAY ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[55] flex flex-col justify-center md:hidden px-8 sm:px-12"
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Radial accent background with reduced opacity and blur */}
            <motion.div
              className="absolute inset-0 bg-[#26CCC2]/95 backdrop-blur-md"
              style={{
                transformOrigin: `${origin.x} ${origin.y}`,
              }}
              variants={{
                closed: {
                  clipPath: `circle(0px at ${origin.x} ${origin.y})`,
                  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.15 },
                },
                open: {
                  clipPath: `circle(150vmax at ${origin.x} ${origin.y})`,
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            />

            {/* Close Button mirroring the navbar hamburger */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              className="absolute top-3 left-6 sm:left-8 w-10 h-10 flex flex-col items-center justify-center gap-[5px] focus:outline-none z-20 bg-black rounded-full shadow-md"
              aria-label="Close menu"
            >
              <motion.span
                initial={{ rotate: 0, y: 0, backgroundColor: '#fff' }}
                animate={{ rotate: 45, y: 7, backgroundColor: '#fff' }}
                exit={{ rotate: 0, y: 0, backgroundColor: '#fff' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block w-5 h-[2px] rounded-full origin-center"
              />
              <motion.span
                initial={{ opacity: 1, scaleX: 1 }}
                animate={{ opacity: 0, scaleX: 0 }}
                exit={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-[2px] rounded-full bg-white origin-center"
              />
              <motion.span
                initial={{ rotate: 0, y: 0, backgroundColor: '#fff' }}
                animate={{ rotate: -45, y: -7, backgroundColor: '#fff' }}
                exit={{ rotate: 0, y: 0, backgroundColor: '#fff' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block w-5 h-[2px] rounded-full origin-center"
              />
            </motion.button>

            {/* Menu items */}
            <nav className="relative z-10 flex flex-col items-start gap-16 sm:gap-20 mt-20">
              {navItems.map((item, i) => {
                const isCurrentPage =
                  (item.href === '/' && location.pathname === '/' && !location.hash) ||
                  (item.href === location.pathname) ||
                  (item.href.includes('#') && location.hash === item.href.replace('/', ''));

                return (
                  <motion.div
                    key={item.name}
                    className="w-full"
                    variants={{
                      closed: {
                        opacity: 0,
                        x: -40,
                        scale: 0.95,
                        transition: {
                          duration: 0.25,
                          delay: (navItems.length - 1 - i) * 0.04,
                        },
                      },
                      open: {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        transition: {
                          duration: 0.45,
                          delay: 0.3 + i * 0.08,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      },
                    }}
                  >
                    <Link
                      to={item.href}
                      onClick={(e) => {
                        if (item.href.includes('#') && location.pathname === '/') {
                          e.preventDefault();
                          const hash = item.href.replace('/', '');
                          if (window.lenis) {
                            window.lenis.scrollTo(hash, { duration: 1.5 });
                          } else {
                            document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
                          }
                          window.history.pushState(null, '', hash);
                        }
                        setMenuOpen(false);
                      }}
                      className={`relative inline-block font-sans text-5xl sm:text-6xl font-black uppercase tracking-[0.02em] transition-opacity duration-200 ${
                        isCurrentPage
                          ? 'text-black'
                          : 'text-black/60 active:text-black'
                      }`}
                    >
                      {item.name}
                      {/* Active underline indicator */}
                      {isCurrentPage && (
                        <span className="absolute left-0 -bottom-2 w-full h-[4px] sm:h-[5px] bg-black rounded-r-full rounded-l-full" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
