import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Magnetic from './Magnetic';
import { ArrowUp, Send } from 'lucide-react';

const ContactFooter = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const apiBaseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const handleScrollTop = (e) => {
    e.preventDefault();
    if (window.lenis) {
      window.lenis.scrollTo('#hero', { duration: 1.8 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data } = await axios.post(`${apiBaseUrl}/api/contact`, formData);
      toast.success(data?.message || 'Message sent successfully.');
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to send message. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#FAF8F6] pt-24 overflow-hidden z-10"
    >
      {/* Decorative glow */}
      <div className="absolute top-[80%] left-[10%] -z-10 h-[300px] w-[300px] rounded-full bg-accent-gold/5 blur-[100px] pointer-events-none" />

      {/* Dots background — left half, top 40% */}
      <div
        className="absolute top-0 left-0 w-1/2 h-[40%] pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,0,0,0.07) 4px, transparent 4px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Main content — full-width flex so image can bleed right */}
      <div className="w-full flex flex-col lg:flex-row items-stretch mb-0">
        {/* Left Column - Text and Form */}
        <div className="flex-1 px-6 md:px-12 lg:pl-[max(3rem,calc((100vw-72rem)/2))] lg:pr-16 pt-0 pb-24 flex flex-col gap-12">
          <div className="select-none">
            <h2
              className="font-sans font-bold text-black leading-tight uppercase tracking-[0.15em]"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
            >
              Still Confused<span className="text-[#26CCC2]">?</span>
            </h2>
            <h3 className="font-serif text-3xl md:text-3xl text-gray-500 font-medium mt-4 mb-4 leading-tight">
              Get In Touch
            </h3>
            <p className="font-sans text-gray-400 text-xs md:text-sm max-w-xl leading-relaxed">
              We'll get back to you within 24 hours.
            </p>
          </div>

          <div className="rounded-3xl bg-gray-200 p-8 md:p-12 backdrop-blur-md shadow-sm">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Form Input 1 */}
              <div className="group relative flex flex-col gap-2 w-full border-b border-obsidian/15 focus-within:border-accent-gold transition-colors duration-500 pb-2">
                <label className="text-[9px] font-bold tracking-[0.3em] text-accent-gold uppercase">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. John Doe"
                  className="w-full bg-transparent py-1 text-sm font-sans font-light text-obsidian placeholder-obsidian/20 focus:outline-none rounded-none"
                />
                <span className="absolute bottom-0 left-0 w-0 h-px bg-accent-gold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within:w-full" />
              </div>

              {/* Form Input 2 */}
              <div className="group relative flex flex-col gap-2 w-full border-b border-obsidian/15 focus-within:border-accent-gold transition-colors duration-500 pb-2">
                <label className="text-[9px] font-bold tracking-[0.3em] text-accent-gold uppercase">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. john@example.com"
                  className="w-full bg-transparent py-1 text-sm font-sans font-light text-obsidian placeholder-obsidian/20 focus:outline-none rounded-none"
                />
                <span className="absolute bottom-0 left-0 w-0 h-px bg-accent-gold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within:w-full" />
              </div>

              {/* Form Input 3 */}
              <div className="group relative flex flex-col gap-2 w-full border-b border-obsidian/15 focus-within:border-accent-gold transition-colors duration-500 pb-2">
                <label className="text-[9px] font-bold tracking-[0.3em] text-accent-gold uppercase">Brief Description</label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell us about your digital vision..."
                  className="w-full bg-transparent py-1 text-sm font-sans font-light text-obsidian placeholder-obsidian/20 focus:outline-none resize-none rounded-none"
                />
                <span className="absolute bottom-0 left-0 w-0 h-px bg-accent-gold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within:w-full" />
              </div>

              {/* Submit */}
              <Magnetic strength={0.12} range={30}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 flex w-full items-center justify-center gap-3 py-4 rounded-full bg-obsidian text-dark-bg font-bold text-[10px] uppercase tracking-[0.25em] hover:bg-accent-gold hover:text-white hover:shadow-[0_12px_30px_rgba(181,155,117,0.3)] transition-all duration-300 cursor-none disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? 'SENDING...' : 'SEND INQUIRY'}
                  <Send className="h-3.5 w-3.5" />
                </button>
              </Magnetic>
            </form>
          </div>
        </div>

        {/* Right Column - Confused Image: anchored to right edge */}
        <div className="hidden lg:flex w-[45%] items-end justify-end self-stretch select-none overflow-hidden">
          <img
            src="/images/confused.png"
            alt="Still Confused"
            className="w-full h-auto object-contain object-right-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
          />
        </div>
      </div>

      {/* Full-width Accent Background Footer */}
      <div className="w-full bg-accent-gold py-12 px-6 md:px-12 relative z-20 mt-0">
        <div className="mx-auto max-w-6xl">
          {/* Bottom Socials & Back to top */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 select-none">
            <p className="text-[10px] font-mono text-obsidian/60 tracking-wider text-center md:text-left">
              © {new Date().getFullYear()} VISN AGENCY INC. ALL RIGHTS RESERVED </p>

            {/* Socials */}
            <div className="flex items-center gap-8">
              <Magnetic strength={0.2} range={25}>
                <a
                  href="#works"
                  className="text-sm tracking-widest text-obsidian/60 hover:text-white transition-colors cursor-none"
                >
                  Works
                </a>
              </Magnetic>
              <Magnetic strength={0.2} range={25}>
                <a
                  href="#pricing"
                  className="text-sm tracking-widest text-obsidian/60 hover:text-white transition-colors cursor-none"
                >
                  Pricing
                </a>
              </Magnetic>
              <Magnetic strength={0.2} range={25}>
                <a
                  href="#contact"
                  className="text-sm tracking-widest text-obsidian/60 hover:text-white transition-colors cursor-none"
                >
                  Contact
                </a>
              </Magnetic>
            </div>

            {/* Back to top */}
            <div className="flex flex-col items-center gap-2">
              <Magnetic strength={0.25} range={35}>
                <button
                  onClick={handleScrollTop}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-obsidian text-accent-gold hover:bg-white hover:text-obsidian hover:shadow-[0_10px_20px_rgba(255,255,255,0.25)] transition-all duration-300 cursor-none"
                  title="Scroll to Top"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </Magnetic>
              <button
                onClick={handleScrollTop}
                className="text-[8px] font-bold tracking-[0.3em] text-obsidian/60 hover:text-white transition-colors duration-300 uppercase cursor-none"
              >
                BACK TO TOP
              </button>
            </div>
          </div>

          {/* Giant footer wordmark (Editorial Serif) */}
          <div className="w-full flex items-center justify-center mt-20 select-none pointer-events-none">
            <h2 className="text-[18vw] font-serif font-bold leading-none uppercase tracking-tighter text-white/30 text-center">
              VISN<span className="text-black/10">.</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFooter;
