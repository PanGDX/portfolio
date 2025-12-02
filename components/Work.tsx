import React from 'react';
import SectionWrapper from './SectionWrapper';
import { SectionId } from '../types';

const experiences = [
    { title: 'ETDA Thailand', company: '', year: '2018', active: false },
    { title: 'Lotus\'s Thailand', company: '', year: '', active: false },
    { title: 'Freelancer', company: '', year: '', active: false },
    { title: 'Maker\'s Studio NuS', company: '', year: '2025', active: true },
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

      <div className="relative py-20 px-4 md:px-0">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-neon/20 via-neon to-neon/20 transform -translate-y-1/2 shadow-[0_0_10px_rgba(74,222,128,0.5)] hidden md:block"></div>
          
           {/* Mobile Timeline Line (Vertical) */}
           <div className="absolute left-4 top-0 bottom-0 w-1 bg-neon/50 md:hidden"></div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-0 relative">
             <span className="hidden md:block text-yellow-200 text-xl font-mono">2018</span>
             
             {experiences.map((exp, idx) => (
                 <div key={idx} className="relative flex md:flex-col items-center group md:transform md:-translate-y-1/2 md:top-1/2">
                      {/* Dot */}
                      <div className="w-8 h-8 rounded-full bg-black border-4 border-neon shadow-[0_0_15px_rgba(74,222,128,0.8)] z-10 md:mb-6 flex-shrink-0 ml-0 md:ml-0">
                          <div className="w-full h-full rounded-full bg-neon/20 animate-pulse"></div>
                      </div>
                      
                      {/* Content */}
                      <div className="ml-6 md:ml-0 text-left md:text-center pt-8 md:pt-0">
                          <h3 className={`text-2xl md:text-3xl font-bold ${idx === 3 ? 'text-white' : 'text-yellow-100'} mb-1`}>{exp.title}</h3>
                          {exp.company && <p className="text-gray-400">{exp.company}</p>}
                      </div>
                 </div>
             ))}

            <span className="hidden md:block text-yellow-200 text-xl font-mono">2025</span>
          </div>
      </div>
    </SectionWrapper>
  );
};

export default Work;
