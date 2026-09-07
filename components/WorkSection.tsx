import React, { useRef, useEffect, useState } from 'react';
import thumbnailGPay from '../img/thumbnail_gpay.png';
import thumbnailTypeMe from '../img/thumbnail_typeme.png';
import thumbnailDrixMedia from '../img/thumbnail_drixmedia.gif';
import thumbnailFlytSocial from '../img/thumbnail_flytsocial.png';
import thumbnailRelax from '../img/thumbnail_relax.png';
import thumbnailSolliquo from '../img/thumbnail_solliquo.png';
import thumbnailFirstOX from '../img/thumbnail_FirstOX.gif';
import { ArrowRightIcon } from './Icons';

export interface ProjectItem {
  id: number;
  title: string;
  meta: string;
  type: string;
  imageSrc: string;
  fitMode: 'contain' | 'cover';
  alignMode?: 'bottom' | 'center';
  bgColor?: string;
  centerText?: string;
  linkUrl: string;
  linkLabel: string;
  cursorLabel?: string;
  isExternal: boolean;
}

const projects: ProjectItem[] = [
  {
    id: 1,
    title: "Seamless split and pay",
    meta: "GOOGLE PAY • UX CASE STUDY",
    type: "image",
    imageSrc: thumbnailGPay,
    fitMode: "cover",
    bgColor: "bg-gray-100",
    centerText: "",
    linkUrl: "https://www.figma.com/design/RdwSrdq0Gdd3VuA3PdoMO4/GooglePay-redesign?node-id=113-3979",
    linkLabel: "Figma File",
    cursorLabel: "View Case Study",
    isExternal: false
  },
  {
    id: 2,
    title: "TypeMe",
    meta: "TYPEME",
    type: "image",
    imageSrc: thumbnailTypeMe,
    fitMode: "contain",
    bgColor: "bg-black",
    linkUrl: "https://typeme.space",
    linkLabel: "typeme.space",
    cursorLabel: "View Project",
    isExternal: true
  },
  {
    id: 3,
    title: "Drix Media",
    meta: "DRIX MEDIA",
    type: "image",
    imageSrc: thumbnailDrixMedia,
    fitMode: "contain",
    bgColor: "bg-black",
    linkUrl: "https://drixmedia.in",
    linkLabel: "drixmedia.in",
    cursorLabel: "View Project",
    isExternal: true
  },
  {
    id: 4,
    title: "Flyt Social",
    meta: "FLYTSOCIAL",
    type: "image",
    imageSrc: thumbnailFlytSocial,
    fitMode: "contain",
    bgColor: "bg-black",
    linkUrl: "https://flytsocial.com",
    linkLabel: "flytsocial.com",
    cursorLabel: "View Project",
    isExternal: true
  },
  {
    id: 5,
    title: "Relax Infinity",
    meta: "RELAX INFINITY • AI WELLNESS APP",
    type: "image",
    imageSrc: thumbnailRelax,
    fitMode: "contain",
    bgColor: "bg-black",
    linkUrl: "https://www.figma.com/design/eqISMff87WDCTgsunEDASs/Relax-Infinity?node-id=0-1&t=HZfzLnuLPANcwd9r-1",
    linkLabel: "Figma File",
    cursorLabel: "View Project",
    isExternal: false
  },
  {
    id: 6,
    title: "Solliquo",
    meta: "SOULLIQO • E-COMMERCE",
    type: "image",
    imageSrc: thumbnailSolliquo,
    fitMode: "contain",
    alignMode: "bottom",
    bgColor: "bg-black",
    linkUrl: "https://www.figma.com/design/rh3IYmRYjCcbO2AUPgmZEB/Soulliqo?node-id=0-1&t=jQniqtUbVSdnVjre-1",
    linkLabel: "Figma File",
    cursorLabel: "View Project",
    isExternal: false
  },
  {
    id: 7,
    title: "FirstOX Studio",
    meta: "FIRSTOX STUDIO",
    type: "image",
    imageSrc: thumbnailFirstOX,
    fitMode: "contain",
    bgColor: "bg-black",
    linkUrl: "#",
    linkLabel: "View Project",
    cursorLabel: "View Project",
    isExternal: true
  }
];

const CaseStudyCard: React.FC<{
  project: ProjectItem;
  onClick: () => void;
}> = ({ project, onClick }) => {
  return (
    <div className="group cursor-none flex flex-col h-full" onClick={onClick}>
      <div
        className="relative w-full aspect-[4/3] md:aspect-[1.4/1] overflow-hidden mb-1 transition-all duration-500 ease-out shadow-sm md:group-hover:-translate-y-1.5 md:group-hover:shadow-xl border border-black/5 bg-gray-100 rounded-2xl"
        data-cursor-type="text"
        data-cursor-label={project.cursorLabel || "View Case Study"}
      >
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <img
            src={project.imageSrc}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>

      <div className="mt-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-4">
          <a
            href={project.linkUrl}
            target={project.isExternal ? "_blank" : undefined}
            rel={project.isExternal ? "noopener noreferrer" : undefined}
            onClick={(e) => {
              if (!project.isExternal || project.linkUrl === '#') {
                e.preventDefault();
                e.stopPropagation();
                onClick();
              } else {
                e.stopPropagation();
              }
            }}
            className="group inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#18A0FB] hover:text-[#0b79c3] transition-colors"
          >
            {project.linkLabel}
            <ArrowRightIcon className="w-3 h-3 transition-transform duration-300 group-hover:-rotate-45" />
          </a>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] shrink-0">
            {project.meta}
          </span>
        </div>
      </div>
    </div>
  );
};

interface WorkSectionProps {
  onProjectClick?: (id: number) => void;
}

const WorkSection: React.FC<WorkSectionProps> = ({ onProjectClick }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isCursorDragging, setIsCursorDragging] = useState(false);

  // Drag & Motion refs
  const currentTranslateRef = useRef<number>(-1200);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const dragStartTranslateRef = useRef<number>(0);
  const hasMovedRef = useRef<boolean>(false);
  const animationFrameIdRef = useRef<number | null>(null);

  const caseStudyProject = projects[0];
  const selectedWorkProjects = projects.slice(1);
  // Tripled list for seamless infinite loop
  const displayShowcase = [...selectedWorkProjects, ...selectedWorkProjects, ...selectedWorkProjects];

  const handleCardClick = (id: number) => {
    // If user dragged more than threshold, ignore click
    if (hasMovedRef.current) return;
    if (onProjectClick) {
      onProjectClick(id);
    }
  };

  const currentSpeedRef = useRef<number>(1.35);

  // Continuous loop + drag physics
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Set initial position in middle segment
    const setupInitialPosition = () => {
      const loopWidth = track.scrollWidth / 3;
      if (loopWidth > 0 && currentTranslateRef.current === -1200) {
        currentTranslateRef.current = -loopWidth;
      }
    };
    setupInitialPosition();

    const animate = () => {
      const loopWidth = track.scrollWidth / 3;

      if (loopWidth > 0) {
        // Smoothly interpolate speed: fast default (1.35), slow on hover (0.35)
        if (!isDraggingRef.current) {
          const targetSpeed = isHovered ? 0.35 : 1.35;
          currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * 0.08;
          currentTranslateRef.current += currentSpeedRef.current;
        }

        // Seamless wrap boundaries
        if (currentTranslateRef.current >= 0) {
          currentTranslateRef.current -= loopWidth;
        } else if (currentTranslateRef.current <= -loopWidth * 2) {
          currentTranslateRef.current += loopWidth;
        }

        track.style.transform = `translateX(${currentTranslateRef.current}px)`;
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [isHovered]);

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
    <>
      {/* Featured UX Case Study Section */}
      <section id="case-study" className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-16 pt-16 md:pt-28 pb-8 md:pb-12">
        <div className="mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#1a1a1a] font-serif leading-[1.1]">
            Featured <span className="text-gray-400 italic font-serif">Case Study.</span>
          </h2>
          <div className="w-16 sm:w-24 h-[1px] bg-black/10 mt-6 md:mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          <CaseStudyCard
            project={caseStudyProject}
            onClick={() => handleCardClick(caseStudyProject.id)}
          />
        </div>
      </section>

      {/* Selected Work Section - Interactive Draggable 3D Carousel (Upright & Right-Moving) */}
      <section id="work" className="w-full max-w-full overflow-hidden bg-transparent py-16 md:py-24 relative select-none">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-16 mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#1a1a1a] font-serif leading-[1.1]">
            Selected <span className="text-gray-400 italic font-serif">Work.</span>
          </h2>
          <div className="w-16 sm:w-24 h-[1px] bg-black/10 mt-6 md:mt-8"></div>
        </div>

        {/* 3D Carousel Stage */}
        <div 
          className={`relative w-full py-10 md:py-16 overflow-hidden flex items-center justify-center ${isCursorDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={() => {
            handleMouseUpOrLeave();
            setIsHovered(false);
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Ultra Minimal Edge Vignettes */}
          <div className="absolute inset-y-0 left-0 w-3 sm:w-6 md:w-8 bg-gradient-to-r from-[#F4F4F4]/80 to-transparent z-30 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-3 sm:w-6 md:w-8 bg-gradient-to-l from-[#F4F4F4]/80 to-transparent z-30 pointer-events-none"></div>

          {/* 3D Viewport with Perspective */}
          <div className="iso-viewport w-full overflow-visible py-4">
            <div 
              ref={trackRef}
              className="iso-carousel-track"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {displayShowcase.map((project, index) => {
                return (
                  <div
                    key={`${project.id}-${index}`}
                    onClick={() => handleCardClick(project.id)}
                    className="iso-card-container group"
                    style={{
                      zIndex: index + 1
                    }}
                    data-cursor-type="text"
                    data-cursor-label={project.cursorLabel || "View Project"}
                  >
                    {/* The 3D Mockup Card (Upright Standing & Right-Faced) */}
                    <div className="iso-card-3d">
                      {/* Top Glass/Gloss Reflection Bar */}
                      <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-white/25 via-white/10 to-transparent z-20 pointer-events-none rounded-t-[14px]"></div>

                      {/* Card Content / Project Screenshot */}
                      <div className={`w-full h-full ${project.bgColor || 'bg-[#111]'} relative overflow-hidden rounded-[14px] flex ${project.alignMode === 'bottom' ? 'items-end justify-center' : 'items-center justify-center'}`}>
                        <img
                          src={project.imageSrc}
                          alt={project.title}
                          draggable={false}
                          className={`w-full transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none select-none ${
                            project.fitMode === 'contain'
                              ? `object-contain ${project.alignMode === 'bottom' ? 'object-bottom p-3 pb-0' : 'h-full p-3'}`
                              : `h-full object-cover ${project.alignMode === 'bottom' ? 'object-bottom' : ''}`
                          }`}
                          loading="lazy"
                        />
                        
                        {/* Subtle ambient shadow over inactive cards */}
                        <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-colors duration-500 pointer-events-none"></div>
                      </div>

                      {/* Floating Interactive Project Pill on Hover */}
                      <div className="iso-badge absolute -bottom-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out pointer-events-none whitespace-nowrap z-50 transform group-hover:translate-y-0 translate-y-3">
                        <div className="bg-[#111116]/95 backdrop-blur-md text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full shadow-2xl border border-white/20 flex items-center gap-2.5">
                          <span className="font-bold tracking-tight">{project.title}</span>
                          <span className="w-1 h-1 rounded-full bg-white/40"></span>
                          <span className="text-gray-300 text-[10px] uppercase font-mono tracking-wider">{project.meta}</span>
                          <span className="text-[#18A0FB] text-xs">↗</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* Isometric Stage Perspective */
        .iso-viewport {
          perspective: 2000px;
          perspective-origin: 50% 50%;
          transform-style: preserve-3d;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        /* Seamless Conveyor / Drag Track */
        .iso-carousel-track {
          display: flex;
          align-items: center;
          width: max-content;
          transform-style: preserve-3d;
          padding: 30px 20px 60px;
          will-change: transform;
          user-select: none;
        }

        /* Individual Card Container with Subtle Spacing */
        .iso-card-container {
          position: relative;
          flex-shrink: 0;
          width: 270px;
          height: 175px;
          margin-left: -40px;
          transform-style: preserve-3d;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .iso-card-container:first-child {
          margin-left: 10px;
        }

        @media (min-width: 640px) {
          .iso-card-container {
            width: 360px;
            height: 230px;
            margin-left: -50px;
          }
        }

        @media (min-width: 1024px) {
          .iso-card-container {
            width: 470px;
            height: 300px;
            margin-left: -70px;
          }
        }

        @media (min-width: 1280px) {
          .iso-card-container {
            width: 540px;
            height: 340px;
            margin-left: -90px;
          }
        }

        /* Upright Standing Right-Faced 3D Mockup Card */
        .iso-card-3d {
          width: 100%;
          height: 100%;
          border-radius: 16px;
          position: relative;
          background: #121217;
          border: 1.5px solid rgba(255, 255, 255, 0.18);
          transform: rotateY(45deg) rotateX(0deg) rotateZ(0deg);
          transform-style: preserve-3d;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease;
          box-shadow:
            15px 20px 35px -5px rgba(0, 0, 0, 0.28),
            5px 8px 15px -3px rgba(0, 0, 0, 0.16),
            inset 0 1px 1px 0 rgba(255, 255, 255, 0.25);
        }

        /* Hover Elevation - Pops out forward while standing upright */
        .iso-card-container:hover {
          z-index: 99999 !important;
        }

        .iso-card-container:hover .iso-card-3d {
          transform: rotateY(16deg) rotateX(0deg) rotateZ(0deg) translateZ(75px) translateY(-18px) scale(1.04);
          border-color: rgba(255, 255, 255, 0.5);
          box-shadow:
            25px 35px 60px -8px rgba(0, 0, 0, 0.38),
            8px 15px 25px -4px rgba(0, 0, 0, 0.2),
            0 0 20px rgba(255, 255, 255, 0.15),
            inset 0 1px 2px rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </>
  );
};

export default WorkSection;