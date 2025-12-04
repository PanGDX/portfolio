import React, { useRef } from 'react';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePosts } from '../contexts/PostsContext';
import BlogCard from './BlogCard';

const Stories: React.FC = () => {
  const { posts, isLoading } = usePosts();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth < 600 ? container.clientWidth : 400;
      const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="w-full py-4 animate-fadeIn">
      {/* Inline styles to hide scrollbar while keeping functionality */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <div className="text-center max-w-2xl mx-auto mb-10 px-4">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4 tracking-tight">
          Featured Stories
        </h1>
        <p className="text-lg text-gray-600">
          Swipe through our latest insights, trends, and discoveries.
        </p>
      </div>

      <div className="relative group max-w-[100vw] overflow-hidden">
        {/* Left Navigation Gradient & Button */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none hidden md:flex items-center justify-start pl-4">
           <button 
            onClick={() => scroll('left')}
            className="pointer-events-auto p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg text-gray-700 hover:text-indigo-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 border border-gray-100"
            aria-label="Previous story"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 px-4 md:px-8 pb-12 hide-scrollbar snap-x snap-mandatory scroll-smooth"
        >
          {posts.map((post) => (
            <div 
              key={post.slug} 
              className="flex-shrink-0 w-[85vw] sm:w-[400px] snap-center"
            >
              <div className="h-full transform transition-transform duration-300 hover:-translate-y-2">
                <BlogCard post={post} />
              </div>
            </div>
          ))}
          
          {/* Spacer to ensure last item isn't flush with edge */}
          <div className="w-2 flex-shrink-0" />
        </div>

        {/* Right Navigation Gradient & Button */}
         <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none hidden md:flex items-center justify-end pr-4">
           <button 
            onClick={() => scroll('right')}
            className="pointer-events-auto p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg text-gray-700 hover:text-indigo-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 border border-gray-100"
            aria-label="Next story"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stories;