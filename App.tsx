import React, { useState, useEffect } from 'react';
import TerminalIntro from './components/TerminalIntro';
import Navbar from './components/Navbar';
import SidebarDots from './components/SidebarDots';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Work from './components/Work';
import Education from './components/Education';
import Contact from './components/Contact';
import { SectionId } from './types';
import { articleService } from './services/articleService';
import { ArticleMetadata } from './types';
import { ArticleListItem } from './components/ArticleListItem';
import { ArticleCarousel } from './components/ArticleCarousel';
import { ArticleModal } from './components/ArticleModal';
import { List } from 'lucide-react';



function App() {
  const [showTerminal, setShowTerminal] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HERO);

  const [articles, setArticles] = useState<ArticleMetadata[]>([]);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data
    const data = articleService.getAllArticles();
    setArticles(data);
  }, []);

  useEffect(() => {
    if (showTerminal) return;

    const handleScroll = () => {
      // With scroll snap, the standard window scroll event usually still fires.
      // However, if scroll snap is on body/html, we can detect standard scrollY.
      const sections = Object.values(SectionId);

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is approximately in the middle of the viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showTerminal]);

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-neon selection:text-black">
      {showTerminal ? (
        <TerminalIntro onComplete={() => setShowTerminal(false)} />
      ) : (
        <div className="relative animate-fadeIn">
          <Navbar activeSection={activeSection} />
          <SidebarDots activeSection={activeSection} />

          <main>
            <Hero />
            <About />

            {/* Carousel Section */}
            <section>
              <ArticleCarousel
                articles={articles}
                onArticleClick={(slug) => setSelectedArticleSlug(slug)}
              />
            </section>

            <Skills />
            <Work />
            <Education />

            <section className="mt-16">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <List className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-xl font-bold text-slate-900">Latest Articles</h2>
                </div>
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
                <div className="text-center py-20 text-slate-400 bg-white rounded-xl border border-dashed border-slate-200">
                  No articles found.
                </div>
              )}
            </section>


            <Contact />
          </main>

          <footer className="py-8 text-center text-gray-600 text-sm font-mono snap-start">
            <p>Designed & Built by Pran &copy; {new Date().getFullYear()}</p>
          </footer>

          <ArticleModal
            slug={selectedArticleSlug}
            onClose={() => setSelectedArticleSlug(null)}
          />
        </div>
      )}
    </div>
  );
}

export default App;