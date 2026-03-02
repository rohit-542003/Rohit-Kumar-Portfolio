import React from 'react';

const testimonials = [
  {
    relation: "Manager",
    name: "Dr. Shweta Sinha",
    role: "Multisector Communication, St. John's University",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop", 
    quote: "Managed Rohit and found him to be bright, thorough, and an excellent thinker. His unique yet pragmatic approach to problem-solving, combined with genuine engagement, makes him an invaluable asset."
  },
  {
    relation: "Manager",
    name: "Anezka Virani",
    role: "UX Researcher, Microsoft",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop",
    quote: "Rohit is one of the most talented designers I've worked with. He combines an eye for detail, creative vision, and meticulous documentation with a deep understanding of problem statements."
  },
  {
    relation: "Client",
    name: "Ben Ivey",
    role: "Entrepreneur Consultant",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop",
    quote: "A truly gifted designer. His ability to transform mere concepts into designs that are both simplistic and professional, with a brilliant artistic finish, is nothing short of remarkable."
  },
  {
    relation: "Manager",
    name: "Akhil Desai",
    role: "UX Designer, Canvs",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    quote: "He's a highly organized designer who fosters a positive, productive environment. He is fun with focus, encourages open-ness and learning, and constantly pushes me to deliver better work."
  }
];

const TestimonialsSection = () => {
  return (
    <section className="w-full py-32 bg-[#F4F4F4] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 mb-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <h2 className="text-[2.5rem] md:text-6xl font-normal tracking-tight text-[#1a1a1a] font-serif leading-[0.9]">
           What do<br/>
           <span className="text-gray-400 italic font-serif">people say?</span>
        </h2>
        {/* Decorative line */}
        <div className="hidden md:block w-32 h-[1px] bg-black/10 mb-4"></div>
      </div>
      
      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden">
         {/* Gradient Masks for smooth fade effect */}
         <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-[#F4F4F4] via-[#F4F4F4]/80 to-transparent z-10 pointer-events-none"></div>
         <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-[#F4F4F4] via-[#F4F4F4]/80 to-transparent z-10 pointer-events-none"></div>

         <div className="flex gap-4 md:gap-8 animate-marquee w-max px-6 items-stretch hover:[animation-play-state:paused]">
            {/* Triple the list for smooth infinite loop */}
            {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
               <div 
                key={i} 
                className="w-[270px] md:w-[480px] bg-white p-6 md:p-10 rounded-sm border border-gray-200/60 flex flex-col justify-between shrink-0 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 group select-none"
               >
                  {/* Quote Content */}
                  <div className="mb-6 md:mb-8 relative">
                      {/* Decorative Quote Mark */}
                      <span className="absolute -top-2 md:-top-3 -left-1 text-5xl md:text-6xl text-[#E86A3E] font-serif opacity-20 font-normal leading-none">“</span>
                      <p className="relative text-lg md:text-2xl leading-relaxed text-[#1a1a1a] font-serif font-normal pt-4 md:pt-6 z-10">
                        {t.quote}
                      </p>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 md:gap-4 pt-4 md:pt-6 border-t border-gray-100 mt-auto">
                     <img 
                        src={t.image} 
                        alt={t.name} 
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                     />
                     <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between mb-1">
                            <h4 className="font-bold text-xs md:text-sm uppercase tracking-wider text-[#1a1a1a] font-manrope truncate pr-2">
                                {t.name}
                            </h4>
                            <span className="font-serif italic text-base md:text-lg text-[#1a1a1a]/40 tracking-wide">
                                {t.relation}
                            </span>
                        </div>
                        <p className="text-[10px] md:text-xs text-gray-500 font-medium font-onest truncate">
                            {t.role}
                        </p>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 80s linear infinite;
        }
      `}</style>
    </section>
  )
}

export default TestimonialsSection;