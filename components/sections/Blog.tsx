import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react'; // Import Loader icon
import SectionWrapper from '../SectionWrapper';
import { ArticleMetadata, SectionId } from '../../types';
import { articleService } from '../../services/articleService';
import { ArticleListItem } from '../ArticleListItem';
import { ArticleModal } from '../ArticleModal';

const Blog: React.FC = () => {
  const [articles, setArticles] = useState<ArticleMetadata[]>([]);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);

  // Pagination state
  const INITIAL_COUNT = 3;
  const LOAD_INCREMENT = 3;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    // Fetch and filter data
    const data = articleService.getAllArticles().filter(article => article.type === 'blog');
    setArticles(data);
  }, []);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate network delay for "loading" effect
    setTimeout(() => {
      setVisibleCount(prev => prev + LOAD_INCREMENT);
      setIsLoadingMore(false);
    }, 600);
  };

  // Derived state for rendering
  const visibleArticles = articles.slice(0, visibleCount);
  const hasMoreArticles = visibleCount < articles.length;

  return (
    <SectionWrapper id={SectionId.BLOG} title="BLOG">
      <div className="flex items-center justify-between mb-8">
        <span className="text-sm font-medium text-slate-500">
          Showing {Math.min(visibleCount, articles.length)} of {articles.length} posts
        </span>
      </div>

      <div className="flex flex-col space-y-4">
        {visibleArticles.map((article) => (
          <ArticleListItem
            key={article.slug}
            article={article}
            onClick={(slug) => setSelectedArticleSlug(slug)}
          />
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-20 text-slate-400 bg-black rounded-xl border border-dashed border-slate-200">
          No articles found.
        </div>
      )}

      {/* Load More Button */}
      {hasMoreArticles && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="group relative flex items-center justify-center py-3 px-8 border border-indigo-600 bg-transparent text-indigo-400 font-semibold rounded-full hover:bg-indigo-900/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed min-w-[160px]"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              <>Load More Articles</>
            )}
          </button>
        </div>
      )}

      <ArticleModal
        slug={selectedArticleSlug}
        onClose={() => setSelectedArticleSlug(null)}
      />
    </SectionWrapper>
  );
};

export default Blog;