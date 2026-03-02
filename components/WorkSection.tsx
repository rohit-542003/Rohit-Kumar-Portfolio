import React from 'react';

const projects = [
  {
    id: 1,
    title: "Seamless split and pay",
    meta: "GOOGLE PAY • UX CASE STUDY",
    type: "custom", // Changed to custom to render HTML
    centerText: "Google Pay",
  }
];

// Custom HTML Thumbnail Component for Google Pay Case Study
const GooglePayThumbnail = () => (
    <div className="absolute inset-0 bg-[#F0F9FF] flex flex-col items-center justify-center overflow-hidden select-none pointer-events-none">
        {/* Background Decor */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50/50 rounded-full blur-3xl"></div>
        
        {/* Main Phone/Card Graphic */}
        <div className="relative z-10 w-64 md:w-80 bg-white rounded-[2rem] shadow-2xl border-4 border-gray-100 p-4 transform transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 px-2">
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
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#1a73e8] text-white px-6 py-2 rounded-full shadow-lg shadow-blue-200 text-xs font-bold tracking-wide flex items-center gap-2">
                <span>Pay Now</span>
                <span className="opacity-70">→</span>
            </div>
        </div>

        {/* Text Overlay */}
        <div className="absolute bottom-8 md:bottom-12 z-20 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-blue-900 mb-1">Seamless</h3>
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
            <div className="absolute inset-0 flex items-center justify-center p-4">
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
              <div className={`absolute inset-0 ${project.overlayColor} transition-opacity duration-500`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-center justify-end h-full">
                 <h3 className="text-2xl md:text-4xl font-medium text-white tracking-tight drop-shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {project.centerText}
                </h3>
              </div>
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
          className="relative w-full aspect-[4/3] md:aspect-[1.4/1] overflow-hidden rounded-sm mb-5 transition-all duration-500 ease-out shadow-sm md:group-hover:translate-y-[-4px] md:group-hover:shadow-md bg-gray-100"
          data-cursor-type="text"
          data-cursor-label="View Case Study"
      >
        {renderCardContent()}
      </div>

      <div className="mt-auto">
        <div className="flex flex-col xl:flex-row xl:items-baseline xl:justify-between gap-2 xl:gap-4">
          <h2 className="font-serif text-[1.75rem] md:text-3xl leading-tight text-[#1a1a1a] group-hover:text-[#E86A3E] transition-colors duration-300">
            {project.title}
          </h2>
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
    <section className="w-full px-6 md:px-16 pb-24 md:pb-32 max-w-[1400px] mx-auto">
      <div className="mb-16 md:mb-24 pt-12 md:pt-24">
           <h2 className="text-[2.5rem] md:text-6xl font-normal tracking-tight text-[#1a1a1a] font-serif leading-[0.9]">
              Selected <span className="text-gray-400 italic font-serif">Work.</span>
           </h2>
           <div className="w-24 h-[1px] bg-black/10 mt-8"></div>
      </div>
      
      <div className="flex flex-col gap-16 md:grid md:grid-cols-2 md:gap-x-12">
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