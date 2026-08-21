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
    <section className="w-full px-[1.618rem] md:px-[4.236rem] pb-[6.854rem] md:pb-[11.09rem] pt-[4.236rem] md:pt-[6.854rem] max-w-[1400px] mx-auto font-onest bg-[#F4F4F4]">
        
        {/* Section Header - Aligned with WorkSection */}
        <div className="mb-[4.236rem] md:mb-[6.854rem]">
           <h2 className="text-[2.5rem] md:text-6xl font-normal tracking-tight text-[#1a1a1a] font-serif leading-[0.9]">
              Technical <span className="text-gray-400 italic font-serif">proficiency.</span>
           </h2>
           <div className="w-24 h-[1px] bg-black/10 mt-[2.618rem]"></div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-[4.236rem] md:gap-x-[2.618rem] lg:gap-x-[4.236rem]">
            
            {/* Column 1 */}
            <div className="md:col-span-4 flex flex-col items-start">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-[1.618rem] border-b border-gray-200 pb-[0.618rem] w-full">
                    Proficient in tools
                </h3>
                <div className="flex flex-wrap gap-[0.618rem]">
                    {proficientTools.map(tool => <SkillTag key={tool} label={tool} />)}
                </div>
            </div>

            {/* Column 2 */}
            <div className="md:col-span-4 flex flex-col items-start">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-[1.618rem] border-b border-gray-200 pb-[0.618rem] w-full">
                    Tools I work with
                </h3>
                <div className="flex flex-wrap gap-[0.618rem]">
                    {workedWithTools.map(tool => <SkillTag key={tool} label={tool} />)}
                </div>
            </div>

            {/* Column 3 */}
            <div className="md:col-span-4 flex flex-col items-start">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-[1.618rem] border-b border-gray-200 pb-[0.618rem] w-full">
                    I know (from college)
                </h3>
                <div className="flex flex-wrap gap-[0.618rem]">
                    {knownLanguages.map(tool => <SkillTag key={tool} label={tool} />)}
                </div>
            </div>

        </div>
    </section>
  );
};

export default SkillsSection;