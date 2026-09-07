import React from 'react';

// Create a singleton AudioContext lazily
let audioCtx: AudioContext | null = null;

const getAudioContext = () => {
    if (!audioCtx) {
        const Ctx = window.AudioContext || (window as any).webkitAudioContext;
        if (Ctx) {
            audioCtx = new Ctx();
        }
    }
    return audioCtx;
};

const SkillTag: React.FC<{ label: string }> = ({ label }) => {
    const playNote = () => {
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            
            // Resume context if suspended (browser requirement for audio)
            if (ctx.state === 'suspended') {
                ctx.resume();
            }
            
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            // Randomize pitch slightly for fun
            const pitch = 600 + Math.random() * 200;
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(pitch, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);
            
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
            
            osc.start();
            osc.stop(ctx.currentTime + 0.15);
        } catch (e) {
            console.error("Audio play failed", e);
        }
    };

    return (
        <span 
            onClick={playNote}
            className="inline-block px-[1rem] py-[0.618rem] bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-600 hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] transition-all duration-200 cursor-pointer select-none active:scale-95 shadow-sm"
        >
            {label}
        </span>
    );
};

const SkillsSection: React.FC = () => {
  const proficientTools = ["Figma", "Framer", "FigJam"];
  const workedWithTools = ["Cursor", "VS Code", "Kiro", "Bolt", "Antigravity"];
  const knownLanguages = ["C", "Python", "Java", "HTML", "CSS", "JS", "MS Word", "MS PowerPoint", "Github"];

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-16 pt-16 md:pt-28 pb-16 md:pb-28 font-onest bg-[#F4F4F4]">
        
        {/* Section Header */}
        <div className="mb-10 md:mb-16">
           <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#1a1a1a] font-serif leading-[1.1]">
              Technical <span className="text-gray-400 italic font-serif">proficiency.</span>
           </h2>
           <div className="w-16 sm:w-24 h-[1px] bg-black/10 mt-6 md:mt-8"></div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            
            {/* Column 1 */}
            <div className="flex flex-col items-start">
                <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-200 pb-2 w-full">
                    Proficient in tools
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                    {proficientTools.map(tool => <SkillTag key={tool} label={tool} />)}
                </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col items-start">
                <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-200 pb-2 w-full">
                    Tools I work with
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                    {workedWithTools.map(tool => <SkillTag key={tool} label={tool} />)}
                </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col items-start md:col-span-2 lg:col-span-1">
                <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-200 pb-2 w-full">
                    I know (from college)
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                    {knownLanguages.map(tool => <SkillTag key={tool} label={tool} />)}
                </div>
            </div>

        </div>
    </section>
  );
};

export default SkillsSection;