
import React, { createContext, useContext, useState, useEffect } from 'react';
import { postPaths } from '../data/posts';
import { parseMarkdown } from '../utils/markdownUtils';
import { ParsedPost } from '../types';

interface PostsContextType {
  posts: ParsedPost[];
  getPostBySlug: (slug: string) => ParsedPost | undefined;
  isLoading: boolean;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<ParsedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const promises = postPaths.map(async (path) => {
          const response = await fetch(path);
          if (!response.ok) {
            console.warn(`Failed to fetch post at ${path}`);
            return null;
          }
          const text = await response.text();
          const { attributes, body } = parseMarkdown(text);
          return { ...attributes, content: body } as ParsedPost;
        });

        const results = await Promise.all(promises);
        const validPosts = results.filter((p): p is ParsedPost => p !== null);
        
        setPosts(validPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const getPostBySlug = (slug: string) => {
    return posts.find(p => p.slug === slug);
  };

  return (
    <PostsContext.Provider value={{ posts, getPostBySlug, isLoading }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};
