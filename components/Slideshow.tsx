import React, { useState, useRef, useEffect } from 'react';

// Manual imports for the slideshow images
import ss2 from '../img/ss2.webp';
import ss3 from '../img/ss3.webp';
import ss4 from '../img/ss4.webp';
import ss5 from '../img/ss5.webp';

const slideImages = [ss2, ss3, ss4, ss5];

const Slideshow: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const isHoveredRef = useRef(false);
    const [isCursorDragging, setIsCursorDragging] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const loopWidthRef = useRef<number>(0);
    const currentTranslateRef = useRef<number>(-1500);
    // Speed in px/second
    const currentSpeedRef = useRef<number>(75);
    const isDraggingRef = useRef<boolean>(false);
    const startXRef = useRef<number>(0);
    const dragStartTranslateRef = useRef<number>(0);
    const hasMovedRef = useRef<boolean>(false);
    const animationFrameIdRef = useRef<number | null>(null);

    // Tripled for seamless wrap
    const displayImages = [...slideImages, ...slideImages, ...slideImages];

    const openLightbox = (src: string) => {
        if (hasMovedRef.current) return;
        setSelectedImage(src);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    // Smooth JavaScript animation loop with delta-time and viewport pausing
    useEffect(() => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track) return;

        const updateLoopWidth = () => {
            if (track) {
                loopWidthRef.current = track.scrollWidth / 3;
                if (loopWidthRef.current > 0 && currentTranslateRef.current === -1500) {
                    currentTranslateRef.current = -loopWidthRef.current;
                }
            }
        };
        updateLoopWidth();
        window.addEventListener('resize', updateLoopWidth, { passive: true });

        let isSectionVisible = true;
        let lastTime = performance.now();

        const animate = (now: number) => {
            const dt = Math.min((now - lastTime) / 1000, 0.05); // capped at 50ms
            lastTime = now;

            const loopWidth = loopWidthRef.current;

            if (loopWidth > 0) {
                if (!isDraggingRef.current) {
                    // 75 px/sec default, 18 px/sec when hovering
                    const targetSpeed = isHoveredRef.current ? 18 : 75;
                    const blendFactor = 1 - Math.exp(-8 * dt);
                    currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * blendFactor;
                    currentTranslateRef.current -= currentSpeedRef.current * dt;
                }

                // Seamless loop wrap
                if (currentTranslateRef.current <= -loopWidth * 2) {
                    currentTranslateRef.current += loopWidth;
                } else if (currentTranslateRef.current >= 0) {
                    currentTranslateRef.current -= loopWidth;
                }

                track.style.transform = `translate3d(${currentTranslateRef.current}px, 0, 0)`;
            }

            if (isSectionVisible) {
                animationFrameIdRef.current = requestAnimationFrame(animate);
            } else {
                animationFrameIdRef.current = null;
            }
        };

        let observer: IntersectionObserver | null = null;
        if (section && 'IntersectionObserver' in window) {
            observer = new IntersectionObserver(([entry]) => {
                isSectionVisible = entry.isIntersecting;
                if (isSectionVisible) {
                    if (!animationFrameIdRef.current) {
                        lastTime = performance.now();
                        animationFrameIdRef.current = requestAnimationFrame(animate);
                    }
                } else if (animationFrameIdRef.current) {
                    cancelAnimationFrame(animationFrameIdRef.current);
                    animationFrameIdRef.current = null;
                }
            }, { rootMargin: '200px' });
            observer.observe(section);
        } else {
            lastTime = performance.now();
            animationFrameIdRef.current = requestAnimationFrame(animate);
        }

        return () => {
            window.removeEventListener('resize', updateLoopWidth);
            if (observer) observer.disconnect();
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, []);

    // Mouse drag handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        isDraggingRef.current = true;
        setIsCursorDragging(true);
        startXRef.current = e.clientX;
        dragStartTranslateRef.current = currentTranslateRef.current;
        hasMovedRef.current = false;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDraggingRef.current || !trackRef.current) return;
        const deltaX = e.clientX - startXRef.current;
        if (Math.abs(deltaX) > 5) {
            hasMovedRef.current = true;
        }
        const loopWidth = trackRef.current.scrollWidth / 3;
        let newTranslate = dragStartTranslateRef.current + deltaX;

        if (loopWidth > 0) {
            while (newTranslate >= 0) newTranslate -= loopWidth;
            while (newTranslate <= -loopWidth * 2) newTranslate += loopWidth;
        }

        currentTranslateRef.current = newTranslate;
        trackRef.current.style.transform = `translateX(${newTranslate}px)`;
    };

    const handleMouseUpOrLeave = () => {
        isDraggingRef.current = false;
        setIsCursorDragging(false);
    };

    // Touch drag handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 0) return;
        isDraggingRef.current = true;
        setIsCursorDragging(true);
        startXRef.current = e.touches[0].clientX;
        dragStartTranslateRef.current = currentTranslateRef.current;
        hasMovedRef.current = false;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDraggingRef.current || !trackRef.current || e.touches.length === 0) return;
        const deltaX = e.touches[0].clientX - startXRef.current;
        if (Math.abs(deltaX) > 5) {
            hasMovedRef.current = true;
        }
        const loopWidth = trackRef.current.scrollWidth / 3;
        let newTranslate = dragStartTranslateRef.current + deltaX;

        if (loopWidth > 0) {
            while (newTranslate >= 0) newTranslate -= loopWidth;
            while (newTranslate <= -loopWidth * 2) newTranslate += loopWidth;
        }

        currentTranslateRef.current = newTranslate;
        trackRef.current.style.transform = `translateX(${newTranslate}px)`;
    };

    const handleTouchEnd = () => {
        isDraggingRef.current = false;
        setIsCursorDragging(false);
    };

    return (
        <section ref={sectionRef} className="w-full overflow-hidden py-16 md:py-24 bg-transparent flex flex-col items-center select-none">
            {/* Standard Header matching other sections */}
            <div className="max-w-[1400px] w-full px-4 sm:px-6 md:px-16 mb-8 md:mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#1a1a1a] font-serif leading-[1.1]">
                    Design <span className="text-gray-400 italic font-serif">Explorations.</span>
                </h2>
                <div className="w-16 sm:w-24 h-[1px] bg-black/10 mt-6 md:mt-8"></div>
            </div>
            
            {/* Draggable & Auto-scrolling Track */}
            <div 
                className={`relative w-full flex overflow-hidden py-4 ${isCursorDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={() => {
                    handleMouseUpOrLeave();
                    isHoveredRef.current = false;
                }}
                onMouseEnter={() => { isHoveredRef.current = true; }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div 
                    ref={trackRef}
                    className="flex gap-4 md:gap-8 will-change-transform py-2 px-4"
                >
                    {displayImages.map((src, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => openLightbox(src)}
                            className="relative flex-shrink-0 w-[260px] sm:w-[380px] md:w-[480px] aspect-[16/10] rounded-2xl overflow-hidden border border-black/5 shadow-md transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer bg-white group/card"
                        >
                            <div className="w-full h-full p-2 sm:p-3 flex items-center justify-center">
                                <img loading="eager"
                                    decoding="async"
                                    src={src} 
                                    alt={`Design slide ${idx + 1}`} 
                                    draggable={false}
                                    className="max-w-full max-h-full object-contain pointer-events-none select-none"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Subtle Edge Vignettes */}
                <div className="absolute inset-y-0 left-0 w-3 sm:w-6 md:w-8 bg-gradient-to-r from-[#F4F4F4]/80 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-3 sm:w-6 md:w-8 bg-gradient-to-l from-[#F4F4F4]/80 to-transparent z-10 pointer-events-none"></div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md animate-fadeIn cursor-pointer"
                    onClick={closeLightbox}
                >
                    <div className="absolute top-6 right-8 text-white text-xs font-bold uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity">
                        Close [ESC]
                    </div>
                    
                    <div 
                        className="relative max-w-[85vw] max-h-[85vh] transform animate-zoomIn flex items-center justify-center p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img loading="lazy" 
                            src={selectedImage} 
                            alt="Design Close Up" 
                            className="w-auto h-auto max-w-full max-h-full object-contain shadow-2xl rounded-xl border border-white/10"
                        />
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes zoomIn {
                    from { opacity: 0; transform: scale(0.92); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.25s ease-out forwards;
                }
                .animate-zoomIn {
                    animation: zoomIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </section>
    );
};

export default Slideshow;
