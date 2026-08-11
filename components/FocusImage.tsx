import React, { useRef, useState } from 'react';

// Using local image from img folder
import IMAGE_URL from '../img/me.jpg';

const FocusImage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 25, y: 30 }); // Initial design position in %

  // Box dimensions in percentage relative to container
  // Increased size as requested
  const BOX_WIDTH_PCT = 55;
  const BOX_HEIGHT_PCT = 65;

  const handleMove = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Convert mouse position to percentage of container
    const xPct = (x / rect.width) * 100;
    const yPct = (y / rect.height) * 100;

    // Calculate top-left position of the box so it centers on the mouse
    let newX = xPct - (BOX_WIDTH_PCT / 2);
    let newY = yPct - (BOX_HEIGHT_PCT / 2);

    // Clamp values so the box stays inside the container
    newX = Math.max(0, Math.min(newX, 100 - BOX_WIDTH_PCT));
    newY = Math.max(0, Math.min(newY, 100 - BOX_HEIGHT_PCT));

    setPosition({ x: newX, y: newY });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    setIsHovering(true);
    handleMove(e.clientX, e.clientY);
  };

  const onMouseLeave = () => {
    setIsHovering(false);
    // Reset to original aesthetic position
    setPosition({ x: 25, y: 30 });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    // Prevent scrolling while dragging inside the image
    setIsHovering(true);
    handleMove(e.touches[0].clientX, e.touches[0].clientY);
  };

  // Calculate inner image style to counteract the box position
  const innerWidth = 100 / (BOX_WIDTH_PCT / 100);
  const innerHeight = 100 / (BOX_HEIGHT_PCT / 100);

  const innerLeft = -position.x * (innerWidth / 100);
  const innerTop = -position.y * (innerHeight / 100);

  const transitionClass = !isHovering ? 'transition-all duration-500 ease-out' : 'duration-0';

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[300px] aspect-[300/400] mx-auto md:mr-0 select-none cursor-crosshair overflow-hidden touch-none"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onTouchMove={onTouchMove}
      onTouchStart={() => setIsHovering(true)}
      onTouchEnd={onMouseLeave}
      data-cursor-type="hidden"
    >

      {/* Base Blurred Image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img
          src={IMAGE_URL}
          alt="Rohit Portrait Blur"
          className="w-full h-full object-cover grayscale blur-[6px] scale-110 opacity-80 block"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F4F4F4]/20 to-transparent"></div>
      </div>

      {/* Focus Window */}
      <div
        className={`absolute z-10 overflow-hidden border border-white/90 shadow-sm ${transitionClass}`}
        style={{
          top: `${position.y}%`,
          left: `${position.x}%`,
          width: `${BOX_WIDTH_PCT}%`,
          height: `${BOX_HEIGHT_PCT}%`,
        }}
      >
        {/* Inner Clear Image */}
        <img
          src={IMAGE_URL}
          alt="Rohit Portrait Focus"
          className={`absolute max-w-none grayscale object-cover block ${transitionClass}`}
          style={{
            width: `${innerWidth}%`,
            height: `${innerHeight}%`,
            left: `${innerLeft}%`,
            top: `${innerTop}%`,
            transform: 'scale(1.1)',
            transformOrigin: 'center center',
          }}
        />

        {/* Crosshair Icon - Centered */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white/90 pointer-events-none">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FocusImage;