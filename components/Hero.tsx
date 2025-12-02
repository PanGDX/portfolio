import React, { useState, useEffect } from 'react';
import { SectionId } from '../types';

const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = [
      "Bug Developer", 
      "Software Engineer", 
      "Yes, I Can Fix Your Computer", 
      "Embedded Hardware Engineer", 
      "Chip Designer"
  ];
  
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      // Speed control
      setTypingSpeed(isDeleting ? 30 : 100);

      if (!isDeleting && text === fullText) {
        // Finished typing, pause before deleting
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        // Finished deleting, move to next
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, roles, typingSpeed]);

  const scrollToContact = () => {
      document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToAbout = () => {
      document.getElementById(SectionId.ABOUT)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id={SectionId.HERO} className="min-h-screen flex items-center justify-center px-4 md:px-20 relative overflow-hidden snap-start">
        {/* Background glow blob */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between z-10">
          
          {/* Left Text Content */}
          <div className="max-w-3xl flex-1">
            <h1 className="text-6xl md:text-8xl font-bold text-yellow-100 glow-text mb-2">Pran</h1>
            <h2 className="text-3xl md:text-5xl font-mono text-neon mb-8 h-16 flex items-center">
                {text}
                <span className="inline-block w-3 h-8 md:h-12 bg-neon ml-2 cursor-blink"></span>
            </h2>
            
            <p className="text-gray-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
              Motivated by passion. Generating change through discipline.<br></br>
              Expert of searching bugs on Google and debugging AI code. 
            </p>

            <div className="flex gap-4">
              <button 
                onClick={scrollToContact}
                className="bg-yellow-300 text-black px-8 py-3 font-bold text-lg rounded-sm hover:bg-yellow-400 transition-colors"
              >
                Contact Me
              </button>
              <button 
                onClick={scrollToAbout}
                className="border border-yellow-300 text-yellow-300 px-8 py-3 font-bold text-lg rounded-sm hover:bg-yellow-300/10 transition-colors flex items-center gap-2"
              >
                Learn More <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>

          {/* Right 3D Image */}
          <div className="hidden md:flex flex-1 justify-center items-center perspective-container">
               {/* Using a high quality 3D-like emoji from a CDN for the 'rotating 3d image' requirement */}
               <div className="relative w-80 h-80 animate-spin-slow-y preserve-3d">
                  <img 
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Floppy%20Disk.png" 
                    alt="3D Floating Object" 
                    className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(74,222,128,0.4)]"
                  />
               </div>
          </div>

      </div>
    </section>
  );
};

export default Hero;