import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import WorkSection from './components/WorkSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';
import CaseStudyPage from './components/CaseStudyPage';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import SkillsSection from './components/SkillsSection';
import Slideshow from './components/Slideshow';
import ContactPage from './components/ContactPage';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'contact' | 'case-study'>('home');
  const [targetSection, setTargetSection] = useState<string | null>(null);

  useEffect(() => {
    const playClickSound = () => {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        const pitch = 800 + Math.random() * 300;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(pitch, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } catch (e) { }
    };

    window.addEventListener('click', playClickSound);
    return () => window.removeEventListener('click', playClickSound);
  }, []);

  // Handle scrolling after view change
  useEffect(() => {
    if (currentView === 'home' && targetSection) {
      const element = document.getElementById(targetSection);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        });
      }
      setTargetSection(null);
    }
  }, [currentView, targetSection]);

  const handleProjectClick = (id: number) => {
    window.scrollTo(0, 0);
    setCurrentView('case-study');
  };

  const handleNavigation = (view: 'home' | 'about' | 'contact', section?: string) => {
    if (view === 'home' && section) {
      setTargetSection(section);
    } else {
      window.scrollTo(0, 0);
    }
    setCurrentView(view);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'case-study':
        return <CaseStudyPage onBack={() => handleNavigation('home')} />;

      case 'about':
        return (
          <>
            <div id="home">
              <Hero showImage={false} showMainHeading={false} />
            </div>
            <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-20 pb-40">
              <h2 className="text-4xl md:text-6xl font-serif mb-12">Building for the future.</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg md:text-xl text-[#4a4a4a] leading-relaxed mb-24">
                <p>I am a product designer and developer with a passion for creating digital tools that empower people. With a background in Computer Science & Engineering, I bridge the gap between aesthetics and functionality.</p>
                <p>Currently, I am exploring the intersection of AI and design, looking for new ways to make complex systems feel intuitive and human.</p>
              </div>

              {/* Education Branching Section */}
              <div className="pt-20 border-t border-black/5">
                <h3 className="text-4xl md:text-5xl font-serif mb-20">Education <span className="text-gray-400 italic font-serif">& Background</span></h3>
                
                <div className="relative space-y-16 max-w-4xl">
                  {/* Continuous Timeline Line */}
                  <div className="absolute left-0 top-2 bottom-0 w-[1px] bg-black/10 -translate-x-1/2"></div>

                  {/* B.E Item */}
                  <div className="relative pl-12 md:pl-20 group">
                    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-[#E86A3E] bg-white -translate-x-1/2 group-hover:bg-[#E86A3E] transition-colors z-10"></div>
                    
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                      <h4 className="text-2xl md:text-3xl font-serif text-[#1a1a1a]">B.E — Computer Science & Engineering</h4>
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/50">Dec 2020 – Jun 2024</span>
                    </div>
                    <p className="text-lg text-[#4a4a4a] mb-4">Jain College of Engineering and Technology, <span className="italic">Hubballi, Karnataka</span></p>
                    <div className="inline-block px-4 py-2 border border-black/10 rounded-full font-bold text-xs uppercase tracking-widest text-[#1a1a1a]/60">
                      CGPA: 7.95
                    </div>
                  </div>

                  {/* Class 12 Item */}
                  <div className="relative pl-12 md:pl-20 group">
                    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-[#E86A3E] bg-white -translate-x-1/2 group-hover:bg-[#E86A3E] transition-colors z-10"></div>
                    
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                      <h4 className="text-2xl md:text-3xl font-serif text-[#1a1a1a]">Class 12th — PU Science</h4>
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/50">Jun 2018 – Aug 2020</span>
                    </div>
                    <p className="text-lg text-[#4a4a4a] mb-4">Chetan PU Science College, <span className="italic">Hubballi, Karnataka</span></p>
                    <div className="inline-block px-4 py-2 border border-black/10 rounded-full font-bold text-xs uppercase tracking-widest text-[#1a1a1a]/60">
                      Percentage: 66.17%
                    </div>
                  </div>

                  {/* Class 10 Item */}
                  <div className="relative pl-12 md:pl-20 group">
                    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-[#E86A3E] bg-white -translate-x-1/2 group-hover:bg-[#E86A3E] transition-colors z-10"></div>
                    
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                      <h4 className="text-2xl md:text-3xl font-serif text-[#1a1a1a]">Class 10th</h4>
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/50">Jun 2017 – Jun 2018</span>
                    </div>
                    <p className="text-lg text-[#4a4a4a] mb-4">St. Antony's Public School, <span className="italic">Hubballi, Karnataka</span></p>
                    <div className="inline-block px-4 py-2 border border-black/10 rounded-full font-bold text-xs uppercase tracking-widest text-[#1a1a1a]/60">
                      Percentage: 74.20%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </>
        );

      case 'contact':
        return <ContactPage />;

      case 'home':
      default:
        return (
          <>
            <div id="home">
              <Hero showImage={true} />
            </div>

            <Slideshow />
            
            <div id="work">
              <WorkSection onProjectClick={handleProjectClick} />
            </div>

            <div id="skills">
              <SkillsSection />
            </div>

            <div id="testimonials">
              <TestimonialsSection />
            </div>

            <div id="contact">
              <Footer />
            </div>
          </>
        );
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#F4F4F4] text-[#1a1a1a]">
      <CustomCursor />

      <Header
        currentView={currentView}
        isCaseStudy={currentView === 'case-study'}
        onNavigate={handleNavigation}
      />

      {renderContent()}
    </main>
  );
}