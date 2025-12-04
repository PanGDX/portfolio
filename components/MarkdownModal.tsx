import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string; // This is the raw markdown string
  category?: string;
}

const MarkdownModal: React.FC<MarkdownModalProps> = ({ isOpen, onClose, title, content, category }) => {
  
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    // Backdrop
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl max-h-[85vh] bg-[#0a0a0a] border border-neutral-800 rounded-lg shadow-2xl flex flex-col animate-slideUp"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800 bg-neutral-900/50 rounded-t-lg">
          <div>
            {category && (
              <span className="text-xs font-mono text-neon border border-neon/30 px-2 py-1 rounded mb-2 inline-block">
                {category}
              </span>
            )}
            <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar text-gray-300">
          
          {/* THE RENDERER STARTS HERE */}
          <ReactMarkdown
            components={{
              // 1. Headers
              h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-yellow-300 mt-8 mb-4 border-b border-gray-800 pb-2" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl font-semibold text-white mt-8 mb-4" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl font-semibold text-neon mt-6 mb-3" {...props} />,
              
              // 2. Paragraphs & Text
              p: ({node, ...props}) => <p className="mb-4 leading-7 text-gray-300 text-lg" {...props} />,
              strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
              em: ({node, ...props}) => <em className="italic text-yellow-100" {...props} />,
              
              // 3. Lists (Tailwind resets these, so we need to add styles back)
              ul: ({node, ...props}) => <ul className="list-disc list-outside ml-6 mb-6 space-y-2 marker:text-neon" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 marker:text-neon" {...props} />,
              li: ({node, ...props}) => <li className="pl-2" {...props} />,

              // 4. Code Blocks
              code: ({node, ...props}) => {
                // @ts-ignore
                const isInline = props.inline || !String(props.children).includes('\n');
                return isInline 
                  ? <code className="bg-neutral-800 text-yellow-300 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
                  : <div className="bg-[#111] border border-neutral-800 rounded-lg p-4 my-6 overflow-x-auto">
                      <code className="text-sm font-mono text-green-400 block" {...props} />
                    </div>
              },

              // 5. Blockquotes
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-4 border-neon bg-neutral-900/50 p-4 my-6 italic text-gray-400 rounded-r" {...props} />
              ),

              // 6. Links
              a: ({node, ...props}) => (
                <a className="text-neon hover:text-yellow-300 hover:underline transition-colors" target="_blank" rel="noopener noreferrer" {...props} />
              ),
              
              // 7. Images
              img: ({node, ...props}) => (
                <img className="rounded-lg shadow-lg my-8 w-full border border-neutral-800" {...props} alt={props.alt || ''} />
              ),
              
              // 8. Horizontal Rule
              hr: ({node, ...props}) => <hr className="border-neutral-800 my-8" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
          {/* END RENDERER */}

        </div>
        
        {/* Footer (Optional) */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900/50 flex justify-end rounded-b-lg">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default MarkdownModal;