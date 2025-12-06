import { ParsedMarkdown } from '../types';

/**
 * Parses a raw markdown string to extract YAML frontmatter and content.
 * Note: In a production Node.js env, we might use 'gray-matter'. 
 * For a lightweight browser-compatible approach without polyfills, we use this custom parser.
 */
export const parseFrontmatter = (fileContent: string): ParsedMarkdown => {
  const frontmatterRegex = /---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    return {
      metadata: {},
      content: fileContent,
    };
  }

  const frontmatterBlock = match[1];
  const content = match[2];
  const metadata: Record<string, any> = {};

  frontmatterBlock.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      let key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      // Handle simple strings (remove quotes)
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      
      // Handle simple arrays (e.g. ["a", "b"])
      if (value.startsWith('[') && value.endsWith(']')) {
        const arrayContent = value.slice(1, -1);
        metadata[key] = arrayContent.split(',').map(item => 
          item.trim().replace(/^"|"$/g, '')
        ).filter(i => i);
      } else {
        metadata[key] = value;
      }
    }
  });

  return { metadata, content };
};

export const formatDate = (dateString: string): string => {
  try {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  } catch (e) {
    return dateString;
  }
};