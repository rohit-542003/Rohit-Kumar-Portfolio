import React, { useState, useEffect } from 'react';

interface HeaderProps {
  currentView: string;
  isCaseStudy?: boolean;
  onNavigate: (view: any) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, isCaseStudy, onNavigate }) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    if (currentView !== 'home') {
      setActiveSection(currentView);
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      const sections = isCaseStudy
        ? ['overview', 'research', 'define', 'architecture', 'design', 'outcome']
        : ['work', 'contact'];

      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            current = section;
          }
        }
      }
      setActiveSection(current || 'home');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isCaseStudy, currentView]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#F4F4F4]/90 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 h-20 flex items-center justify-between">

        {!isCaseStudy ? (
          <div className="relative group hover:scale-105 transition-transform duration-300 -rotate-2 mt-2">
            <div className="absolute inset-0 border-2 border-[#18A0FB] pointer-events-none" />
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border-2 border-[#18A0FB] z-10" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border-2 border-[#18A0FB] z-10" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border-2 border-[#18A0FB] z-10" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border-2 border-[#18A0FB] z-10" />

            <button
              onClick={() => onNavigate('home')}
              className="relative z-0 text-xl font-bold tracking-tight text-[#1a1a1a] font-serif hover:text-[#18A0FB] transition-colors px-3 py-1 bg-transparent"
            >
              Rohit.
            </button>
          </div>
        ) : (
          <button 
                onClick={() => onNavigate('home')}
                className="group flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-[#1a1a1a] transition-colors"
            >
                <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span>
                Back to Home
            </button>
        )}

        {/* Dynamic Navigation Links */}
        <nav className="flex items-center gap-6 md:gap-10">
          {!isCaseStudy && (
            <>
              <button
                onClick={() => onNavigate('home', 'work')}
                className={`text-[10px] md:text-sm uppercase tracking-widest transition-colors ${activeSection === 'home' || activeSection === 'work' ? 'font-bold text-[#1a1a1a]' : 'font-bold text-gray-400 hover:text-[#E86A3E]'
                  }`}
              >
                Work
              </button>
              <button
                onClick={() => onNavigate('about')}
                className={`text-[10px] md:text-sm uppercase tracking-widest transition-colors ${activeSection === 'about' ? 'font-bold text-[#1a1a1a]' : 'font-bold text-gray-400 hover:text-[#E86A3E]'
                  }`}
              >
                About
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className={`text-[10px] md:text-sm uppercase tracking-widest transition-colors ${activeSection === 'contact' ? 'font-bold text-[#1a1a1a]' : 'font-bold text-gray-400 hover:text-[#E86A3E]'
                  }`}
              >
                Contact
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
