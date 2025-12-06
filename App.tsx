import React, { useState, useEffect } from 'react';
import TerminalIntro from './components/TerminalIntro';
import Navbar from './components/Navbar';
import SidebarDots from './components/SidebarDots';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Work from './components/sections/Work';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';
import { SectionId } from './types';
import Blog from './components/sections/Blog';
import Projects from './components/sections/Projects';



function App() {
  const [showTerminal, setShowTerminal] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HERO);  


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
            <Projects />
            <Skills />
            <Work />
            <Education />
            <Blog />
            <Contact />
          </main>

          <footer className="py-8 text-center text-gray-600 text-sm font-mono snap-start">
            <p>Designed & Built by Pran &copy; {new Date().getFullYear()}</p>
          </footer>

          
        </div>
      )}
    </div>
  );
}

export default App;