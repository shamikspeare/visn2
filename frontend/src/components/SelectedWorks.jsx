import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const projects = [
  { 
    id: 2, 
    title: 'Blockscroll', 
    image: '/images/blockscroll.webp', 
    description: 'A connected web and mobile platform built to help users take control of screen time through intelligent content blocking.', 
    link: 'https://blockscroll.app/',
    isFeatured: true,
    tags: ['App Development', 'Web Platform'] 
  },
  { 
    id: 4, 
    title: 'SN Enterprises', 
    image: '/images/snenterprises.webp', 
    description: 'A website for a wholesale footwear distributor, making it easier to explore products, franchise opportunities, and business inquiries.', 
    link: 'https://www.snenterprise.store/',
    tags: ['Branding', 'Web'] 
  },
  { 
    id: 1, 
    title: 'DocNow', 
    image: '/images/docnow.webp', 
    description: 'A digital platform for booking at home diagnostic tests and healthcare services.', 
    link: 'https://docnow.in/',
    tags: ['App', 'Healthcare'] 
  },
  { 
    id: 3, 
    title: 'Aadi Shakti', 
    image: '/images/aadi-shakti.webp', 
    description: 'A website built for Aadi Shakti Foundation to showcase its programs, impact, and commitment to community development.', 
    link: 'https://aadishaktimission.vercel.app',
    tags: ['Web', 'Non-profit'] 
  },
];

const SelectedWorks = () => {
  return (
    <section
      className="bg-[#FAF8F6] w-full flex flex-col py-12 relative z-40"
      id="selected-works"
    >
      <div className="w-full flex justify-center mb-12">
        <h2
          className="font-sans font-bold text-center text-black leading-tight uppercase tracking-[0.15em]"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
        >
          Selected Work<span className="text-[#26CCC2]">.</span>
        </h2>
      </div>

      <div className="w-full flex flex-col gap-8 px-6 md:px-16 lg:px-24 max-w-[1800px] mx-auto">
        {projects.map((project, i) => {
          const isFeatured = project.isFeatured || false;

          return (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full rounded-[3rem] overflow-hidden relative shadow-md
                         flex flex-col md:flex-row group border outline-none cursor-pointer block
                         transition-all duration-500
                         ${isFeatured 
                           ? 'bg-gradient-to-br from-[#F0FFFE] to-white border-[#26CCC2] border-2 shadow-[0_8px_40px_rgba(38,204,194,0.25)] hover:shadow-[0_12px_60px_rgba(38,204,194,0.35)] scale-[1.02] md:scale-100' 
                           : 'bg-white border-black/8'}`}
            >
              {/* Featured Ribbon */}
              {isFeatured && (
                <div className="absolute top-0 left-0 z-20 bg-[#26CCC2] text-black font-sans font-bold text-xs uppercase tracking-widest px-5 py-2 rounded-br-2xl">
                  App Development
                </div>
              )}

              {/* Mobile: image on top — hidden on md+ where it moves to the right */}
              <div className="w-full md:hidden relative overflow-hidden" style={{ height: '180px' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-90
                             group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>

              {/* Left: details */}
              <div className={`w-full md:w-1/2 flex flex-col justify-center gap-y-3 md:gap-y-6
                              relative z-10 p-5 md:p-14 lg:p-16
                              ${isFeatured ? 'md:pr-8' : ''}`}>
                <div>
                  <span className="font-sans text-xs text-[#26CCC2] uppercase tracking-[0.3em] mb-2 md:mb-4 block">
                    {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                  </span>
                  <h4 className={`text-2xl md:text-4xl lg:text-5xl font-sans font-bold
                                 text-black uppercase tracking-wide mb-2 md:mb-4
                                 ${isFeatured ? 'text-[#1A8A82]' : ''}`}>
                    {project.title}
                  </h4>
                  <p className="text-sm md:text-base text-gray-500 font-sans leading-relaxed max-w-sm">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map(tag => {
                    const isAppDev = tag === 'App Development';
                    return (
                      <span key={tag}
                        className={`px-4 py-2 rounded-full text-[10px] md:text-xs
                                   font-sans uppercase tracking-widest border
                                   ${isAppDev 
                                     ? 'bg-[#26CCC2] text-black border-[#26CCC2] font-bold shadow-md' 
                                     : 'bg-black/6 text-gray-600 border-black/8'}`}>
                        {tag}
                      </span>
                    );
                  })}
                </div>

                <div className={`flex items-center gap-3 px-6 py-3.5 rounded-full border
                                border-black/15 cursor-pointer w-max mt-6
                                transition-colors duration-300 
                                ${isFeatured ? 'hover:border-[#26CCC2] border-[#26CCC2]/40' : 'hover:border-[#26CCC2]'}`}>
                  <span className={`font-sans font-bold text-black uppercase tracking-widest
                                   text-xs md:text-sm transition-colors
                                   ${isFeatured ? 'text-[#1A8A82] group-hover:text-[#26CCC2]' : 'group-hover:text-[#26CCC2]'}`}>
                    View Project
                  </span>
                  <ArrowRight className={`w-4 h-4 transition-colors
                                        ${isFeatured ? 'text-[#1A8A82] group-hover:text-[#26CCC2]' : 'text-black group-hover:text-[#26CCC2]'}`} />
                </div>
              </div>

              {/* Right: image — only visible on md+ */}
              <div className={`hidden md:block w-full md:w-1/2 relative overflow-hidden
                              ${isFeatured ? 'bg-gradient-to-br from-[#26CCC2]/10 to-transparent' : 'bg-gray-100'}
                              border-l border-black/5`}
                style={{ minHeight: '420px' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-90
                             group-hover:opacity-100 transition-opacity duration-500"
                />
                {isFeatured && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#26CCC2]/5 via-transparent to-transparent pointer-events-none" />
                )}
              </div>
            </a>
          );
        })}
      </div>

      {/* CTA Button */}
      <div className="w-full flex justify-center mt-12 mb-4">
        <Link to="/work">
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={{ initial: { scale: 1 }, tap: { scale: 0.95 } }}
            className="group relative overflow-hidden z-10 w-[20em] md:w-[22em] h-[4.5em] md:h-[5em] rounded-[30em] font-sans text-[14px] md:text-[15px] font-bold uppercase tracking-[0.15em] border-none outline-none text-white bg-[#151515] cursor-pointer flex items-center justify-center gap-3 transition-colors duration-500 hover:text-black before:content-[''] before:absolute before:-top-1 before:-left-1 before:w-0 before:h-[calc(100%+8px)] before:bg-[#26CCC2] before:transition-all before:duration-500 before:ease-in-out before:-z-10 hover:before:w-[calc(100%+8px)]"
          >
            <span>Explore All Work</span>
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

export default SelectedWorks;