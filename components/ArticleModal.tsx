import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, Clock, User, X } from 'lucide-react';
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
      // Simulate network delay for effect
      setTimeout(() => {
        const foundArticle = articleService.getArticleBySlug(slug);
        setArticle(foundArticle);
        setLoading(false);
      }, 300);
    } else {
      setArticle(null);
    }
  }, [slug]);

  // Lock body scroll when modal is open
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
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-fade-in-up">
        {/* Sticky Header inside Modal */}
        <div className="sticky top-0 z-10 flex justify-between items-center px-6 py-4 bg-white/90 backdrop-blur-md border-b border-slate-100">
          <span className="text-sm font-semibold text-slate-500">
            {loading ? 'Loading...' : article?.metadata.title}
          </span>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6 sm:p-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-slate-500">Loading article...</p>
            </div>
          ) : article ? (
            <article className="animate-fade-in">
              <header className="mb-10 text-center">
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {article.metadata.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
                  {article.metadata.title}
                </h1>

                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-indigo-500" />
                    <span className="font-medium text-slate-700">{article.metadata.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                    <span>{formatDate(article.metadata.date)}</span>
                  </div>
                  {article.metadata.readTime && (
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                      <span>{article.metadata.readTime}</span>
                    </div>
                  )}
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

              <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-600 hover:prose-a:text-indigo-700 prose-img:rounded-xl">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {article.content}
                </ReactMarkdown>
              </div>

              <hr className="my-12 border-slate-200" />

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">About the Author</h3>
                <p className="text-slate-600">
                  {article.metadata.author} is a software engineer passionate about open source and modern web technologies.
                </p>
              </div>
            </article>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Article Not Found</h2>
              <p className="text-slate-600">The article you are looking for does not exist.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};