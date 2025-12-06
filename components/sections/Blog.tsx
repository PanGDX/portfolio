import React, { useEffect, useState } from 'react';
import SectionWrapper from '../SectionWrapper';
import { ArticleMetadata, SectionId } from '../../types';
import { articleService } from '../../services/articleService';
import { ArticleListItem } from '../ArticleListItem';
import { ArticleModal } from '../ArticleModal';

const Blog: React.FC = () => {
  const [articles, setArticles] = useState<ArticleMetadata[]>([]);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data
    const data = articleService.getAllArticles().filter(article => article.type === 'blog');
    setArticles(data);
  }, []);


  return (
    <SectionWrapper id={SectionId.BLOG} title="BLOG">
        <div className="flex items-center justify-between mb-8">
        <span className="text-sm font-medium text-slate-500">
            {articles.length} posts
        </span>
        </div>

        <div className="flex flex-col space-y-4">
        {articles.map((article) => (
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

        <ArticleModal
            slug={selectedArticleSlug}
            onClose={() => setSelectedArticleSlug(null)}
          />
    </SectionWrapper>
  );
};

export default Blog;

