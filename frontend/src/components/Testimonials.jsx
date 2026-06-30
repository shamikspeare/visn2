import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "SN Enterprise",
    role: "Client",
    quote: "The new website has made it much easier for retailers and franchise partners to explore our catalogue and reach out to us. The process was smooth from start to finish.",
    rating: 5,
  },
  {
    name: "Aadi Shakti",
    role: "Client",
    quote: "Our work is now presented in a much clearer way. The website helps people understand our initiatives and makes it easier to connect with us.",
    rating: 5,
  },
  {
    name: "Blockscroll",
    role: "Client",
    quote: "From the app to the website, every screen was thoughtfully designed. The overall experience feels intuitive and aligns perfectly with our product.",
    rating: 5,
  },
  {
    name: "Healthy Eats Co.",
    role: "Client",
    quote: "The layouts are simple, fresh, and easy to browse. We've received great feedback on how effortless it is to explore our menu.",
    rating: 5,
  },
  {
    name: "iDream",
    role: "Client",
    quote: "From campaign planning to website improvements, he approached every task with ownership and attention to detail. His inputs added real value to our marketing initiatives.",
    rating: 5,
  },
  {
    name: "AirM",
    role: "Client",
    quote: "Visn was proactive throughout the internship and never hesitated to take responsibility. His ability to balance creativity with practical execution stood out.",
    rating: 5,
  },
  {
    name: "The Music Room",
    role: "Client",
    quote: "He handled outreach with professionalism and consistently came up with thoughtful ideas to improve engagement. We appreciated his initiative throughout the project.",
    rating: 5,
  },
  {
    name: "Alokya",
    role: "Client",
    quote: "His strategic thinking and willingness to experiment with new approaches made him a valuable addition to the team. He was dependable and easy to collaborate with.",
    rating: 5,
  },
  {
    name: "Flixdin",
    role: "Client",
    quote: "visn was always willing to take initiative and contributed beyond his assigned responsibilities. His enthusiasm and problem solving mindset stood out.",
    rating: 5,
  },
];

const TestimonialCard = ({ testimonial, index }) => (
  <div className={`testimonial-card shrink-0 w-[280px] md:w-[400px] p-6 md:p-8 rounded-2xl border border-white/10 ${index % 2 === 0 ? 'bg-[#111111]' : 'bg-[#1A1A1A]'} backdrop-blur-sm select-none`}>
    <div className="flex items-center justify-between mb-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-gold/10 border border-accent-gold/15">
        <Quote className="h-3.5 w-3.5 text-accent-gold-dark" />
      </div>
      <div className="flex gap-0.5">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="h-3 w-3 fill-accent-gold text-accent-gold" />
        ))}
      </div>
    </div>

    <p className="text-xs md:text-sm text-white/75 font-serif italic font-light leading-relaxed mb-6 whitespace-normal">
      "{testimonial.quote}"
    </p>

    <div className="flex items-center gap-3 border-t border-white/10 pt-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10">
        <span className="text-[11px] font-bold text-white/60">
          {testimonial.name.split(' ').map(n => n[0]).join('')}
        </span>
      </div>
      <div>
        <p className="text-xs font-bold text-white tracking-wide">{testimonial.name}</p>
        <p className="text-[9px] text-white/45 tracking-wider uppercase">{testimonial.role}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const row1 = testimonials.slice(0, 4);
  const row2 = testimonials.slice(4, 8);

  return (
    <>
      <section
        id="testimonials"
        className="relative w-full py-24 md:py-32 bg-[#0A0A0A] z-10"
        style={{ isolation: 'isolate', contain: 'paint layout' }}
      >
        {/* Section header */}
        <div className="mx-auto max-w-6xl px-6 md:px-12 mb-16 select-none">
          <div className="text-center flex flex-col items-center justify-center">
            <h2
              className="font-sans font-bold text-center text-white leading-tight uppercase tracking-[0.15em]"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
            >
              What Clients Say<span className="text-[#26CCC2]">.</span>
            </h2>
            <h3 className="font-serif text-lg md:text-2xl text-[#26CCC2] font-medium mt-4 mb-4 max-w-2xl mx-auto leading-tight">
              Testimonials
            </h3>
          </div>
        </div>

        {/* Row 1 — moves left */}
        <div className="mb-6 overflow-hidden">
          <div className="testimonial-row-left flex gap-6 w-max">
            {[...row1, ...row1, ...row1, ...row1].map((t, i) => (
              <TestimonialCard key={`r1-${i}`} testimonial={t} index={i} />
            ))}
          </div>
        </div>

        {/* Row 2 — moves right */}
        <div className="overflow-hidden">
          <div className="testimonial-row-right flex gap-6 w-max">
            {[...row2, ...row2, ...row2, ...row2].map((t, i) => (
              <TestimonialCard key={`r2-${i}`} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Hard seal — zero-height block that resets stacking context */}
      <div style={{ display: 'block', height: 0, overflow: 'hidden', clear: 'both', background: 'transparent' }} />
    </>
  );
};

export default Testimonials;