import { BlogPostData, FrontMatter } from '../types';

/**
 * A simple regex-based frontmatter parser to avoid heavy dependencies in the browser.
 * It expects frontmatter to be enclosed in --- at the start of the file.
 */
export const parseMarkdown = (fileContent: string): BlogPostData => {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = fileContent.match(frontMatterRegex);

  if (!match) {
    // Fallback if no frontmatter found
    return {
      attributes: {
        title: 'Untitled',
        date: new Date().toISOString(),
        author: 'Unknown',
        image: 'https://picsum.photos/800/400',
        categories: [],
        slug: 'untitled'
      },
      body: fileContent
    };
  }

  const frontMatterBlock = match[1];
  const body = match[2];

  const attributes: Partial<FrontMatter> = {};
  
  frontMatterBlock.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;
    
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Handle arrays (e.g., categories: [a, b])
    if (value.startsWith('[') && value.endsWith(']')) {
      const arrayValue = value.slice(1, -1).split(',').map(item => item.trim().replace(/^['"]|['"]$/g, ''));
      (attributes as any)[key] = arrayValue;
    } else {
      // Remove quotes if present
      value = value.replace(/^['"]|['"]$/g, '');
      (attributes as any)[key] = value;
    }
  });

  return {
    attributes: attributes as FrontMatter,
    body: body.trim()
  };
};