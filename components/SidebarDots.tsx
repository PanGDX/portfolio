import React from 'react';
import { SectionId } from '../types';

interface SidebarDotsProps {
  activeSection: SectionId;
}

const sections = Object.values(SectionId);

const SidebarDots: React.FC<SidebarDotsProps> = ({ activeSection }) => {
  
  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-40 hidden md:flex">
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => scrollToSection(section)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            activeSection === section ? 'bg-yellow-300 scale-125' : 'bg-neutral-600 hover:bg-neutral-400'
          }`}
          aria-label={`Scroll to ${section}`}
        />
      ))}
    </div>
  );
};

export default SidebarDots;
