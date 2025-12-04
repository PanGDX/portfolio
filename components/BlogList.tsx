
import React from 'react';
import { usePosts } from '../contexts/PostsContext';
import BlogCard from './BlogCard';
import { Loader2 } from 'lucide-react';

const BlogList: React.FC = () => {
  const { posts, isLoading } = usePosts();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4 tracking-tight">
          Our Latest Stories
        </h1>
        <p className="text-lg text-gray-600">
          Insights, thoughts, and trends from our team of writers and developers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
