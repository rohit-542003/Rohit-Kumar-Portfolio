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
    <section className="relative w-full px-5 pt-20 pb-12 md:px-16 md:pt-24 md:pb-20 max-w-[1400px] mx-auto font-onest">
      <style>{`
        @keyframes weight-wave { 0%, 100% { font-variation-settings: "wght" 200; opacity: 0.8; } 50% { font-variation-settings: "wght" 800; opacity: 1; } }
      `}</style>

      <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-16 mt-4 md:mt-6 w-full max-w-[1200px] mx-auto">
        {/* Left Column - All Text */}
        <div className={`w-full flex flex-col order-2 md:order-1 flex-grow ${showImage ? 'md:max-w-2xl' : 'max-w-4xl'}`}>
          {/* Top Status Indicator - Minimalist as requested */}
          {showMainHeading && (
            <div className="flex items-center gap-2.5 mb-6 md:mb-8 animate-fade-in-up">
                  <span className="relative flex h-2 w-2 ml-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Available for work</span>
            </div>
          )}

          {showMainHeading && (
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-[4.5rem] leading-[1.0] tracking-tight text-black w-full mb-6 md:mb-8">
              <VariableWeightText text="Jamming with design, code and AI." />
            </h1>
          )}



          {showMainHeading && (
            <div className="relative text-lg md:text-2xl leading-relaxed space-y-4 md:space-y-6 text-[#4a4a4a] mb-8">
              <p>Crafting intuitive digital experiences through designs that not just looks good but also solve problems.</p>
              <p>My background in computer science & engineering taught me to think and play through the system and keep my enthusiasm for cutting edge technologies high.</p>
            </div>
          )}

          {/* Colorized Role Capsules - Repositioned below paragraph */}
          {showMainHeading && (
            <div className="flex flex-wrap gap-3 mb-10 md:mb-14 animate-fade-in-up delay-150">
                  {[
                    { name: "UX Designer", color: "text-blue-500 border-blue-100 bg-blue-50/30" },
                    { name: "UI Designer", color: "text-[#E86A3E] border-orange-100 bg-orange-50/30" },
                    { name: "UX Researcher", color: "text-purple-500 border-purple-100 bg-purple-50/30" },
                    { name: "Vibe Coder", color: "text-gray-600 border-gray-200 bg-gray-50/50" }
                  ].map((role) => (
                      <span 
                          key={role.name} 
                          className={`px-3.5 py-1.5 border rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-default select-none ${role.color} hover:bg-white hover:shadow-md hover:-translate-y-0.5`}
                      >
                          {role.name}
                      </span>
                  ))}
            </div>
          )}

          {showImage && (
            <div className="flex animate-fade-in-up delay-300">
                <a 
                    href="#" 
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#1a1a1a] text-white rounded-full overflow-hidden transition-all duration-300 hover:pr-12 active:scale-95"
                    onClick={(e) => e.preventDefault()}
                >
                    <span className="relative z-10 font-bold uppercase tracking-widest text-xs">Download Resume / CV</span>
                    <span className="absolute right-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </span>
                </a>
            </div>
          )}
        </div>

        {/* Right Column - Image Container */}
        {showImage && (
          <div className="w-full md:w-[300px] flex-shrink-0 flex justify-center order-1 md:order-2">
            <FocusImage />
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;