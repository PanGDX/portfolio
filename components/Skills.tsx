import React from 'react';
import SectionWrapper from './SectionWrapper';
import { SectionId } from '../types';

const skills = [
  { name: 'TypeScript', icon: 'fab fa-js', color: 'text-blue-500' },
  { name: 'JavaScript', icon: 'fab fa-js-square', color: 'text-yellow-400' },
  { name: 'React', icon: 'fab fa-react', color: 'text-cyan-400' },
  { name: 'Python', icon: 'fab fa-python', color: 'text-blue-300' },
  { name: 'C', icon: 'fas fa-c', color: 'text-blue-600' }, // Generic C
  { name: 'C++', icon: 'fab fa-cpp', color: 'text-blue-600' }, // Generic C
  { name: 'HTML', icon: 'fab fa-html5', color: 'text-orange-600' }
];

const Skills: React.FC = () => {
  return (
    <SectionWrapper id={SectionId.SKILLS} title="SKILLS">
      <div className="flex flex-col md:flex-row gap-16">
        <div className="md:w-1/2 text-gray-300 text-lg leading-relaxed">
            <p>
                I excel in dissecting complex problems into manageable
                tasks, essential for crafting robust, maintainable code
                in large-scale projects. I'm driven by challenges, always
                seeking opportunities to enhance my skills. My self-directed
                learning approach empowers me to quickly
                grasp and adapt to new technologies autonomously.
            </p>
        </div>
        
        <div className="md:w-1/2 relative">
             {/* Glowing Line */}
             <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-green-500 to-transparent opacity-50 shadow-[0_0_15px_rgba(74,222,128,0.7)]"></div>
             
             <div className="grid grid-cols-2 gap-y-6 pl-8">
                 {skills.map((skill) => (
                     <div key={skill.name} className="flex items-center gap-3 text-xl group cursor-default">
                         <span className={`w-8 text-center ${skill.color} group-hover:scale-110 transition-transform`}>
                             <i className={skill.icon}></i>
                         </span>
                         <span className="text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
                     </div>
                 ))}
             </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Skills;
