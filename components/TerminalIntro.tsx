import React, { useState, useEffect, useRef } from 'react';

interface TerminalIntroProps {
  onComplete: () => void;
}

const TerminalIntro: React.FC<TerminalIntroProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  
  const commands = [
    { text: 'pwd', output: '/home/pran/Documents' },
    { text: 'cd portfolio', output: '' },
    { text: 'ls', output: 'node_modules/ public/ src/ index.html package.json tailwind.config.ts tsconfig.json vite.config.ts pran.dev' },
    { text: 'cleak', output: 'bash: cleak: command not found' }, // Intentionally misspelled as per design
    { text: 'clear', output: 'CLEAR_SCREEN' },
  ];

  const commandDelay = 600;
  const typingSpeed = 50;

  // Listen for Enter key to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  useEffect(() => {
    let isMounted = true;

    const runSequence = async () => {
      // Initial Prompt
      await new Promise(r => setTimeout(r, 500));
      if (!isMounted) return;

      for (let i = 0; i < commands.length; i++) {
        const cmd = commands[i];
        
        // Type command
        for (let charIndex = 0; charIndex < cmd.text.length; charIndex++) {
          await new Promise(r => setTimeout(r, typingSpeed + Math.random() * 30));
          if (!isMounted) return;
          setCurrentCommand(prev => prev + cmd.text[charIndex]);
        }

        await new Promise(r => setTimeout(r, 300));
        if (!isMounted) return;

        // Execute
        if (cmd.output === 'CLEAR_SCREEN') {
            onComplete();
            return;
        }

        setLines(prev => [
            ...prev, 
            `pran@ubuntu:~$ ${cmd.text}`, 
            ...(cmd.output ? [cmd.output] : [])
        ]);
        setCurrentCommand('');
        
        await new Promise(r => setTimeout(r, commandDelay));
        if (!isMounted) return;
      }
    };

    runSequence();

    return () => {
      isMounted = false;
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#050505] text-green-400 p-4 md:p-8 font-mono text-sm md:text-base z-50 overflow-hidden flex flex-col justify-start items-start">
        <div className="absolute top-4 right-4 text-xs text-gray-500 cursor-pointer hover:text-white" onClick={onComplete}>
            Skip Animation [Enter] &gt;&gt;
        </div>
      <div className="w-full max-w-4xl">
        {lines.map((line, idx) => (
          <div key={idx} className={`mb-1 break-words ${line.includes('command not found') ? 'text-red-400' : line.startsWith('node_modules') ? 'text-blue-300' : line.startsWith('/') ? 'text-gray-300' : ''}`}>
             {/* Simple heuristic styling based on content */}
             {line}
          </div>
        ))}
        <div className="flex">
          <span className="mr-2">pran@ubuntu:~$</span>
          <span>{currentCommand}</span>
          <span className="animate-pulse bg-green-400 w-2.5 h-5 ml-1 inline-block align-middle"></span>
        </div>
      </div>
    </div>
  );
};

export default TerminalIntro;