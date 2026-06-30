import React, { useState, useRef } from 'react';
import Magnetic from './Magnetic';
import FAQ from './FAQ';
import { ArrowRight, MessageSquare, ShieldCheck, Pencil, CheckCircle, Smartphone, CheckCircle2 } from 'lucide-react';

const foundations = [
  {
    id: 'basic',
    title: '02 – 05 Pages',
    description: 'Ideal for portfolio sites.',
    subtext: 'A simple, elegant website to showcase your work and make a strong first impression.',
    examples: 'Portfolios, Freelancers, Small Local Shops',
    price: 25000,
    priceLabel: 'STARTING AT',
  },
  {
    id: 'advanced',
    title: '05+ Pages',
    description: 'Ideal for e-commerce and business websites.',
    subtext: 'More space, more flexibility. Perfect for growing businesses and online stores.',
    examples: 'E-Commerce, SaaS Startups, Corporate Agencies',
    price: 40000,
    priceLabel: 'STARTING AT',
  }
];

const modules = [
  {
    id: 'backend',
    title: 'Backend + Dynamic Site',
    description: 'Add a powerful backend to manage your content, products, and data easily.',
    subtext: 'Perfect if you need forms, user logins, bookings or any dynamic features.',
    examples: 'Content Platforms, Booking Systems, Member Portals',
    price: 30000,
    priceLabel: '+',
    isMonthly: false
  },
  {
    id: 'branding',
    title: 'Branding + Marketing',
    description: 'Build a strong brand presence and reach the right audience.',
    subtext: 'Includes brand identity, SEO setup, and marketing strategy to grow your business.',
    examples: 'New Startups, Major Rebrands, Competitive Niches',
    price: 12000,
    priceLabel: 'STARTING AT',
    isMonthly: true,
    suffix: '/ month'
  },
  {
    id: 'animation',
    title: 'Web Animation',
    description: 'Bring your website to life with smooth, engaging animations.',
    subtext: 'Enhances user experience and leaves a lasting impression.',
    examples: 'Creative Agencies, Premium Brands, Tech Innovators',
    price: 10000,
    priceLabel: '+',
    isMonthly: false
  }
];

const appFeatures = [
  { label: 'Custom UI/UX Design', desc: 'Pixel-perfect screens crafted for iOS & Android' },
  { label: 'Cross-Platform Development', desc: 'Built with React Native for both platforms' },
  { label: 'Authentication & Onboarding', desc: 'Secure login, sign-up, and user onboarding flows' },
  { label: 'API & Backend Integration', desc: 'Fully connected to your data and third-party services' },
  { label: '2 Months Free Maintenance', desc: 'Post-launch support and bug fixes included' },
  { label: 'Up to 3 Free Revisions', desc: 'Refine until the product is exactly as you envisioned' },
  { label: 'App Store Submission Guidance', desc: 'We guide you through the Play Store & App Store process' },
];

const MvpCard = ({ isSelected, onSelect }) => (
  <div
    onClick={onSelect}
    className={`flex flex-col md:flex-row md:items-center border rounded-xl p-6 md:p-8 cursor-pointer bg-black ${isSelected ? 'border-[#26CCC2] border-4' : 'border-black'}`}
  >
    {/* Radio & Icon & Title */}
    <div className="flex items-center gap-6 md:w-1/3 mb-4 md:mb-0">
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'border-[#26CCC2]' : 'border-white/40'}`}>
        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#26CCC2]" />}
      </div>
      <div className="flex items-center gap-3">
        <Smartphone className="w-5 h-5 text-[#26CCC2] shrink-0" />
        <h3 className="font-serif text-xl md:text-2xl text-white">Mobile App MVP</h3>
      </div>
    </div>

    <div className="hidden md:block w-px h-16 bg-white/10 mx-6 shrink-0" />

    {/* Description */}
    <div className="flex-1 mb-4 md:mb-0 md:pr-6">
      <p className="font-bold text-sm text-white mb-1">Mobile App Development</p>
      <p className="text-sm text-white/60 leading-relaxed mb-2">A fully functional mobile app MVP built for iOS & Android. Designed, developed, and delivered end-to-end.</p>
      <p className="text-xs font-bold tracking-wide text-[#26CCC2] uppercase">Startups, Founders, Product Teams</p>
    </div>

    <div className="hidden md:block w-px h-16 bg-white/10 mx-6 shrink-0" />

    {/* Price */}
    <div className="md:w-40 shrink-0 text-left md:text-right flex flex-col justify-center">
      <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/50 mb-1">STARTING AT</span>
      <span className="font-serif text-2xl md:text-3xl font-medium text-white">₹1,50,000</span>
    </div>
  </div>
);



const Pricing = () => {
  const [selectedFoundation, setSelectedFoundation] = useState('advanced');
  const [selectedModules, setSelectedModules] = useState([]);
  const isMVP = selectedFoundation === 'mvp';

  const [currencyCode, setCurrencyCode] = useState('INR');
  const [exchangeRate, setExchangeRate] = useState(1);

  React.useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const ipRes = await fetch('https://ipapi.co/json/');
        const ipData = await ipRes.json();
        const userCurrency = ipData.currency || 'INR';
        if (userCurrency !== 'INR') {
          const rateRes = await fetch('https://open.er-api.com/v6/latest/INR');
          const rateData = await rateRes.json();
          const rate = rateData.rates[userCurrency] || 1;
          setCurrencyCode(userCurrency);
          setExchangeRate(rate);
        }
      } catch (error) {
        console.error("Currency auto-conversion failed. Defaulting to INR.", error);
      }
    };
    fetchCurrency();
  }, []);

  const formatCurrency = (num) => {
    const converted = Math.round(num * exchangeRate);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 0
    }).format(converted);
  };

  const toggleModule = (id) => {
    setSelectedModules(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    let total = 0;
    const foundation = foundations.find(f => f.id === selectedFoundation);
    if (foundation) total += foundation.price;
    selectedModules.forEach(modId => {
      const mod = modules.find(m => m.id === modId);
      if (mod && !mod.isMonthly) total += mod.price;
    });
    return total;
  };

  const calculateMonthly = () => {
    let monthly = 0;
    selectedModules.forEach(modId => {
      const mod = modules.find(m => m.id === modId);
      if (mod && mod.isMonthly) monthly += mod.price;
    });
    return monthly;
  };

  const totalFixed = calculateTotal();
  const totalMonthly = calculateMonthly();

  const handleFoundationSelect = (id) => {
    setSelectedFoundation(id);
    if (id === 'mvp') setSelectedModules([]);
  };

  return (
    <main className="w-full min-h-screen bg-[#FAF8F6] pt-32 pb-24 relative z-20 font-sans text-gray-900">
      <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-16">

        {/* Step 01: Foundation */}
        <section>
          <div className="mb-6">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black">Step 01</span>
            <h2 className="font-serif text-3xl md:text-4xl text-black mt-2 mb-2">Choose Your Foundation</h2>
            <p className="text-gray-500 text-sm">Pick the perfect starting point for your project.</p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Standard website cards */}
            {foundations.map((item) => {
              const isSelected = selectedFoundation === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => handleFoundationSelect(item.id)}
                  className={`flex flex-col md:flex-row md:items-center border rounded-xl p-6 md:p-8 cursor-pointer transition-all duration-300 ${isSelected ? 'bg-[#26CCC2]/5 border-[#26CCC2]' : 'bg-white hover:bg-gray-50/50 border-gray-200'}`}
                >
                  {/* Radio & Title */}
                  <div className="flex items-center gap-6 md:w-1/3 mb-4 md:mb-0">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'border-[#26CCC2]' : 'border-gray-300'}`}>
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#26CCC2]" />}
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl">{item.title}</h3>
                  </div>

                  <div className="hidden md:block w-px h-16 bg-gray-200 mx-6 shrink-0" />

                  {/* Description */}
                  <div className="flex-1 mb-4 md:mb-0 md:pr-6">
                    <p className="font-bold text-sm text-black mb-1">{item.description}</p>
                    <p className="text-sm text-gray-500 leading-relaxed mb-2">{item.subtext}</p>
                    <p className="text-xs font-bold tracking-wide text-[#26CCC2] uppercase">{item.examples}</p>
                  </div>

                  <div className="hidden md:block w-px h-16 bg-gray-200 mx-6 shrink-0" />

                  {/* Price */}
                  <div className="md:w-40 shrink-0 text-left md:text-right flex flex-col justify-center">
                    <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-black mb-1">{item.priceLabel}</span>
                    <span className="font-serif text-2xl md:text-3xl font-medium">{formatCurrency(item.price)}</span>
                  </div>
                </div>
              );
            })}

            {/* MVP Card — Mobile App Development */}
            {(() => {
              const isSelected = selectedFoundation === 'mvp';
              return (
                <MvpCard
                  isSelected={isSelected}
                  onSelect={() => handleFoundationSelect('mvp')}
                />
              );
            })()}
          </div>
        </section>

        {/* ─── WEBSITE FLOW (Steps 2 & 3) ─── */}
        <div className={`flex flex-col gap-16 transition-all duration-500 ${isMVP ? 'opacity-0 pointer-events-none h-0 overflow-hidden' : 'opacity-100'}`}>

          {/* Separator */}
          <hr className="border-gray-200" />

          {/* Step 02: Enhance */}
          <section>
            <div className="mb-6">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black">Step 02</span>
              <h2 className="font-serif text-3xl md:text-4xl text-black mt-2 mb-2">Enhance The System</h2>
              <p className="text-gray-500 text-sm">Add optional modules to extend functionality.</p>
            </div>

            <div className="flex flex-col gap-4">
              {modules.map((item) => {
                const isSelected = selectedModules.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleModule(item.id)}
                    className={`flex flex-col md:flex-row md:items-center border rounded-xl p-6 md:p-8 cursor-pointer transition-all duration-300 ${isSelected ? 'bg-[#26CCC2]/5 border-[#26CCC2]' : 'bg-white hover:bg-gray-50/50 border-gray-200'}`}
                  >
                    {/* Checkbox & Title */}
                    <div className="flex items-center gap-6 md:w-1/3 mb-4 md:mb-0">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'border-[#26CCC2]' : 'border-gray-300'}`}>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#26CCC2]" />}
                      </div>
                      <h3 className="font-serif text-xl md:text-2xl">{item.title}</h3>
                    </div>

                    <div className="hidden md:block w-px h-16 bg-gray-200 mx-6 shrink-0" />

                    {/* Description */}
                    <div className="flex-1 mb-4 md:mb-0 md:pr-4 flex gap-4 items-start">
                      <div>
                        <p className="font-bold text-sm text-black mb-1">{item.description}</p>
                        <p className="text-sm text-gray-500 leading-relaxed mb-2">{item.subtext}</p>
                        <p className="text-xs font-bold tracking-wide text-[#26CCC2] uppercase">{item.examples}</p>
                      </div>
                    </div>

                    <div className="hidden md:block w-px h-16 bg-gray-200 mx-6 shrink-0" />

                    {/* Price */}
                    <div className="md:w-40 shrink-0 text-left md:text-right flex flex-col justify-center">
                      {item.priceLabel !== '+' && <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-black mb-1">{item.priceLabel}</span>}
                      <div className="flex items-baseline md:justify-end gap-1">
                        {item.priceLabel === '+' && <span className="text-lg font-serif">+</span>}
                        <span className="font-serif text-2xl md:text-3xl font-medium whitespace-nowrap">
                          {formatCurrency(item.price)}
                          {item.suffix && <span className="text-sm md:text-base text-gray-400 font-sans tracking-normal ml-1.5">{item.suffix}</span>}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Step 03: Summary & Benefits */}
          <section className="bg-gray-50 rounded-2xl p-8 md:p-10 flex flex-col lg:flex-row gap-12 lg:gap-8 border border-gray-200 mt-4">

            {/* Left Side: Benefits */}
            <div className="flex-1">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black">Step 03</span>
              <h2 className="font-serif text-2xl md:text-3xl text-black mt-2 mb-4">Everything You Need. Built In.</h2>
              <p className="text-gray-500 text-sm max-w-md leading-relaxed mb-10">
                Every project includes the essentials to ensure your website runs smoothly and your experience is effortless.
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex flex-col gap-3">
                  <MessageSquare className="w-6 h-6 text-[#26CCC2]" />
                  <span className="text-xs font-bold leading-tight">24/7<br/>Support</span>
                </div>
                <div className="flex flex-col gap-3">
                  <ShieldCheck className="w-6 h-6 text-indigo-500" />
                  <span className="text-xs font-bold leading-tight">02 Months<br/>Free Maintenance</span>
                </div>
                <div className="flex flex-col gap-3">
                  <Pencil className="w-6 h-6 text-purple-500" />
                  <span className="text-xs font-bold leading-tight">Up to 03<br/>Free Revisions</span>
                </div>
                <div className="flex flex-col gap-3">
                  <CheckCircle className="w-6 h-6 text-orange-400" />
                  <span className="text-xs font-bold leading-tight">Guidance &<br/>Handover</span>
                </div>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block w-px bg-gray-200" />

            {/* Right Side: Total & CTA */}
            <div className="lg:w-72 flex flex-col justify-center">
              <span className="text-xs font-bold text-gray-600 mb-2">Estimated Cost</span>
              <div className="flex flex-col gap-1 mb-4">
                <span className="font-serif text-4xl md:text-5xl font-medium tracking-tight">
                  {formatCurrency(totalFixed)}
                </span>
                {totalMonthly > 0 && (
                  <span className="text-sm font-medium text-gray-500">
                    + {formatCurrency(totalMonthly)} / month
                  </span>
                )}
              </div>
              <p className="text-[10px] text-gray-400 mb-8">Excludes taxes and domain/hosting.</p>

              <Magnetic strength={0.15} range={20}>
                <a href="mailto:gshamik14@gmail.com" className="w-full py-4 rounded-full bg-black text-white font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#26CCC2] hover:text-black transition-colors duration-300 group cursor-none">
                  BOOK A MEETING
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Magnetic>
            </div>
          </section>
        </div>

        {/* ─── MVP CHECKOUT (shown when MVP is selected) ─── */}
        <div className={`transition-all duration-500 ${isMVP ? 'opacity-100' : 'opacity-0 pointer-events-none h-0 overflow-hidden'}`}>
          <section className="bg-black rounded-2xl p-8 md:p-10 flex flex-col lg:flex-row gap-12 lg:gap-8 border border-gray-800">

            {/* Left: What's included */}
            <div className="flex-1">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">What's Included</span>
              <h2 className="font-serif text-2xl md:text-3xl text-white mt-2 mb-2">Your Mobile App, End-to-End.</h2>
              <p className="text-white/50 text-sm max-w-md leading-relaxed mb-8">
                We handle everything from design to deployment — so you can focus on your vision, not the technical details.
              </p>

              <div className="flex flex-col gap-4">
                {appFeatures.map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#26CCC2]/10 border border-[#26CCC2]/30 flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-[#26CCC2]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white leading-tight">{feature.label}</p>
                      <p className="text-xs text-white/45 mt-0.5">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block w-px bg-white/10" />

            {/* Right: Price & CTA */}
            <div className="lg:w-72 flex flex-col justify-center">
              <span className="text-xs font-bold text-white/40 mb-2 uppercase tracking-wider">Starting At</span>
              <div className="flex flex-col gap-1 mb-2">
                <span className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-white">
                  {formatCurrency(150000)}
                </span>
              </div>
              <p className="text-[10px] text-white/30 mb-8 leading-relaxed">
                Final price depends on complexity and features.<br />Excludes App Store fees.
              </p>

              <Magnetic strength={0.15} range={20}>
                <a href="mailto:gshamik14@gmail.com" className="w-full py-4 rounded-full bg-white text-black font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#26CCC2] hover:text-black transition-colors duration-300 group cursor-none">
                  BOOK A MEETING
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Magnetic>

              <p className="text-[10px] text-white/25 mt-4 text-center">No obligation. We'll scope it together.</p>
            </div>
          </section>
        </div>

        {/* FAQ Section */}
        <FAQ />

      </div>
    </main>
  );
};

export default Pricing;
