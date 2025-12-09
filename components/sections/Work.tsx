import React from 'react';
import SectionWrapper from '../SectionWrapper';
import { SectionId } from '../../types';

const experiences = [
    { 
      title: 'ETDA Thailand', 
      company: 'Government', 
      year: '2024', 
      description: 'Worked on testing AI models for content moderation and safe output generation.',
      active: false 
    },
    { 
      title: 'Lotus\'s Thailand', 
      company: 'Retail', 
      year: '2024', 
      description: 'Created an internal minimally-viable-product for QnA chatbot using Langchain and RAG techniques.',
      active: false 
    },
    { 
      title: 'Freelancer', 
      company: 'Self-employed', 
      year: '2024 - 2025', 
      description: 'Delivered custom full-stack web solution using Supabase and React Native.',
      active: false 
    },
    { 
      title: 'Maker\'s Studio NUS', 
      company: 'University', 
      year: '2025', 
      description: 'Leading workshops on embedded systems and managing the university prototyping lab involving 3D printing and laser cutting.',
      active: false 
    },
];

const Work: React.FC = () => {
  return (
    <SectionWrapper id={SectionId.WORK} title="WORK">
      <div className="mb-16 text-gray-300 text-lg max-w-3xl">
        <p>
            I had the opportunity to work for many companies with many different technologies,
            from government branches to large businesses.
            Each experience taught me something and I continuously improved in my learning journey.
        </p>
      </div>

      <div className="relative py-10 px-2 sm:px-4">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-neon/5 via-neon/50 to-neon/5 shadow-[0_0_10px_rgba(74,222,128,0.2)]"></div>

          <div className="flex flex-col gap-12">
             {experiences.map((exp, idx) => (
                 <div key={idx} className="relative flex items-start group">
                      
                      {/* Timeline Dot */}
                      <div className="absolute left-4 sm:left-8 transform -translate-x-1/2 mt-1.5 flex items-center justify-center">
                          <div className="w-4 h-4 rounded-full bg-black border-2 border-neon shadow-[0_0_10px_rgba(74,222,128,0.8)] z-10 group-hover:scale-125 transition-transform duration-300">
                              <div className="w-full h-full rounded-full bg-neon/20 animate-pulse"></div>
                          </div>
                      </div>
                      
                      {/* Content */}
                      <div className="ml-12 sm:ml-20 w-full">
                          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                            {/* Title & Company */}
                            <h3 className="text-2xl font-bold text-yellow-100 leading-none">
                              {exp.title}
                            </h3>
                            
                            {/* Year - Pushed to right or inline */}
                            <span className="text-neon font-mono text-sm sm:ml-auto bg-neon/10 px-2 py-1 rounded">
                              {exp.year}
                            </span>
                          </div>

                          {/* Description Row */}
                          <div className="flex flex-col md:flex-row md:items-center gap-2 text-gray-400">
                              {exp.company && (
                                <span className="font-semibold text-gray-500 uppercase tracking-wider text-xs border border-gray-700 px-2 py-0.5 rounded w-fit">
                                  {exp.company}
                                </span>
                              )}
                              <p className="text-gray-300 leading-relaxed text-base">
                                {exp.description}
                              </p>
                          </div>
                      </div>
                 </div>
             ))}
          </div>
      </div>
    </SectionWrapper>
  );
};

export default Work;