import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [time, setTime] = useState("");
  
  const email = "rohitkumarp2003@gmail.com";
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
    <footer className="w-full bg-[#E86A3E] text-[#1a1a1a] pt-16 md:pt-24 pb-8 px-6 md:px-16 font-onest relative overflow-hidden border-t border-[#1a1a1a]/10">
       <div className="max-w-[1400px] mx-auto flex flex-col">
          
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-12 mb-[2.618rem] md:mb-[4.236rem] w-full">
             
             {/* Left: Contact Info (Golden Ratio 61.8%) */}
             <div className="w-full md:w-[61.8%] flex flex-col justify-between h-full min-h-[160px]">
                <div className="flex flex-col gap-3">
                   <span className="text-[0.618rem] text-[#1a1a1a]/60 font-bold uppercase tracking-[0.2em] mb-2">Drop a line</span>
                   <button 
                      onClick={handleCopyEmail} 
                      className="text-left text-[1rem] md:text-[1.618rem] font-medium text-[#1a1a1a] hover:text-white transition-colors flex items-center gap-3 group"
                   >
                      {email} 
                      {!copiedEmail && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 group-hover:opacity-100 transition-opacity">
                           <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                           <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      )}
                      {copiedEmail && <span className="text-[10px] text-white uppercase tracking-wider font-bold">Copied</span>}
                   </button>
                   <button 
                      onClick={handleCopyPhone} 
                      className="text-left text-[1rem] md:text-[1.618rem] font-medium text-[#1a1a1a] hover:text-white transition-colors flex items-center gap-3 group"
                   >
                      {phone} 
                      {!copiedPhone && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 group-hover:opacity-100 transition-opacity">
                           <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                           <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      )}
                      {copiedPhone && <span className="text-[10px] text-white uppercase tracking-wider font-bold">Copied</span>}
                   </button>
                </div>
                
                <div className="mt-12 flex flex-col gap-1 text-[0.618rem] text-[#1a1a1a]/60 font-bold uppercase tracking-[0.2em]">
                   <span>Local Time</span>
                   <span className="text-[#1a1a1a]">{time} IST</span>
                </div>
             </div>
     
             {/* Right: Socials & Actions (Golden Ratio 38.2%) */}
             <div className="w-full md:w-[38.2%] flex flex-col md:flex-row justify-between gap-12 md:gap-4 h-full min-h-[160px]">
                 {/* Socials */}
                 <div className="flex flex-col">
                    <span className="text-[0.618rem] text-[#1a1a1a]/60 font-bold uppercase tracking-[0.2em] mb-6">Socials</span>
                    <div className="flex flex-col gap-4 text-[1rem] font-medium text-[#1a1a1a]">
                       <a href="https://www.linkedin.com/in/rohit-kumar-bb4223230" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors self-start">LinkedIn</a>
                       <a href="https://x.com/grohit_ux" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors self-start">Twitter</a>
                       <a href="#" className="hover:text-white transition-colors self-start">Read.cv</a>
                    </div>
                 </div>
         
                 {/* Actions / Copyright */}
                 <div className="flex flex-col md:items-end justify-between">
                    <button 
                      onClick={scrollToTop} 
                      className="group flex items-center gap-2 hover:text-white transition-colors text-[0.618rem] font-bold uppercase tracking-widest text-[#1a1a1a] self-start md:self-end"
                    >
                       Back to top
                       <span className="w-5 h-5 rounded-full border border-[#1a1a1a]/30 flex items-center justify-center group-hover:border-white transition-colors">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                             <path d="M12 19V5M5 12l7-7 7 7"/>
                          </svg>
                       </span>
                    </button>
                    
                    <div className="mt-12 md:mt-auto text-[0.618rem] text-[#1a1a1a]/50 font-bold uppercase tracking-widest md:text-right">
                        © 2025 Rohit. All Rights Reserved.
                    </div>
                 </div>
             </div>
          </div>
     
          {/* Bottom Huge Text */}
          <div className="w-full flex flex-col pt-8 border-t border-[#1a1a1a]/10">
              <div 
                  className="flex flex-col text-[#1a1a1a] font-serif leading-[0.9] tracking-tight pt-4 md:pt-8 group cursor-pointer" 
                  style={{ fontSize: 'clamp(42px, 11vw, 288px)' }}
                  onClick={() => window.location.href = `mailto:${email}`}
              >
                  <span className="-ml-[1vw] transition-colors duration-500 group-hover:text-white">Let's start a</span>
                  <div className="flex items-center gap-[2vw]">
                      <span className="-ml-[1vw] italic text-[#1a1a1a]/70 transition-colors duration-500 group-hover:text-[#1a1a1a]">conversation.</span>
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[6vw] h-[6vw] max-w-[80px] max-h-[80px] text-[#1a1a1a] mt-[1vw] transition-all duration-500 ease-out group-hover:rotate-45 group-hover:translate-x-4 group-hover:text-white">
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