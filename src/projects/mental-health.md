---
slug: "ai-mental-health-platform"
title: "Building an AI-Powered Mental Health Evaluation Platform with React Native"
date: "2024-03-20"
excerpt: "Collaborated with a nursing researcher to develop a secure, cross-platform mental health application featuring AI-driven advice and clinical assessments like GAD-7 and PSS-10."
tags: ["React Native", "HealthTech", "AI", "Mobile Dev", "Data Privacy"]
coverImage: "assets/mental-health.png"
---

### TLDR;

- Developed a cross-platform mental health application using **React Native**.
- Integrated standard clinical evaluation tools, specifically **GAD-7** (Generalized Anxiety Disorder-7) and **PSS-10** (Perceived Stress Scale), alongside **AI-generated wellness advice**.
- Collaborated directly with a **nursing student** to support their graduation thesis, ensuring the clinical relevance of the features.
- Successfully conducted a pilot study with **over 50 students**, collecting valuable feedback while maintaining strict **data security and user anonymity**.


### Problem Statement
The nursing student needed an intuitive and secure interface for students to evaluate their mental healt husing proven metrics like PSS-10 or GAD-7.


### Solution
This project was built using a modern tech stack designed for rapid development and strict security compliance. I utilized **TypeScript, React Native, and Expo** for the frontend, while leveraging **Supabase (PostgreSQL)** for the backend infrastructure.

#### Rapid Deployment with Expo
Given the timeline of a nursing thesis, we needed a framework that allowed for fast iteration without the overhead of complex native configuration. **Expo** was the perfect choice for this requirement:

*   **Cross-Platform Ease:** Expo allowed us to maintain a single codebase that deployed seamlessly to Android, iOS, and the Web. This was crucial for reaching students across different devices without needing separate development teams.
*   **Zero-Cost Infrastructure:** As a student project, budget was a constraint. Expo's core tools are free and open-source, allowing us to build a production-grade application without incurring licensing costs.
*   **OTA Updates & Speed:** Using Expo Application Services (EAS), we could push over-the-air updates to fix bugs instantly. This meant we didn't have to have the users re-download the app during the pilot phase, significantly improving the user retention rate for the study.

#### Secure Backend with Supabase Edge Functions
Security was paramount. Since the application deals with sensitive mental health data and had to pass **NUS Institutional Review Board (NUS-IRB)** scrutiny, we could not rely on standard client-side API calls.

I implemented **Supabase Edge Functions** to act as a secure middleware between the application and our data/AI providers:

1.  **Hiding Secrets:** The API keys for the Gemini AI model never touch the client-side code. When a user requests advice, the app calls a secure Edge Function. This function retrieves the API key from the server-side environment variables, ensuring the keys cannot be reverse-engineered or stolen.
2.  **Data Sanitization:** Before any survey data (GAD-7/PSS-10) is written to the database, it passes through an Edge Function. This validates the input types and ensures that no malicious code or malformed data enters the PostgreSQL database.
3.  **Strict Anonymity:** The database schema was designed to decouple identity from data. We utilized Row Level Security (RLS) policies to ensure users could only access their own records. The system uses opaque user IDs rather than names or emails, ensuring that even if the database were viewed by an admin, the specific answers could not be traced back to a physical student without the encryption keys.

#### AI "Therapist" Integration
The "AI Therapist" feature uses the **Gemini API** to generate empathetic, non-medical advice based on the user's survey results. To prevent hallucinations or harmful advice, the system uses a strict system prompt injected via the Edge Function, instructing the AI to act as a supportive peer rather than a doctor, and to always recommend professional help if scores exceed a certain threshold.

![My Robot](/public/assets/mental-health-2.png)

The questionnaire uses custom UI elements that are intuitive, such as smooth sliders for gauging stress levels.
![My Robot](/public/assets/mental-health-3.png)

Additionally, the AI interface leverages the secure Edge Function pipeline to provide custom tones and advice in real-time.
![My Robot](/public/assets/mental-health-4.png)