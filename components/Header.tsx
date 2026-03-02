import React, { useState, useEffect } from 'react';

interface HeaderProps {
  isCaseStudy?: boolean;
  onNavigateHome: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ isCaseStudy, onNavigateHome }) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
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
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isCaseStudy]);

  const scrollToCaseStudySection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#F4F4F4]/90 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 h-20 flex items-center justify-between">
        
        {/* Brand Logo - Tilt & Frame style preserved */}
        <div className="relative group hover:scale-105 transition-transform duration-300 -rotate-2 mt-2">
            <div className="absolute inset-0 border-2 border-[#18A0FB] pointer-events-none" />
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border-2 border-[#18A0FB] z-10" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border-2 border-[#18A0FB] z-10" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border-2 border-[#18A0FB] z-10" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border-2 border-[#18A0FB] z-10" />

            <button 
              onClick={() => onNavigateHome('home')}
              className="relative z-0 text-xl font-bold tracking-tight text-[#1a1a1a] font-serif hover:text-[#E86A3E] transition-colors px-3 py-1 bg-transparent"
            >
              Rohit.
            </button>
        </div>

        {/* Dynamic Navigation Links */}
        <nav className="flex items-center gap-6 md:gap-10">
          {!isCaseStudy ? (
            <>
              <button 
                onClick={() => onNavigateHome('work')}
                className={`text-[10px] md:text-sm uppercase tracking-widest transition-colors ${
                  activeSection === 'work' ? 'font-bold text-[#1a1a1a]' : 'font-bold text-gray-400 hover:text-[#E86A3E]'
                }`}
              >
                Work
              </button>
              <button 
                onClick={() => onNavigateHome('contact')}
                className={`text-[10px] md:text-sm uppercase tracking-widest transition-colors ${
                  activeSection === 'contact' ? 'font-bold text-[#1a1a1a]' : 'font-bold text-gray-400 hover:text-[#E86A3E]'
                }`}
              >
                Contact
              </button>
            </>
          ) : (
            <>
               <div className="hidden lg:flex items-center gap-6">
                   {['overview', 'research', 'define', 'design'].map((id) => (
                      <button 
                        key={id}
                        onClick={() => scrollToCaseStudySection(id)}
                        className={`text-[10px] uppercase tracking-widest transition-colors font-bold ${
                          activeSection === id ? 'text-[#3B82F6]' : 'text-gray-400 hover:text-[#1a1a1a]'
                        }`}
                      >
                        {id}
                      </button>
                   ))}
               </div>
               <button 
                onClick={() => onNavigateHome('work')}
                className="text-[10px] md:text-sm uppercase tracking-widest font-bold text-gray-400 hover:text-[#E86A3E] transition-colors flex items-center gap-2"
              >
                <span className="text-lg">←</span> Back
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
