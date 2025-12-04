import React, { useState, useEffect } from 'react';
// @ts-ignore
import matter from 'gray-matter';
import SectionWrapper from './SectionWrapper';
import { SectionId, BlogPost } from '../types';

interface BlogProps {
  onOpenBlog: (post: BlogPost) => void;
}

const Blog: React.FC<BlogProps> = ({ onOpenBlog }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const postModules = import.meta.glob('../src/blog/*.md', { as: 'raw' });

      let loadedPosts = await Promise.all(
        Object.values(postModules).map(async (loader) => {
          const rawContent = await loader();
          const { data, content } = matter(rawContent);

          return {
            id: data.id,
            title: data.title,
            date: data.date,
            excerpt: data.excerpt,
            category: data.category,
            content: content,
          } as BlogPost;
        })
      );

      // Sort posts by id in descending order
      loadedPosts.sort((a, b) => b.id - a.id);

      setPosts(loadedPosts);
    };

    fetchPosts();
  }, []);

  const visiblePosts = showAll ? posts : posts.slice(0, 3);

  return (
    <SectionWrapper id={SectionId.BLOG} title="BLOG">
      <div className="grid gap-8">
        {visiblePosts.map((post) => (
            <div key={post.id} className="group border-b border-neutral-800 pb-8 hover:border-neon/50 transition-colors animate-fadeIn">
                <div 
                    onClick={() => onOpenBlog(post)}
                    className="flex flex-col md:flex-row md:items-baseline justify-between mb-2 cursor-pointer"
                >
                    <h3 className="text-2xl font-bold text-gray-200 group-hover:text-neon transition-colors">
                        {post.title}
                    </h3>
                    <span className="font-mono text-sm text-gray-500">{post.date}</span>
                </div>
                <div className="mb-3">
                     <span className="text-xs font-bold bg-neutral-800 text-yellow-300 px-2 py-1 rounded uppercase tracking-wider">
                         {post.category}
                     </span>
                </div>
                <p className="text-gray-400 leading-relaxed max-w-3xl">
                    {post.excerpt}
                </p>
                <button 
                    onClick={() => onOpenBlog(post)}
                    className="mt-4 text-sm text-green-400 hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                    Read Post <i className="fas fa-arrow-right text-xs"></i>
                </button>
            </div>
        ))}
        
        <div className="text-center pt-8">
            <button 
                onClick={() => setShowAll(!showAll)}
                className="border border-neutral-700 text-gray-400 px-6 py-2 hover:border-neon hover:text-neon transition-all"
            >
                {showAll ? 'Show Less' : 'View All Posts'}
            </button>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Blog;