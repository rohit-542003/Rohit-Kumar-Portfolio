import React, { useState } from 'react';

// Manual imports for the slideshow images
import ss1 from '../img/ss1.png';
import ss2 from '../img/ss2.png';
import ss3 from '../img/ss3.png';
import ss4 from '../img/ss4.png';
import ss5 from '../img/ss5.png';

const slideImages = [ss1, ss2, ss3, ss4, ss5];

const Slideshow: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Duplicate the images to create a seamless loop
    const displayImages = [...slideImages, ...slideImages];

    const openLightbox = (src: string) => {
        setSelectedImage(src);
        // Prevent scroll when lightbox is open
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <section className="w-full overflow-hidden py-12 md:py-24 bg-transparent flex flex-col items-center">
            <div className="max-w-[1400px] w-full px-6 md:px-16 mb-8">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Some of my Designs</h4>
            </div>
            
            <div className="relative w-full flex overflow-hidden group">
                {/* Continuous Ticker Animation */}
                <div className="flex gap-4 md:gap-10 animate-ticker hover:[animation-play-state:paused] py-2">
                    {displayImages.map((src, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => openLightbox(src)}
                            className="relative flex-shrink-0 w-[240px] md:w-[500px] aspect-[16/10] rounded-2xl overflow-hidden border border-black/5 shadow-md transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl group/card cursor-pointer bg-white"
                        >
                            {/* Adjusted padding to make them look less "zoomed out" as requested */}
                            <div className="w-full h-full p-1 md:p-3 flex items-center justify-center">
                                <img 
                                    src={src} 
                                    alt={`Design slide ${idx + 1}`} 
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Fade overlays on edges */}
                <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#F4F4F4] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#F4F4F4] to-transparent z-10 pointer-events-none"></div>
            </div>

            {/* Lightbox Modal - Further reduced size to avoid screen-filling as requested */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md animate-fadeIn cursor-pointer"
                    onClick={closeLightbox}
                >
                    <div className="absolute top-6 right-8 text-white text-[10px] font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
                        Close [ESC]
                    </div>
                    
                    <div 
                        className="relative max-w-[65vw] max-h-[55vh] transform animate-zoomIn flex items-center justify-center p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img 
                            src={selectedImage} 
                            alt="Design Close Up" 
                            className="w-auto h-auto max-w-full max-h-full object-contain shadow-2xl rounded-sm border border-white/5"
                            style={{ display: 'block' }}
                        />
                    </div>
                </div>
            )}

            <style>{`
                @keyframes ticker {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(calc(-50% - 1.25rem)); /* adjustment for gap */
                    }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes zoomIn {
                    from { opacity: 0; transform: scale(0.9) translateY(20px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
                .animate-zoomIn {
                    animation: zoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-ticker {
                    animation: ticker 45s linear infinite;
                    display: flex;
                    width: max-content;
                }
                @media (min-width: 768px) {
                    @keyframes ticker {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(calc(-50% - 1.25rem)); /* adjustment for gap */
                        }
                    }
                }
            `}</style>
        </section>
    );
};

export default Slideshow;
