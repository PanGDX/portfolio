import { RAW_ARTICLES } from '../data/articles';
import { Article, ArticleMetadata } from '../types';
import { parseFrontmatter } from '../utils/frontmatter';

export const articleService = {
  getAllArticles: (): ArticleMetadata[] => {
    return RAW_ARTICLES.map(raw => {
      const { metadata } = parseFrontmatter(raw);
      // Ensure the parsed metadata matches our interface
      return metadata as ArticleMetadata;
    });
  },

  getArticleBySlug: (slug: string): Article | null => {
    const raw = RAW_ARTICLES.find(articleRaw => {
        const { metadata } = parseFrontmatter(articleRaw);
        return metadata.slug === slug;
    });

    if (!raw) return null;

    const { metadata, content } = parseFrontmatter(raw);
    return {
      metadata: metadata as ArticleMetadata,
      content
    };
  }
};