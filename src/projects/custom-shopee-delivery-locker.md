---
slug: "smart-collection-locker"
title: "Building an IoT Smart Locker for 24/7 Maker Lab Collections"
date: "2024-05-10"
excerpt: "Designed and engineered an automated 'Shopee-style' locker system to enable round-the-clock retrieval of 3D prints and laser cuts at the NUS CDE Maker's Lab."
tags: ["IoT", "ESP32", "Socket Programming", "Automation", "Hardware"]
coverImage: "assets/shopee-locker.png"
---

### TLDR;

- **Problem Solved:** Eliminated the bottleneck of staff-dependent working hours by creating a secure, self-service locker system allowing students to collect projects 24/7.
- **Full-Stack Development:** Solely responsible for the software ecosystem, including a desktop GUI for staff, automatic passcode generation, and an email notification system via **Outlook integration**.
- **Robust IoT Networking:** Engineered a fault-tolerant communication protocol over local LAN WiFi to bridge the control PC and **ESP32** microcontrollers, implementing logic to gracefully handle connection drops and wireless instability.
- **End-to-End Execution:** Collaborated with two engineers to handle the full lifecycle—from drafting proposals and securing administrative approval from **NUS CDE** to component procurement and final hardware assembly.


![My Robot](/public/assets/shopee-locker.png)