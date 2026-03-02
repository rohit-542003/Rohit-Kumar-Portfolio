import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import { ArrowRightIcon } from './Icons';

interface CaseStudyPageProps {
  onBack: () => void;
}

const sections = [
  { id: 'overview', title: 'Context & Story', number: '01' },
  { id: 'competitive', title: 'Competitive Analysis', number: '02' },
  { id: 'research', title: 'Research', number: '03' },
  { id: 'define', title: 'Define', number: '04' },
  { id: 'ideate', title: 'Ideate', number: '05' },
  { id: 'design', title: 'Design', number: '06' },
];

// Reusable Small Data Table Component
interface DataTableProps {
    title: string;
    data: { label: string, value: string }[];
}

const DataTable: React.FC<DataTableProps> = ({ title, data }) => (
  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm h-full">
    <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
        <h4 className="font-bold text-xs uppercase tracking-widest text-gray-500">{title}</h4>
    </div>
    <div className="divide-y divide-gray-100">
        {data.map((item, idx) => (
            <div key={idx} className="flex justify-between items-start px-5 py-3 text-sm gap-4">
                <span className="text-gray-600 font-medium">{item.label}</span>
                <span className="font-bold text-[#1a1a1a] text-right">{item.value}</span>
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
          action: "Opens GPay -> Finds Split -> Switches app.",
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
      
      {/* Navigation / Back Button */}
      <div className="absolute top-0 left-0 w-full p-6 md:p-10 z-50">
        <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-[#1a1a1a] transition-colors"
        >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Home
        </button>
      </div>

      {/* Hero / Title Section */}
      <div className="pb-12 md:pb-24 max-w-[1400px] mx-auto px-6 md:px-16 w-full mt-24 md:mt-32">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
            <div className="lg:col-span-8">
                <div className="flex items-center gap-3 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></span>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Google Pay • UX Case Study</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-normal leading-[1.05] text-[#1a1a1a] mb-6 md:mb-8">Seamless Split & Pay</h1>
                <p className="text-lg md:text-xl leading-relaxed text-gray-600 font-onest max-w-2xl">Integrating expense splitting directly into the Scan & Pay flow to complete payment process without post-payment hassle.</p>
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
            {sections.map((section) => (
                <button 
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="flex items-center gap-2 whitespace-nowrap text-xs font-medium text-gray-500 hover:text-[#1a1a1a] transition-colors shrink-0"
                >
                    <span className="text-[10px] font-bold text-[#3B82F6]">{section.number}</span>
                    <span>{section.title}</span>
                </button>
            ))}
          </div>
      </div>

      <div className="flex-grow">
         <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-24 py-12 md:py-24 relative">
            
            {/* Desktop Sidebar Table of Contents */}
            <div className="hidden md:block md:col-span-3 lg:col-span-3">
               <div className="sticky top-32">
                  <div className="relative pl-4 border-l border-gray-200">
                      <div className="flex flex-col gap-5">
                        {sections.map((section) => (
                            <button 
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className="group flex items-center gap-4 w-full text-left transition-all duration-300 relative z-10 text-sm font-medium text-gray-500 hover:text-[#1a1a1a]"
                            >
                                <span className="text-xs font-bold text-gray-300 group-hover:text-[#3B82F6] transition-colors">{section.number}</span>
                                {section.title}
                            </button>
                        ))}
                      </div>
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
                     <h2 className="text-3xl md:text-5xl font-serif font-normal mb-8 text-[#1a1a1a]">Product Overview</h2>
                     <div className="bg-[#E8F0FE] p-8 md:p-10 rounded-2xl">
                        <p className="text-lg leading-relaxed text-[#1a1a1a]">
                            <strong className="text-[#3B82F6]">Seamless Split and Pay</strong> allows you to instantly settle the expenses after the payment within a group through the “Scan QR code” flow itself. While Google Pay allows you to split expenses within a group but it’s a slow, manual process that happens after the whole payment process. The Split and Pay feature lives directly inside the Scan and Pay flow. It allows the person paying the bill to settle with friends at the exact moment they pay the merchant.
                        </p>
                     </div>
                  </div>

                  {/* Context / The Story Second */}
                  <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-normal mb-8 text-[#1a1a1a]">The Story</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">It was in the eve of 19th Dec, when I was scrolling through LinkedIn and stumbled upon this post. I realized I wasn't alone in letting go of small shared amounts to avoid the hassle, leading to significant unaccounted 'cash burn'.</p>
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm mb-8">
                         <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                {/* Placeholder Avatar */}
                                <div className="w-full h-full bg-gray-300"></div>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Vatsal Parikh</h4>
                                <p className="text-xs text-gray-500">NMIMS MBA Core '27</p>
                            </div>
                         </div>
                         <p className="italic text-gray-600 text-lg leading-relaxed">
                            "One coffee. Two apps. Broken money tracking... Why does my expense ledger money app think I spent ₹1000 when I only spent ₹200? I pay ₹1000 via GPay for coffee with 4 other friends. My real expense is ₹200. Then I open Splitwise to make an entry... What I actually want: After making the transition through Google pay, Select Split and choose the group, ₹200 recorded as my true expense, ₹800 tracked as receivable."
                         </p>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6">After reading this post I started to relate and also thought that there were many instances when, I too, faced such problem of splitting the money. I used to let go of small amount and eventually this led to a lot of cash burn. In the end of the month when I check where my money was gone I wasn’t able to estimate properly. And sometimes I used to forget about the expenses I made 25 days ago like why I spent this much of amount on so and so shop. Well this isn’t just about the statistics of where and why you spend the money, it’s about getting your money back when you split it among the group that will give you true satisfaction. And the only thing that’s stopping you from getting your money back is the UI and UX of the app because the feature is already present.</p>
                    <p className="text-gray-600 leading-relaxed mb-6">Now the question is whether should I use one app or two apps for splitting the amount? The answer is you definitely want all this things to happen on a single app only. So I did a competitive analysis on the 3 most popular UPI app of India where you can instantly pay the money to the merchant through QR code but can’t instantly split among the group.</p>
                  </div>
               </section>

               {/* 02 Competitive Analysis */}
               <section id="competitive" className="scroll-mt-32">
                  <span className="block text-[#3B82F6] text-xs font-bold tracking-widest uppercase mb-4">02 — Competitive Analysis</span>
                  <h2 className="text-3xl md:text-5xl font-serif font-normal mb-8 text-[#1a1a1a]">Market Landscape</h2>
                  
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
                      <h3 className="text-xl font-bold text-[#1a1a1a] mb-6">- UX Takeaways</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                              <h4 className="font-bold text-[#1a1a1a] mb-2">Groups Fatigue</h4>
                              <p className="text-sm text-gray-600 leading-relaxed">Mandatory group creation for every split and pay method.</p>
                          </div>
                          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                              <h4 className="font-bold text-[#1a1a1a] mb-2">Post Memory-Tax</h4>
                              <p className="text-sm text-gray-600 leading-relaxed">Have to remember the split after payment and then mandatory group creation.</p>
                          </div>
                          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                              <h4 className="font-bold text-[#1a1a1a] mb-2">Flow vs Feature</h4>
                              <p className="text-sm text-gray-600 leading-relaxed">I’m not adding a new feature rather I’m just modifying the existing feature to improve the current UX. I will make sure the user can split on the moment he pays the merchant.</p>
                          </div>
                          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                              <h4 className="font-bold text-[#1a1a1a] mb-2">Public Chat</h4>
                              <p className="text-sm text-gray-600 leading-relaxed">Making an announcement in the group for payment can not be good user experience for everyone, rather sending them personal message for payment instantly after the payment can create a good user experience.</p>
                          </div>
                      </div>
                  </div>
               </section>

               {/* 03 Research */}
               <section id="research" className="scroll-mt-32">
                  <span className="block text-[#3B82F6] text-xs font-bold tracking-widest uppercase mb-4">03 — Research</span>
                  
                  {/* Quantitative Research */}
                  <div className="mb-24">
                     <h2 className="text-3xl md:text-5xl font-serif font-normal mb-8 text-[#1a1a1a]">Quantitative Research</h2>
                     <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                         Before getting into who are the users of Google Pay app let’s understand that why most of the people use Google Pay for or on what purpose they pull out the Gpay scanner to pay.
                         Here’s the breakdown of on what category the UPI payment is done mostly, the data is taken from gemini:
                     </p>
                     
                     {/* Merchant Spend Table */}
                     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-12">
                        <div className="bg-gray-50 px-5 py-3 border-b border-gray-200 grid grid-cols-1 md:grid-cols-12 gap-4">
                            <h4 className="md:col-span-4 font-bold text-xs uppercase tracking-widest text-gray-500">Category</h4>
                            <h4 className="md:col-span-3 font-bold text-xs uppercase tracking-widest text-gray-500">% Spend</h4>
                            <h4 className="md:col-span-5 font-bold text-xs uppercase tracking-widest text-gray-500">Typical Use Case</h4>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {[
                                { cat: "Apparel & Fashion", pct: "27.70%", use: "Shopping at Zara, H&M, or online via Myntra/Ajio." },
                                { cat: "Beauty & Fitness", pct: "13.50%", use: "Gym memberships, salon visits, and Nykaa orders." },
                                { cat: "Food & Drink", pct: "12.90%", use: "Fine dining, Starbucks, and Zomato/Swiggy." },
                                { cat: "Home & Garden", pct: "12.80%", use: "Urban Ladder, IKEA, or local nursery/decor shops." },
                                { cat: "Groceries", pct: "10%", use: "Quick-commerce (Blinkit/Zepto) and Supermarkets." },
                                { cat: "Travel & Mobility", pct: "8%", use: "Uber/Ola rides and flight bookings." }
                            ].map((row, i) => (
                                <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-5 py-3 text-sm items-start hover:bg-gray-50 transition-colors">
                                    <span className="md:col-span-4 text-gray-600 font-medium">{row.cat}</span>
                                    <span className="md:col-span-3 font-bold text-[#1a1a1a]">{row.pct}</span>
                                    <span className="md:col-span-5 text-gray-600 leading-relaxed">{row.use}</span>
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
                     <h3 className="text-2xl font-serif mb-8 text-[#1a1a1a]">Demographics & Usage Patterns</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                            title="Geographic Distribution" 
                            data={[
                                { label: "Tier-1 / Metro Cities", value: "80.00%" },
                                { label: "Tier-2 & Tier-3 Cities", value: "16.50%" },
                                { label: "Rural Areas", value: "3.50%" }
                            ]}
                        />
                         <DataTable 
                            title="Age Group" 
                            data={[
                                { label: "18 – 24 Years (Gen Z)", value: "28.30%" },
                                { label: "25 – 40 Years (Millennials)", value: "45.0% (Largest)" },
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
                            title="Gender Distribution" 
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
                    <h2 className="text-3xl md:text-5xl font-serif font-normal mb-8 text-[#1a1a1a]">Qualitative Research</h2>
                    
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
                            <div className="flex gap-4 text-xs font-medium text-gray-500">
                                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-gray-200"></span> Neutral</span>
                                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-200"></span> Positive</span>
                                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-200"></span> Negative</span>
                            </div>
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
                        <h2 className="text-3xl md:text-5xl font-serif font-normal mb-8 text-[#1a1a1a]">Design Process</h2>
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

                   <h2 className="text-3xl md:text-5xl font-serif font-normal mb-12 text-[#1a1a1a]">Problem vs Solution</h2>
                   
                   {/* The Problems Section */}
                   <div className="mb-16">
                       <h3 className="text-xl font-bold text-[#1a1a1a] mb-8 flex items-center gap-3">
                           <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-500 text-xs">⚠️</span>
                           The Problems
                       </h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {defineData.map((item, i) => (
                               <div key={i} className="bg-white p-6 rounded-xl border border-red-100 shadow-sm hover:border-red-200 transition-colors">
                                   <div className="text-xs font-bold text-red-400 mb-2">Problem {item.number}</div>
                                   <h4 className="font-bold text-lg text-[#1a1a1a] mb-3">{item.problemTitle}</h4>
                                   <p className="text-gray-600 text-sm leading-relaxed">{item.problemDesc}</p>
                               </div>
                           ))}
                       </div>
                   </div>

                   {/* The Solutions Section */}
                   <div className="mb-16">
                       <h3 className="text-xl font-bold text-[#1a1a1a] mb-8 flex items-center gap-3">
                           <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-50 text-green-500 text-xs">💡</span>
                           The Solutions
                       </h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {defineData.map((item, i) => (
                               <div key={i} className="bg-white p-6 rounded-xl border border-green-100 shadow-sm hover:border-green-200 transition-colors bg-green-50/20 flex flex-col">
                                   <div className="text-xs font-bold text-green-600 mb-2">Solution {item.number}</div>
                                   <h4 className="font-bold text-lg text-[#1a1a1a] mb-3">{item.solutionTitle}</h4>
                                   <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.solutionDesc}</p>
                               </div>
                           ))}
                       </div>
                   </div>

                   {/* User Journey Map (Revised) */}
                   <h3 className="text-2xl font-serif mb-8 text-[#1a1a1a] mt-24">User Journey Map (Proposed)</h3>
                   <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm overflow-x-auto">
                      <div className="min-w-[800px] grid grid-cols-5 divide-x divide-gray-100 text-sm">
                          {/* Headers */}
                          <div className="bg-gray-50/50 p-4 font-bold text-gray-500 uppercase tracking-widest text-xs flex items-center">Actions</div>
                          <div className="p-4 bg-white text-[#1a1a1a]">Open GPay app</div>
                          <div className="p-4 bg-white text-[#1a1a1a]">Open "Scan QR"</div>
                          <div className="p-4 bg-white text-[#1a1a1a]">Input Amount</div>
                          <div className="p-4 bg-blue-50 text-blue-800 font-bold border-t-2 border-blue-500">Tap "Split" Toggle</div>

                          {/* Task List */}
                          <div className="bg-gray-50/50 p-4 font-bold text-gray-500 uppercase tracking-widest text-xs flex items-center">Goal</div>
                          <div className="p-4 border-t border-gray-100">Pay Merchant</div>
                          <div className="p-4 border-t border-gray-100">Initiate Payment</div>
                          <div className="p-4 border-t border-gray-100">Define Value</div>
                          <div className="p-4 border-t border-gray-100 bg-blue-50/30">Split & Pay instantly</div>

                          {/* Feeling */}
                          <div className="bg-gray-50/50 p-4 font-bold text-gray-500 uppercase tracking-widest text-xs flex items-center">Feeling</div>
                          <div className="p-4 border-t border-gray-100 text-2xl">😐</div>
                          <div className="p-4 border-t border-gray-100 text-2xl">😐</div>
                          <div className="p-4 border-t border-gray-100 text-2xl">🙂</div>
                          <div className="p-4 border-t border-gray-100 text-2xl">🤩</div>

                          {/* Thoughts */}
                          <div className="bg-gray-50/50 p-4 font-bold text-gray-500 uppercase tracking-widest text-xs flex items-center">Thinking</div>
                          <div className="p-4 border-t border-gray-100 text-gray-500 italic">"Let's get this done."</div>
                          <div className="p-4 border-t border-gray-100 text-gray-500 italic">"Scanning..."</div>
                          <div className="p-4 border-t border-gray-100 text-gray-500 italic">"It's 1200 total."</div>
                          <div className="p-4 border-t border-gray-100 text-blue-600 font-medium italic">"Wow, I can split right here!"</div>
                      </div>
                   </div>
               </section>

               {/* 05 Ideate - Placeholder to satisfy navigation */}
               <section id="ideate" className="scroll-mt-32">
                   <span className="block text-[#3B82F6] text-xs font-bold tracking-widest uppercase mb-4">05 — Ideate</span>
                   <h2 className="text-3xl md:text-5xl font-serif font-normal mb-8 text-[#1a1a1a]">Ideate</h2>
                   <p className="text-gray-600 leading-relaxed mb-8">
                     (This section is under construction)
                   </p>
               </section>

               {/* 06 Design - Placeholder to satisfy navigation */}
               <section id="design" className="scroll-mt-32">
                   <span className="block text-[#3B82F6] text-xs font-bold tracking-widest uppercase mb-4">06 — Design</span>
                   <h2 className="text-3xl md:text-5xl font-serif font-normal mb-8 text-[#1a1a1a]">Design</h2>
                   <p className="text-gray-600 leading-relaxed mb-8">
                     (This section is under construction)
                   </p>
               </section>

            </div>
         </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default CaseStudyPage;