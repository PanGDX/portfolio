import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// Use the ESM import for the style to ensure it bundles correctly
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { Calendar, X } from 'lucide-react';
import { articleService } from '../services/articleService';
import { Article } from '../types';
import { formatDate } from '../utils/frontmatter';

interface ArticleModalProps {
  slug: string | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ slug, onClose }) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      setTimeout(() => {
        const foundArticle = articleService.getArticleBySlug(slug);
        setArticle(foundArticle);
        setLoading(false);
      }, 300);
    } else {
      setArticle(null);
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [slug]);

  if (!slug) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-gray-900 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-fade-in-up">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 flex justify-between items-center px-6 py-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-700">
          <span className="text-sm font-semibold text-gray-400 truncate max-w-[80%]">
            {loading ? 'Loading...' : article?.metadata.title}
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6 sm:p-10 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-500 mb-4"></div>
              <p className="text-gray-400">Loading article...</p>
            </div>
          ) : article ? (
            <article className="animate-fade-in">
              <header className="mb-10 text-center">
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {article.metadata.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full text-sm font-medium bg-green-500/10 text-green-400">
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                  {article.metadata.title}
                </h1>

                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-yellow-500" />
                    <span>{formatDate(article.metadata.date)}</span>
                  </div>
                </div>
              </header>

              {article.metadata.coverImage && (
                <div className="mb-10 rounded-2xl overflow-hidden shadow-sm">
                  <img
                    src={article.metadata.coverImage}
                    alt={article.metadata.title}
                    className="w-full h-auto object-cover max-h-[400px]"
                  />
                </div>
              )}

              {/* 
                 Prose Classes Explained:
                 - prose-invert: Dark mode typography.
                 - prose-code:before:content-none: Removes the default backticks added by Tailwind Typography.
                 - prose-pre:bg-transparent: Prevents double-background on code blocks (since SyntaxHighlighter adds its own).
              */}
              <div className="prose prose-invert prose-lg max-w-none 
                prose-headings:font-bold prose-headings:tracking-tight 
                prose-a:text-yellow-400 hover:prose-a:text-yellow-300 
                prose-img:rounded-xl prose-hr:border-gray-700
                prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-transparent prose-pre:p-0">
                
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // Code Block Handling
                    code({ node, inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || '');
                      const isInline = !match && !String(children).includes('\n');

                      if (!isInline && match) {
                        return (
                          <div className="rounded-lg overflow-hidden my-6 border border-gray-700 shadow-lg">
                            {/* Optional: Language Label */}
                            <div className="bg-[#1e1e1e] px-4 py-2 text-xs text-gray-500 border-b border-gray-800 font-mono text-right uppercase">
                              {match[1]}
                            </div>
                            <SyntaxHighlighter
                              style={vscDarkPlus}
                              language={match[1]}
                              PreTag="div"
                              customStyle={{ margin: 0, borderRadius: 0 }}
                              {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          </div>
                        );
                      }

                      // Fallback for inline code or code blocks without language
                      // We force a visible style here to fix "not displayed" issues
                      return (
                        <code 
                          className={`${
                            isInline 
                              ? "bg-gray-800 text-yellow-200 px-1.5 py-0.5 rounded font-mono text-sm" 
                              : "block bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto border border-gray-700 my-4"
                          }`}
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    
                    // Table Handling (Preserved from previous step)
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-8 border border-gray-700 rounded-lg">
                        <table className="w-full text-left border-collapse text-sm">
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-gray-800 text-gray-200">
                        {children}
                      </thead>
                    ),
                    th: ({ children }) => (
                      <th className="px-6 py-3 font-semibold border-b border-gray-700 whitespace-nowrap">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="px-6 py-4 border-b border-gray-700 text-gray-300">
                        {children}
                      </td>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-yellow-500 pl-4 italic text-gray-400 my-6">
                        {children}
                      </blockquote>
                    )
                  }}
                >
                  {article.content}
                </ReactMarkdown>
              </div>

              <hr className="my-12 border-gray-700" />
            </article>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-white mb-4">Article Not Found</h2>
              <p className="text-gray-400">The article you are looking for does not exist.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};