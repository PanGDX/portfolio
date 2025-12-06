// 1. Import files as raw strings
// Note: In newer Vite versions, `as: 'raw'` is deprecated in favor of `query: '?raw'`, 
// but we will stick to your syntax as it matches your current setup.
const blogFiles = import.meta.glob('/src/blog/*.{md,mdx}', { as: 'raw', eager: true });
const projectFiles = import.meta.glob('/src/projects/*.{md,mdx}', { as: 'raw', eager: true });

/**
 * Helper to inject the 'type' field into the raw string content.
 * It looks for the first occurrence of "---" at the start of the file
 * and inserts "type: [value]" on the next line.
 */
const injectType = (content: string, type: 'blog' | 'project'): string => {
  const frontmatterRegex = /^---\s*[\r\n]+/;
  
  // If the file starts with Frontmatter (---)
  if (frontmatterRegex.test(content)) {
    return content.replace(frontmatterRegex, `---\ntype: ${type}\n`);
  }
  
  // Fallback: If file has no Frontmatter, wrap the content in a new block
  return `---\ntype: ${type}\n---\n${content}`;
};

// 2. Helper to extract content and transform it
const getContent = (files: Record<string, string>, type: 'blog' | 'project') => {
  return Object.values(files).map((content) => injectType(content, type));
};

const blogArticles = getContent(blogFiles as Record<string, string>, 'blog');
const projectArticles = getContent(projectFiles as Record<string, string>, 'project');

console.log(`Loaded ${blogArticles.length} blog posts`);
console.log(`Loaded ${projectArticles.length} project posts`);

export const RAW_ARTICLES = [...blogArticles, ...projectArticles];