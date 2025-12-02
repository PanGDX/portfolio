---
id: 3
title: 'ArchConfig'
description: 'Automated Arch Linux dotfiles manager'
image: 'https://picsum.photos/600/400?random=3' 
tags: ['Bash', 'Lua']
---

# ArchConfig

![Dotfiles](https://picsum.photos/800/400?random=3)

My personal dotfiles manager.

## How it works
It uses Lua scripts to symlink config files and install packages.

```lua
local install = function(pkg)
  os.execute("pacman -S " .. pkg)
end
```
