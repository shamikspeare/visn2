import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import bespoke creative components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OngoingClients from './components/OngoingClients';
import SelectedWorks from './components/SelectedWorks';
import SelectedCaseStudies from './components/SelectedCaseStudies';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import ContactFooter from './components/ContactFooter';
import ContactPopup from './components/ContactPopup';
import Pricing from './components/Pricing';
import Work from './components/Work';
import CaseStudies from './components/CaseStudies';
import CaseStudyPage from './components/CaseStudyPage';
import FAQ from './components/FAQ';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

gsap.registerPlugin(ScrollTrigger);

// Clear scroll memory on full page refresh
if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual';
  Object.keys(sessionStorage).forEach(key => {
    if (key.startsWith('scroll:')) {
      sessionStorage.removeItem(key);
    }
  });
}


// Remember and restore scroll position per page.
// On first visit → scroll to top. On return → restore last position.
const ScrollManager = () => {
  const { pathname } = useLocation();
  const prevPathname = useRef(null);

  useEffect(() => {
    // Save scroll position for the page we're leaving
    if (prevPathname.current !== null) {
      sessionStorage.setItem(`scroll:${prevPathname.current}`, window.scrollY);
    }

    // Restore scroll position for the new page, or default to 0
    const saved = sessionStorage.getItem(`scroll:${pathname}`);
    const target = saved !== null ? parseInt(saved, 10) : 0;

    if (window.lenis && typeof window.lenis.scrollTo === 'function') {
      window.lenis.scrollTo(target, { immediate: true });
    } else {
      window.scrollTo(0, target);
    }

    prevPathname.current = pathname;
  }, [pathname]);

  return null;
};

const App = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
      infinite: false,
    });

    window.lenis = lenis;

    // 2. Synchronize ScrollTrigger with Lenis ticker events
    lenis.on('scroll', ScrollTrigger.update);

    const handleRaf = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(handleRaf);
    gsap.ticker.lagSmoothing(0);

    let refreshTimer;

    // 3. Freeze scroll lifecycle until preloader resolves
    if (!isLoaded) {
      lenis.stop();
    } else {
      lenis.start();
      refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 1200);
    }

    return () => {
      lenis.destroy();
      gsap.ticker.remove(handleRaf);
      window.lenis = null;
      if (refreshTimer) clearTimeout(refreshTimer);
    };
  }, [isLoaded]);

  return (
    <Router>
      <Toaster
        position="bottom-left"
        toastOptions={{
          duration: 3500,
          style: {
            transform: 'scale(3)',
            transformOrigin: 'bottom center',
          },
        }}
      />
      <ScrollManager />
      <ContactPopup isOpen={isContactPopupOpen} onClose={() => setIsContactPopupOpen(false)} />
      {/* Main landing layout structure */}
      <div
        className={`relative z-10 transition-opacity duration-1000 ease-out flex flex-col min-h-screen ${isLoaded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        <Navbar />

        <div className="flex-1 w-full">
          <Routes>
            <Route path="/" element={
              <>
                <Hero isLoaded={isLoaded} onBookMeetingClick={() => setIsContactPopupOpen(true)} />
                <OngoingClients />
                <SelectedWorks />
                <SelectedCaseStudies />
                <WhyChooseUs onBookMeetingClick={() => setIsContactPopupOpen(true)} />
                <Testimonials />
                <FAQ />
              </>
            } />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/work" element={<Work />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
          </Routes>
        </div>

        <ContactFooter />
      </div>
    </Router>
  );
};

export default App;