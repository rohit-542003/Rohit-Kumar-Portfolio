import React from 'react';
import FocusImage from './FocusImage';
import resumePdf from '../img/Rohit Kumar Prajapati.pdf';

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
    <section className="relative w-full min-h-[100svh] flex flex-col justify-center px-4 sm:px-6 md:px-16 overflow-hidden pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16">
      <style>{`
        @keyframes weight-wave { 0%, 100% { font-variation-settings: "wght" 200; opacity: 0.8; } 50% { font-variation-settings: "wght" 800; opacity: 1; } }
        .gradient-border-mask {
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
      `}</style>

      <div className="w-full max-w-[1060px] mx-auto flex flex-col gap-6 sm:gap-8 md:gap-10">
        {/* Full-width top section for Status and Main Headline */}
        {showMainHeading && (
          <div className="w-full flex flex-col items-start">
            {/* Top Status Indicator - Golden Ratio micro typography & spacing */}
            <div className="flex items-center gap-2 mb-[0.618rem] animate-fade-in-up">
              <span className="relative flex h-2 w-2 ml-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[0.618rem] sm:text-[0.685rem] font-bold uppercase tracking-[0.2em] text-gray-500">Available for work</span>
            </div>

            {/* Jamming with design, code and AI taking full width space - Golden Ratio scaling: Phi^1 (1.618rem) -> Phi^2 (2.618rem) -> Phi^3 (4.236rem) */}
            <h1 className="text-[1.618rem] sm:text-[2.618rem] md:text-[3.236rem] lg:text-[4.236rem] leading-[1.08] tracking-tight text-black w-full mb-[0.382rem]">
              <VariableWeightText text="Jamming with design, code and AI" />
            </h1>
          </div>
        )}

        {/* Content Section Below Heading - Balanced Spacing & Vertically Centered */}
        {(showMainHeading || showImage) && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16 w-full pt-2 sm:pt-4 md:pt-6">
            {/* Left Column (Text, Role Capsules, Action Buttons) */}
            <div className="w-full md:max-w-[580px] lg:max-w-[620px] flex flex-col items-start justify-center">
              {showMainHeading && (
                <p className="text-base sm:text-lg md:text-[1.15rem] leading-[1.6] text-[#4a4a4a] mb-6 md:mb-7 max-w-xl">
                  <span className="block mb-2 sm:mb-3 font-cursive text-3xl sm:text-4xl font-bold text-[#1a1a1a] transform -rotate-2">Hi there!</span>
                  I craft intuitive digital experiences that look good, solve problems, and work seamlessly—with a CS mindset and a passion for emerging technologies.
                </p>
              )}

              {/* Colorized Role Capsules */}
              {showMainHeading && (
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-7 md:mb-8 animate-fade-in-up delay-150">
                  {[
                    { name: "UX Designer", color: "text-blue-500 border-blue-100 bg-blue-50/30" },
                    { name: "UI Designer", color: "text-[#E86A3E] border-orange-100 bg-orange-50/30" },
                    { name: "UX Researcher", color: "text-purple-500 border-purple-100 bg-purple-50/30" },
                    { name: "Creative Developer", color: "text-gray-600 border-gray-200 bg-gray-50/50" }
                  ].map((role) => (
                    <span 
                      key={role.name} 
                      className={`px-3 sm:px-3.5 py-1 sm:py-1.5 border rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-300 cursor-default select-none ${role.color} hover:bg-white hover:shadow-md hover:-translate-y-0.5`}
                    >
                      {role.name}
                    </span>
                  ))}
                </div>
              )}

              {showImage && (
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 animate-fade-in-up delay-300">
                  {/* Primary Button */}
                  <a 
                    href="mailto:uxrohitkumar@gmail.com" 
                    className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-[#282828] text-white border border-black/80 rounded-[40px] overflow-hidden transition-all duration-300 sm:hover:pr-12 active:scale-95 shadow-sm sm:hover:bg-[#1a1a1a] sm:hover:shadow-md text-sm sm:text-base"
                  >
                    {/* Content (Text & Icon) */}
                    <span className="relative z-10 font-normal tracking-normal leading-none sm:blur-[2px] sm:opacity-80 sm:group-hover:blur-none sm:group-hover:opacity-100 transition-all duration-500">Let's Build/Talk</span>
                    <span className="hidden sm:inline-block absolute right-5 opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-10">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>

                    {/* Ambient Soft Shine */}
                    <div className="hidden sm:block absolute inset-0 -translate-x-[150%] group-hover:translate-x-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-none group-hover:transition-transform group-hover:duration-1000 ease-in-out pointer-events-none z-10"></div>
                    
                    {/* Subtle Rainbow Prism Glare */}
                    <div className="hidden sm:block absolute top-0 bottom-0 left-0 w-24 -translate-x-[20rem] group-hover:translate-x-[25rem] bg-[linear-gradient(to_right,transparent,rgba(236,72,153,0.2),rgba(234,179,8,0.2),rgba(59,130,246,0.2),transparent)] skew-x-12 transition-none group-hover:transition-transform group-hover:duration-[1100ms] ease-out pointer-events-none z-10"></div>

                    {/* Hard Sharp Glass Shine */}
                    <div className="hidden sm:block absolute top-0 bottom-0 left-0 w-12 -translate-x-[20rem] group-hover:translate-x-[25rem] bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-12 transition-none group-hover:transition-transform group-hover:duration-[850ms] ease-out pointer-events-none z-10"></div>
                  </a>

                  {/* Secondary Button */}
                  <a 
                    href={resumePdf} 
                    download="Rohit_Kumar_Prajapati_Resume.pdf"
                    className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-transparent border border-black/20 text-[#1a1a1a] rounded-[40px] overflow-hidden transition-all duration-300 sm:hover:border-black sm:hover:pr-12 active:scale-95 text-sm sm:text-base"
                  >
                    <span className="relative z-10 font-normal tracking-normal leading-none">Download Resume / CV</span>
                    <span className="hidden sm:inline-block absolute right-5 opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </span>
                    <div className="hidden sm:block absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] bg-gradient-to-r from-transparent via-black/10 to-transparent skew-x-12 transition-none group-hover:transition-transform group-hover:duration-1000 ease-in-out pointer-events-none"></div>
                  </a>
                </div>
              )}
            </div>

            {/* Right Column - Photo Frame */}
            {showImage && (
              <div className="w-[15.5rem] max-w-full shrink-0 flex items-center justify-center md:justify-end">
                <FocusImage />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;