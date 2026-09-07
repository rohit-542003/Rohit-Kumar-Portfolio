import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-16 pt-24 sm:pt-28 md:pt-36 pb-16 md:pb-28 font-onest">
      
      {/* Top Intro Section */}
      <section className="mb-16 md:mb-24">
        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.236rem] leading-[1.08] tracking-tight font-serif text-[#1a1a1a] mb-8 md:mb-12">
          Building <span className="text-gray-400 italic font-serif">for the future.</span>
        </h1>

        {/* Bio Narrative */}
        <div className="max-w-4xl flex flex-col gap-6 text-base sm:text-lg md:text-xl text-[#4a4a4a] leading-relaxed">
          <p>
            I am a product designer and developer with a passion for creating digital tools that empower people. With a background in Computer Science &amp; Engineering, I bridge the gap between aesthetics and functionality.
          </p>
          <p>
            Currently, I am exploring the intersection of AI and design, looking for new ways to make complex systems feel intuitive, delightful, and human.
          </p>
          <p>
            My background in computer science &amp; engineering taught me to think and play through the system and keep my enthusiasm for cutting-edge technologies high.
          </p>

          <div className="w-16 sm:w-24 h-[1px] bg-black/10 mt-4 md:mt-6"></div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section className="pt-14 md:pt-20 border-t border-black/10">
        <div className="mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#1a1a1a] font-serif leading-[1.1]">
            Work <span className="text-gray-400 italic font-serif">Experience.</span>
          </h2>
          <div className="w-16 sm:w-24 h-[1px] bg-black/10 mt-6 md:mt-8"></div>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl pl-6 sm:pl-8 md:pl-10 space-y-12">
          {/* Continuous Vertical Timeline Line */}
          <div className="absolute left-0 top-3 bottom-2 w-[1px] bg-black/15"></div>

          {/* Outsource Studios Work Experience Item */}
          <div className="relative group">
            {/* Timeline Node Marker */}
            <div className="absolute -left-[29px] sm:-left-[37px] md:-left-[45px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#E86A3E] bg-white group-hover:bg-[#E86A3E] transition-colors z-10"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 mb-2">
              <h4 className="text-xl sm:text-2xl md:text-3xl font-serif text-[#1a1a1a]">
                UI/UX Designer &amp; Creative Developer — <a 
                  href="https://outsourcestudios.co" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#E86A3E] hover:underline inline-flex items-center gap-1 font-serif"
                >
                  Outsource Studios
                  <svg className="w-3.5 h-3.5 inline-block -mt-0.5 opacity-70 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </h4>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/50 shrink-0">
                Sept 2025 – July 2026
              </span>
            </div>
            
            <p className="text-sm sm:text-base md:text-lg text-[#4a4a4a] mb-4 leading-relaxed max-w-3xl">
              Collaborated with a small freelance team to deliver 5+ client projects spanning UI/UX design, web development, and AI-assisted interactive prototyping.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-block px-3 py-1 border border-black/10 rounded-full font-bold text-[10px] uppercase tracking-widest text-[#1a1a1a]/60">
                Freelance Agency
              </div>
              <a 
                href="https://outsourcestudios.co" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 bg-black/5 hover:bg-[#E86A3E] hover:text-white rounded-full font-bold text-[10px] uppercase tracking-widest text-[#1a1a1a]/70 transition-all duration-300"
              >
                <span>outsourcestudios.co</span>
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
