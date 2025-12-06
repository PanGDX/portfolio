import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { ArticleMetadata } from '../types';

interface ArticleCarouselProps {
  articles: ArticleMetadata[];
  onArticleClick: (slug: string) => void;
}

export const ArticleCarousel: React.FC<ArticleCarouselProps> = ({ articles, onArticleClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [articles.length]);

  if (!articles.length) return null;

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
  };

  const currentArticle = articles[currentIndex];

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-xl group mb-12">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out transform hover:scale-105"
        style={{ backgroundImage: `url(${currentArticle.coverImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

      {/* Content */}
      <div 
        className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white cursor-pointer"
        onClick={() => onArticleClick(currentArticle.slug)}
      >
        <div className="max-w-3xl">
          <div className="flex gap-2 mb-3">
            {currentArticle.tags.map(tag => (
              <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/80 backdrop-blur-sm text-white">
                {tag}
              </span>
            ))}
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 tracking-tight leading-tight">
            {currentArticle.title}
          </h2>
          
          <p className="text-slate-200 text-sm sm:text-base line-clamp-2 mb-4 max-w-2xl">
            {currentArticle.excerpt}
          </p>

          <div className="flex items-center text-sm text-slate-300 font-medium space-x-4">
            <span>{currentArticle.author}</span>
            <span>•</span>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1.5" />
              {currentArticle.readTime}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 right-6 sm:right-10 flex space-x-2">
        {articles.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};