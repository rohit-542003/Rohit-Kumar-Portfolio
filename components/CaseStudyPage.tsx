import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import { ArrowRightIcon } from './Icons';

import vatsalPost1 from '../img/vatsal parikh.jpg';
import vatsalPost2 from '../img/vatsal parikh2.jpg';
import scanAndPayImg from '../user_flow_img/Scan and Pay.png';
import existingSplitFlowImg from '../user_flow_img/Split and Pay method.png';
import newSplitInScanPayImg from '../user_flow_img/Current Split and pay method inside the scan and pay method (2).png';

import designThumbnail from '../img/case study design/Thumbnail.png';
import design1 from '../img/case study design/Desktop - 1.png';
import design2 from '../img/case study design/Desktop - 2.png';
import design3 from '../img/case study design/Desktop - 3.png';
import design4 from '../img/case study design/Desktop - 4.png';
import design5 from '../img/case study design/Desktop - 5.png';
import design6 from '../img/case study design/Desktop - 6.png';
import design7 from '../img/case study design/Desktop - 7.png';
import design8 from '../img/case study design/Desktop - 8.png';

interface CaseStudyPageProps {
  onBack: () => void;
}

const sections = [
  { 
    id: 'overview', title: 'Context & Story', number: '01',
    children: [
      { id: 'overview-product', title: 'Product Overview' },
      { id: 'overview-story', title: 'The Story' }
    ]
  },
  { 
    id: 'competitive', title: 'Competitive Analysis', number: '02',
    children: [
      { id: 'competitive-landscape', title: 'Market Landscape' },
      { id: 'competitive-takeaways', title: 'UX Takeaways' }
    ]
  },
  { 
    id: 'research', title: 'Research', number: '03',
    children: [
      { id: 'research-quantitative', title: 'Quantitative Research' },
      { id: 'research-qualitative', title: 'Qualitative Research' }
    ]
  },
  { 
    id: 'define', title: 'Define', number: '04',
    children: [
      { id: 'define-process', title: 'Design Process' },
      { id: 'define-problem', title: 'Problem vs Solution' }
    ]
  },
  { 
    id: 'ideate', title: 'User Flow', number: '05',
    children: [
      { id: 'ideate-scan', title: 'Scan and Pay Flow' },
      { id: 'ideate-existing', title: 'Existing Split Method' },
      { id: 'ideate-new', title: 'New Split Method' }
    ]
  },
  { 
    id: 'design', title: 'Design', number: '06',
    children: []
  },
];

const DashedCircleIcon = ({ active }: { active?: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <circle cx="8" cy="8" r="6" stroke={active ? "#1a1a1a" : "#9CA3AF"} strokeWidth="1.5" strokeDasharray="3 3" fill="transparent" />
  </svg>
);

const ChevronIcon = ({ expanded }: { expanded?: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={`shrink-0 transition-transform ${expanded ? 'rotate-90' : ''}`}>
    <path d="M6 12L10 8L6 4" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Reusable Small Data Table Component
interface DataTableProps {
    title: string;
    data: { label: string, value: string }[];
}

const DataTable: React.FC<DataTableProps> = ({ title, data }) => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col h-full hover:shadow-md transition-shadow duration-300">
    <div className="px-8 py-5 border-b border-gray-100">
        <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400">{title}</h4>
    </div>
    <div className="flex-grow divide-y divide-gray-50">
        {data.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center px-8 py-6 text-sm gap-6 hover:bg-gray-50/30 transition-colors">
                <span className="text-gray-500 font-medium leading-snug max-w-[160px]">{item.label}</span>
                <span className="font-bold text-[#1a1a1a] text-right text-base shrink-0">{item.value}</span>
            </div>
        ))}
    </div>
  </div>
);

// Reusable Pie Chart Component for Survey Data
interface SurveyChartProps {
    question: string;
    data: { label: string, value: number, color: string }[];
    insight: string;
}

const SurveyChart: React.FC<SurveyChartProps> = ({ question, data, insight }) => {
    let currentAngle = 0;
    const gradientParts = data.map(item => {
        const start = currentAngle;
        const end = currentAngle + (item.value / 100) * 360;
        currentAngle = end;
        return `${item.color} ${start}deg ${end}deg`;
    });
    const gradientString = `conic-gradient(${gradientParts.join(', ')})`;

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow duration-300">
            {/* Header */}
            <h4 className="text-[#1a1a1a] font-medium text-sm mb-6 leading-snug font-onest border-b border-gray-50 pb-4 min-h-[3.5rem] flex items-end">
                {question}
            </h4>
            
            <div className="flex flex-col sm:flex-row items-start gap-8 mb-6">
                {/* Pie Chart */}
                <div className="relative w-28 h-28 shrink-0 rounded-full shadow-inner self-center sm:self-start" style={{ background: gradientString }}></div>
                
                {/* Legend - Cleanly spaced columns */}
                <div className="flex flex-col w-full min-w-0 gap-2">
                    {data.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs w-full py-0.5">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <span className="w-3 h-3 rounded-sm shadow-sm shrink-0" style={{ backgroundColor: item.color }}></span>
                                <span className="text-gray-600 font-medium truncate">{item.label}</span>
                            </div>
                            <span className="font-bold text-[#1a1a1a] pl-4 tabular-nums">{item.value}%</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Derived Insight */}
            <div className="mt-auto pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 leading-relaxed">
                    <span className="font-bold text-[#3B82F6] uppercase tracking-wider text-[10px] block mb-1">Key Insight</span>
                    {insight}
                </p>
            </div>
        </div>
    );
};

const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ onBack }) => {
  const [activeId, setActiveId] = useState('overview');
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    overview: true,
    competitive: true,
    research: true,
    define: true,
    ideate: true,
    design: true
  });

  const toggleSection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Scroll spy logic to know where we stand
  useEffect(() => {
    const handleScroll = () => {
        const isMobile = window.innerWidth < 768;
        const spyOffset = isMobile ? 140 : 120; // Slightly larger than scrollToSection offset
        const scrollPosition = window.scrollY + spyOffset; 

        // Flatten all sections and children to get all trackable IDs
        const allTrackables = sections.reduce((acc, curr) => {
            acc.push(curr.id);
            if (curr.children) {
                curr.children.forEach(child => acc.push(child.id));
            }
            return acc;
        }, [] as string[]);

        // Find the element currently in view
        let currentActiveId = sections[0].id;
        for (const id of allTrackables) {
            const element = document.getElementById(id);
            if (element) {
                const { offsetTop } = element;
                if (scrollPosition >= offsetTop) {
                    currentActiveId = id;
                } else {
                    break;
                }
            }
        }
        setActiveId(currentActiveId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll offset logic
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
        // Larger offset for mobile to account for the sticky header height
        const isMobile = window.innerWidth < 768;
        const offset = isMobile ? 120 : 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        window.scrollTo({
            top: elementRect - bodyRect - offset,
            behavior: 'smooth'
        });
    }
  };

  const journeyPhases = [
      {
          phase: "Payment",
          action: "Scans QR. Pays ₹1200 for the group.",
          thinking: "I'll just pay now. We can split later.",
          feeling: "😐",
          feelingLabel: "Neutral"
      },
      {
          phase: "The Interval",
          action: "Leaves cafe. Drives home with friends.",
          thinking: "That was fun. (Forgets amount)",
          feeling: "🙂",
          feelingLabel: "Happy"
      },
      {
          phase: "Recall",
          action: "Checks bank balance the next day.",
          thinking: "Wait, I paid ₹1200. I need to ask them back.",
          feeling: "😟",
          feelingLabel: "Anxious"
      },
      {
          phase: "Friction",
          action: "Opens GPay -> Finds Split -> Switches app / make group",
          thinking: "Why is this so hard? Too many steps.",
          feeling: "😤",
          feelingLabel: "Frustrated"
      },
      {
          phase: "Action",
          action: "Sends manual requests via WhatsApp.",
          thinking: "Hope I don't look petty asking for ₹200.",
          feeling: "😓",
          feelingLabel: "Awkward"
      }
  ];

  const defineData = [
      {
          number: "01",
          problemTitle: "Hidden & Disconnected Flow",
          problemDesc: "Splitting is currently a separate, often forgotten chore that happens long after the transaction. Plus, the feature is hidden in sub-menus, causing feature blindness.",
          solutionTitle: "Unified Entry Point",
          solutionDesc: "Modified the primary 'Scan any QR code' action to explicitly include 'Split', making the feature discoverable at the very first step of the payment journey."
      },
      {
          number: "02",
          problemTitle: "Group Fatigue",
          problemDesc: "Creating a formal group for a one-time casual coffee run feels like overkill.",
          solutionTitle: "Frictionless Ad-hoc Splitting",
          solutionDesc: "Enables sending split requests immediately with one tap, without the mandatory requirement of creating a permanent group."
      },
      {
          number: "03",
          problemTitle: "Social Friction",
          problemDesc: "Sending a payment request hours later can feel confrontational or petty.",
          solutionTitle: "Zero Embarrassment",
          solutionDesc: "Automated system requests at the moment of payment eliminate the social awkwardness of manually asking for money back."
      }
  ];

  // Survey Data Mapping based on User Images
  const surveyData = [
      {
        question: "1. Which UPI payment app you use often?",
        insight: "Google Pay is the dominant choice (52.6%) among the target demographic, validating the focus of this case study.",
        data: [
            { label: "Google Pay", value: 52.6, color: "#4285F4" }, // Blue
            { label: "PhonePe", value: 15.8, color: "#DB4437" }, // Red
            { label: "Paytm", value: 10.5, color: "#F4B400" }, // Orange
            { label: "Others", value: 21.1, color: "#0F9D58" } // Green
        ]
      },
      {
        question: "2. Did you know there was a Split expense method on Google Pay?",
        insight: "Awareness is nearly split down the middle. 45% of active users are completely unaware the feature exists.",
        data: [
            { label: "Yes", value: 55, color: "#4285F4" }, // Blue
            { label: "No", value: 45, color: "#DB4437" } // Red
        ]
      },
      {
        question: "3. How did you find the split method on Gpay?",
        insight: "Discovery is organic or accidental. 70% found it via 'Self explore' or have 'No idea', indicating poor in-app promotion.",
        data: [
            { label: "Self explore", value: 40, color: "#0F9D58" }, // Green
            { label: "No idea it exists", value: 30, color: "#AB47BC" }, // Purple
            { label: "From Friends", value: 20, color: "#4285F4" }, // Blue
            { label: "From Family", value: 5, color: "#DB4437" }, // Red
            { label: "Ads", value: 5, color: "#F4B400" } // Orange
        ]
      },
      {
        question: "4. If you know about the split method, how often do you used it?",
        insight: "Knowledge doesn't equal usage. 70% of those who know about it still use it 'Rarely' or 'Not at all'.",
        data: [
            { label: "Not at all", value: 40, color: "#0F9D58" }, // Green
            { label: "Rarely", value: 30, color: "#DB4437" }, // Red
            { label: "Sometimes", value: 20, color: "#4285F4" }, // Blue
            { label: "All the time", value: 10, color: "#F4B400" } // Orange
        ]
      },
      {
        question: "5. How often do you need to split the amount while using UPI?",
        insight: "While 40% never split, the majority (60%) encounter splitting scenarios, representing a significant user base.",
        data: [
            { label: "Never", value: 40, color: "#F4B400" }, // Orange
            { label: "Rarely", value: 30, color: "#DB4437" }, // Red
            { label: "Sometimes", value: 30, color: "#4285F4" } // Blue
        ]
      },
      {
        question: "6. With whom the split happens the most?",
        insight: "Splitting is a social activity. 84.2% of transactions happen with friends, suggesting a casual, speed-oriented context.",
        data: [
            { label: "Friends", value: 84.2, color: "#DB4437" }, // Red
            { label: "Family", value: 10.5, color: "#4285F4" }, // Blue
            { label: "Relatives", value: 5.3, color: "#F4B400" } // Orange
        ]
      },
      {
        question: "7. How was your experience with Gpay Split method?",
        insight: "The current experience is failing. Over 52% rated it as 'Average' or 'Not Satisfactory'.",
        data: [
            { label: "Good", value: 36.8, color: "#DB4437" }, // Red
            { label: "Not Satisfactory", value: 26.3, color: "#AB47BC" }, // Purple
            { label: "Average", value: 26.3, color: "#F4B400" }, // Orange
            { label: "Excellent", value: 5.3, color: "#4285F4" }, // Blue
            { label: "Satisfactory", value: 5.3, color: "#0F9D58" } // Green
        ]
      },
      {
        question: "8. How about a feature where you can instantly split the amount while paying?",
        insight: "High desirability. 65% of users definitely want an instant split feature, validating the proposed solution.",
        data: [
            { label: "Yes, Definitely", value: 65, color: "#4285F4" }, // Blue
            { label: "May or May not be", value: 20, color: "#DB4437" }, // Red
            { label: "Not at all", value: 15, color: "#F4B400" } // Orange
        ]
      }
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#1a1a1a] font-onest animate-fade-in flex flex-col">
      
      {/* Navigation / Back Button - Removed as it is now handled by the sticky Header */}

      {/* Hero / Title Section */}
      <div className="pb-12 md:pb-24 max-w-[1400px] mx-auto px-6 md:px-16 w-full mt-24 md:mt-32">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
            <div className="lg:col-span-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                    <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></span>
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Google Pay • UX Case Study</span>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <a 
                            href="https://www.figma.com/design/RdwSrdq0Gdd3VuA3PdoMO4/GooglePay-redesign?node-id=113-3979" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#18A0FB]/10 text-[#18A0FB] rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-[#18A0FB] hover:text-white transition-all duration-300 border border-[#18A0FB]/20"
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
                    </div>
                </div>
                <p className="text-lg md:text-xl leading-relaxed text-gray-600 font-onest max-w-2xl mb-8">Integrating expense splitting directly into the Scan & Pay flow to complete payment process without post-payment hassle.</p>
            </div>
            <div className="lg:col-span-4 lg:pl-12">
                <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-l border-gray-200 pl-8">
                     <div>
                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Role</span>
                        <span className="text-base font-serif text-[#1a1a1a]">UX Research & Design</span>
                     </div>
                     <div>
                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Timeline</span>
                        <span className="text-base font-serif text-[#1a1a1a]">1 Month</span>
                     </div>
                     <div className="col-span-2">
                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Tools to Make</span>
                        <span className="text-base font-serif text-[#1a1a1a]">Figma, FigJam, Google AI Studio</span>
                     </div>
                     <div className="col-span-2">
                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Tools for Research</span>
                        <span className="text-base font-serif text-[#1a1a1a]">Gemini 3, Perplexity Pro</span>
                     </div>
                </div>
            </div>
         </div>
      </div>

      {/* Mobile Sticky Navigation - Floating Style */}
      <div className="md:hidden sticky top-0 z-40 bg-[#F9F9F9]/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="flex overflow-x-auto hide-scrollbar py-4 px-6 gap-6 items-center">
            {sections.map((section) => {
                const isSectionActive = activeId === section.id || (section.children && section.children.some(c => c.id === activeId));
                return (
                <button 
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center gap-2 whitespace-nowrap text-xs font-medium transition-colors shrink-0 ${isSectionActive ? 'text-[#1a1a1a]' : 'text-gray-500 hover:text-[#1a1a1a]'}`}
                >
                    <span className={`text-[10px] font-bold transition-colors ${isSectionActive ? 'text-[#3B82F6]' : 'text-[#3B82F6]/40'}`}>{section.number}</span>
                    <span>{section.title}</span>
                </button>
            )})}
          </div>
      </div>

      <div className="flex-grow">
         <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-24 py-12 md:py-24 relative">
            
            {/* Desktop Sidebar Table of Contents */}
            <div className="hidden md:block md:col-span-3 lg:col-span-3">
               <div className="sticky top-32 text-[#1a1a1a] font-onest max-h-[calc(100vh-8rem)] overflow-y-auto hide-scrollbar pb-8">
                  <div className="flex flex-col gap-1">
                    {sections.map((section) => {
                        const isSectionActive = activeId === section.id || (section.children && section.children.some(c => c.id === activeId));
                        return (
                        <div key={section.id} className="flex flex-col relative">
                           {/* Parent Node */}
                           <div 
                               className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-100 cursor-pointer transition-colors group"
                               onClick={() => scrollToSection(section.id)}
                           >
                               <div 
                                 className="w-4 h-4 flex items-center justify-center -ml-1 text-gray-400 hover:text-gray-700 transition-colors"
                                 onClick={(e) => toggleSection(section.id, e)}
                               >
                                 {section.children && section.children.length > 0 ? (
                                   <ChevronIcon expanded={expandedSections[section.id]} />
                                 ) : <div className="w-4 h-4" />}
                               </div>
                               <DashedCircleIcon active={isSectionActive} />
                               <span className={`text-sm ${isSectionActive ? 'text-black font-semibold' : 'text-gray-700 font-medium group-hover:text-black'}`}>
                                 {section.title}
                               </span>
                           </div>

                           {/* Children Nodes */}
                           {section.children && section.children.length > 0 && expandedSections[section.id] && (
                             <div className="flex flex-col relative ml-4 pl-4 border-l border-gray-200 py-1 gap-1">
                               {section.children.map((child) => (
                                 <div 
                                   key={child.id}
                                   onClick={() => scrollToSection(child.id)}
                                   className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer transition-colors group"
                                 >
                                    <DashedCircleIcon active={activeId === child.id} />
                                    <span className={`text-[13px] ${activeId === child.id ? 'text-black font-semibold' : 'text-gray-500 font-medium group-hover:text-black'}`}>
                                      {child.title}
                                    </span>
                                 </div>
                               ))}
                             </div>
                           )}
                        </div>
                    )})}
                  </div>
               </div>
            </div>

            {/* Main Content Area */}
            <div className="col-span-1 md:col-span-9 lg:col-span-8 lg:col-start-5 flex flex-col gap-32 md:gap-40 pb-24">
               
               {/* 01 Overview & Story */}
               <section id="overview" className="scroll-mt-32">
                  <span className="block text-[#3B82F6] text-xs font-bold tracking-widest uppercase mb-4">01 — Context</span>
                  
                  {/* Reordered: Product Overview First */}
                  <div className="mb-12">
                     <h2 id="overview-product" className="scroll-mt-32 text-3xl md:text-5xl font-serif font-normal mb-8 text-[#1a1a1a]">Product Overview</h2>
                     <div className="bg-[#E8F0FE] p-8 md:p-10 rounded-2xl">
                        <p className="text-lg leading-relaxed text-[#1a1a1a]">
                            <strong className="text-[#3B82F6]">Seamless Split and Pay</strong> allows you to instantly settle the expenses after the payment within a group through the “Scan QR code” flow itself. While Google Pay allows you to split expenses within a group but it’s a slow, manual process that happens after the whole payment process. The Split and Pay feature lives directly inside the Scan and Pay flow. It allows the person paying the bill to settle with friends at the exact moment they pay the merchant.
                        </p>
                     </div>
                  </div>

                  {/* Context / The Story Second */}
                  <div className="mb-16">
                    <h2 id="overview-story" className="scroll-mt-32 text-3xl md:text-5xl font-serif font-normal mb-8 text-[#1a1a1a]">The Story</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">It was in the eve of 19th Dec, when I was scrolling through LinkedIn and stumbled upon this post. I realized I wasn't alone in letting go of small shared amounts to avoid the hassle, leading to significant unaccounted 'cash burn'.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                         <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                            <img src={vatsalPost1} alt="Vatsal Parikh LinkedIn Post 1" className="w-full h-auto object-cover" />
                         </div>
                         <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                            <img src={vatsalPost2} alt="Vatsal Parikh LinkedIn Post 2" className="w-full h-auto object-cover" />
                         </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6">After reading this post I started to relate and also thought that there were many instances when, I too, faced such problem of splitting the money. I used to let go of small amount and eventually this led to a lot of cash burn. In the end of the month when I check where my money was gone I wasn’t able to estimate properly. And sometimes I used to forget about the expenses I made 25 days ago like why I spent this much of amount on so and so shop. <strong className="text-[#1a1a1a] font-bold bg-[#E8F0FE] px-1 rounded-sm">Well this isn’t just about the statistics of where and why you spend the money, it’s about getting your money back when you split it among the group that will give you true satisfaction.</strong> And the only thing that’s stopping you from getting your money back is the UI and UX of the app because the feature is already present.</p>
                    <p className="text-gray-600 leading-relaxed mb-6">Now the question is whether should I use one app or two apps for splitting the amount? The answer is you definitely want all this things to happen on a single app only. So I did a competitive analysis on the 3 most popular UPI app of India where you can instantly pay the money to the merchant through QR code but can’t instantly split among the group.</p>
                  </div>
               </section>

               {/* 02 Competitive Analysis */}
               <section id="competitive" className="scroll-mt-32">
                  <span className="block text-[#3B82F6] text-xs font-bold tracking-widest uppercase mb-4">02 — Competitive Analysis</span>
                  <h2 id="competitive-landscape" className="scroll-mt-32 text-3xl md:text-5xl font-serif font-normal mb-8 text-[#1a1a1a]">Market Landscape</h2>
                  
                  <p className="text-lg text-gray-600 leading-relaxed mb-12">
                      I’ve taken the three most popular and used UPI app for competitive analysis and not the other apps
                      which has split and pay method like splitwise, splitkaro or fold money. Because if the UPI 
                      apps integrate this feature then hardly people are gonna use those apps. So I started to find and
                      solve the problems of one among these UPI apps.
                  </p>

                  <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm mb-16 bg-white">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[700px]">
                            <thead>
                                <tr className="bg-[#F8FAFC] border-b border-gray-200">
                                    <th className="p-6 font-bold text-gray-500 uppercase text-xs tracking-widest w-[200px]">Metric</th>
                                    <th className="p-6 font-bold text-[#1a1a1a] text-lg w-[25%] font-serif">Google Pay</th>
                                    <th className="p-6 font-bold text-[#1a1a1a] text-lg w-[25%] font-serif">PhonePe</th>
                                    <th className="p-6 font-bold text-[#1a1a1a] text-lg w-[25%] font-serif">Paytm</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100 font-onest">
                                <tr className="group hover:bg-gray-50 transition-colors">
                                    <td className="p-6 font-bold text-[#3B82F6]">Market Share <span className="text-gray-400 font-normal block text-xs mt-1">(Volume)</span></td>
                                    <td className="p-6 font-medium text-gray-700">37%</td>
                                    <td className="p-6 font-medium text-gray-900">48.3%</td>
                                    <td className="p-6 font-medium text-gray-500">7.8%</td>
                                </tr>
                                <tr className="group hover:bg-gray-50 transition-colors">
                                    <td className="p-6 font-bold text-[#3B82F6]">Success Rate</td>
                                    <td className="p-6 text-gray-700 font-medium">99%</td>
                                    <td className="p-6 font-bold text-green-600">99.2% <span className="text-[10px] uppercase tracking-wide opacity-80 block mt-1">Highest</span></td>
                                    <td className="p-6 font-bold text-red-500">98.5% <span className="text-[10px] uppercase tracking-wide opacity-80 block mt-1">Lowest</span></td>
                                </tr>
                                <tr className="group hover:bg-gray-50 transition-colors">
                                    <td className="p-6 font-bold text-[#3B82F6]">Split Navigation</td>
                                    <td className="p-6 text-gray-700 leading-relaxed">Inside the <span className="font-bold">"Pay anyone"</span> button</td>
                                    <td className="p-6 text-gray-700 leading-relaxed">Inside <span className="font-bold">"To Mobile Number"</span></td>
                                    <td className="p-6 text-gray-700 leading-relaxed">Inside the <span className="font-bold">history</span></td>
                                </tr>
                                <tr className="group hover:bg-gray-50 transition-colors">
                                    <td className="p-6 font-bold text-[#3B82F6]">Split Method</td>
                                    <td className="p-6 text-gray-700 leading-relaxed">Not after the payment + history</td>
                                    <td className="p-6 text-gray-700 leading-relaxed">After payment + history</td>
                                    <td className="p-6 text-gray-700 leading-relaxed">History + link to message</td>
                                </tr>
                                <tr className="group hover:bg-gray-50 transition-colors">
                                    <td className="p-6 font-bold text-[#3B82F6]">Group Creation</td>
                                    <td className="p-6">
                                        <div className="flex flex-col gap-1">
                                             <span className="font-bold text-gray-900">Yes</span>
                                             <span className="text-red-500 text-xs font-bold uppercase tracking-wide">Mandatory</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex flex-col gap-1">
                                             <span className="font-bold text-gray-900">Yes</span>
                                             <span className="text-red-500 text-xs font-bold uppercase tracking-wide">Mandatory</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex flex-col gap-1">
                                             <span className="font-bold text-gray-900">Yes</span>
                                             <span className="text-red-500 text-xs font-bold uppercase tracking-wide">Mandatory</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="group hover:bg-gray-50 transition-colors">
                                    <td className="p-6 font-bold text-[#3B82F6]">Math</td>
                                    <td className="p-6 text-gray-700">Custom <span className="text-green-600 font-bold text-xs uppercase block mt-1">(Advanced)</span></td>
                                    <td className="p-6 text-gray-700">Custom</td>
                                    <td className="p-6 text-gray-700">Custom</td>
                                </tr>
                            </tbody>
                        </table>
                      </div>
                  </div>

                  <div className="mb-16">
                      <h3 id="competitive-takeaways" className="scroll-mt-32 text-xl font-serif text-[#1a1a1a] mb-8">- UX Takeaways</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-fr">
                            {[
                                { title: "Groups Fatigue", desc: "Mandatory group creation for every split and pay method.", className: "md:col-span-1" },
                                { title: "Post Memory-Tax", desc: "Have to remember the split after payment and then mandatory group creation.", className: "md:col-span-1" },
                                { title: "Flow vs Feature", desc: "I’m not adding a new feature rather I’m just modifying the existing feature to improve the current UX. I will make sure the user can split on the moment he pays the merchant.", className: "md:col-span-1 md:row-span-2" },
                                { title: "Public Chat", desc: "Making an announcement in the group for payment can not be good user experience for everyone, rather sending them personal message for payment instantly after the payment can create a good user experience.", className: "md:col-span-2" }
                            ].map((item, i) => (
                                <div key={i} className={`bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 flex flex-col justify-center ${item.className}`}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-[10px] font-bold text-[#3B82F6] bg-blue-50 px-2 py-0.5 rounded-md">0{i + 1}</span>
                                        <h4 className="font-bold text-[#1a1a1a] text-lg">{item.title}</h4>
                                    </div>
                                    <p className="text-sm text-gray-500 leading-relaxed font-onest">{item.desc}</p>
                                </div>
                            ))}
                      </div>
                  </div>
               </section>

               {/* 03 Research */}
               <section id="research" className="scroll-mt-32">
                  <span className="block text-[#3B82F6] text-xs font-bold tracking-widest uppercase mb-4">03 — Research</span>
                  
                  {/* Quantitative Research */}
                  <div className="mb-24">
                     <h2 id="research-quantitative" className="scroll-mt-32 text-3xl md:text-5xl font-serif font-normal mb-8 text-[#1a1a1a]">Quantitative Research</h2>
                     <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                         Before getting into who are the users of Google Pay app let’s understand that why most of the people use Google Pay for or on what purpose they pull out the Gpay scanner to pay.
                         Here’s the breakdown of on what category the UPI payment is done mostly, the data is taken from gemini:
                     </p>
                     
                     {/* Merchant Spend Table - Exactly matching the screenshot provided */}
                     <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm mb-16">
                        <div className="bg-white px-8 py-5 border-b border-gray-100 hidden md:grid md:grid-cols-[1.5fr_1fr_2fr] gap-4">
                            <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400">Category</h4>
                            <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400">% Spend</h4>
                            <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400">Typical Use Case</h4>
                        </div>
                        <div className="divide-y divide-gray-100/60">
                            {[
                                { cat: "Apparel & Fashion", pct: "27.70%", use: "Shopping at Zara, H&M, or online via Myntra/Ajio." },
                                { cat: "Beauty & Fitness", pct: "13.50%", use: "Gym memberships, salon visits, and Nykaa orders." },
                                { cat: "Food & Drink", pct: "12.90%", use: "Fine dining, Starbucks, and Zomato/Swiggy." },
                                { cat: "Home & Garden", pct: "12.80%", use: "Urban Ladder, IKEA, or local nursery/decor shops." },
                                { cat: "Groceries", pct: "10%", use: "Quick-commerce (Blinkit/Zepto) and Supermarkets." },
                                { cat: "Travel & Mobility", pct: "8%", use: "Uber/Ola rides and flight bookings." }
                            ].map((row, i) => (
                                <div key={i} className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_2fr] gap-4 md:gap-4 px-8 py-7 md:py-8 text-sm items-center hover:bg-gray-50/30 transition-colors">
                                    <span className="text-gray-700 font-medium md:text-base">{row.cat}</span>
                                    <span className="font-bold text-[#1a1a1a] text-base md:text-lg">{row.pct}</span>
                                    <span className="text-gray-500 leading-relaxed md:text-[13px]">{row.use}</span>
                                </div>
                            ))}
                        </div>
                     </div>

                     <p className="text-lg text-gray-600 leading-relaxed mb-6 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                        By observing the given table I can say that, atleast, the top three categories are mostly social things to do and I assume that most of their age groups will fall between 18-27. Now let’s look at the actual facts and figures of who are they, their demographic as well as their age group.
                     </p>

                     <p className="text-lg text-gray-600 leading-relaxed mb-12">
                        Now I’ve collected various other data points to find out the same pattern and indication that the idea of Frictionless Split and Pay method isn’t just the secondary function to be dismissed.
                     </p>

                     {/* Demographics Grid */}
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        <DataTable 
                            title="Professions"
                            data={[
                                { label: "Tech & IT Professionals", value: "38.00%" },
                                { label: "Corporate Salaried / Finance", value: "24.00%" },
                                { label: "Students (Higher Ed)", value: "22.00%" },
                                { label: "Business Owners / Others", value: "16.00%" }
                            ]}
                        />
                        <DataTable 
                            title="Geographic"
                            data={[
                                { label: "Tier-1 / Metro Cities", value: "80.00%" },
                                { label: "Tier-2 & Tier-3 Cities", value: "16.50%" },
                                { label: "Rural Areas", value: "3.50%" }
                            ]}
                        />
                        <DataTable 
                            title="Age Group"
                            data={[
                                { label: "25 – 40 Years (Millennials)", value: "45.0%" },
                                { label: "18 – 24 Years (Gen Z)", value: "28.30%" },
                                { label: "41 – 55 Years (Gen X)", value: "18.50%" },
                                { label: "Above 55 Years", value: "8.20%" }
                            ]}
                        />
                        <DataTable 
                            title="Device Usage"
                            data={[
                                { label: "Android OS", value: "82.00%" },
                                { label: "iOS (iPhone)", value: "18.00%" }
                            ]}
                        />
                        <DataTable 
                            title="Gender"
                            data={[
                                { label: "Male", value: "55.00%" },
                                { label: "Female", value: "45.00%" }
                            ]}
                        />
                     </div>

                     {/* Insights / Summary Block */}
                     <div className="mt-12 mb-12 p-8 bg-[#F0F9FF] border-l-4 border-[#3B82F6] rounded-r-xl">
                        <h4 className="font-bold text-[#3B82F6] mb-4 uppercase tracking-widest text-xs">Key Insights</h4>
                        <div className="space-y-4 text-[#1a1a1a] leading-relaxed text-base md:text-lg">
                           <p>My assumption almost got right, Gen Z or the age group of 18-24 are the second highest GPay users in India.</p>
                           <p>The highest number of GPay users are between 25-40 of age group and most of them do white collar jobs like they are tech savvy, Medical professionals, Urban Entrepreneurs, IT professionals and also Students.</p>
                           <p>80% of the users are from Tier-1 cities; it seems like Google Pay has captured the market of premium users.</p>
                           <p>With 73% of the users below the age of 40 who are the young generations, the events like “Group Shopping,” “Eating Outside” must be pretty much common as 80% of them belong to metropolitan cities.</p>
                           <p>45% of the users are female hence there must be no compromise in splitting the money when paying on behalf of anyone be it their friends or a family member.</p>
                        </div>
                     </div>

                     {/* Who uses Google Pay? - Moved Below Key Insights */}
                     <div className="mb-8">
                        <h3 className="text-2xl font-serif mb-6 text-[#1a1a1a]">Who uses Google Pay?</h3>
                        <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                             <div className="absolute top-0 left-0 w-1 h-full bg-[#3B82F6]"></div>
                             <p className="text-lg text-gray-700 leading-relaxed font-medium">
                                Most of the Gpay users come from the metropolitan cities like Mumbai, Bengaluru, Pune & Hyderabad who are mostly android users fall under the age group of 25-40. Most of these are White collar professionals, like people who work as medical professionals, software engineers, managers and also students.
                             </p>
                        </div>
                     </div>
                  </div>

                  {/* Qualitative Research */}
                  <div>
                    <h2 id="research-qualitative" className="scroll-mt-32 text-3xl md:text-5xl font-serif font-normal mb-8 text-[#1a1a1a]">Qualitative Research</h2>
                    
                    {/* User Survey Insights */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-serif mb-6 text-[#1a1a1a]">User Survey Insights (20 Responses)</h3>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            I conducted a survey with 20 participants to understand their splitting habits and pain points with the current ecosystem.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                           {surveyData.map((item, idx) => (
                               <SurveyChart 
                                   key={idx}
                                   question={item.question}
                                   data={item.data}
                                   insight={item.insight}
                               />
                           ))}
                        </div>
                    </div>

                    <h3 className="text-2xl font-serif mb-8">User Persona</h3>
                    <div className="bg-[#E8F0FE] p-8 md:p-12 rounded-2xl flex flex-col md:flex-row gap-10 items-start">
                        <div className="shrink-0 bg-[#F59E0B] w-40 h-48 rounded-lg shadow-sm flex items-center justify-center relative overflow-hidden">
                            <div className="absolute top-2 w-8 h-3 bg-white/30 rotate-3 rounded-sm"></div>
                            {/* Simple vector representation of Sumedh */}
                            <svg viewBox="0 0 100 100" className="w-24 h-24 text-black fill-current">
                                <circle cx="50" cy="35" r="15" />
                                <path d="M20 90 Q50 40 80 90" stroke="black" strokeWidth="5" fill="none" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-4">
                                    <h4 className="text-3xl font-bold text-[#1a1a1a]">Sumedh</h4>
                                    <span className="bg-[#FDE047] px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-full mt-2 md:mt-0 self-start">Archetype</span>
                            </div>
                            <ul className="text-sm text-gray-600 mb-6 space-y-1">
                                <li>• Age: 25</li>
                                <li>• Occupation: Software Developer</li>
                                <li>• Location: Bengaluru (Tier 1)</li>
                            </ul>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>Sumedh is a decent guy with a good salary working in Bengaluru. He shares a chunk of his salary with his parents. He has made many friends in his corporate life and loves to spend weekends exploring new places, playing sports, and watching movies.</p>
                                <div className="flex gap-3 flex-wrap">
                                    {['Decent', 'Shy', 'Helpful', 'Tech Savvy', 'Travel Enthusiast'].map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-white border border-blue-200 rounded-full text-xs font-bold text-blue-600">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Professional User Journey Map */}
                    <div className="mt-16 border-t border-gray-200 pt-16">
                        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 gap-4">
                            <h3 className="text-2xl font-serif text-[#1a1a1a]">Sumedh's Journey (Current State)</h3>

                        </div>
                        
                        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm overflow-x-auto">
                           <div className="min-w-[900px] grid grid-cols-[160px_1fr_1fr_1fr_1fr_1fr] divide-x divide-gray-100">
                                {/* Headers Column (Labels) */}
                                <div className="bg-gray-50/50 flex flex-col font-onest">
                                    <div className="h-14 flex items-center px-4 font-bold text-gray-400 text-[10px] uppercase tracking-widest border-b border-gray-100 bg-gray-100/50">Phase</div>
                                    <div className="h-32 px-4 py-4 font-bold text-[#1a1a1a] text-xs uppercase tracking-widest flex items-center border-b border-gray-100">Actions</div>
                                    <div className="h-32 px-4 py-4 font-bold text-[#1a1a1a] text-xs uppercase tracking-widest flex items-center border-b border-gray-100">Thinking</div>
                                    <div className="h-24 px-4 py-4 font-bold text-[#1a1a1a] text-xs uppercase tracking-widest flex items-center">Feeling</div>
                                </div>
                                
                                {/* Data Columns */}
                                {journeyPhases.map((phase, idx) => (
                                    <div key={idx} className="flex flex-col font-onest hover:bg-gray-50/30 transition-colors">
                                        <div className="h-14 flex items-center px-4 font-bold text-[#1a1a1a] text-sm border-b border-gray-100 bg-gray-50/30">
                                            {phase.phase}
                                        </div>
                                        <div className="h-32 px-4 py-6 text-sm text-gray-600 leading-relaxed border-b border-gray-100">
                                            {phase.action}
                                        </div>
                                        <div className="h-32 px-4 py-6 text-sm text-gray-500 italic leading-relaxed border-b border-gray-100">
                                            "{phase.thinking}"
                                        </div>
                                        <div className="h-24 px-4 flex items-center gap-3">
                                            <span className="text-2xl" role="img" aria-label={phase.feelingLabel}>{phase.feeling}</span>
                                            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{phase.feelingLabel}</span>
                                        </div>
                                    </div>
                                ))}
                           </div>
                        </div>
                    </div>
                  </div>
               </section>

               {/* 04 Define - UPDATED with Separate Problem & Solutions */}
               <section id="define" className="scroll-mt-32">
                   <span className="block text-[#3B82F6] text-xs font-bold tracking-widest uppercase mb-4">04 — Define</span>
                   
                   {/* Design Process Section */}
                   <div className="mb-20">
                        <h2 id="define-process" className="scroll-mt-32 text-3xl md:text-5xl font-serif font-normal mb-8 text-[#1a1a1a]">Design Process</h2>
                        <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                            Here’s the design process that I followed for improving the UX of Google Pay. I took Google pay for redesign 
                            because it is the second most used UPI for online payment after Phonepe. Unlike Phonepe, the Google pay
                            doesn’t even have the splitting method right after the payment which leaves the gpay most vulnerable to its
                            competitors for falling behind. So here’s the design process that I followed to improve the UX of gpay app.
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-4">
                            {[
                                { title: "Understand", items: ["User Research", "User Interview", "Competitive Analysis"] },
                                { title: "Define", items: ["User Personas", "Empathy Map", "User Journey"] },
                                { title: "Ideate", items: ["User Flow", "Information Architecture"] },
                                { title: "Design", items: ["Wireframe", "Hi-Fi Designs", "Prototype"] },
                                { title: "Test", items: ["Feedbacks", "Conclusion", "Future Concept"] }
                            ].map((step, idx) => (
                                <div key={idx} className="flex flex-col relative group">
                                    {/* Step Number & Line */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-sm border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                            {idx + 1}
                                        </div>
                                        <div className="h-[1px] bg-gray-100 flex-grow group-hover:bg-blue-200 transition-colors"></div>
                                    </div>
                                    
                                    {/* Title */}
                                    <h4 className="font-bold text-[#1a1a1a] text-lg mb-4">{step.title}</h4>
                                    
                                    {/* Items */}
                                    <ul className="space-y-2">
                                        {step.items.map((item, i) => (
                                            <li key={i} className="text-sm text-gray-500 font-medium flex items-center gap-2">
                                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                   </div>

                   <h2 id="define-problem" className="scroll-mt-32 text-3xl md:text-5xl font-serif font-normal mb-12 text-[#1a1a1a]">Problem vs Solution</h2>
                   
                   {/* The Problems Section */}
                   <div className="mb-16">
                       <h3 className="text-xl font-bold text-[#1a1a1a] mb-8">The Problems</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {defineData.map((item, i) => (
                               <div key={i} className="bg-white p-6 rounded-xl border border-red-100 shadow-sm hover:border-red-200 transition-colors">
                                   <h4 className="font-bold text-lg text-[#1a1a1a] mb-3">{item.problemTitle}</h4>
                                   <p className="text-gray-600 text-sm leading-relaxed">{item.problemDesc}</p>
                               </div>
                           ))}
                       </div>
                   </div>

                   {/* The Solutions Section */}
                   <div className="mb-16">
                       <h3 className="text-xl font-bold text-[#1a1a1a] mb-8">The Solutions</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {defineData.map((item, i) => (
                               <div key={i} className="bg-white p-6 rounded-xl border border-green-100 shadow-sm hover:border-green-200 transition-colors bg-green-50/20 flex flex-col">
                                   <h4 className="font-bold text-lg text-[#1a1a1a] mb-3">{item.solutionTitle}</h4>
                                   <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.solutionDesc}</p>
                               </div>
                           ))}
                       </div>
                   </div>


               </section>

<section id="ideate" className="scroll-mt-32">
                   <span className="block text-[#3B82F6] text-xs font-bold tracking-widest uppercase mb-4">05 — User Flow</span>
                   
                    <div className="mb-12">
                         {/* 1st - Scan and Pay Flow */}
                        <h3 id="ideate-scan" className="scroll-mt-32 text-xl font-bold text-[#1a1a1a] mb-8">User Flow of Scan and Pay</h3>
                        <div 
                            className="border border-gray-100 overflow-hidden shadow-sm bg-white mb-12 cursor-zoom-in group relative"
                            onClick={() => setSelectedImg(scanAndPayImg)}
                        >
                            <img 
                                src={scanAndPayImg} 
                                alt="User Flow of Scan and Pay" 
                                className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                        </div>

                        {/* 2nd - Existing Flow */}
                        <h3 id="ideate-existing" className="scroll-mt-32 text-xl font-bold text-[#1a1a1a] mb-8">Existing Split expense method</h3>
                        <div 
                            className="border border-gray-100 overflow-hidden shadow-sm bg-white mb-6 cursor-zoom-in group relative"
                            onClick={() => setSelectedImg(existingSplitFlowImg)}
                        >
                            <img 
                                src={existingSplitFlowImg} 
                                alt="Existing Split expense method" 
                                className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                        </div>
                        <p className="text-gray-600 leading-relaxed font-onest mb-12 max-w-2xl px-2">
                           As you can see that the current Split and pay scenario is separate and in different sections. If user wants to split the expense, either he has to go to the history or have to navigate to the 'Pay Anyone' section.
                        </p>

                        {/* 3rd - New Integrated Flow */}
                        <h3 id="ideate-new" className="scroll-mt-32 text-xl font-bold text-[#1a1a1a] mb-8">New Split and Pay method inside the Scan and pay flow</h3>
                        <div 
                            className="border border-gray-100 overflow-hidden shadow-sm bg-white cursor-zoom-in group relative"
                            onClick={() => setSelectedImg(newSplitInScanPayImg)}
                        >
                            <img 
                                src={newSplitInScanPayImg} 
                                alt="New Split and Pay method inside the Scan and pay flow" 
                                className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                        </div>
                    </div>
                   <p className="text-gray-600 leading-relaxed mb-8">
                     (This section is under construction)
                   </p>
               </section>

               {/* 06 Design - Placeholder to satisfy navigation */}
               <section id="design" className="scroll-mt-32">
                   <span className="block text-[#3B82F6] text-xs font-bold tracking-widest uppercase mb-4">06 — Design</span>
                   <h2 id="design-intro" className="scroll-mt-32 text-3xl md:text-5xl font-serif font-normal mb-8 text-[#1a1a1a]">Design</h2>
                   <p className="text-gray-600 leading-relaxed mb-12">
                     Here are the high-fidelity designs and screens showing the new integrated Split and Pay method within Google Pay's existing flow.
                   </p>

                   <div className="flex flex-col gap-12 md:gap-16">
                     {[designThumbnail, design1, design2, design3, design4, design5, design6, design7, design8].map((imgSrc, index) => (
                        <div 
                            key={index}
                            className="border border-gray-100 overflow-hidden shadow-sm bg-white cursor-zoom-in group relative"
                            onClick={() => setSelectedImg(imgSrc)}
                        >
                            <img 
                                src={imgSrc} 
                                alt={`Design Screen ${index + 1}`} 
                                className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                        </div>
                     ))}
                   </div>
               </section>

            </div>
         </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
      {/* Full-Screen Image Lightbox */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 animate-fade-in"
          onClick={() => setSelectedImg(null)}
        >
          {/* High-Contrast Blurred Background */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-all"></div>
          
          {/* Close Button */}
          <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-20">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image Frame */}
          <div className="relative z-10 max-w-full max-h-full overflow-hidden rounded-xl shadow-2xl border border-white/10 animate-scale-in">
            <img 
              src={selectedImg} 
              alt="Full Size View" 
              className="max-w-full max-h-[85vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudyPage;