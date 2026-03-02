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

const Hero: React.FC = () => {
  return (
    <section className="relative w-full px-5 pt-20 pb-4 md:px-16 md:pt-24 md:pb-8 max-w-[1400px] mx-auto font-onest">
      <style>{`
        @keyframes weight-wave { 0%, 100% { font-variation-settings: "wght" 200; opacity: 0.8; } 50% { font-variation-settings: "wght" 800; opacity: 1; } }
      `}</style>
      
      {/* Title Container - Compact margins */}
      <div className="mb-6 md:mb-8 mt-4 md:mt-6">
        
        {/* Status Badge */}
        <div className="flex items-center gap-3 mb-3 md:mb-5 animate-fade-in-up">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-gray-500">Available for work</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.0] tracking-tight text-black w-full">
          <VariableWeightText text="Jamming with design, code and AI." />
        </h1>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
        <div className="md:col-span-7 flex flex-col justify-between h-full order-2 md:order-1">
          <div className="relative w-full max-w-2xl text-lg md:text-2xl leading-relaxed space-y-4 md:space-y-6 text-[#4a4a4a]">
                <p>Crafting intuitive digital experiences through designs that not just looks good but also solve problems.</p>
                <p>My background in computer science & engineering taught me to think and play through the system and keep my enthusiasm for cutting edge technologies high.</p>
          </div>
        </div>
        <div className="md:col-span-5 flex justify-center md:justify-end order-1 md:order-2 mb-2 md:mb-0 w-full">
          <FocusImage />
        </div>
      </div>
    </section>
  );
};

export default Hero;