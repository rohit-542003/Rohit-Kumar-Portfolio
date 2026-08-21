import React, { useState, useEffect } from 'react';

const languages = [
  'Welcome',        // English
  'Bienvenido',     // Spanish
  'Benvenuto',      // Italian
  'Καλώς ήρθατε',   // Greek
  'Добро пожаловать', // Russian
  'ようこそ',         // Japanese
  'स्वागतम्',         // Sanskrit
  'நல்வரவு',         // Tamil
  'స్వాగతం',          // Telugu
  'ಸುಸ್ವಾಗತ',         // Kannada
  'സ്വാഗതം',          // Malayalam
  'ସ୍ୱାଗତମ୍',          // Odia
  'স্বাগতম',          // Bengali
  'Welcome'         // English (End)
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (index < languages.length - 1) {
      const timer = setTimeout(() => {
        setIndex(prev => prev + 1);
      }, 180); // Quick transition
      return () => clearTimeout(timer);
    } else {
      // Last language reached, start fade out
      const fadeTimer = setTimeout(() => {
        setFadeOut(true);
        // Wait for fade out animation to finish before unmounting
        setTimeout(onComplete, 500);
      }, 500); // Hold the last word for a bit longer
      return () => clearTimeout(fadeTimer);
    }
  }, [index, onComplete]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#E86A3E] text-white transition-opacity duration-500 ease-in-out ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-wide">
        {languages[index]}
      </h1>
    </div>
  );
}
