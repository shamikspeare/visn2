import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Send, X } from 'lucide-react';
import { CONTACT_API_URL } from '../config/api';

const ContactPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const popupCardRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !popupCardRef.current) return;

    const timeline = gsap.timeline();
    timeline
      .set(popupCardRef.current, {
        scale: 0.82,
        y: '38vh',
        opacity: 0,
        transformOrigin: 'center bottom',
      })
      .to(popupCardRef.current, {
        scale: 1.06,
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out',
      })
      .to(popupCardRef.current, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
      });

    return () => {
      timeline.kill();
    };
  }, [isOpen]);

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
      const { data } = await axios.post(CONTACT_API_URL, formData);
      toast.success(data?.message || 'Message sent successfully.');
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      window.setTimeout(() => {
        onClose();
      }, 450);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to send message. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[120] bg-black/50 backdrop-blur-md px-4 py-8 md:p-10 flex items-center justify-center"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <motion.div
        ref={popupCardRef}
        className="w-full max-w-2xl rounded-3xl border border-white/15 bg-black p-6 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
        onClick={(e) => e.stopPropagation()}
        initial={{ filter: 'blur(8px)' }}
        animate={{ filter: 'blur(0px)' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#26CCC2]">Book a meeting</p>
            <h3 className="mt-2 font-serif text-3xl text-white">Let&apos;s talk about your project</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/20 p-2 text-white transition-colors hover:border-[#26CCC2] hover:text-[#26CCC2]"
            aria-label="Close contact popup"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="group relative flex flex-col gap-2 border-b border-white/20 pb-2">
            <label className="text-[9px] font-bold tracking-[0.3em] text-[#26CCC2] uppercase">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="e.g. John Doe"
              className="w-full bg-transparent py-1 text-sm font-sans font-light text-white placeholder-white/35 focus:outline-none rounded-none"
            />
            <span className="absolute bottom-0 left-0 h-px w-0 bg-[#26CCC2] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within:w-full" />
          </div>

          <div className="group relative flex flex-col gap-2 border-b border-white/20 pb-2">
            <label className="text-[9px] font-bold tracking-[0.3em] text-[#26CCC2] uppercase">Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="e.g. john@example.com"
              className="w-full bg-transparent py-1 text-sm font-sans font-light text-white placeholder-white/35 focus:outline-none rounded-none"
            />
            <span className="absolute bottom-0 left-0 h-px w-0 bg-[#26CCC2] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within:w-full" />
          </div>

          <div className="group relative flex flex-col gap-2 border-b border-white/20 pb-2">
            <label className="text-[9px] font-bold tracking-[0.3em] text-[#26CCC2] uppercase">Your Message</label>
            <textarea
              rows="4"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              placeholder="Tell us about your digital vision..."
              className="w-full resize-none bg-transparent py-1 text-sm font-sans font-light text-white placeholder-white/35 focus:outline-none rounded-none"
            />
            <span className="absolute bottom-0 left-0 h-px w-0 bg-[#26CCC2] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within:w-full" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-3 flex w-full items-center justify-center gap-3 rounded-full bg-[#26CCC2] py-4 font-bold text-[10px] uppercase tracking-[0.25em] text-black transition-all duration-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ContactPopup;
