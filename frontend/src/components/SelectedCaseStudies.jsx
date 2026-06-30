import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const caseStudies = [
  { id: 1, title: 'Healthy Eats Co', image: '/healthy eats co kolkata/landing page.png', label: 'Web Development', slug: 'healthyco' },
  { id: 2, title: 'Calcutta Bungalow', image: '/Calcutta Bungalow/Dekstop view.png', label: 'UI/UX Design', slug: 'calcuttabungalow' },
  { id: 3, title: 'Chai Break',      image: '/chai break/chaibreak 1.png', label: 'Brand Identity', slug: 'chaibreak' },
  { id: 4, title: 'Rajbari',         image: '/rajbari bawali/rajbari landing page.png', label: 'Digital Marketing', slug: 'rajbari' },
];

const SelectedCaseStudies = () => {
  return (
    <section
      className="bg-[#FAF8F6] w-full py-20 md:py-28 relative z-40"
      id="case-studies"
    >
      {/* Heading */}
      <div className="w-full px-6 md:px-16 lg:px-24 mb-12 flex flex-col items-center text-center">
        <h2
          className="font-sans font-bold text-black leading-tight uppercase tracking-[0.15em]"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
        >
          Selected Case Studies<span className="text-[#26CCC2]">.</span>
        </h2>
        <p className="font-sans text-gray-400 text-xs md:text-sm mt-3 max-w-lg leading-relaxed">
          A closer look at the work that moved the needle for our clients.
        </p>
      </div>

      {/* Vertically stacked cards */}
      <div className="w-full px-6 md:px-16 lg:px-24 mb-14 flex flex-col gap-8 max-w-[1800px] mx-auto">
        {caseStudies.map((study, i) => (
          <Link
            key={study.id}
            to={`/case-studies/${study.slug}`}
            className="w-full bg-white rounded-[3rem] overflow-hidden relative shadow-md
                       flex flex-col md:flex-row group border border-black/8 outline-none block"
          >
            {/* Mobile: image on top */}
            <div className="w-full md:hidden relative overflow-hidden" style={{ height: '180px' }}>
              <img
                src={study.image}
                alt={study.title}
                className="absolute inset-0 w-full h-full object-cover opacity-90
                           group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>

            {/* Left: details */}
            <div className="w-full md:w-1/2 flex flex-col justify-center gap-y-3 md:gap-y-6
                            relative z-10 p-5 md:p-14 lg:p-16">
              <div>
                <span className="font-sans text-xs text-[#26CCC2] uppercase tracking-[0.3em] mb-2 md:mb-4 block">
                  {study.label}
                </span>
                <h4 className="text-2xl md:text-4xl lg:text-5xl font-sans font-bold
                               text-black uppercase tracking-wide mb-2 md:mb-4">
                  {study.title}
                </h4>
              </div>

              {/* View button */}
              <div className="flex items-center gap-3 px-6 py-3.5 rounded-full border
                              border-black/15 cursor-pointer w-max
                              transition-colors duration-300 hover:border-[#26CCC2]">
                <span className="font-sans font-bold text-black uppercase tracking-widest
                                 text-xs md:text-sm group-hover:text-[#26CCC2] transition-colors">
                  View
                </span>
                <ArrowRight className="w-4 h-4 text-black group-hover:text-[#26CCC2] transition-colors" />
              </div>
            </div>

            {/* Right: image — desktop only */}
            <div className="hidden md:block w-full md:w-1/2 relative overflow-hidden
                            bg-gray-100 border-l border-black/5"
              style={{ minHeight: '420px' }}>
              <img
                src={study.image}
                alt={study.title}
                className="absolute inset-0 w-full h-full object-cover opacity-90
                           group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* CTA Button */}
      <div className="w-full flex justify-center">
        <Link to="/case-studies">
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={{ initial: { scale: 1 }, tap: { scale: 0.95 } }}
            className="group relative overflow-hidden z-10 w-[20em] md:w-[22em] h-[4.5em] md:h-[5em] rounded-[30em] font-sans text-[14px] md:text-[15px] font-bold uppercase tracking-[0.15em] border-none outline-none text-white bg-[#151515] cursor-pointer flex items-center justify-center gap-3 transition-colors duration-500 hover:text-black before:content-[''] before:absolute before:-top-1 before:-left-1 before:w-0 before:h-[calc(100%+8px)] before:bg-[#26CCC2] before:transition-all before:duration-500 before:ease-in-out before:-z-10 hover:before:w-[calc(100%+8px)]"
          >
            <span>See All Case Studies</span>
            <motion.div
              variants={{ initial: { x: 0 }, hover: { x: 8 } }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default SelectedCaseStudies;
