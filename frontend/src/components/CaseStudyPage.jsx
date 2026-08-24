import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const caseStudyData = {
  calcuttabungalow: {
    title: 'Calcutta Bungalow',
    description:
      'For Calcutta Bungalow, we reimagined the digital experience by translating its heritage into a refined, contemporary interface. Every element was designed to preserve the warmth of old Calcutta while improving storytelling, navigation, and visual elegance. The result is a timeless experience that reflects the brand\'s cultural legacy with modern clarity.',
    images: [
      '/Calcutta Bungalow/Dekstop view.webp',
      '/Calcutta Bungalow/Mobile view.webp',
      '/Calcutta Bungalow/trial hero section.webp',
      '/Calcutta Bungalow/Rooms section.webp',
      '/Calcutta Bungalow/Reservation section.webp',
      '/Calcutta Bungalow/Reservation section (Another room type).webp',
    ],
  },
  rajbari: {
    title: 'Rajbari Bawali',
    description:
      'The redesign for Rajbari Bawali draws from the estate\'s regal character and architectural richness to create a calm, immersive digital presence. Thoughtful layouts, restrained typography, and heritage inspired visuals guide visitors through the property\'s story while maintaining a refined and intuitive browsing experience.',
    images: [
      '/rajbari bawali/rajbari landing page.webp',
      '/rajbari bawali/rajbari booking section.webp',
      '/rajbari bawali/rajbari viewers section.webp',
      '/rajbari bawali/rajbari mobile view.webp',
      '/rajbari bawali/trial mobile view.webp',
    ],
  },
  chaibreak: {
    title: 'Chai Break',
    description:
      'We reshaped the website around the experience of discovering cafés, exploring the menu, and finding nearby outlets with ease. A cleaner structure and thoughtful visual treatment give the brand a more inviting online presence while making every interaction feel effortless.',
    images: [
      '/chai break/chaibreak 1.webp',
      '/chai break/chaibreak 2.webp',
      '/chai break/chaibreak 3.webp',
    ],
  },
  healthyco: {
    title: 'Healthy Eats Co.',
    description:
      'A homepage that makes healthy food feel fresh, approachable, and easy to choose. A bright visual language, generous spacing, and clear meal discovery guide users naturally from browsing to placing an order while reflecting the brand\'s focus on everyday nutrition.',
    images: [
      '/healthy eats co kolkata/landing page.webp',
      '/healthy eats co kolkata/selection page.webp',
      '/healthy eats co kolkata/description page.webp',
    ],
  },
};

const CaseStudyPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const study = caseStudyData[slug];

  if (!study) {
    return (
      <main className="w-full min-h-screen bg-[#FAF8F6] flex items-center justify-center pt-32 pb-24">
        <div className="text-center">
          <h1 className="font-sans font-bold text-3xl text-black mb-4">Case Study Not Found</h1>
          <button onClick={() => navigate(-1)} className="text-[#26CCC2] font-sans font-bold uppercase tracking-widest text-sm hover:underline bg-transparent border-none cursor-pointer">
            ← Go Back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-[#FAF8F6] pt-28 md:pt-36 pb-16 md:pb-24">
      <article className="max-w-4xl mx-auto px-6 md:px-12">

        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-sans font-bold text-gray-400 uppercase tracking-widest
                     hover:text-[#26CCC2] transition-colors duration-300 mb-10 md:mb-14 group bg-transparent border-none cursor-pointer p-0"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          Go Back
        </button>

        {/* Title */}
        <h1
          className="font-sans font-bold text-black leading-tight uppercase tracking-[0.08em] mb-6 md:mb-8"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          {study.title}<span className="text-[#26CCC2]">.</span>
        </h1>

        {/* Description */}
        <p className="font-sans text-gray-600 text-base md:text-lg leading-relaxed md:leading-loose max-w-3xl mb-12 md:mb-16">
          {study.description}
        </p>

        {/* Divider */}
        <hr className="border-black/10 mb-12 md:mb-16" />

        {/* Images Gallery */}
        <div className="flex flex-col gap-8 md:gap-12">
          {study.images.map((src, index) => (
            <div
              key={index}
              className="w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-black/5"
            >
              <img
                src={src}
                alt={`${study.title} — ${index + 1}`}
                className="w-full h-auto object-cover block"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 md:mt-20 pt-10 border-t border-black/10 flex flex-col items-center text-center">
          <p className="font-sans text-gray-400 text-xs uppercase tracking-widest mb-4">Next Steps</p>
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-black text-white font-sans font-bold
                       text-xs uppercase tracking-[0.15em] hover:bg-[#26CCC2] hover:text-black transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            View All Case Studies
          </Link>
        </div>

      </article>
    </main>
  );
};

export default CaseStudyPage;
