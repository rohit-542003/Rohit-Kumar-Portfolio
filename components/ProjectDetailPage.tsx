import React from 'react';
import Footer from './Footer';
import thumbnailTypeMe from '../img/thumbnail_typeme.webp';
import thumbnailDrixMedia from '../img/thumbnail_drixmedia.webp';
import thumbnailFlytSocial from '../img/thumbnail_flytsocial.webp';
import thumbnailRelax from '../img/thumbnail_relax.webp';
import thumbnailSolliquo from '../img/thumbnail_solliquo.webp';
import thumbnailFirstOX from '../img/thumbnail_FirstOX.webp';

export interface ProjectDetailData {
  id: number;
  title: string;
  subtitle: string;
  tagline: string;
  category: string;
  role: string;
  timeline: string;
  liveUrl: string;
  imageSrc: string;
  bgColor: string;
  fitMode: 'contain' | 'cover';
  overview: string[];
  summary?: string;
  whatIDid?: string;
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  techStack: string[];
  deliverables: string[];
}

export const projectDetailsMap: Record<number, ProjectDetailData> = {
  2: {
    id: 2,
    title: "TypeMe",
    subtitle: "Minimalist Speed Typing Platform",
    tagline: "A distraction-free typing speed test built for focus, real-time analytics, and tactile feedback.",
    category: "Web Application • UI/UX & Frontend Development",
    role: "Creative Developer",
    timeline: "2025 – 2026",
    liveUrl: "https://typeme.space",
    imageSrc: thumbnailTypeMe,
    bgColor: "bg-black",
    fitMode: "contain",
    summary: "TypeMe is a sleek, distraction-free typing platform designed to elevate typing fluency and focus. Built with crisp typography, real-time metrics, dynamic visual feedback, and tactile audio feedback.",
    overview: [
      "In midst of night me and my friend decided to check who has the faster typing speed. So we started to search for the best website for checking the typing speed. We eventually found one, but the problem with the site was it only recorded the typing speed when logged in to the account, if by any chance we exited the scores would reset and our best scores would vanish off. So we found it as a resistance and wanted to build a typing app by ourselves where don't require log in and would be able to save the high scores. So we build this site called typeme.space where one could come and type and wouldn't lose is previous scores after exiting. Me and my friend built it for fun in the midst of the night. We added sound effects, leaderboard. No sign up and log in, just enter your guest name, for the sake of recording the name for leaderboard and then start typing."
    ],
    features: [
      {
        title: "Real-time Metrics Engine",
        description: "Calculates live WPM, Raw WPM, Accuracy (%), and mistake counts instantly on every keystroke without lag.",
        icon: "⚡"
      },
      {
        title: "Tactile Audio Synthesis",
        description: "Built-in Web Audio API mechanical switch sounds that deliver satisfying tactile acoustic feedback during typing.",
        icon: "🔊"
      },
      {
        title: "Custom Time & Word Modes",
        description: "Supports quick 15s, 30s, 60s, and 120s test durations as well as custom word banks and punctuation toggles.",
        icon: "⏱️"
      },
      {
        title: "Deep Focus Dark Aesthetic",
        description: "Carefully calibrated high-contrast typography on a deep OLED dark background to minimize eye strain.",
        icon: "🎨"
      },
      {
        title: "Post-Test Breakdown",
        description: "Comprehensive visual summary of speed consistency, error distribution, and keyboard shortcut to instantly retry.",
        icon: "📊"
      },
      {
        title: "Responsive & Lightweight",
        description: "Zero external bloatware, sub-second initial load, and full keyboard-driven navigation.",
        icon: "🚀"
      }
    ],
    techStack: ["Kiro", "Bolt"],
    deliverables: ["UI/UX Design System", "Interactive Prototype", "Full Frontend Architecture", "Audio Engine Implementation"]
  },
  3: {
    id: 3,
    title: "Drix Media",
    subtitle: "Creative Agency & Growth Platform",
    tagline: "High-impact digital agency website showcasing creative strategy, performance marketing, and modern brand design.",
    category: "Freelance Work",
    role: "Creative Frontend Developer",
    timeline: "Feb 2026 – July 2026",
    liveUrl: "https://drixmedia.in",
    imageSrc: thumbnailDrixMedia,
    bgColor: "bg-black",
    fitMode: "contain",
    summary: "Drix Media is a modern creative and digital growth agency website showcasing high-impact digital solutions, performance marketing, brand identity, and interactive web experiences for fast-growing brands.",
    overview: [],
    whatIDid: "For the Drix Media, as it was a whole development project I contributed in building hero sections, deciding the layout and fonts and helping in reaching the deadline.",
    features: [
      {
        title: "Bold Dark Aesthetic",
        description: "Modern dark mode styling with subtle glowing gradients, glassmorphism cards, and refined typography.",
        icon: "✨"
      },
      {
        title: "Interactive Services Showcase",
        description: "Comprehensive breakdowns of performance marketing, content production, branding, and custom web development.",
        icon: "💼"
      },
      {
        title: "Portfolio & Case Studies",
        description: "Dedicated project showcases highlighting client transformations, campaign metrics, and creative deliverables.",
        icon: "📈"
      },
      {
        title: "Conversion-Focused UX",
        description: "Strategic placement of clear call-to-action touchpoints, calendar scheduling, and direct inquiry channels.",
        icon: "🎯"
      },
      {
        title: "Smooth Scroll & Micro-Animations",
        description: "Fluid transitions and interactive hover effects that create a memorable, premium brand experience.",
        icon: "🎬"
      },
      {
        title: "Fast & Mobile-First",
        description: "Fully responsive layout optimized for high performance across all mobile devices, tablets, and desktop displays.",
        icon: "📱"
      }
    ],
    techStack: ["Antigravity"],
    deliverables: ["Brand UI/UX Guidelines", "Design System & Components", "Frontend Development", "Responsive Optimization"]
  },
  4: {
    id: 4,
    title: "Flyt Social",
    subtitle: "Brand Storytelling & Growth Agency",
    tagline: "Strategy, storytelling, and design that actually convert. We build strong, credible presence for founders and growing brands.",
    category: "Freelance Work",
    role: "Creative Developer",
    timeline: "Oct 2025 – March 2026",
    liveUrl: "https://flytsocial.com",
    imageSrc: thumbnailFlytSocial,
    bgColor: "bg-black",
    fitMode: "contain",
    summary: "Flyt Social is a modern creative storytelling and brand growth agency website engineered to help founders and ambitious brands establish a credible, high-converting digital presence through design, narrative, and strategic marketing.",
    overview: [],
    whatIDid: "Here the customer advised to keep as simple and minimal as possible so we did it as you can see from the hero section itself.",
    features: [
      {
        title: "Editorial Brand Aesthetic",
        description: "Bespoke color palette with deep burgundy undertones, clean typography, and elegant editorial accents.",
        icon: "✨"
      },
      {
        title: "Founder & Brand Storytelling",
        description: "Structured narrative frameworks showcasing founder personal branding, content strategy, and organic distribution.",
        icon: "🖋️"
      },
      {
        title: "Conversion-Focused UI",
        description: "High-contrast call-to-action touchpoints, clear service tiers, and streamlined inquiry booking flows.",
        icon: "🎯"
      },
      {
        title: "Interactive Portfolio & Proof",
        description: "Engaging presentation of client case studies, testimonials, and tangible reach and engagement metrics.",
        icon: "📈"
      },
      {
        title: "Micro-Interactions & Fluid Motion",
        description: "Refined hover states, interactive buttons with directional arrows, and seamless layout transitions.",
        icon: "🎬"
      },
      {
        title: "Fully Responsive Architecture",
        description: "Optimized for immaculate presentation across mobile screens, tablets, and ultra-wide displays.",
        icon: "📱"
      }
    ],
    techStack: ["Antigravity"],
    deliverables: ["Brand Identity & Visual System", "UI/UX Design", "Responsive Web Development", "Interactive Prototyping"]
  },
  5: {
    id: 5,
    title: "Relax Infinity",
    subtitle: "AI-Powered Mindfulness & Wellness Experience",
    tagline: "Find your inner peace & discover infinite calmness with adaptive soundscapes and AI wellness companionship.",
    category: "Mobile & Web App • Product & UI/UX Design",
    role: "UI UX Designer",
    timeline: "Jan 2026 – March 2026",
    liveUrl: "https://www.figma.com/design/eqISMff87WDCTgsunEDASs/Relax-Infinity?node-id=0-1&t=HZfzLnuLPANcwd9r-1",
    imageSrc: thumbnailRelax,
    bgColor: "bg-black",
    fitMode: "contain",
    summary: "Relax Infinity is an AI-powered mindfulness and wellness companion designed to help users disconnect from digital noise, build sustainable meditation habits, and achieve deep mental tranquility through personalized audio guidance and ambient soundscapes.",
    overview: [],
    whatIDid: "It was a whole Figma process. I was given to create components and style guides.",
    features: [
      {
        title: "Relax AI Companion",
        description: "Conversational wellness assistant that checks in on your daily state of mind and suggests personalized calming exercises.",
        icon: "🧘"
      },
      {
        title: "Curated Wellness Courses",
        description: "Step-by-step audio-guided mindfulness programs, breathing routines, and sleep story tracks.",
        icon: "🎧"
      },
      {
        title: "Mindful Screen Time Tracker",
        description: "Visual breakdown of digital habits with gentle reminders to pause, breathe, and reset throughout the day.",
        icon: "📊"
      },
      {
        title: "Ambient Soundscapes",
        description: "Bespoke spatial audio soundscapes including rain, forest, white noise, and binaural frequencies for deep focus or sleep.",
        icon: "🌿"
      },
      {
        title: "OLED Ambient Dark Theme",
        description: "Calming visual aesthetics with warm accent lighting designed to prevent blue-light stimulation before bedtime.",
        icon: "✨"
      },
      {
        title: "Daily Habit Streaks",
        description: "Low-pressure milestone tracking celebrating continuous mindfulness practice and personal wellbeing.",
        icon: "🔥"
      }
    ],
    techStack: ["Figma"],
    deliverables: ["Product Strategy & User Journey", "Design System & UI Kit", "Interactive High-Fidelity Prototype", "AI Companion Voice & Interaction Flow"]
  },
  6: {
    id: 6,
    title: "Solliquo",
    subtitle: "Artisanal Confectionery & Luxury E-Commerce",
    tagline: "Slice of Heaven — An artisanal confectionery brand experience combining sensory storytelling with seamless e-commerce.",
    category: "E-Commerce • UI/UX Design & Frontend Development",
    role: "UI UX Designer",
    timeline: "Oct 2025 – March 2026",
    liveUrl: "https://www.figma.com/design/rh3IYmRYjCcbO2AUPgmZEB/Soulliqo?node-id=0-1&t=jQniqtUbVSdnVjre-1",
    imageSrc: thumbnailSolliquo,
    bgColor: "bg-black",
    fitMode: "contain",
    summary: "Solliquo is a premium artisanal confectionery and luxury chocolate e-commerce platform designed to immerse dessert connoisseurs in sensory brand storytelling while delivering a frictionless purchasing journey.",
    overview: [],
    whatIDid: "It was a whole Figma process. I helped the team to design screens and layouts and to decide branding.",
    features: [
      {
        title: "Sensory Brand Storytelling",
        description: "Immersive editorial layouts showcasing artisanal ingredients, bean-to-bar craftsmanship, and flavor profiles.",
        icon: "🍫"
      },
      {
        title: "Frictionless Cart & Checkout",
        description: "Intuitive slide-out mini-cart, dynamic shipping estimations, and streamlined checkout workflows.",
        icon: "🛍️"
      },
      {
        title: "Bespoke Gift Box Builder",
        description: "Interactive product customization allowing customers to curate personalized chocolate assortments.",
        icon: "🎁"
      },
      {
        title: "Rich Visual & Motion Design",
        description: "Micro-animations, smooth hover states, and warm gold accents that elevate the luxury gourmet aesthetic.",
        icon: "✨"
      },
      {
        title: "Brand Journey & Heritage",
        description: "Interactive brand narrative section detailing sustainable cacao sourcing and artisanal recipes.",
        icon: "📖"
      },
      {
        title: "Responsive Cross-Platform UI",
        description: "Seamless shopping and browsing experience across mobile, tablet, and widescreen displays.",
        icon: "📱"
      }
    ],
    techStack: ["Figma"],
    deliverables: ["E-Commerce UX Strategy", "Design System & UI Kit", "Interactive Storefront Prototype", "Custom Gift Builder Flow"]
  },
  7: {
    id: 7,
    title: "FirstOX Studio",
    subtitle: "AI Powered Video Generator Tool",
    tagline: "Modern design for an online video generator tool for a client from Assam.",
    category: "Freelance Work",
    role: "UI/UX Designer & Developer",
    timeline: "Sept 2025 – March 2026",
    liveUrl: "#",
    imageSrc: thumbnailFirstOX,
    bgColor: "bg-black",
    fitMode: "contain",
    summary: "FirstOX Studio is an AI powered video generator site.",
    overview: [],
    whatIDid: "We initially built the Figma designs and then the customer said to do the development as well and therefore we did it. Many components were taken from 21st.dev for this project.",
    features: [
      {
        title: "Modern UI Design",
        description: "Clean, intuitive interfaces designed specifically for AI video generation workflows.",
        icon: "✨"
      },
      {
        title: "Client-Centric Approach",
        description: "Managed customer goals directly through responsive design iterations.",
        icon: "🎯"
      }
    ],
    techStack: ["Figma", "Antigravity"],
    deliverables: ["UI/UX Design", "Frontend Development"]
  }
};

interface ProjectDetailPageProps {
  projectId: number;
  onBack: () => void;
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ projectId, onBack }) => {
  const project = projectDetailsMap[projectId] || projectDetailsMap[2];

  return (
    <div className="min-h-screen bg-[#F4F4F4] text-[#1a1a1a] pt-24 sm:pt-28 md:pt-36">

      {/* 1. Main Visual Media Display (Thumbnail First) */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-16 mb-12 md:mb-20">
        <div className={`relative w-full aspect-[16/9] md:aspect-[2.1/1] overflow-hidden rounded-3xl shadow-xl border border-black/10 ${project.bgColor} flex items-center justify-center p-4 sm:p-8 md:p-12`}>
          <img loading="lazy"             src={project.imageSrc}
            alt={project.title}
            className={`w-full h-full ${
              project.fitMode === 'contain' ? 'object-contain max-h-[90%]' : 'object-cover'
            } rounded-xl`}
          />
        </div>
      </div>

      {/* 2. Content & Meta Information (Inspired by Case Study format) */}
      <div className="pb-16 md:pb-24 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-16 w-full">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left Column: Title & Description */}
            <div className="lg:col-span-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#E86A3E]"></span>
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-500">{project.category}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                        {project.liveUrl && project.liveUrl !== '#' && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#E86A3E] hover:text-[#d45b30] transition-colors"
                            >
                              {project.liveUrl.includes('figma.com') ? 'Figma File' : 'Live Site'}
                              <svg className="w-3 h-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                        )}
                    </div>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#1a1a1a] mb-6 leading-[1.1]">
                  {project.title}
                </h1>
                
                <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-serif italic max-w-3xl mb-8 leading-relaxed">
                  {project.tagline}
                </p>

                <div className="space-y-5 text-base sm:text-lg text-[#4a4a4a] leading-relaxed max-w-3xl">
                  {project.overview.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                  {project.whatIDid && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h3 className="text-xl sm:text-2xl font-serif text-[#1a1a1a] mb-3">What I Did?</h3>
                      <p>{project.whatIDid}</p>
                    </div>
                  )}
                </div>
            </div>

            {/* Right Column: Meta Info */}
            <div className="lg:col-span-4 lg:pl-8 lg:mt-16">
                <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:gap-y-8 border-l border-gray-200 pl-6">
                     <div className="col-span-2">
                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Timeline</span>
                        <span className="text-sm sm:text-base font-serif text-[#1a1a1a]">{project.timeline}</span>
                     </div>
                     <div className="col-span-2">
                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Role</span>
                        <span className="text-sm sm:text-base font-serif text-[#1a1a1a]">{project.role}</span>
                     </div>
                     {project.techStack && project.techStack.length > 0 && (
                       <div className="col-span-2">
                          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Tools Used</span>
                          <span className="text-sm sm:text-base font-serif text-[#1a1a1a] leading-relaxed block">
                              {project.techStack.join(', ')}
                          </span>
                       </div>
                     )}
                </div>
            </div>

         </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
