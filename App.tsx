import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import WorkSection from './components/WorkSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';
import CaseStudyPage from './components/CaseStudyPage';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import SkillsSection from './components/SkillsSection';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'case-study'>('home');
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
      } catch (e) {}
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

  const navigateToHomeSection = (sectionId: string) => {
    if (currentView !== 'home') {
      setTargetSection(sectionId);
      setCurrentView('home');
    } else {
        const element = document.getElementById(sectionId);
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
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#F4F4F4] text-[#1a1a1a]">
      <CustomCursor />
      
      {/* Persistent Header - Only shown on Home view */}
      {currentView === 'home' && (
        <Header 
          isCaseStudy={false} 
          onNavigateHome={navigateToHomeSection}
        />
      )}
      
      {currentView === 'case-study' ? (
        <CaseStudyPage onBack={() => setCurrentView('home')} />
      ) : (
        <>
          <div id="home">
            <Hero />
          </div>
          
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
      )}
    </main>
  );
}