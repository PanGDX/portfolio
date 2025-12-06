            


import React, { useEffect, useState } from 'react';
import SectionWrapper from '../SectionWrapper';
import { ArticleMetadata, SectionId } from '../../types';
import { articleService } from '../../services/articleService';
import { ArticleCarousel } from '../ArticleCarousel';
import { ArticleModal } from '../ArticleModal';

const Projects: React.FC = () => {
  const [articles, setArticles] = useState<ArticleMetadata[]>([]);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data
    const data = articleService.getAllArticles().filter(article => article.type === 'project');
    setArticles(data);
  }, []);


  return (
    <SectionWrapper id={SectionId.PROJECTS} title="PROJECTS">
        <ArticleCarousel
        articles={articles}
        onArticleClick={(slug) => setSelectedArticleSlug(slug)}
        />

        <ArticleModal
            slug={selectedArticleSlug}
            onClose={() => setSelectedArticleSlug(null)}
          />
    </SectionWrapper>
  );
};

export default Projects;

