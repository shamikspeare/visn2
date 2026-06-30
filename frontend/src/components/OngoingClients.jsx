import React from 'react';

const OngoingClients = () => {
  const clients = [
    { id: 1, title: 'Trincas', image: '/images/ongoing1.png' },
    { id: 2, title: 'Art Rickshaw', image: '/images/ongoing2.png' },
  ];

  return (
    <section
      className="bg-[#0A0A0A] w-[calc(100%-2rem)] md:w-full mx-auto flex flex-col py-12 md:py-24 relative z-40 my-8 md:my-0 rounded-[2rem] md:rounded-none"
      id="ongoing-clients"
    >
      <div className="w-full flex justify-center mb-12">
        <h2
          className="font-sans font-bold text-center text-white leading-tight uppercase tracking-[0.15em]"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
        >
          Ongoing Clients<span className="text-[#26CCC2]">.</span>
        </h2>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-8 px-6 md:px-16 lg:px-24 max-w-[1800px] mx-auto justify-center">
        {clients.map((client) => (
          <div
            key={client.id}
            className="w-full md:w-1/2 flex flex-col gap-2 md:gap-5 group cursor-pointer"
          >
            <div className="w-full overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-xl border border-white/10 relative" style={{ aspectRatio: '16/9' }}>
              <img
                src={client.image}
                alt={client.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="px-2 flex items-center justify-between">
              <h3 className="text-2xl md:text-3xl font-sans font-bold text-white uppercase tracking-wide">
                {client.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OngoingClients;
