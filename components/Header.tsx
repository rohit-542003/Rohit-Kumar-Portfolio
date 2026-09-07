import React, { useState, useEffect, useRef } from 'react';

interface HeaderProps {
  currentView: string;
  isCaseStudy?: boolean;
  onNavigate: (view: any, section?: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, isCaseStudy, onNavigate }) => {
  const [activeSection, setActiveSection] = useState('');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);
  const mobileContactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const isOutsideDesktop = contactRef.current && !contactRef.current.contains(e.target as Node);
      const isOutsideMobile = mobileContactRef.current && !mobileContactRef.current.contains(e.target as Node);
      
      if (isOutsideDesktop && isOutsideMobile) {
        setIsContactOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (currentView !== 'home') {
      setActiveSection(currentView);
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      const sections = isCaseStudy
        ? ['overview', 'research', 'define', 'architecture', 'design', 'outcome']
        : ['work'];

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

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(type);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <>
    <header className="fixed top-0 left-0 w-full z-50 bg-[#F4F4F4]/90 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-16 h-16 sm:h-20 flex items-center justify-between">

        {!isCaseStudy ? (
          <div className="relative group hover:scale-105 transition-transform duration-300 -rotate-2">
            <div className="absolute inset-0 border-2 border-[#18A0FB] pointer-events-none" />
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border-2 border-[#18A0FB] z-10" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border-2 border-[#18A0FB] z-10" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border-2 border-[#18A0FB] z-10" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border-2 border-[#18A0FB] z-10" />

            <button
              onClick={() => onNavigate('home')}
              className="relative z-0 text-lg sm:text-xl font-bold tracking-tight text-[#1a1a1a] font-serif hover:text-[#18A0FB] transition-colors px-2.5 sm:px-3 py-1 bg-transparent"
            >
              Rohit.
            </button>
          </div>
        ) : (
          <button 
                onClick={() => onNavigate('home')}
                className="group flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-[#1a1a1a] transition-colors"
            >
                <span className="text-base sm:text-lg group-hover:-translate-x-1 transition-transform">←</span>
                Back to Home
            </button>
        )}

        {/* Mobile Hamburger Button */}
        {/* Mobile Hamburger Button */}
        <div className="sm:hidden flex items-center z-[900]">
          <button 
            id="nav-hamburger" 
            aria-label="Toggle navigation" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'transparent', border: 'none', padding: '0px', cursor: 'pointer', 
              width: '44px', height: '44px', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', color: '#1a1a1a', 
              transition: 'color 300ms', WebkitTapHighlightColor: 'transparent', outline: 'none'
            }}
          >
            <svg viewBox="0 0 32 32" width="32" height="32" style={{
              display: 'block', overflow: 'visible', 
              transform: isMobileMenuOpen ? 'rotate(-45deg)' : 'rotate(0deg)', 
              transition: 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1)', 
              color: 'currentcolor'
            }}>
              <path d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{
                strokeDasharray: isMobileMenuOpen ? '20, 300' : '12, 63', 
                strokeDashoffset: isMobileMenuOpen ? '-32.42' : '0', 
                transition: 'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}></path>
              <path d="M7 16 27 16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{
                transition: 'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}></path>
            </svg>
          </button>
        </div>
        
        {/* Dynamic Navigation Links (Desktop) */}
        <nav className="hidden sm:flex items-center gap-4 sm:gap-6 md:gap-10">
          {!isCaseStudy && (
            <>
              <button
                onClick={() => onNavigate('home', 'work')}
                className={`relative flex items-center overflow-hidden w-fit group text-xs sm:text-sm uppercase tracking-widest py-1 ${activeSection === 'home' || activeSection === 'work' ? 'font-bold' : 'font-semibold'}`}
              >
                <span className="opacity-0 pointer-events-none">Work</span>
                <div className={`absolute inset-0 flex items-center justify-center w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-full ${activeSection === 'home' || activeSection === 'work' ? 'text-[#1a1a1a]' : 'text-gray-400'}`}>
                  Work
                </div>
                <div className="absolute inset-0 flex items-center justify-center w-full h-full text-[#E86A3E] transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] translate-y-full group-hover:translate-y-0">
                  Work
                </div>
              </button>
              
              <button
                onClick={() => onNavigate('about')}
                className={`relative flex items-center overflow-hidden w-fit group text-xs sm:text-sm uppercase tracking-widest py-1 ${activeSection === 'about' ? 'font-bold' : 'font-semibold'}`}
              >
                <span className="opacity-0 pointer-events-none">About</span>
                <div className={`absolute inset-0 flex items-center justify-center w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-full ${activeSection === 'about' ? 'text-[#1a1a1a]' : 'text-gray-400'}`}>
                  About
                </div>
                <div className="absolute inset-0 flex items-center justify-center w-full h-full text-[#E86A3E] transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] translate-y-full group-hover:translate-y-0">
                  About
                </div>
              </button>

              <div className="relative" ref={contactRef}>
                <button
                  onClick={() => setIsContactOpen(!isContactOpen)}
                  onMouseEnter={() => setIsContactOpen(true)}
                  className="relative flex items-center overflow-hidden w-fit group gap-1 text-xs sm:text-sm uppercase tracking-widest font-semibold py-1"
                >
                  <span className="opacity-0 pointer-events-none flex items-center gap-1">
                    Contact
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </span>
                  
                  <div className="absolute inset-0 flex items-center gap-1 w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-full text-gray-400">
                    Contact
                    <svg className={`w-3 h-3 transition-transform ${isContactOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                  
                  <div className="absolute inset-0 flex items-center gap-1 w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] translate-y-full group-hover:translate-y-0 text-[#E86A3E]">
                    Contact
                    <svg className={`w-3 h-3 transition-transform ${isContactOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </button>
                
                {isContactOpen && (
                  <div 
                    className="absolute top-full right-0 pt-2 w-52 z-50 animate-fadeIn"
                    onMouseLeave={() => setIsContactOpen(false)}
                  >
                    <div className="bg-white border border-black/10 rounded-xl shadow-xl overflow-hidden flex flex-col p-1">
                      <button 
                        onClick={() => handleCopy('uxrohitkumar@gmail.com', 'email')}
                        className="flex items-center justify-between gap-2 px-3.5 py-2.5 text-left text-xs font-bold uppercase tracking-widest text-gray-600 hover:bg-[#F4F4F4] hover:text-[#E86A3E] rounded-lg transition-colors group/btn"
                      >
                        <span className="truncate">{copiedItem === 'email' ? 'Copied!' : 'Copy Email'}</span>
                        {copiedItem === 'email' ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-green-500">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-60 group-hover/btn:opacity-100 transition-opacity">
                             <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                             <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        )}
                      </button>

                      <div className="h-[1px] bg-black/5 mx-2 my-0.5"></div>

                      <button 
                        onClick={() => handleCopy('+91 9108006402', 'phone')}
                        className="flex items-center justify-between gap-2 px-3.5 py-2.5 text-left text-xs font-bold uppercase tracking-widest text-gray-600 hover:bg-[#F4F4F4] hover:text-[#E86A3E] rounded-lg transition-colors group/btn"
                      >
                        <span className="truncate">{copiedItem === 'phone' ? 'Copied!' : '+91 9108006402'}</span>
                        {copiedItem === 'phone' ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-green-500">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-60 group-hover/btn:opacity-100 transition-opacity">
                             <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                             <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {isCaseStudy && (
            <button
              onClick={() => setIsContactOpen(true)}
              className="group flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1a1a1a] text-white hover:bg-[#E86A3E] transition-colors shadow-sm"
              aria-label="Contact"
            >
              <span className="text-sm font-serif">@</span>
            </button>
          )}
        </nav>
      </div>
    </header>

    {/* Mobile Sidebar Overlay */}
    <div 
      className="fixed top-16 sm:top-20 bottom-0 right-0 w-full sm:w-[360px] bg-[#F4F4F4] border-l border-black/5 z-[800] sm:hidden flex flex-col justify-center px-12 transition-transform duration-[600ms] shadow-[0_0_40px_rgba(0,0,0,0.05)]"
      style={{ 
        transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div className="flex flex-col gap-6">
        {['Work', 'About', 'Contact'].map((item, index) => (
          <div 
            key={item}
            ref={item === 'Contact' ? mobileContactRef : null}
            className={item === 'Contact' ? "relative" : ""}
            style={{
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(30px)',
              opacity: isMobileMenuOpen ? 1 : 0,
              transition: `transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 80 + 150}ms, opacity 600ms ease ${index * 80 + 150}ms`
            }}
          >
            <button
              onClick={() => {
                if (item === 'Work') {
                  setIsMobileMenuOpen(false);
                  onNavigate('home');
                }
                else if (item === 'About') {
                  setIsMobileMenuOpen(false);
                  onNavigate('about');
                }
                else if (item === 'Contact') {
                  setIsContactOpen(!isContactOpen);
                }
              }}
              className="relative flex items-center overflow-hidden w-fit group gap-2 text-4xl sm:text-5xl font-bold tracking-tight py-2"
            >
              <span className="opacity-0 pointer-events-none flex items-center gap-2">
                {item}
                {item === 'Contact' && (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                )}
              </span>
              
              <div className="absolute inset-0 flex items-center gap-2 w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-full text-[#1a1a1a]">
                {item}
                {item === 'Contact' && (
                  <svg className={`w-8 h-8 transition-transform ${isContactOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                )}
              </div>
              
              <div className="absolute inset-0 flex items-center gap-2 w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] translate-y-full group-hover:translate-y-0 text-[#18A0FB]">
                {item}
                {item === 'Contact' && (
                  <svg className={`w-8 h-8 transition-transform ${isContactOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                )}
              </div>
            </button>

            {item === 'Contact' && isContactOpen && (
              <div className="mt-4 animate-fadeIn">
                <div className="bg-white border border-black/10 rounded-xl shadow-xl overflow-hidden flex flex-col p-1">
                  <button 
                    onClick={() => handleCopy('uxrohitkumar@gmail.com', 'email')}
                    className="flex items-center justify-between gap-2 px-3.5 py-2.5 text-left text-sm font-bold uppercase tracking-widest text-gray-600 hover:bg-[#F4F4F4] hover:text-[#18A0FB] rounded-lg transition-colors group/btn"
                  >
                    <span className="truncate">{copiedItem === 'email' ? 'Copied!' : 'Copy Email'}</span>
                    {copiedItem === 'email' ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-green-500">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-60 group-hover/btn:opacity-100 transition-opacity">
                         <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                         <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    )}
                  </button>

                  <div className="h-[1px] bg-black/5 mx-2 my-0.5"></div>

                  <button 
                    onClick={() => handleCopy('+91 9108006402', 'phone')}
                    className="flex items-center justify-between gap-2 px-3.5 py-2.5 text-left text-sm font-bold uppercase tracking-widest text-gray-600 hover:bg-[#F4F4F4] hover:text-[#18A0FB] rounded-lg transition-colors group/btn"
                  >
                    <span className="truncate">{copiedItem === 'phone' ? 'Copied!' : '+91 9108006402'}</span>
                    {copiedItem === 'phone' ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-green-500">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-60 group-hover/btn:opacity-100 transition-opacity">
                         <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                         <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Header;
