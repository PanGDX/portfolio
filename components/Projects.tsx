import React, { useState, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';
import { SectionId, Project } from '../types';
import { projectsContent } from '../data/content';

const projects: Project[] = [
  {
    id: 1,
    title: 'wwwallet',
    description: 'Real-time crypto tracking web & mobile app',
    image: 'https://picsum.photos/600/400?random=1', 
    tags: ['React', 'Node.js', 'Crypto API'],
    content: projectsContent[1]
  },
  {
    id: 2,
    title: 'Trips!',
    description: 'Mobile app to plan & organize trips and photos',
    image: 'https://picsum.photos/600/400?random=2',
    tags: ['React Native', 'Firebase'],
    content: projectsContent[2]
  },
  {
    id: 3,
    title: 'ArchConfig',
    description: 'Automated Arch Linux dotfiles manager',
    image: 'https://picsum.photos/600/400?random=3', 
    tags: ['Bash', 'Lua'],
    content: projectsContent[3]
  }
];

interface ProjectsProps {
  onOpenProject: (project: Project) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onOpenProject }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  // Responsive logic to determine how many items are shown per "page"
  useEffect(() => {
    const handleResize = () => {
      // md breakpoint in tailwind is 768px
      setItemsPerView(window.innerWidth >= 768 ? 2 : 1);
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(projects.length / itemsPerView);

  // Adjust current page if window resizes and pages count changes
  useEffect(() => {
     if (currentPage >= totalPages) {
         setCurrentPage(Math.max(0, totalPages - 1));
     }
  }, [totalPages, currentPage]);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <SectionWrapper id={SectionId.PROJECTS} title="PROJECTS">
      <div className="relative w-full max-w-6xl mx-auto flex items-center">
        
        {/* Prev Button */}
        <button 
          onClick={prevPage} 
          className="absolute -left-4 md:-left-12 z-20 text-yellow-300 text-4xl md:text-5xl hover:text-white transition-colors focus:outline-none"
        >
          &#8249;
        </button>

        {/* Carousel Content */}
        <div className="w-full overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
              {projects.map((project) => (
                  <div 
                    key={project.id} 
                    className={`flex-shrink-0 px-4`}
                    style={{ width: `${100 / itemsPerView}%` }}
                  >
                      <ProjectCard project={project} onOpen={() => onOpenProject(project)} />
                  </div>
              ))}
            </div>
        </div>

        {/* Next Button */}
        <button 
          onClick={nextPage}
          className="absolute -right-4 md:-right-12 z-20 text-yellow-300 text-4xl md:text-5xl hover:text-white transition-colors focus:outline-none"
        >
          &#8250;
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-3 mt-8">
          {Array.from({ length: totalPages }).map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentPage(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentPage ? 'bg-neon scale-125' : 'bg-gray-600 hover:bg-gray-400'}`}
                aria-label={`Go to page ${idx + 1}`}
              />
          ))}
      </div>

    </SectionWrapper>
  );
};

const ProjectCard: React.FC<{ project: Project; onOpen: () => void }> = ({ project, onOpen }) => (
    <div className="flex flex-col h-full">
        <div 
            onClick={onOpen}
            className="relative group rounded-lg overflow-hidden border border-neutral-800 bg-neutral-900/50 cursor-pointer"
        >
                {/* Image Container */}
            <div className="aspect-video w-full overflow-hidden relative">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-6 left-8">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-4">
                        <i className="fas fa-wallet"></i> {project.title}
                    </h3>
                </div>
            </div>
        </div>
        <div className="mt-6 flex-1">
            <h3 className="text-2xl md:text-3xl text-yellow-300 font-bold mb-2">{project.title}</h3>
            <p className="text-gray-300 text-lg mb-4 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono border border-green-500/30 text-green-400 px-2 py-1 rounded">
                        {tag}
                    </span>
                ))}
            </div>
             <button 
                onClick={onOpen}
                className="text-sm font-bold text-neon border border-neon/50 px-4 py-2 rounded hover:bg-neon hover:text-black transition-colors"
            >
                View Project Details
            </button>
        </div>
    </div>
);

export default Projects;