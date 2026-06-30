import React from 'react';
import { ArrowRight } from 'lucide-react';

const projects = [
  { id: 4, title: 'SN Enterprises',  image: '/images/snenterprises.png', link: 'https://www.snenterprise.store/' },
  { id: 2, title: 'Blockscroll',     image: '/images/blockscroll.png', link: 'https://blockscroll.app/' },
  { id: 1, title: 'DocNow',          image: '/images/docnow.png', link: 'https://docnow.in/' },
  { id: 3, title: 'Aadi Shakti',    image: '/images/aadi-shakti.png', link: 'https://aadishaktimission.vercel.app' },
];

const Work = () => {
  return (
    <section className="bg-[#FAF8F6] w-full flex flex-col pt-32 pb-24 min-h-screen">
      <div className="w-full flex justify-center mb-14">
        <h1
          className="font-sans font-bold text-center text-black leading-tight uppercase tracking-[0.15em]"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
        >
          All Work<span className="text-[#26CCC2]">.</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-6 md:px-16 lg:px-24 max-w-[1800px] mx-auto w-full">
        {projects.map((project) => (
          <a key={project.id} href={project.link} target="_blank" rel="noopener noreferrer" className="flex flex-col group cursor-pointer outline-none block">
            <div className="w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden relative shadow-md mb-6" style={{ aspectRatio: '16/9' }}>
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl md:text-2xl font-sans font-bold text-black uppercase tracking-wide">
                {project.title}
              </h3>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 group-hover:border-[#26CCC2] group-hover:bg-[#26CCC2] transition-colors duration-300">
                <ArrowRight className="w-5 h-5 text-black group-hover:text-white transition-colors duration-300" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Work;
