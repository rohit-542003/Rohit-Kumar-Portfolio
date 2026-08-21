import React from 'react';
import thumbnailGPay from '../img/thumbnail_gpay.png';

const projects = [
  {
    id: 1,
    title: "Seamless split and pay",
    meta: "GOOGLE PAY • UX CASE STUDY",
    type: "image",
    imageSrc: thumbnailGPay,
    centerText: "",
  }
];

// Custom HTML Thumbnail Component for Google Pay Case Study
const GooglePayThumbnail = () => (
  <div className="absolute inset-0 bg-[#F0F9FF] flex flex-col items-center justify-center overflow-hidden select-none pointer-events-none">
    {/* Background Decor */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50/50 rounded-full blur-3xl"></div>

    {/* Main Phone/Card Graphic */}
    <div className="relative z-10 w-64 md:w-80 bg-white rounded-[2rem] shadow-2xl border-4 border-gray-100 p-[1rem] transform transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-[0.382rem]">
      {/* Header */}
      <div className="flex justify-between items-center mb-[1.618rem] px-[0.618rem]">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
        </div>
        <div className="h-2 w-20 bg-gray-100 rounded-full"></div>
      </div>

      {/* Split UI Mockup */}
      <div className="space-y-3">
        <div className="h-16 w-full bg-gray-50 rounded-xl flex items-center px-4 border border-gray-100">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs font-bold">SP</div>
          <div className="ml-3 flex-1">
            <div className="h-2 w-16 bg-gray-200 rounded mb-1.5"></div>
            <div className="h-1.5 w-10 bg-gray-100 rounded"></div>
          </div>
          <div className="text-xs font-bold text-gray-400">₹ 200</div>
        </div>

        {/* Active Split Item */}
        <div className="h-20 w-full bg-blue-50 rounded-xl flex items-center px-4 border border-blue-200 relative overflow-hidden">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold z-10">Me</div>
          <div className="ml-3 flex-1 z-10">
            <div className="h-2 w-20 bg-blue-200 rounded mb-1.5"></div>
            <div className="h-4 w-12 bg-blue-100 rounded flex items-center justify-center text-[8px] font-bold text-blue-600 uppercase">Splitting</div>
          </div>
          {/* Checkmark */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px]">✓</div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="absolute -bottom-[1rem] left-1/2 -translate-x-1/2 bg-[#1a73e8] text-white px-[1.618rem] py-[0.618rem] rounded-full shadow-lg shadow-blue-200 text-xs font-bold tracking-wide flex items-center gap-[0.618rem]">
        <span>Pay Now</span>
        <span className="opacity-70">→</span>
      </div>
    </div>

    {/* Text Overlay */}
    <div className="absolute bottom-[2.618rem] md:bottom-[4.236rem] z-20 text-center">
      <h3 className="text-2xl md:text-3xl font-bold text-blue-900 mb-[0.382rem]">Seamless</h3>
      <h3 className="text-xl md:text-2xl font-medium text-blue-600/80">Split & Pay</h3>
    </div>
  </div>
);

const ProjectCard: React.FC<{
  project: any,
  onClick: () => void
}> = ({ project, onClick }) => {

  const renderCardContent = () => {
    switch (project.type) {
      case 'gradient':
        return (
          <>
            <div className={`absolute inset-0 ${project.gradientClass}`}>
              <div className="absolute inset-0 bg-white/10" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center p-[1rem]">
              <h3 className="text-3xl md:text-5xl lg:text-5xl font-medium tracking-tight text-white text-center">
                {project.centerText}
              </h3>
            </div>
          </>
        );

      case 'image':
        // Fallback legacy image renderer
        return (
          <>
            <img
              src={project.imageSrc}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover bg-gray-200 transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
          </>
        );

      case 'custom':
        return <GooglePayThumbnail />;

      default:
        return null;
    }
  };

  return (
    <div className="group cursor-none flex flex-col h-full" onClick={onClick}>
      <div
        className="relative w-full aspect-[4/3] md:aspect-[1.4/1] overflow-hidden rounded-sm mb-[1.618rem] transition-all duration-500 ease-out shadow-sm md:group-hover:-translate-y-[0.382rem] md:group-hover:shadow-md bg-gray-100"
        data-cursor-type="text"
        data-cursor-label="View Case Study"
      >
        {renderCardContent()}
      </div>

      <div className="mt-auto">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-[1rem] mb-[1.618rem]">
          <a 
            href="https://www.figma.com/design/RdwSrdq0Gdd3VuA3PdoMO4/GooglePay-redesign?node-id=113-3979" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-[0.618rem] px-[1rem] py-[0.618rem] bg-[#18A0FB]/10 text-[#18A0FB] rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-[#18A0FB] hover:text-white transition-all duration-300 border border-[#18A0FB]/20 w-fit"
          >
            <svg className="w-3 h-3" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 28.5C19 25.9834 20.0009 23.57 21.7825 21.7885C23.564 20.0069 25.9798 19.006 28.5 19.006C31.0202 19.006 33.436 20.0069 35.2175 21.7885C36.9991 23.57 38 25.9834 38 28.5C38 31.0166 36.9991 33.43 35.2175 35.2115C33.436 36.9931 31.0202 37.994 28.5 37.994C25.9798 37.994 23.564 36.9931 21.7825 35.2115C20.0009 33.43 19 31.0166 19 28.5Z" fill="currentColor"/>
                <path d="M19 9.5C19 6.98343 20.0009 4.56996 21.7825 2.78848C23.564 1.007 25.9798 0.00604248 28.5 0.00604248C31.0202 0.00604248 33.436 1.007 35.2175 2.78848C36.9991 4.56996 38 6.98343 38 9.5C38 12.0166 36.9991 14.43 35.2175 16.2115C33.436 17.993 31.0202 18.994 28.5 18.994C25.9798 18.994 23.564 17.993 21.7825 16.2115C20.0009 14.43 19 12.0166 19 9.5Z" fill="currentColor"/>
                <path d="M0 9.5C0 12.0166 1.00089 14.43 2.78248 16.2115C4.56407 17.993 6.97981 18.994 9.5 18.994C12.0202 18.994 14.4359 17.993 16.2175 16.2115C17.9991 14.43 19 12.0166 19 9.5C19 6.98343 17.9991 4.57 16.2175 2.78852C14.4359 1.00704 12.0202 0.00608253 9.5 0.00608253C6.97981 0.00608253 4.56407 1.00704 2.78248 2.78852C1.00089 4.57 0 6.98343 0 9.5Z" fill="currentColor"/>
                <path d="M0 28.5C0 31.0166 1.00089 33.43 2.78248 35.2115C4.56407 36.9931 6.97981 37.994 9.5 37.994C12.0202 37.994 14.4359 36.9931 16.2175 35.2115C17.9991 33.43 19 31.0166 19 28.5C19 25.9834 17.9991 23.57 16.2175 21.7885C14.4359 20.007 12.0202 19.006 9.5 19.006C6.97981 19.006 4.56407 20.007 2.78248 21.7885C1.00089 23.57 0 25.9834 0 28.5Z" fill="currentColor"/>
                <path d="M0 47.5C0 50.0166 1.00089 52.43 2.78248 54.2115C4.56407 55.9931 6.97981 56.994 9.5 56.994C12.0202 56.994 14.4359 55.9931 16.2175 54.2115C17.9991 52.43 19 50.0166 19 47.5V38H9.5C6.97981 38 4.56407 39.001 2.78248 40.7825C1.00089 42.5641 0 44.9798 0 47.5Z" fill="currentColor"/>
            </svg>
            Figma File 
          </a>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] shrink-0">
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
  const handleCardClick = (id: number) => {
    if (onProjectClick) {
      onProjectClick(id);
    }
  };

  return (
    <section id="work" className="w-full px-[1.618rem] md:px-[4.236rem] pb-[6.854rem] md:pb-[11.09rem] max-w-[1400px] mx-auto">
      <div className="mb-[2.618rem] md:mb-[4.236rem] pt-[4.236rem] md:pt-[6.854rem]">
        <h2 className="text-[2.5rem] md:text-6xl font-normal tracking-tight text-[#1a1a1a] font-serif leading-[0.9]">
          Selected <span className="text-gray-400 italic font-serif">Work.</span>
        </h2>
        <div className="w-24 h-[1px] bg-black/10 mt-[2.618rem]"></div>
      </div>

      <div className="flex flex-col gap-[4.236rem] md:grid md:grid-cols-2 md:gap-x-[4.236rem]">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => handleCardClick(project.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default WorkSection;