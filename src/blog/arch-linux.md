---
id: 1
title: 'Switching to Arch Linux: A Survival Guide'
date: 'Oct 12, 2024'
excerpt: 'Why I made the switch, the challenges I faced with Nvidia drivers, and why I can''t go back to Windows.'
category: 'Linux'
---

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
I used `archinstall` because I'm lazy. Don't tell the purists.

```bash
pacman -Syu
```
