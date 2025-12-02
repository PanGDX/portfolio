import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  category?: string; // Optional tag/category
}

const MarkdownModal: React.FC<MarkdownModalProps> = ({ isOpen, onClose, title, content, category }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn p-4 md:p-8">
      <div className="bg-[#0a0a0a] border border-neutral-800 w-full max-w-4xl h-full md:h-[90vh] rounded-lg shadow-2xl flex flex-col relative overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex justify-between items-start bg-[#0a0a0a] z-10">
          <div>
            {category && (
              <span className="text-neon text-xs font-mono border border-neon/30 px-2 py-1 rounded mb-2 inline-block">
                {category}
              </span>
            )}
            <h2 className="text-2xl md:text-4xl font-bold text-white mt-2">{title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2"
            aria-label="Close"
          >
            <i className="fas fa-times text-2xl"></i>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          <div className="prose prose-invert prose-green max-w-none">
            <ReactMarkdown
              components={{
                img: ({node, ...props}) => <img {...props} className="rounded-lg border border-neutral-800 my-8 w-full object-cover max-h-[500px]" />,
                h1: ({node, ...props}) => <h1 {...props} className="text-3xl font-bold text-yellow-300 mt-8 mb-4 border-b border-neutral-800 pb-2" />,
                h2: ({node, ...props}) => <h2 {...props} className="text-2xl font-bold text-neon mt-8 mb-4" />,
                code: ({node, ...props}) => {
                    // Using a simple check for inline vs block code based on children/props usually provided by react-markdown
                    // but react-markdown 9 handles inline differently. 
                    // Simple styling for now:
                    return <code {...props} className="bg-neutral-900 text-yellow-100 px-1 py-0.5 rounded font-mono text-sm" />
                },
                pre: ({node, ...props}) => <pre {...props} className="bg-[#050505] border border-neutral-800 p-4 rounded-lg overflow-x-auto my-6" />,
                blockquote: ({node, ...props}) => <blockquote {...props} className="border-l-4 border-neon pl-4 italic text-gray-400 my-6" />,
                ul: ({node, ...props}) => <ul {...props} className="list-disc list-inside space-y-2 my-4 text-gray-300" />,
                li: ({node, ...props}) => <li {...props} className="text-gray-300" />,
                p: ({node, ...props}) => <p {...props} className="text-gray-300 leading-relaxed mb-4 text-lg" />,
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 bg-[#0a0a0a] flex justify-end">
            <button 
                onClick={onClose}
                className="bg-neon text-black font-bold px-6 py-2 rounded hover:bg-green-400 transition-colors"
            >
                Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default MarkdownModal;
