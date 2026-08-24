import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "How much does a project cost?",
    answer: "Our projects start at ₹25,000. Every business has different requirements, so the final investment depends on the scope, features, and services you choose. You can explore our pricing or book a consultation for a tailored estimate."
  },
  {
    question: "How long does a project take?",
    answer: "Most websites are completed within 2–6 weeks. Larger projects with branding, custom development, or marketing may take longer depending on complexity."
  },
  {
    question: "Will I own my website after it's completed?",
    answer: "Yes. Once the project is complete, we provide full ownership of the website along with all necessary files, documentation, and guidance so you can manage it independently."
  },
  {
    question: "Can you redesign our existing website?",
    answer: "Absolutely. Whether your current website needs a visual refresh, better performance, or a complete rebuild, we can redesign it while preserving what matters most to your business."
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes. Every project includes two months of complimentary maintenance, technical support, and up to three revisions after launch. We also offer long-term support plans for businesses that require continuous updates and improvements."
  },
  {
    question: "Do you only build websites?",
    answer: "No. We also help businesses with:\n\n• Branding\n• Mobile app development\n• SEO\n• Digital marketing\n• Custom business systems\n\nOur goal is to build complete digital systems—not just websites."
  },
  {
    question: "Can you help if we don't know exactly what we need?",
    answer: "Definitely. Most clients come to us with a business goal rather than a technical specification. We'll recommend the right solution based on your objectives, requirements, and budget."
  },
  {
    question: "What industries do you work with?",
    answer: "We primarily work with:\n\n• Hotels & Homestays\n• Restaurants & Cafés\n• Lifestyle Brands\n• Healthcare\n• Startups\n• Creative Businesses\n• Service Companies\n\nWe're always open to collaborating with businesses outside these industries."
  },
  {
    question: "What happens after we book a meeting?",
    answer: "We'll discuss your business, understand your goals, recommend the best solution, provide a realistic timeline, and prepare a transparent proposal—without any obligation."
  },
  {
    question: "Why choose VISN instead of another agency?",
    answer: "We don't treat design, development, branding, and growth as separate services. We bring them together into one cohesive system, creating digital experiences that are built to perform, scale, and deliver measurable business value."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative z-10 pt-16 md:pt-24 px-4 md:px-6 pb-16 md:pb-24 bg-[#FAF8F6]">
      <div className="mb-8 md:mb-10 text-center">
        <h2 className="font-serif text-2xl md:text-5xl text-black mb-2 md:mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">Everything you need to know about our services, pricing, and process.</p>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col gap-3 md:gap-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              onClick={() => toggleFAQ(index)}
              className="bg-black text-white rounded-md overflow-hidden cursor-pointer transition-all duration-300 border border-gray-800 hover:border-gray-600"
            >
              <div className="p-4 md:p-6 flex justify-between items-center gap-3 md:gap-4">
                <h3 className={`font-bold text-base md:text-xl leading-tight transition-colors duration-300 ${isOpen ? 'text-[#26CCC2]' : ''}`}>
                  {faq.question}
                </h3>
                <div className={`shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center transition-colors duration-300 ${isOpen ? 'text-[#26CCC2]' : 'text-white'}`}>
                  {isOpen ? <Minus className="w-3 h-3 md:w-4 md:h-4" /> : <Plus className="w-3 h-3 md:w-4 md:h-4" />}
                </div>
              </div>

              <div
                className={`px-4 md:px-6 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] pb-4 md:pb-6 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
              >
                <div className="text-gray-400 whitespace-pre-line leading-relaxed text-sm md:text-base">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;