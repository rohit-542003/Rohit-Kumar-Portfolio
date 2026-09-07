import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import WorkSection from './components/WorkSection';
import Footer from './components/Footer';
import CaseStudyPage from './components/CaseStudyPage';
import ProjectDetailPage from './components/ProjectDetailPage';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import SkillsSection from './components/SkillsSection';
import Slideshow from './components/Slideshow';
import LoadingScreen from './components/LoadingScreen';
import AboutPage from './components/AboutPage';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'case-study' | 'project-detail'>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<number>(2);
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
    if (id === 1) {
      setCurrentView('case-study');
    } else {
      setSelectedProjectId(id);
      setCurrentView('project-detail');
    }
  };

  const handleNavigation = (view: 'home' | 'about' | 'case-study' | 'project-detail', section?: string) => {
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

      case 'project-detail':
        return <ProjectDetailPage projectId={selectedProjectId} onBack={() => handleNavigation('home')} />;

      case 'about':
        return (
          <>
            <AboutPage />
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

            <WorkSection onProjectClick={handleProjectClick} />

            <Slideshow />

            <div id="skills">
              <SkillsSection />
            </div>
            <div>
              <Footer />
            </div>
          </>
        );
    }
  };

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-clip bg-[#F4F4F4] text-[#1a1a1a] relative">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <CustomCursor />

      <Header
        currentView={currentView}
        isCaseStudy={currentView === 'case-study' || currentView === 'project-detail'}
        onNavigate={handleNavigation}
      />

      {renderContent()}
    </main>
  );
}