import React from 'react';
import { SectionId } from '../types';

interface SectionWrapperProps {
  id: SectionId;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, title, children, className = '' }) => {
  return (
    <section 
      id={id} 
      className={`min-h-screen w-full flex flex-col justify-center py-20 px-4 md:px-16 max-w-7xl mx-auto relative snap-start ${className}`}
    >
      <div className="mb-12">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="text-neon uppercase">{title}</span> <span className="text-neon text-4xl md:text-6xl">{'{'}</span>
        </h2>
      </div>
      
      <div className="pl-4 md:pl-8 border-l border-neutral-800">
        {children}
      </div>

      <div className="mt-12">
        <span className="text-neon text-4xl md:text-6xl">{'}'}</span>
      </div>
    </section>
  );
};

export default SectionWrapper;