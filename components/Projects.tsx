import React, { useState, useEffect } from 'react';
// @ts-ignore
import matter from 'gray-matter'; // 1. Import the parser
import SectionWrapper from './SectionWrapper';
import { SectionId, Project } from '../types';

// Ensure your types/index.ts matches this structure
// interface Project {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
//   tags: string[];
//   date: string;
//   content: string; // The raw markdown body
// }

interface ProjectsProps {
  onOpenProject: (project: Project) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onOpenProject }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  
  // Carousel state
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const fetchProjects = async () => {
      // 2. Load all .md files as raw strings
      const projectFiles = import.meta.glob('../projects/*.md', { 
        query: '?raw', 
        import: 'default' 
      });

      const loadedProjects = await Promise.all(
        Object.entries(projectFiles).map(async ([filepath, loader]) => {
          // Load the raw string content of the file
          // @ts-ignore
          const rawText = await loader();

          // 3. Parse metadata using gray-matter
          // 'data' is the YAML frontmatter (title, image, etc.)
          // 'content' is the actual markdown text below the ---
          const { data, content } = matter(rawText);

          return {
            id: data.id ? data.id.toString() : filepath, // Fallback to filepath if ID missing
            title: data.title || 'Untitled',
            description: data.description || '',
            image: data.image || '/images/placeholder.jpg', // Fallback image
            tags: data.tags || [],
            date: data.date || '',
            content: content,
          } as Project;
        })
      );

      // 4. Sort by ID or Date (Optional)
      loadedProjects.sort((a, b) => parseInt(a.id) - parseInt(b.id));

      setProjects(loadedProjects);
    };

    fetchProjects();
  }, []);

  // --- Carousel Logic (Kept same as your code) ---
  useEffect(() => {
    const handleResize = () => setItemsPerView(window.innerWidth >= 768 ? 2 : 1);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(projects.length / itemsPerView);

  // Reset page if out of bounds
  useEffect(() => {
     if (currentPage >= totalPages && totalPages > 0) {
         setCurrentPage(Math.max(0, totalPages - 1));
     }
  }, [totalPages, currentPage]);

  const nextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages);
  const prevPage = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

  if (projects.length === 0) return null; // Or a loading spinner

  return (
    <SectionWrapper id={SectionId.PROJECTS} title="PROJECTS">
      <div className="relative w-full max-w-6xl mx-auto flex items-center">
        
        {/* Prev Button */}
        <button onClick={prevPage} className="absolute -left-4 md:-left-12 z-20 text-yellow-300 text-4xl md:text-5xl hover:text-white transition-colors focus:outline-none">&#8249;</button>

        {/* Carousel Window */}
        <div className="w-full overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
              {projects.map((project) => (
                  <div 
                    key={project.id} 
                    className="flex-shrink-0 px-4"
                    style={{ width: `${100 / itemsPerView}%` }}
                  >
                      {/* Passing the project data to the card */}
                      <ProjectCard project={project} onOpen={() => onOpenProject(project)} />
                  </div>
              ))}
            </div>
        </div>

        {/* Next Button */}
        <button onClick={nextPage} className="absolute -right-4 md:-right-12 z-20 text-yellow-300 text-4xl md:text-5xl hover:text-white transition-colors focus:outline-none">&#8250;</button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-8">
          {Array.from({ length: totalPages }).map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentPage(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentPage ? 'bg-neon scale-125' : 'bg-gray-600 hover:bg-gray-400'}`}
              />
          ))}
      </div>
    </SectionWrapper>
  );
};

// --- 5. Displaying the Metadata in the Card ---
const ProjectCard: React.FC<{ project: Project; onOpen: () => void }> = ({ project, onOpen }) => (
    <div className="flex flex-col h-full bg-neutral-900/50 rounded-lg border border-neutral-800 overflow-hidden">
        
        {/* Clickable Image Area */}
        <div onClick={onOpen} className="relative group cursor-pointer aspect-video w-full overflow-hidden">
            {/* IMAGE METADATA */}
            <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            
            <div className="absolute bottom-4 left-6">
                {/* TITLE METADATA */}
                <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                    <i className="fas fa-folder-open text-yellow-400 text-xl"></i> 
                    {project.title}
                </h3>
                {/* DATE METADATA (Optional display) */}
                <span className="text-gray-400 text-sm">{project.date}</span>
            </div>
        </div>

        <div className="p-6 flex flex-col flex-1">
            {/* DESCRIPTION METADATA */}
            <p className="text-gray-300 text-base mb-4 line-clamp-3 flex-grow">
                {project.description}
            </p>
            
            {/* TAGS METADATA */}
            <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono border border-green-500/30 text-green-400 px-2 py-1 rounded bg-green-900/10">
                        {tag}
                    </span>
                ))}
            </div>

            <button 
                onClick={onOpen}
                className="w-full text-sm font-bold text-neon border border-neon/50 px-4 py-3 rounded hover:bg-neon hover:text-black transition-colors uppercase tracking-wider"
            >
                View Details
            </button>
        </div>
    </div>
);

export default Projects;