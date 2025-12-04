import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, ChevronDown } from 'lucide-react';
import { usePosts } from '../contexts/PostsContext';

const VerticalList: React.FC = () => {
  const { posts } = usePosts();
  const [visibleCount, setVisibleCount] = useState(3);

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
      <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Latest Articles
        </h2>
        <span className="text-sm text-gray-500">
          {posts.length} stories
        </span>
      </div>

      <div className="space-y-4">
        {visiblePosts.map((post) => (
          <Link 
            key={post.slug} 
            to={`/post/${post.slug}`}
            className="group flex flex-col sm:flex-row bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden h-auto sm:h-40"
          >
            {/* Image Section */}
            <div className="w-full sm:w-56 h-48 sm:h-full relative shrink-0 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
            </div>

            {/* Content Section */}
            <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center relative">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                  {post.categories[0]}
                </span>
                <span className="text-xs text-gray-400 hidden sm:inline-block">
                  • {Math.ceil(post.content.split(/\s+/).length / 200)} min read
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-2">
                {post.title}
              </h3>

              <p className="text-sm text-gray-500 line-clamp-2 mb-3 sm:mb-0">
                {post.content.slice(0, 150).replace(/[#*`]/g, '')}...
              </p>

              <div className="mt-auto pt-3 sm:pt-0 flex items-center text-xs text-gray-400 sm:absolute sm:bottom-6 sm:right-6">
                 <div className="flex items-center mr-4">
                    <User className="h-3 w-3 mr-1.5" />
                    {post.author}
                 </div>
                 <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1.5" />
                    {new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                 </div>
              </div>
              
              <div className="hidden sm:block absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -mr-2 group-hover:mr-0">
                <ArrowRight className="h-5 w-5 text-indigo-400" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button 
            onClick={handleShowMore}
            className="group flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span>Show More</span>
            <ChevronDown className="h-4 w-4 transform group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};

export default VerticalList;