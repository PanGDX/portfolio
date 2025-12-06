export const RAW_ARTICLES = [
  `---
slug: "the-future-of-react"
title: "The Future of React: Server Components"
date: "2023-10-24"
excerpt: "React Server Components are changing how we think about the boundary between client and server. Let's dive deep into what this means for performance."
tags: ["React", "Performance", "Web Dev"]
type: "blog"
coverImage: "https://picsum.photos/800/400?random=1"
---

# The Future is Here

React Server Components (RSC) represent a paradigm shift in how we build React applications. By allowing components to render exclusively on the server, we can reduce the bundle size sent to the client and improve initial page load performance.

## Why RSC Matters

Traditionally, React has been a client-side library. Even with SSR (Server-Side Rendering), the hydration process required sending the JavaScript for components to the browser.

> "Server Components allow developers to build apps that span the server and client, combining the rich interactivity of client-side apps with the improved performance of traditional server rendering."

### Key Benefits

1. **Zero Bundle Size**: Components that only run on the server don't add to the JavaScript bundle.
2. **Direct Backend Access**: Access your database directly from your component.
3. **Automatic Code Splitting**: Server components can dynamically import client components.

## Code Example

Here is how you might fetch data in a Server Component:

\`\`\`jsx
// Note: This is an async component
export default async function Note({ id }) {
  const note = await db.notes.get(id);
  return (
    <div>
      <h2>{note.title}</h2>
      <section>{note.body}</section>
    </div>
  );
}
\`\`\`

The future looks bright for React developers!
`,
  `---
slug: "mastering-tailwind-css"
title: "Mastering Tailwind CSS for Scalable Design"
date: "2023-11-15"
excerpt: "Utility-first CSS might seem chaotic at first, but with the right patterns, it becomes a superpower for rapid UI development."
tags: ["CSS", "Tailwind", "Design"]
type: "blog"
coverImage: "https://picsum.photos/800/400?random=2"
---

# Why I Love Tailwind CSS

Tailwind CSS has taken the frontend world by storm. It provides low-level utility classes that let you build completely custom designs without ever leaving your HTML.

## The Utility-First Workflow

Instead of writing CSS classes like \`.btn-primary\`, you write classes like:

\`\`\`html
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Click Me
</button>
\`\`\`

### Managing Complexity

One common criticism is that HTML becomes cluttered. However, by extracting components (using React, Vue, etc.) or using the \`@apply\` directive, you can keep your codebase clean.

## Responsive Design

Tailwind makes responsive design incredibly intuitive using prefixes:

- \`md:flex\`: Apply flexbox only on medium screens and up.
- \`lg:w-1/2\`: Width is 50% on large screens.

| Breakpoint | Prefix | Minimum Width |
|:---|:---|:---|
| Small | \`sm\` | 640px |
| Medium | \`md\` | 768px |
| Large | \`lg\` | 1024px |

It's truly a game changer for modern web development.
`,
  `---
slug: "typescript-best-practices"
title: "TypeScript Best Practices for 2024"
date: "2023-12-01"
excerpt: "Stop using 'any' and start leveraging the full power of the type system. Here are 5 tips to write better TypeScript code."
tags: ["TypeScript", "Coding", "Guide"]
type: "project"
coverImage: "https://picsum.photos/800/400?random=3"
---

# Level Up Your TypeScript

TypeScript is more than just adding types to variables. It's about describing the shape of your data and the behavior of your application.

## 1. Avoid \`any\` at all costs

Using \`any\` essentially disables TypeScript for that variable. Instead, use \`unknown\` if you truly don't know the type, and narrow it down later.

## 2. Use Discriminated Unions

This is one of the most powerful features in TypeScript for state management.

\`\`\`typescript
type State = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: string }
  | { status: 'error'; error: Error };

function render(state: State) {
  switch (state.status) {
    case 'loading': return 'Loading...';
    case 'success': return \`Data: \${state.data}\`;
    case 'error': return \`Error: \${state.error.message}\`;
    case 'idle': return 'Ready';
  }
}
\`\`\`

## 3. Utility Types

Learn to use \`Pick\`, \`Omit\`, \`Partial\`, and \`ReturnType\`. They save you from redefining types constantly.

Happy Coding!
`
];