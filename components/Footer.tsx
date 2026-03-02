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
    <footer className="w-full bg-[#F4F4F4] text-[#1a1a1a] pt-12 pb-8 px-6 md:px-16 font-onest relative overflow-hidden">
       
       <div className="max-w-[1400px] mx-auto flex flex-col justify-between">
          
          {/* Main Headline */}
          <div className="flex flex-col mb-8 md:mb-12">
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-tight text-[#1a1a1a]">
              Let's start a <span className="text-gray-400 italic">conversation.</span>
            </h2>
          </div>

          {/* Email Section - Clean & Minimal */}
          <div className="border-t border-black/10 group relative">
             <button 
                onClick={handleCopyEmail}
                className="w-full py-6 md:py-10 flex items-center justify-between text-left group-hover:pl-4 transition-all duration-300 ease-out"
                data-cursor-type="text"
                data-cursor-label={copiedEmail ? "Copied!" : "Copy Email"}
             >
                <span className="text-xl md:text-3xl lg:text-4xl font-medium tracking-tight text-[#1a1a1a] group-hover:text-[#E86A3E] transition-colors duration-300">
                   {email}
                </span>
                
                {/* Subtle visual indicator */}
                <div className="hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-bold uppercase tracking-widest text-[#E86A3E]">
                    <span>{copiedEmail ? "Copied" : "Copy"}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                </div>
             </button>
             
             {/* Bottom Border Animation */}
             <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/10">
                <div className="absolute top-0 left-0 h-full w-0 bg-[#E86A3E] transition-all duration-500 ease-out group-hover:w-full"></div>
             </div>
          </div>

           {/* Phone Section */}
           <div className="group relative">
             <button 
                onClick={handleCopyPhone}
                className="w-full py-6 md:py-10 flex items-center justify-between text-left group-hover:pl-4 transition-all duration-300 ease-out"
                data-cursor-type="text"
                data-cursor-label={copiedPhone ? "Copied!" : "Copy Phone"}
             >
                <span className="text-xl md:text-3xl lg:text-4xl font-medium tracking-tight text-[#1a1a1a] group-hover:text-[#E86A3E] transition-colors duration-300">
                   {phone}
                </span>
                
                {/* Subtle visual indicator */}
                <div className="hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-bold uppercase tracking-widest text-[#E86A3E]">
                    <span>{copiedPhone ? "Copied" : "Copy"}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                </div>
             </button>
             
             {/* Bottom Border Animation */}
             <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/10">
                <div className="absolute top-0 left-0 h-full w-0 bg-[#E86A3E] transition-all duration-500 ease-out group-hover:w-full"></div>
             </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 pt-8 text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">
             
             {/* Local Time */}
             <div className="md:col-span-3 flex flex-col gap-1">
                <span className="text-gray-400">Local Time</span>
                <span className="text-[#1a1a1a]">{time} IST</span>
             </div>

             {/* Socials */}
             <div className="md:col-span-5 flex flex-col gap-1">
                <span className="text-gray-400">Socials</span>
                <div className="flex gap-4 text-[#1a1a1a]">
                    <a href="https://www.linkedin.com/in/rohit-kumar-bb4223230" target="_blank" rel="noopener noreferrer" className="hover:text-[#E86A3E] transition-colors">LinkedIn</a>
                    <a href="https://x.com/grohit_ux" target="_blank" rel="noopener noreferrer" className="hover:text-[#E86A3E] transition-colors">Twitter</a>
                    <a href="#" className="hover:text-[#E86A3E] transition-colors">Read.cv</a>
                </div>
             </div>

             {/* Copyright & Back to Top */}
             <div className="md:col-span-4 flex flex-col md:items-end gap-4 justify-between h-full">
                 <button 
                  onClick={scrollToTop}
                  className="group flex items-center gap-2 hover:text-[#1a1a1a] transition-colors self-start md:self-end"
                >
                   Back to top
                   <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-[#1a1a1a] transition-colors">
                      <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                         <path d="M12 19V5M5 12l7-7 7 7"/>
                      </svg>
                   </span>
                </button>
                
                <p className="text-[10px] text-gray-400 md:text-right mt-auto">
                    © 2025 Rohit. All Rights Reserved.
                </p>
             </div>

          </div>
       </div>
    </footer>
  );
};

export default Footer;