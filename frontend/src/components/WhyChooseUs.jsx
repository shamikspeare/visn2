import React from 'react';
import { Check, X, MessageSquare, FileText, Rocket, Laptop, Pencil, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const WhyChooseUs = ({ onBookMeetingClick }) => {
  const comparisonData = [
    {
      feature: "24/7 Feedback",
      icon: <MessageSquare className="w-5 h-5 text-gray-800" />,
      visn: "We're always here. Anytime, anywhere.",
      others: "Slow to respond. You're left waiting."
    },
    {
      feature: "Hands-On With Periodic Updates",
      icon: <FileText className="w-5 h-5 text-gray-800" />,
      visn: "Regular updates at every step so you're always in the loop.",
      others: "You're often left in the dark."
    },
    {
      feature: "Super Fast Site Deployment",
      icon: <Rocket className="w-5 h-5 text-gray-800" />,
      visn: "Streamlined workflow for lightning-fast launches.",
      others: "Weeks or even months to go live."
    },
    {
      feature: "Easy Handover Process",
      icon: <Laptop className="w-5 h-5 text-gray-800" />,
      visn: "Smooth, simple, and zero confusion.",
      others: "Complicated processes and vague handovers."
    },
    {
      feature: "3 Unlimited Revision Rounds",
      icon: <Pencil className="w-5 h-5 text-gray-800" />,
      visn: "Refine until it's exactly how you want it.",
      others: "Limited revisions. Extra charges for changes."
    },
    {
      feature: "2 Months Free Maintenance",
      icon: <ShieldCheck className="w-5 h-5 text-gray-800" />,
      visn: "We've got your back after launch.",
      others: "No post-launch support. You're on your own."
    }
  ];

  return (
    <section className="relative bg-[#FAF8F6] w-full py-16 md:py-24 overflow-hidden z-20" id="why-choose-us">
      {/* Decorative Hand-drawn Doodles — hidden on mobile */}
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#26CCC2" strokeWidth="2.5" strokeLinecap="round" className="absolute left-[8%] md:left-[15%] top-16 md:top-24 opacity-80 pointer-events-none hidden sm:block">
        <line x1="20" y1="10" x2="20" y2="2" />
        <line x1="12" y1="14" x2="5" y2="9" />
        <line x1="28" y1="14" x2="35" y2="9" />
      </svg>

      <svg width="60" height="40" viewBox="0 0 60 40" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" className="absolute right-[8%] md:right-[12%] top-20 md:top-28 opacity-70 pointer-events-none hidden sm:block">
        <path d="M5 25 C 20 5, 40 5, 45 20 C 48 30, 35 35, 30 25 C 25 15, 35 5, 55 15" />
      </svg>

      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" className="absolute left-[6%] md:left-[10%] bottom-[15%] md:bottom-[20%] opacity-80 pointer-events-none hidden sm:block">
        <line x1="10" y1="20" x2="2" y2="20" />
        <line x1="14" y1="12" x2="9" y2="5" />
        <line x1="14" y1="28" x2="9" y2="35" />
      </svg>

      <svg width="80" height="60" viewBox="0 0 80 60" fill="none" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" className="absolute right-[6%] md:right-[8%] bottom-[12%] md:bottom-[16%] opacity-80 pointer-events-none hidden sm:block">
        <path d="M70 10 Q 50 40, 20 45" />
        <path d="M20 45 L 30 35 M 20 45 L 25 55" />
      </svg>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header Block */}
        <div className="text-center mb-10 md:mb-16">
          <h2
            className="font-sans font-bold text-center text-black leading-tight uppercase tracking-[0.15em]"
            style={{ fontSize: 'clamp(1.6rem, 5vw, 3rem)' }}
          >
            Why Choose Us<span className="text-[#26CCC2]">.</span>
          </h2>
          <h3 className="font-serif text-base md:text-2xl text-[#26CCC2] font-medium mt-3 mb-3 max-w-2xl mx-auto leading-tight">
            Everything You Need, Nothing You Have To Chase
          </h3>
          <p className="font-sans text-gray-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
            We make the process simple, transparent, and stress-free so you
            can focus on what matters—growing your business.
          </p>
        </div>

        {/* ── RESPONSIVE COMPARISON TABLE ── */}
        <div className="w-full py-4 mt-4 md:mt-8">
          <div className="w-full grid grid-cols-[5fr_4fr_4fr] md:grid-cols-10 items-stretch">

            {/* Column 1: Features */}
            <div className="col-span-1 md:col-span-3 border-t border-b border-l border-gray-200 rounded-l-2xl bg-white/40 flex flex-col justify-stretch">
              <div className="h-14 sm:h-16 md:h-20 border-b border-gray-200 flex items-center px-3 sm:px-4 md:px-6" />
              {comparisonData.map((row, idx) => (
                <div
                  key={idx}
                  className={`h-16 sm:h-20 md:h-24 flex items-center px-3 sm:px-4 md:px-6 gap-3 md:gap-4 ${idx === comparisonData.length - 1 ? '' : 'border-b border-gray-200/60'}`}
                >
                  <div className="hidden sm:flex w-7 h-7 md:w-9 md:h-9 rounded-xl bg-white items-center justify-center shrink-0 shadow-sm border border-gray-100">
                    {row.icon}
                  </div>
                  <span className="font-sans text-[11px] sm:text-xs md:text-sm font-bold text-gray-900 leading-snug">
                    {row.feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Column 2: VISN */}
            <div className="col-span-1 md:col-span-4 bg-white border border-[#26CCC2]/35 rounded-3xl shadow-xl shadow-gray-200/50 -my-2 sm:-my-3 md:-my-4 relative z-10 flex flex-col justify-stretch">
              <div className="h-14 sm:h-16 md:h-20 border-b border-gray-100 flex items-center justify-center bg-[#26CCC2]/5 rounded-t-3xl">
                <span className="font-sans text-[10px] sm:text-sm md:text-lg font-black text-[#26CCC2] tracking-widest uppercase">
                  VISN<span className="text-[#26CCC2]">.</span>
                </span>
              </div>
              {comparisonData.map((row, idx) => (
                <div
                  key={idx}
                  className={`h-16 sm:h-20 md:h-24 flex items-center justify-center md:justify-start px-2 sm:px-4 md:px-8 gap-0 md:gap-4 ${idx === comparisonData.length - 1 ? '' : 'border-b border-gray-100'}`}
                >
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#26CCC2] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" strokeWidth={3} />
                  </div>
                  <span className="hidden md:block font-sans text-xs md:text-sm font-medium text-gray-800 leading-snug">
                    {row.visn}
                  </span>
                </div>
              ))}
            </div>

            {/* Column 3: Other Web Agencies */}
            <div className="col-span-1 md:col-span-3 border-t border-b border-r border-gray-200 rounded-r-2xl bg-white/40 flex flex-col justify-stretch">
              <div className="h-14 sm:h-16 md:h-20 border-b border-gray-200 flex items-center px-1 sm:px-2 md:px-8 justify-center text-center">
                <span className="font-sans text-[9px] sm:text-[10px] md:text-xs font-bold text-gray-400 tracking-[0.05em] md:tracking-[0.15em] uppercase">
                  <span className="md:hidden">Others</span>
                  <span className="hidden md:inline">Other Web Agencies</span>
                </span>
              </div>
              {comparisonData.map((row, idx) => (
                <div
                  key={idx}
                  className={`h-16 sm:h-20 md:h-24 flex items-center justify-center md:justify-start px-2 sm:px-4 md:px-8 gap-0 md:gap-4 ${idx === comparisonData.length - 1 ? '' : 'border-b border-gray-200/60'}`}
                >
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                    <X className="w-3 h-3 md:w-3.5 md:h-3.5 text-gray-500" strokeWidth={3} />
                  </div>
                  <span className="hidden md:block font-sans text-xs md:text-sm font-normal text-gray-500 leading-snug">
                    {row.others}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* CTA Button */}
        <div className="w-full flex justify-center mt-12 md:mt-16 mb-6">
          <motion.button
            type="button"
            onClick={onBookMeetingClick}
            whileHover="hover"
            whileTap="tap"
            variants={{
              initial: { scale: 1 },
              tap: { scale: 0.95 }
            }}
            className="group relative overflow-hidden z-10 w-[16em] sm:w-[18em] h-[4em] sm:h-[4.5em] rounded-[30em] font-sans text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.15em] border-none outline-none text-white bg-[#151515] cursor-pointer flex items-center justify-center gap-3 transition-colors duration-500 hover:text-black before:content-[''] before:absolute before:-top-1 before:-left-1 before:w-0 before:h-[calc(100%+8px)] before:bg-[#26CCC2] before:transition-all before:duration-500 before:ease-in-out before:-z-10 hover:before:w-[calc(100%+8px)]"
          >
            <span>book a meeting</span>
            <motion.div
              variants={{
                initial: { x: 0 },
                hover: { x: 8 }
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
