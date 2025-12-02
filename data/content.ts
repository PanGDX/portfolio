// This file simulates the content of markdown files stored in /blog_md and /projects_md
// In a real application with a build step, these would be imported as raw strings from .md files.

export const blogPostsContent: {[key: number]: string} = {
  1: `
# Switching to Arch Linux: A Survival Guide

![Arch Linux](https://picsum.photos/800/400?random=10)

So, I finally did it. I switched to Arch.

## Why?
I wanted full control over my system. No bloatware, no forced updates, just me and the terminal.

### The Good
*   **Performance**: My laptop feels 2x faster.
*   **Customization**: I spent 3 days just configuring my window manager (Hyprland).
*   **AUR**: If it exists, it's in the AUR.

### The Bad
*   **Updates**: I break my system at least once a month.
*   **Nvidia**: Drivers are a pain.

## The Installation
I used \`archinstall\` because I'm lazy. Don't tell the purists.

\`\`\`bash
pacman -Syu
\`\`\`
`,
  2: `
# My Journey into Rust Programming

![Rust](https://picsum.photos/800/400?random=11)

The borrow checker was my enemy, now it is my best friend.

## Ownership & Borrowing
Coming from C++ and Python, Rust's memory model was a shock.

> "Rust guarantees memory safety without garbage collection."

This sounded like magic. It turns out, it's just strict rules.

### Code Example
\`\`\`rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; 
    // println!("{}, world!", s1); // This would fail!
    println!("{}, world!", s2);
}
\`\`\`

## Conclusion
If you haven't tried Rust yet, give it a go. The compiler error messages are actually helpful!
`,
  3: `
# Hiking the Dolomites

![Dolomites](https://picsum.photos/800/400?random=12)

Sometimes you need to touch grass.

## The Route
We started at Lago di Braies and hiked up to...

*   Distance: 15km
*   Elevation: 1200m
*   Mood: Tired but happy

Here is a list of gear I brought:
1.  Boots
2.  Water
3.  Camera
  `,
  4: `
# Understanding React Server Components

RSC is a game changer. It allows us to render components on the server and send zero JS to the client.

## Benefits
1.  Smaller bundle size
2.  Direct database access
3.  Better SEO
  `,
  5: `
# Vim vs Nano

I used to use Nano. Then I found a server where Nano wasn't installed. I had to learn Vim.

Now I can't quit. Literally, \`:q!\`.

## Keybindings
*   \`i\`: insert mode
*   \`esc\`: normal mode
*   \`:wq\`: save and quit
  `,
  6: `
# Why I love TypeScript

Javascript is chaos. Typescript is order.

\`\`\`typescript
interface User {
  name: string;
  id: number;
}
\`\`\`

It catches bugs before I even run the code.
  `
};

export const projectsContent: {[key: number]: string} = {
  1: `
# wwwallet

![wwwallet Dashboard](https://picsum.photos/800/400?random=1)

**wwwallet** is a comprehensive crypto tracking dashboard.

## Features
*   Real-time price updates via WebSocket
*   Portfolio analysis charts
*   Multi-wallet support

## Tech Stack
*   **Frontend**: React, TailwindCSS, Recharts
*   **Backend**: Node.js, Express
*   **Database**: PostgreSQL

## Challenges
Handling real-time data for thousands of coins was tricky. We implemented a throttling mechanism to prevent UI lag.
`,
  2: `
# Trips!

![Trips App](https://picsum.photos/800/400?random=2)

**Trips!** helps you organize your travel itinerary.

## Features
*   Map integration
*   Photo timeline
*   Budget tracking

## Tech Stack
Built with **React Native** and **Firebase**.
`,
  3: `
# ArchConfig

![Dotfiles](https://picsum.photos/800/400?random=3)

My personal dotfiles manager.

## How it works
It uses Lua scripts to symlink config files and install packages.

\`\`\`lua
local install = function(pkg)
  os.execute("pacman -S " .. pkg)
end
\`\`\`
  `
};