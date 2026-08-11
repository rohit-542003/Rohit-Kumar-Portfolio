import React, { useState } from 'react';
import Hero from './Hero';
import Footer from './Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    contactInfo: '',
    reason: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "919108006402"; // WhatsApp number
    const message = `Hello, my name is ${formData.name}.%0AContact Info: ${formData.contactInfo}%0AReason: ${formData.reason}`;
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <div id="home">
        <Hero showImage={false} showMainHeading={false} />
      </div>
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-20 pb-32 font-onest animate-fade-in-up">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">
          
          {/* Left Side: Direct Contact Info */}
          <div className="flex flex-col gap-12 md:pt-4 w-full h-full lg:pr-8 lg:justify-center">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/70 mb-6">Direct Contact</h3>
              <p className="text-[#4a4a4a] text-lg lg:text-xl leading-relaxed mb-10 max-w-md">
                Prefer to reach out directly? Feel free to call or drop an email anytime.
              </p>
              
              <div className="flex flex-col gap-8">
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/50 mb-2">Email</span>
                  <a href="mailto:rohitkumarp2003@gmail.com" className="text-xl md:text-2xl font-medium text-[#1a1a1a] hover:text-[#E86A3E] transition-colors">
                    rohitkumarp2003@gmail.com
                  </a>
                </div>
                
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/50 mb-2">Phone</span>
                  <a href="tel:+919108006402" className="text-xl md:text-2xl font-medium text-[#1a1a1a] hover:text-[#E86A3E] transition-colors">
                    +91 9108006402
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full flex justify-center lg:justify-end">
            {/* Wrapper for drop-shadow to apply to the clipped shape */}
            <div className="w-full lg:max-w-[600px] xl:max-w-2xl filter drop-shadow-xl">
              <div 
                className="relative bg-white pt-16 pb-12 px-8 md:px-14 w-full rounded-sm"
                style={{ clipPath: 'polygon(0 0, calc(100% - 60px) 0, 100% 60px, 100% 100%, 0 100%)' }}
              >
                {/* The Folded Flap */}
                <div 
                  className="absolute top-0 right-0 w-[60px] h-[60px] bg-white filter drop-shadow-md rounded-bl-sm border-l border-b border-black/5"
                  style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }}
                ></div>

                <h2 className="text-4xl md:text-5xl font-serif mb-12 text-[#1a1a1a] text-center">
                  Let's <span className="text-gray-500 italic font-serif">connect</span>
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-8 md:gap-10">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/70">Your Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-transparent border-b border-black/20 pb-2 text-xl focus:outline-none focus:border-[#E86A3E] transition-colors text-[#1a1a1a] placeholder:text-gray-400 font-medium"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="contactInfo" className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/70">Email or Phone Number</label>
                    <input 
                      type="text" 
                      id="contactInfo"
                      name="contactInfo"
                      value={formData.contactInfo}
                      onChange={handleChange}
                      required
                      className="bg-transparent border-b border-black/20 pb-2 text-xl focus:outline-none focus:border-[#E86A3E] transition-colors text-[#1a1a1a] placeholder:text-gray-400 font-medium"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="reason" className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/70">Reason to contact</label>
                    <input 
                      type="text"
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      required
                      className="bg-transparent border-b border-black/20 pb-2 text-xl focus:outline-none focus:border-[#E86A3E] transition-colors text-[#1a1a1a] placeholder:text-gray-400 font-medium"
                      placeholder="I'd like to discuss a project..."
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 md:py-5 bg-[#1a1a1a] text-white rounded-xl font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-[#E86A3E] transition-all duration-300 mt-2 drop-shadow-md"
                  >
                    Send message
                  </button>
                </form>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactPage;
