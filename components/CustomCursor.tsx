import React, { useEffect, useRef, useState } from 'react';

// Helper component for the rotating text animation
const CircularText = ({ text }: { text: string }) => {
  if (!text) return null;
  
  const upperText = text.toUpperCase();
  // Ensure we have enough text to fill the circle gracefully
  const repeatedText = upperText.length < 12 
    ? `${upperText} • ${upperText} • ${upperText} • ` 
    : `${upperText} • ${upperText} • `;
    
  const chars = repeatedText.split("");
  const radius = 36; // Distance from center

  return (
    <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
      {chars.map((char, i) => (
        <span
          key={i}
          className="absolute top-1/2 left-1/2 text-[10px] font-bold tracking-widest text-white whitespace-pre"
          style={{
            // 1. Center the span
            // 2. Rotate to the correct angle
            // 3. Push outward by radius
            transform: `translate(-50%, -50%) rotate(${i * (360 / chars.length)}deg) translateY(-${radius}px)`,
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // Mouse position
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  
  // Follower position (smooth)
  const cursorX = useRef(0);
  const cursorY = useRef(0);

  const [isVisible, setIsVisible] = useState(false);
  const [variant, setVariant] = useState<'default' | 'button' | 'text' | 'hidden'>('default');
  const [label, setLabel] = useState('');
  
  // Click Effects State
  const [clickEffects, setClickEffects] = useState<{id: number, x: number, y: number}[]>([]);

  useEffect(() => {
    // Check if device is touch-enabled to disable custom cursor
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for hidden cursor zones
      if (target.closest('[data-cursor-type="hidden"]')) {
        setVariant('hidden');
        return;
      }

      // Check for text cursor zones
      const textElement = target.closest('[data-cursor-type="text"]') as HTMLElement;
      if (textElement) {
        setVariant('text');
        setLabel(textElement.dataset.cursorLabel || '');
        return;
      }

      // Check for interactive elements
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[role="button"]') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA'
      ) {
        setVariant('button');
        return;
      }

      setVariant('default');
      setLabel('');
    };
    
    const handleMouseDown = (e: MouseEvent) => {
        const id = Date.now() + Math.random();
        setClickEffects(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
        
        // Remove the effect after the animation completes (0.8s)
        setTimeout(() => {
            setClickEffects(prev => prev.filter(effect => effect.id !== id));
        }, 800);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);

    // Animation Loop
    let animationFrameId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animate = () => {
      // 0.35 factor for crisp, responsive movement (Apple-like)
      cursorX.current = lerp(cursorX.current, mouseX.current, 0.35);
      cursorY.current = lerp(cursorY.current, mouseY.current, 0.35);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX.current}px, ${cursorY.current}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  const isText = variant === 'text';
  const isHidden = variant === 'hidden';

  return (
    <>
      <style>{`
        body, a, button, [role="button"], input, select, textarea {
          cursor: none !important;
        }
        @media (pointer: coarse) {
            body, a, button, [role="button"], input, select, textarea {
                cursor: auto !important;
            }
        }
        @keyframes click-ripple {
            0% { transform: translate(-50%, -50%) scale(0.4); opacity: 1; border-width: 3px; }
            100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; border-width: 0px; }
        }
        .animate-click-ripple {
            animation: click-ripple 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
      
      {/* Click Effects - Rendered independently so they don't move with the cursor */}
      {clickEffects.map(effect => (
        <div
            key={effect.id}
            className="fixed top-0 left-0 z-[9998] pointer-events-none"
            style={{ 
                left: effect.x, 
                top: effect.y 
            }}
        >
            <div className="animate-click-ripple absolute w-12 h-12 rounded-full border-[#E86A3E] border-solid box-border"></div>
        </div>
      ))}

      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
      >
        {/* 
          Inner Wrapper for Transform/Scale Transitions 
          We use absolute positioning to handle the 'center' vs 'top-left' hotspot shift
        */}
        <div 
           className={`relative transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] flex items-center justify-center
             ${isText ? '-translate-x-1/2 -translate-y-1/2' : 'translate-x-0 translate-y-0'}
           `}
        >
          {/* STATE: DEFAULT ARROW */}
          <div className={`absolute top-0 left-0 transition-opacity duration-200 ${variant === 'default' ? 'opacity-100' : 'opacity-0'}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
                <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z" fill="black" stroke="white" strokeWidth="1"/>
            </svg>
          </div>

          {/* STATE: BUTTON HAND */}
          <div className={`absolute top-0 left-0 -ml-1 -mt-0.5 transition-opacity duration-200 ${variant === 'button' ? 'opacity-100' : 'opacity-0'}`}>
             <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
                <path d="M7 11.5L10 8.5C10.8284 7.67157 12.1716 7.67157 13 8.5C13.8284 9.32843 13.8284 10.6716 13 11.5L9.5 15H9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 11.5L10 8.5C10.8284 7.67157 12.1716 7.67157 13 8.5C13.8284 9.32843 13.8284 10.6716 13 11.5L9.5 15H9" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 15L15.5 8.5C16.3284 7.67157 17.6716 7.67157 18.5 8.5C19.3284 9.32843 19.3284 10.6716 18.5 11.5L13.5 16.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 15L15.5 8.5C16.3284 7.67157 17.6716 7.67157 18.5 8.5C19.3284 9.32843 19.3284 10.6716 18.5 11.5L13.5 16.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M10.1419 2.5819C10.5968 1.96102 11.4552 1.79255 12.1154 2.18873L14.4923 3.61483C15.1524 4.01102 15.3315 4.8819 14.8767 5.50278L8.69231 13.9456L3.95744 11.1047L10.1419 2.5819Z" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M10.4255 2.78873C10.7439 2.35411 11.3448 2.23619 11.8069 2.51351L14.1838 3.93962C14.646 4.21695 14.7713 4.82656 14.4529 5.26117L8.2685 13.704L4.24076 11.2871L10.4255 2.78873Z" fill="black"/>
             </svg>
          </div>

          {/* STATE: PROJECT BUBBLE (Circular Text + Icon) */}
          <div 
            className={`relative flex items-center justify-center rounded-full bg-[#E86A3E] backdrop-blur-md overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] shadow-xl
              ${isText ? 'w-32 h-32 opacity-100 scale-100' : 'w-4 h-4 opacity-0 scale-50'}
              ${isHidden ? 'opacity-0' : ''}
            `}
          >
             {/* 
                We use an inner container for the content opacity transition 
                so the text doesn't vanish instantly when the bubble starts shrinking
             */}
             <div className={`absolute inset-0 transition-opacity duration-200 ${isText ? 'opacity-100' : 'opacity-0'}`}>
                {/* Rotating Text Ring */}
                {isText && <CircularText text={label} />}
                
                {/* Center Static Arrow */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white transform -rotate-12">
                      <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="m12 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                </div>
             </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default CustomCursor;