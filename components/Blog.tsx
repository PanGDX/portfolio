import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import { SectionId, BlogPost } from '../types';
import { blogPostsContent } from '../data/content';

const posts: BlogPost[] = [
  {
    id: 1,
    title: 'Switching to Arch Linux: A Survival Guide',
    date: 'Oct 12, 2024',
    excerpt: 'Why I made the switch, the challenges I faced with Nvidia drivers, and why I can\'t go back to Windows.',
    category: 'Linux',
    content: blogPostsContent[1]
  },
  {
    id: 2,
    title: 'My Journey into Rust Programming',
    date: 'Sep 28, 2024',
    excerpt: 'The borrow checker was my enemy, now it is my best friend. How learning Rust changed the way I write code.',
    category: 'Coding',
    content: blogPostsContent[2]
  },
  {
    id: 3,
    title: 'Hiking the Dolomites: Disconnecting to Reconnect',
    date: 'Aug 15, 2024',
    excerpt: 'Sometimes the best way to solve a bug is to touch grass. Sharing my photos from last summer.',
    category: 'Personal',
    content: blogPostsContent[3]
  },
  {
    id: 4,
    title: 'Understanding React Server Components',
    date: 'Jul 20, 2024',
    excerpt: 'A deep dive into the new architecture and how it changes the way we build web apps.',
    category: 'React',
    content: blogPostsContent[4] || ''
  },
  {
    id: 5,
    title: 'Vim vs Nano: The Eternal War',
    date: 'Jun 10, 2024',
    excerpt: 'Why I choose Vim every time (and how to exit it).',
    category: 'Tools',
    content: blogPostsContent[5] || ''
  },
  {
    id: 6,
    title: 'Why I love TypeScript',
    date: 'May 05, 2024',
    excerpt: 'Types can be annoying, but they save you from yourself.',
    category: 'Coding',
    content: blogPostsContent[6] || ''
  }
];

interface BlogProps {
  onOpenBlog: (post: BlogPost) => void;
}

const Blog: React.FC<BlogProps> = ({ onOpenBlog }) => {
  const [showAll, setShowAll] = useState(false);

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