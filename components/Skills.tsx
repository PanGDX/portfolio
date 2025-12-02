import React from 'react';
import SectionWrapper from './SectionWrapper';
import { SectionId } from '../types';

const skillCategories = [
  {
    title: 'Specialise In (Programming language)',
    skills: [
      { name: 'C/C++', icon: 'fas fa-c' },
      { name: 'Python', icon: 'fab fa-python' },
      { name: 'Verilog', icon: 'fas fa-microchip' },
    ],
  },
  {
    title: 'Familiar with (programming language)',
    skills: [
      { name: 'HTML', icon: 'fab fa-html5' },
      { name: 'Javascript', icon: 'fab fa-js' },
      { name: 'Typescript', icon: 'fab fa-js' },
      { name: 'React', icon: 'fab fa-react' },
    ],
  },
  {
    title: 'Specialise in (frameworks and tools)',
    skills: [
      { name: 'FPGA', icon: 'fas fa-microchip' },
      { name: 'ASIC', icon: 'fas fa-microchip' },
      { name: '3D and CAD', icon: 'fas fa-cube' },
      { name: 'AI', icon: 'fas fa-brain' },
    ],
  },
  {
    title: 'Miscallenous',
    skills: [
      { name: 'Tri-lingual (English, Chinese, Thai)', icon: 'fas fa-language' },
      { name: 'Project management', icon: 'fas fa-tasks' },
      { name: 'Documentation', icon: 'fas fa-file-alt' },
    ],
  },
];

const Skills: React.FC = () => {
  return (
    <SectionWrapper id={SectionId.SKILLS} title="SKILLS">
      <div className="flex flex-col gap-12">
        <div className="w-full text-gray-300 text-lg leading-relaxed">
            <p>
                I excel in dissecting complex problems into manageable
                tasks, essential for crafting robust, maintainable code
                in large-scale projects. I'm driven by challenges, always
                seeking opportunities to enhance my skills. My self-directed
                learning approach empowers me to quickly
                grasp and adapt to new technologies autonomously.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-2xl font-bold text-white mb-6">{category.title}</h3>
              <div className="grid grid-cols-2 gap-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center gap-3 text-xl group cursor-default">
                    <span className="w-8 text-center text-green-400 group-hover:scale-110 transition-transform">
                      <i className={skill.icon}></i>
                    </span>
                    <span className="text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Skills;
