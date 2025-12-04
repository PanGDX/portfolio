import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { ParsedPost } from '../types';

interface BlogCardProps {
  post: ParsedPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group h-full">
      <Link to={`/post/${post.slug}`} className="relative h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>
      
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.categories.map(cat => (
            <span 
              key={cat} 
              className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100"
            >
              {cat}
            </span>
          ))}
        </div>

        <Link to={`/post/${post.slug}`} className="block mb-3">
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>

        <p className="text-gray-500 mb-6 text-sm line-clamp-3 flex-grow">
          {post.content.slice(0, 150).replace(/[#*`]/g, '')}...
        </p>

        <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </time>
            </div>
            <div className="flex items-center">
              <User className="h-3.5 w-3.5 mr-1.5" />
              <span>{post.author}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;