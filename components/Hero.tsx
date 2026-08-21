import React from 'react';
import FocusImage from './FocusImage';

const VariableWeightText: React.FC<{ text: string }> = ({ text }) => {
  const words = text.split(" ");
  let globalCharIndex = 0;

  return (
    <span className="inline">
      {words.map((word, wIndex) => {
        const startIndex = globalCharIndex;
        globalCharIndex += word.length;
        return (
          <span key={wIndex} className="inline-block whitespace-nowrap mr-[0.25em] last:mr-0 align-top">
            {word.split("").map((char, cIndex) => (
              <span
                key={cIndex}
                className="inline-block will-change-[font-variation-settings] transition-colors"
                style={{
                  animation: `weight-wave 5.5s ease-in-out infinite`,
                  animationDelay: `${(startIndex + cIndex) * 0.15}s`,
                  whiteSpace: 'pre'
                }}
              >
                {char}
              </span>
            ))}
          </span>
        );
      })}
    </span>
  );
};

interface HeroProps {
  showImage?: boolean;
  showMainHeading?: boolean;
}

const Hero: React.FC<HeroProps> = ({ showImage = true, showMainHeading = true }) => {
  return (
    <section className="relative w-full px-[1rem] pt-[4.236rem] pb-[2.618rem] md:px-[4.236rem] md:pt-[6.854rem] md:pb-[4.236rem] max-w-[1400px] mx-auto font-onest">
      <style>{`
        @keyframes weight-wave { 0%, 100% { font-variation-settings: "wght" 200; opacity: 0.8; } 50% { font-variation-settings: "wght" 800; opacity: 1; } }
        .gradient-border-mask {
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
      `}</style>

      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-[1.618rem] md:gap-[2.618rem] mt-[1rem] md:mt-[1.618rem] w-full max-w-[1200px] mx-auto">
        {/* Left Column - All Text (Golden Ratio 61.8%) */}
        <div className={`w-full flex flex-col order-2 md:order-1 ${showImage ? 'md:w-[61.8%]' : 'max-w-4xl'}`}>
          {/* Top Status Indicator - Minimalist as requested */}
          {showMainHeading && (
            <div className="flex items-center gap-[0.618rem] mb-[1.618rem] md:mb-[1.618rem] animate-fade-in-up">
                  <span className="relative flex h-2 w-2 ml-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-[0.618rem] font-bold uppercase tracking-[0.2em] text-gray-500">Available for work</span>
            </div>
          )}

          {showMainHeading && (
            <h1 className="text-[2.618rem] md:text-[4.236rem] leading-[1.0] tracking-tight text-black w-full mb-[1.618rem] md:mb-[2.618rem]">
              <VariableWeightText text="Jamming with design, code and AI." />
            </h1>
          )}



          {showMainHeading && (
            <div className="relative text-[1rem] md:text-[1.618rem] leading-relaxed space-y-[1rem] md:space-y-[1.618rem] text-[#4a4a4a] mb-[2.618rem]">
              <p>Crafting intuitive digital experiences through designs that not just looks good but also solve problems.</p>
            </div>
          )}

          {/* Colorized Role Capsules - Repositioned below paragraph */}
          {showMainHeading && (
            <div className="flex flex-wrap gap-[0.618rem] mb-[2.618rem] md:mb-[4.236rem] animate-fade-in-up delay-150">
                  {[
                    { name: "UX Designer", color: "text-blue-500 border-blue-100 bg-blue-50/30" },
                    { name: "UI Designer", color: "text-[#E86A3E] border-orange-100 bg-orange-50/30" },
                    { name: "UX Researcher", color: "text-purple-500 border-purple-100 bg-purple-50/30" },
                    { name: "Vibe Coder", color: "text-gray-600 border-gray-200 bg-gray-50/50" }
                  ].map((role) => (
                      <span 
                          key={role.name} 
                          className={`px-[1rem] py-[0.382rem] border rounded-full text-[0.618rem] font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-default select-none ${role.color} hover:bg-white hover:shadow-md hover:-translate-y-[0.382rem]`}
                      >
                          {role.name}
                      </span>
                  ))}
            </div>
          )}

          {showImage && (
            <div className="flex flex-wrap items-center gap-[1rem] animate-fade-in-up delay-300">
                {/* Primary Button */}
                <a 
                    href="#" 
                    className="group relative inline-flex items-center gap-[0.618rem] px-[1.618rem] py-[1rem] bg-[#282828] text-white border border-black/80 rounded-[40px] overflow-hidden transition-all duration-300 hover:pr-[4.236rem] active:scale-95 shadow-sm hover:bg-[#1a1a1a] hover:shadow-md"
                    onClick={(e) => e.preventDefault()}
                >
                    {/* Content (Text & Icon) */}
                    <span className="relative z-10 text-[1rem] font-normal tracking-normal leading-none blur-[2px] opacity-80 group-hover:blur-none group-hover:opacity-100 transition-all duration-500">Let's Build/Talk</span>
                    <span className="absolute right-[1.618rem] opacity-0 translate-x-[1rem] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-10">
                        <svg className="w-[1rem] h-[1rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>

                    {/* Ambient Soft Shine (Uses inset-0 so % translation works across full button width) */}
                    <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-none group-hover:transition-transform group-hover:duration-1000 ease-in-out pointer-events-none z-10"></div>
                    
                    {/* Subtle Rainbow Prism Glare */}
                    <div className="absolute top-0 bottom-0 left-0 w-24 -translate-x-[20rem] group-hover:translate-x-[25rem] bg-[linear-gradient(to_right,transparent,rgba(236,72,153,0.2),rgba(234,179,8,0.2),rgba(59,130,246,0.2),transparent)] skew-x-12 transition-none group-hover:transition-transform group-hover:duration-[1100ms] ease-out pointer-events-none z-10"></div>

                    {/* Hard Sharp Glass Shine */}
                    <div className="absolute top-0 bottom-0 left-0 w-12 -translate-x-[20rem] group-hover:translate-x-[25rem] bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-12 transition-none group-hover:transition-transform group-hover:duration-[850ms] ease-out pointer-events-none z-10"></div>
                </a>

                {/* Secondary Button */}
                <a 
                    href="#" 
                    className="group relative inline-flex items-center gap-[0.618rem] px-[1.618rem] py-[1rem] bg-transparent border border-black/20 text-[#1a1a1a] rounded-[40px] overflow-hidden transition-all duration-300 hover:border-black hover:pr-[4.236rem] active:scale-95"
                    onClick={(e) => e.preventDefault()}
                >
                    <span className="relative z-10 text-[1rem] font-normal tracking-normal leading-none">Download Resume / CV</span>
                    <span className="absolute right-[1.618rem] opacity-0 translate-x-[1rem] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <svg className="w-[1rem] h-[1rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </span>
                    <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] bg-gradient-to-r from-transparent via-black/10 to-transparent skew-x-12 transition-none group-hover:transition-transform group-hover:duration-1000 ease-in-out pointer-events-none"></div>
                </a>
            </div>
          )}
        </div>

        {/* Right Column - Image Container (Golden Ratio 38.2%) */}
        {showImage && (
          <div className="w-full md:w-[38.2%] flex justify-center md:justify-start order-1 md:order-2">
            <div className="w-full max-w-[400px] flex justify-center md:justify-start">
              <FocusImage />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;