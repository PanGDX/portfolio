---
slug: "overengineering-nas"
title: "A Lesson In Overengineering - Network Attached Storage (NAS)"
date: "2025-01-15"
excerpt: "A reflection piece on overengineering solutions to simple problems"
tags: ["NAS", "Technology", "NAS"]
coverImage: "assets/nas.jpg"
---

### **TL;DR**
*   **The Problem:** Years of family memories scattered across 10 hard drives and 12 thumb drives, totaling 1–2TB.
*   **The Goal:** Create a centralized, network-attached storage (NAS) with basic file integrity checks.
*   **The Failed Attempts:** 
    *   **OpenMediaVault:** Failed due to hardware/driver incompatibilities (ethernet distance and missing WiFi drivers).
    *   **Ubuntu/Samba:** Failed initial custom setups due to the complex "abstraction layers" of Windows making network discovery and permissions a nightmare.
    *   **Eventual Solution:** Used Nautilus-Share which automatically configures Samba to be compatible with all systems
*   **The Realization:** Don’t use a "sledgehammer" for a small, Windows-centric use case.
*   **The Lesson:** For a three-person household, the best solution is the one that integrates seamlessly with existing devices.

***

### **The Project: Simplifying Family Data Management**

#### **The Data Crisis**
My family faced a common digital-age dilemma: our collective history was scattered across a disorganized graveyard of hardware. Between 10 external hard drives and a dozen thumb drives, our most valuable memories—photos, videos, and documents—were sporadically stored with no central hub. My mission was simple: rescue this data and consolidate it into a single, reliable, network-accessible location.

#### **The "Sledgehammer" Approach**
Since I had an old work computer available, and inspired by Youtube videos of Homelabbing and fancy NAS servers, I decided to build a custom NAS. My first instinct was to go with **OpenMediaVault (OMV)**. However, I immediately hit a wall of hardware and driver issues. The computer was located far from the router; the onboard ethernet port was dead; and OMV’s minimal Debian-based install lacked the drivers for my WiFi card. Even trying to bypass this with a USB extender failed because the OS couldn't recognize the hardware in a "fresh install" state.

I took a short break and took a step back. I eventually realized I was over-engineering the solution. I didn't need a heavy-duty media server or a Plex powerhouse; **OpenMediaVault** is amazing because it allows for complex user management, web interfaces, media servers like Jellyfin, backups and corruption checks through RAID 5 arrays. **BUT I DON'T NEED ALL THAT**. I just needed a stable folder that checks for file corruption that can be accessed over the local network!

#### **The Linux-Windows Friction**
I pivoted to **Ubuntu**, thinking a standard Linux distro would be more forgiving. While Ubuntu itself is excellent, getting **Samba (SMB)** to play nice with Windows laptops proved to be an exercise in frustration. Despite installing `wsdd` for network discovery and tweaking configurations for hours, Windows’ internal abstractions and security layers made it nearly impossible for my parents to reliably map the drive. 

In the end, the solution was brutally simple. I uninstalled all the custom Samba setups and wsdd and used Nautilus-share to perform automatic integration. And that worked.

#### **Conclusion**
It is easy to get caught up in the "perfect" technical solution (Linux/ZFS/NAS-OS) while forgetting the actual requirements of the end-user. For a small family network, reliability and accessibility trump professional-grade complexity. I don't need an enterprise-level system; I need a system that works when my parents click "Save." 

**The Golden Rule of DIY Tech:** Don't overcomplicate the solution just because you can. Build for the environment you actually have, not the one you think you should have.