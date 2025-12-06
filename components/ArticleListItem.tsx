import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { ArticleMetadata } from '../types';
import { formatDate } from '../utils/frontmatter';

interface ArticleListItemProps {
  article: ArticleMetadata;
  onClick: (slug: string) => void;
}

export const ArticleListItem: React.FC<ArticleListItemProps> = ({ article, onClick }) => {
  return (
    <div
      onClick={() => onClick(article.slug)}
      className="group flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-5 bg-gray-800 rounded-xl border border-gray-700 shadow-sm hover:shadow-lg hover:border-yellow-500 transition-all duration-300 cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="w-full sm:w-48 h-32 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-700">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center flex-grow min-w-0">
        <div className="flex flex-wrap gap-2 mb-2">
          {article.tags.map(tag => (
            <span key={tag} className="text-[10px] font-semibold tracking-wider uppercase text-green-400">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors line-clamp-1">
          {article.title}
        </h3>

        <p className="text-gray-400 text-sm line-clamp-2 mb-3">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center text-xs text-gray-500 font-medium">
             <Calendar className="w-3.5 h-3.5 mr-1.5" />
             {formatDate(article.date)}
             <span className="mx-2">•</span>
             <span>{article.readTime}</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </div>
  );
};