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
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'case-study'>('home');
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

  const handleNavigation = (view: 'home' | 'about' | 'case-study', section?: string) => {
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
            {/* Removed empty Hero component to fix excessive top spacing */}
            <div className="max-w-[1400px] mx-auto px-[1.618rem] md:px-[4.236rem] pt-[4.236rem] pb-[6.854rem] md:pt-[6.854rem] md:pb-[11.09rem]">
              <h2 className="text-[2.618rem] md:text-[4.236rem] font-serif mb-[2.618rem]">Building <span className="text-gray-400 italic font-serif">for the future.</span></h2>
              <div className="flex flex-col gap-[1.618rem] text-[1rem] md:text-[1.618rem] text-[#4a4a4a] leading-relaxed mb-[6.854rem] max-w-4xl">
                <p>I am a product designer and developer with a passion for creating digital tools that empower people. With a background in Computer Science & Engineering, I bridge the gap between aesthetics and functionality.</p>
                <p>Currently, I am exploring the intersection of AI and design, looking for new ways to make complex systems feel intuitive and human.</p>
                <p>My background in computer science & engineering taught me to think and play through the system and keep my enthusiasm for cutting edge technologies high.</p>
              </div>

              {/* Education Branching Section */}
              <div className="pt-[4.236rem] border-t border-black/5">
                <h3 className="text-[2.618rem] md:text-[4.236rem] font-serif mb-[4.236rem]">Education <span className="text-gray-400 italic font-serif">& Background</span></h3>
                
                <div className="relative space-y-[4.236rem] max-w-4xl">
                  {/* Continuous Timeline Line */}
                  <div className="absolute left-0 top-[0.618rem] bottom-0 w-[1px] bg-black/10 -translate-x-1/2"></div>

                  {/* B.E Item */}
                  <div className="relative pl-[2.618rem] md:pl-[4.236rem] group">
                    <div className="absolute left-0 top-[0.382rem] w-[0.618rem] h-[0.618rem] rounded-full border-2 border-[#E86A3E] bg-white -translate-x-1/2 group-hover:bg-[#E86A3E] transition-colors z-10"></div>
                    
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-[1rem]">
                      <h4 className="text-[1.618rem] md:text-[2.618rem] font-serif text-[#1a1a1a]">B.E — Computer Science & Engineering</h4>
                      <span className="text-[0.618rem] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/50">Dec 2020 – Jun 2024</span>
                    </div>
                    <p className="text-[1rem] text-[#4a4a4a] mb-[1rem]">Jain College of Engineering and Technology, <span className="italic">Hubballi, Karnataka</span></p>
                    <div className="inline-block px-[1rem] py-[0.618rem] border border-black/10 rounded-full font-bold text-[0.618rem] uppercase tracking-widest text-[#1a1a1a]/60">
                      CGPA: 7.95
                    </div>
                  </div>

                  {/* Class 12 Item */}
                  <div className="relative pl-[2.618rem] md:pl-[4.236rem] group">
                    <div className="absolute left-0 top-[0.382rem] w-[0.618rem] h-[0.618rem] rounded-full border-2 border-[#E86A3E] bg-white -translate-x-1/2 group-hover:bg-[#E86A3E] transition-colors z-10"></div>
                    
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-[1rem]">
                      <h4 className="text-[1.618rem] md:text-[2.618rem] font-serif text-[#1a1a1a]">Class 12th — PU Science</h4>
                      <span className="text-[0.618rem] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/50">Jun 2018 – Aug 2020</span>
                    </div>
                    <p className="text-[1rem] text-[#4a4a4a] mb-[1rem]">Chetan PU Science College, <span className="italic">Hubballi, Karnataka</span></p>
                    <div className="inline-block px-[1rem] py-[0.618rem] border border-black/10 rounded-full font-bold text-[0.618rem] uppercase tracking-widest text-[#1a1a1a]/60">
                      Percentage: 66.17%
                    </div>
                  </div>

                  {/* Class 10 Item */}
                  <div className="relative pl-[2.618rem] md:pl-[4.236rem] group">
                    <div className="absolute left-0 top-[0.382rem] w-[0.618rem] h-[0.618rem] rounded-full border-2 border-[#E86A3E] bg-white -translate-x-1/2 group-hover:bg-[#E86A3E] transition-colors z-10"></div>
                    
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-[1rem]">
                      <h4 className="text-[1.618rem] md:text-[2.618rem] font-serif text-[#1a1a1a]">Class 10th</h4>
                      <span className="text-[0.618rem] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/50">Jun 2017 – Jun 2018</span>
                    </div>
                    <p className="text-[1rem] text-[#4a4a4a] mb-[1rem]">St. Antony's Public School, <span className="italic">Hubballi, Karnataka</span></p>
                    <div className="inline-block px-[1rem] py-[0.618rem] border border-black/10 rounded-full font-bold text-[0.618rem] uppercase tracking-widest text-[#1a1a1a]/60">
                      Percentage: 74.20%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </>
        );

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

            <div>
              <Footer />
            </div>
          </>
        );
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#F4F4F4] text-[#1a1a1a]">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
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