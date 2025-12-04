import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, User, Clock, Sparkles, AlertCircle } from 'lucide-react';
import { usePosts } from '../contexts/PostsContext';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getPostBySlug } = usePosts();
  const [summary, setSummary] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const post = getPostBySlug(slug || '');

  if (!post) {
    return <Navigate to="/" replace />;
  }

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      if (!process.env.API_KEY) {
         throw new Error("API Key is missing. Please set process.env.API_KEY.");
      }
      const result = "";
      setSummary(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Estimate read time
  const words = post.content.split(/\s+/).length;
  const readTime = Math.ceil(words / 200);

  return (
    <article className="max-w-4xl mx-auto">
      <Link 
        to="/" 
        className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to all posts
      </Link>

      <div className="relative h-[400px] w-full rounded-3xl overflow-hidden mb-10 shadow-lg">
         <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 text-white">
          <div className="flex flex-wrap gap-3 mb-4">
             {post.categories.map(cat => (
              <span key={cat} className="px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-md border border-white/30 text-white">
                {cat}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm sm:text-base text-gray-200">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(post.date).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {readTime} min read
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          {/* AI Summary Section */}
          <div className="mb-10 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
             <div className="flex items-center justify-between mb-3">
               <h3 className="flex items-center text-indigo-900 font-semibold">
                 <Sparkles className="h-5 w-5 mr-2 text-indigo-600" />
                 AI Summary
               </h3>
               {!summary && !isGenerating && (
                 <button 
                  onClick={handleGenerateSummary}
                  className="text-xs font-medium bg-white text-indigo-600 px-3 py-1.5 rounded-full border border-indigo-200 hover:bg-indigo-50 transition-colors shadow-sm"
                 >
                   Generate
                 </button>
               )}
             </div>
             
             {isGenerating && (
               <div className="flex items-center text-sm text-gray-500 animate-pulse">
                 <div className="h-2 w-2 bg-indigo-400 rounded-full mr-1 animate-bounce"></div>
                 <div className="h-2 w-2 bg-indigo-400 rounded-full mr-1 animate-bounce delay-75"></div>
                 <div className="h-2 w-2 bg-indigo-400 rounded-full mr-2 animate-bounce delay-150"></div>
                 Analyzing content...
               </div>
             )}

             {error && (
                <div className="flex items-center text-sm text-red-600 bg-red-50 p-2 rounded-lg">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {error}
                </div>
             )}

             {summary && (
               <div className="text-gray-700 text-sm leading-relaxed animate-fadeIn">
                 {summary}
               </div>
             )}
             
             {!summary && !isGenerating && !error && (
               <p className="text-sm text-gray-500">
                 Get a quick overview of this article powered by Gemini.
               </p>
             )}
          </div>

          <div className="prose prose-lg prose-indigo prose-img:rounded-xl max-w-none text-gray-600">
            <ReactMarkdown
              components={{
                img: ({node, ...props}) => (
                  <span className="block my-8">
                    <img {...props} className="w-full rounded-xl shadow-md" alt={props.alt || ''} />
                    {props.alt && <span className="block text-center text-sm text-gray-500 mt-2 italic">{props.alt}</span>}
                  </span>
                ),
                code: ({node, ...props}) => {
                   // A simpler typed check for inline code vs block
                   const isInline = !String(props.children).includes('\n');
                   return isInline 
                    ? <code className="bg-gray-100 text-indigo-600 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
                    : <pre className="bg-slate-900 text-slate-50 p-4 rounded-xl overflow-x-auto text-sm"><code {...props} /></pre>
                }
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-8">
           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
             <h3 className="font-bold text-gray-900 mb-4">About the Author</h3>
             <div className="flex items-center mb-4">
               <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
                 {post.author.charAt(0)}
               </div>
               <div className="ml-3">
                 <p className="font-medium text-gray-900">{post.author}</p>
                 <p className="text-xs text-gray-500">Content Creator</p>
               </div>
             </div>
             <p className="text-sm text-gray-500 mb-4">
               Passionate about sharing knowledge and exploring new technologies in the digital space.
             </p>
             <button className="w-full py-2 px-4 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors border border-gray-200">
               Follow Author
             </button>
           </div>
        </aside>
      </div>
    </article>
  );
};

export default BlogPost;