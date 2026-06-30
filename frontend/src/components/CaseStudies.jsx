import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const caseStudies = [
  { id: 1, title: 'Healthy Eats Co', image: '/healthy eats co kolkata/landing page.png', label: 'Web Development', slug: 'healthyco' },
  { id: 2, title: 'Calcutta Bungalow', image: '/Calcutta Bungalow/Dekstop view.png', label: 'UI/UX Design', slug: 'calcuttabungalow' },
  { id: 3, title: 'Chai Break',      image: '/chai break/chaibreak 1.png', label: 'Brand Identity', slug: 'chaibreak' },
  { id: 4, title: 'Rajbari',         image: '/rajbari bawali/rajbari landing page.png', label: 'Digital Marketing', slug: 'rajbari' },
];

const CaseStudies = () => {
  return (
    <section className="bg-[#FAF8F6] w-full flex flex-col pt-32 pb-24 min-h-screen">
      <div className="w-full flex justify-center mb-14">
        <h1
          className="font-sans font-bold text-center text-black leading-tight uppercase tracking-[0.15em]"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
        >
          Case Studies<span className="text-[#26CCC2]">.</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-6 md:px-16 lg:px-24 max-w-[1800px] mx-auto w-full">
        {caseStudies.map((study) => (
          <Link key={study.id} to={`/case-studies/${study.slug}`} className="flex flex-col group cursor-pointer outline-none block">
            <div className="w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden relative shadow-md mb-6" style={{ aspectRatio: '16/9' }}>
              <img
                src={study.image}
                alt={study.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between px-2">
              <div>
                <span className="text-[10px] md:text-xs text-[#26CCC2] uppercase tracking-[0.2em] mb-1.5 block font-bold">
                  {study.label}
                </span>
                <h3 className="text-xl md:text-2xl font-sans font-bold text-black uppercase tracking-wide">
                  {study.title}
                </h3>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 group-hover:border-[#26CCC2] group-hover:bg-[#26CCC2] transition-colors duration-300">
                <ArrowRight className="w-5 h-5 text-black group-hover:text-white transition-colors duration-300" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;
