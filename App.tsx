import React, { useState, useEffect } from 'react';
import TerminalIntro from './components/TerminalIntro';
import Navbar from './components/Navbar';
import SidebarDots from './components/SidebarDots';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Work from './components/Work';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import MarkdownModal from './components/MarkdownModal';
import { SectionId, BlogPost, Project } from './types';

function App() {
  const [showTerminal, setShowTerminal] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HERO);
  
  // State for detail modal
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [openBlog, setOpenBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (showTerminal) return;

    const handleScroll = () => {
      // With scroll snap, the standard window scroll event usually still fires.
      // However, if scroll snap is on body/html, we can detect standard scrollY.
      const sections = Object.values(SectionId);
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is approximately in the middle of the viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showTerminal]);

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-neon selection:text-black">
      {showTerminal ? (
        <TerminalIntro onComplete={() => setShowTerminal(false)} />
      ) : (
        <div className="relative animate-fadeIn">
          <Navbar activeSection={activeSection} />
          <SidebarDots activeSection={activeSection} />
          
          <main>
            <Hero />
            <About />
            <Skills />
            <Work />
            <Projects onOpenProject={setOpenProject} />
            <Blog onOpenBlog={setOpenBlog} />
            <Contact />
          </main>
          
          <footer className="py-8 text-center text-gray-600 text-sm font-mono snap-start">
             <p>Designed & Built by Pran &copy; {new Date().getFullYear()}</p>
          </footer>

          {/* Modals */}
          <MarkdownModal 
            isOpen={!!openProject}
            onClose={() => setOpenProject(null)}
            title={openProject?.title || ''}
            content={openProject?.content || ''}
            category="Project"
          />
          
          <MarkdownModal 
            isOpen={!!openBlog}
            onClose={() => setOpenBlog(null)}
            title={openBlog?.title || ''}
            content={openBlog?.content || ''}
            category={openBlog?.category}
          />

        </div>
      )}
    </div>
  );
}

export default App;