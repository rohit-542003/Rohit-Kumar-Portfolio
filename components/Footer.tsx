import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [time, setTime] = useState("");
  
  const email = "uxrohitkumar@gmail.com";
  const phone = "+91 9108006402";

  // Live Time Logic
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true,
        timeZone: 'Asia/Kolkata' 
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#E86A3E] text-[#1a1a1a] pt-14 md:pt-24 pb-8 px-4 sm:px-6 md:px-16 font-onest relative overflow-hidden border-t border-[#1a1a1a]/10">
       <div className="max-w-[1400px] mx-auto flex flex-col">
          
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-12 mb-10 md:mb-16 w-full">
             
             {/* Left: Contact Info */}
             <div className="w-full md:w-[61.8%] flex flex-col justify-between h-full min-h-[140px]">
                <div className="flex flex-col gap-3">
                   <span className="text-[10px] sm:text-xs text-[#1a1a1a]/60 font-bold uppercase tracking-[0.2em] mb-1">Drop a line</span>
                   <button 
                      onClick={handleCopyEmail} 
                      className="text-left text-sm sm:text-lg md:text-2xl font-medium text-[#1a1a1a] hover:text-white transition-colors flex items-center gap-2.5 sm:gap-3 group break-all"
                   >
                      <span>{email}</span>
                      {!copiedEmail ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">
                           <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                           <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      ) : (
                        <span className="text-[10px] text-white uppercase tracking-wider font-bold shrink-0 bg-black/20 px-2 py-0.5 rounded">Copied</span>
                      )}
                   </button>
                   <button 
                      onClick={handleCopyPhone} 
                      className="text-left text-sm sm:text-lg md:text-2xl font-medium text-[#1a1a1a] hover:text-white transition-colors flex items-center gap-2.5 sm:gap-3 group"
                   >
                      <span>{phone}</span>
                      {!copiedPhone ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">
                           <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                           <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      ) : (
                        <span className="text-[10px] text-white uppercase tracking-wider font-bold shrink-0 bg-black/20 px-2 py-0.5 rounded">Copied</span>
                      )}
                   </button>
                </div>
                
                <div className="mt-8 md:mt-12 flex flex-col gap-1 text-[10px] sm:text-xs text-[#1a1a1a]/60 font-bold uppercase tracking-[0.2em]">
                   <span>Local Time</span>
                   <span className="text-[#1a1a1a]">{time} IST</span>
                </div>
             </div>
     
             {/* Right: Socials & Actions */}
             <div className="w-full md:w-[38.2%] flex flex-col sm:flex-row justify-between gap-8 md:gap-4 h-full min-h-[140px]">
                 {/* Socials */}
                 <div className="flex flex-col">
                    <span className="text-[10px] sm:text-xs text-[#1a1a1a]/60 font-bold uppercase tracking-[0.2em] mb-4 sm:mb-6">Socials</span>
                    <div className="flex flex-col gap-3 sm:gap-4 text-sm sm:text-base font-medium text-[#1a1a1a]">
                       <a href="https://www.linkedin.com/in/rohit-kumar-1b3738434/" target="_blank" rel="noopener noreferrer" className="relative flex items-center overflow-hidden w-fit group self-start">
                         <span className="opacity-0 pointer-events-none">LinkedIn</span>
                         <div className="absolute inset-0 flex items-center w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-full text-[#1a1a1a]">
                           LinkedIn
                         </div>
                         <div className="absolute inset-0 flex items-center w-full h-full text-white transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] translate-y-full group-hover:translate-y-0">
                           LinkedIn
                         </div>
                       </a>
                       
                       <a href="https://x.com/grohit_ux" target="_blank" rel="noopener noreferrer" className="relative flex items-center overflow-hidden w-fit group self-start">
                         <span className="opacity-0 pointer-events-none">Twitter</span>
                         <div className="absolute inset-0 flex items-center w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-full text-[#1a1a1a]">
                           Twitter
                         </div>
                         <div className="absolute inset-0 flex items-center w-full h-full text-white transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] translate-y-full group-hover:translate-y-0">
                           Twitter
                         </div>
                       </a>
                       
                       <a href="#" className="relative flex items-center overflow-hidden w-fit group self-start">
                         <span className="opacity-0 pointer-events-none">Read.cv</span>
                         <div className="absolute inset-0 flex items-center w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-full text-[#1a1a1a]">
                           Read.cv
                         </div>
                         <div className="absolute inset-0 flex items-center w-full h-full text-white transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] translate-y-full group-hover:translate-y-0">
                           Read.cv
                         </div>
                       </a>
                    </div>
                 </div>
         
                 {/* Actions / Copyright */}
                 <div className="flex flex-col sm:items-end justify-between">
                    <button 
                      onClick={scrollToTop} 
                      className="group flex items-center gap-2 hover:text-white transition-colors text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#1a1a1a] self-start sm:self-end"
                    >
                       Back to top
                       <span className="w-5 h-5 rounded-full border border-[#1a1a1a]/30 flex items-center justify-center group-hover:border-white transition-colors">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                             <path d="M12 19V5M5 12l7-7 7 7"/>
                          </svg>
                       </span>
                    </button>
                    
                    <div className="mt-8 sm:mt-auto text-[10px] sm:text-xs text-[#1a1a1a]/50 font-bold uppercase tracking-widest sm:text-right">
                        © 2025 Rohit. All Rights Reserved.
                    </div>
                 </div>
             </div>
          </div>
     
          {/* Bottom Huge Text */}
          <div className="w-full flex flex-col pt-6 md:pt-8 border-t border-[#1a1a1a]/10 overflow-hidden">
              <div 
                  className="flex flex-col text-[#1a1a1a] font-serif leading-[0.95] tracking-tight pt-2 md:pt-6 group cursor-pointer" 
                  style={{ fontSize: 'clamp(28px, 7.5vw, 150px)' }}
                  onClick={() => window.location.href = `mailto:${email}`}
              >
                  <span className="transition-colors duration-500 group-hover:text-white">Let's start a</span>
                  <div className="flex items-center gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
                      <span className="italic text-[#1a1a1a]/70 transition-colors duration-500 group-hover:text-[#1a1a1a]">conversation.</span>
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 sm:w-10 sm:h-10 md:w-14 md:h-14 shrink-0 text-[#1a1a1a] transition-all duration-500 ease-out group-hover:rotate-45 group-hover:translate-x-2 group-hover:text-white">
                          <path d="M5 19L19 5M19 5H7M19 5V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                  </div>
              </div>
          </div>
       </div>
    </footer>
  );
};

export default Footer;