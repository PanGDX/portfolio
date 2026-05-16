import React, { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

const navItems = [
  { id: "about", label: "ABOUT" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "education", label: "EDUCATION" },
  { id: "achievements", label: "ACHIEVEMENTS" },
  { id: "skills", label: "SKILLS" },
  { id: "projects", label: "PROJECTS & COURSEWORK" },
];

export default function App() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      let currentSection = navItems[0].id;
      for (const section of sections) {
        if (section && section.offsetTop <= scrollPosition) {
          currentSection = section.id;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id, e) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex min-h-screen font-sans text-slate-600 selection:bg-teal-600 selection:text-white">
      {/* Sidebar - Deep Slate */}
      <nav className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col items-center bg-slate-900 py-16 transition-transform duration-300 max-lg:-translate-x-full lg:translate-x-0">
        <div className="mb-12 hidden lg:block">
          <div className="h-40 w-40 overflow-hidden rounded-full border-8 border-slate-800">
            <img
              src="/pran_photo.jpg"
              alt="Profile Photo"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <ul className="flex w-full flex-col text-center">
          {navItems.map((item) => (
            <li key={item.id} className="py-2">
              <a
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(item.id, e)}
                className={`block w-full py-2 text-sm font-semibold tracking-widest transition-colors ${
                  activeSection === item.id
                    ? "text-teal-400"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="mt-4 py-2">
            <a
              href="https://blog.prantan.work"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2 text-sm font-semibold tracking-widest text-slate-400 transition-colors hover:text-slate-200"
              title="External Blog"
            >
              BLOG ↗
            </a>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 bg-white p-8 lg:ml-72 lg:p-24">
        {/* Mobile Header */}
        <header className="mb-12 flex items-center justify-between border-b border-slate-200 pb-4 lg:hidden">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900">
            PRAN TANPRASERTKUL
          </h1>
          <a
            href="https://blog.prantan.work"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-teal-600"
          >
            BLOG ↗
          </a>
        </header>

        {/* 1. About Section */}
        <section
          id="about"
          className="flex min-h-[80vh] flex-col justify-center border-b border-slate-200 pb-20 pt-10 lg:pt-0"
        >
          <h1 className="mb-4 font-heading text-6xl font-bold leading-none tracking-tight text-slate-900 sm:text-8xl">
            PRAN <span className="text-teal-600">TANPRASERTKUL</span>
          </h1>
          <div className="mb-8 font-heading text-xl uppercase tracking-widest text-slate-500">
            SINGAPORE ·{" "}
            <a
              href="mailto:e1355173@u.nus.edu"
              className="text-teal-600 hover:underline"
            >
              E1355173@U.NUS.EDU
            </a>
          </div>
          <p className="mb-12 max-w-2xl text-lg font-light leading-relaxed">
            I am a student passionate about software engineering, programming,
            and AI. Currently studying Computer Engineering at NUS, I am
            exploring how technology intersects with humanities, while honing my
            skills in a variety of programming languages and hardware
            development.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://linkedin.com/in/pran-tanprasertkul/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-white transition-colors hover:bg-teal-600"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/Reiten966"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-white transition-colors hover:bg-teal-600"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="mailto:e1355173@u.nus.edu"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-white transition-colors hover:bg-teal-600"
            >
              <Mail className="h-5 w-5" />
            </a>
            <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 text-sm font-medium text-slate-700">
              <Phone className="h-4 w-4" /> +65 92444421
            </div>
          </div>
        </section>

        {/* 2. Experience Section */}
        <section
          id="experience"
          className="flex flex-col justify-center border-b border-slate-200 py-20"
        >
          <h2 className="mb-12 font-heading text-5xl font-bold uppercase tracking-tight text-slate-900">
            Experience
          </h2>

          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:pr-12">
            <div className="md:w-3/4">
              <h3 className="mb-1 font-heading text-2xl font-bold uppercase text-slate-900">
                National University of Singapore, Makers' Lab
              </h3>
              <p className="mb-2 text-lg italic text-teal-600">Lab Assistant</p>
              <ul className="list-inside list-disc space-y-1 text-base font-light text-slate-600">
                As a Lab Assistant, I managed daily operations for Bambu 3D
                printers and Epilog laser cutters while providing technical
                consultations to students on electronics and Arduino embedded
                software. Beyond daily lab support, I independently developed
                two major hardware-software integrations. To showcase the lab's
                capabilities, I programmed a Ufactory XArm robotic demonstration
                using Python and OpenCV, engineering an image-processing
                pipeline that converted facial photos into optimized, sketchable
                line paths while minimizing the robot's pen lift-offs.
                Additionally, I built a Wi-Fi-enabled Locker Self-Collection
                System to streamline the pickup of student fabrications. This
                involved designing a custom management GUI and wiring an ESP32
                microcontroller to relay modules to seamlessly actuate the
                locker's electronic snap locks.
              </ul>
            </div>
            <div className="mt-2 whitespace-nowrap font-medium text-teal-600 md:mt-0 md:text-right">
              Aug 2025 - Present
            </div>
          </div>

          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:pr-12">
            <div className="md:w-3/4">
              <h3 className="mb-1 font-heading text-2xl font-bold uppercase text-slate-900">
                Lotus's Thailand
              </h3>
              <p className="mb-2 text-lg italic text-teal-600">
                Software Engineering Intern
              </p>
              <ul className="list-inside list-disc space-y-1 text-base font-light text-slate-600">
                I was tasked with solving a high-volume customer service
                bottleneck by developing an MVP for an AI-powered FAQ chatbot
                capable of handling bilingual (Thai and English) inquiries. To
                digitize and automate the response process, I engineered a
                backend pipeline using LangChain and Google Colab, implementing
                locally hosted Retrieval-Augmented Generation (RAG) and keyword
                search to pull accurate answers from CSV datasets. A major focus
                of my work was benchmarking the system against over 100 varying
                questions to evaluate its accuracy and latency. I successfully
                tested and compared multiple large language models with strong
                Thai language capabilities—including Typhoon, OpenThaiGPT, and
                LLaMA-70B—ultimately delivering a proof-of-concept that
                significantly improved automated response times.
              </ul>
            </div>
            <div className="mt-2 whitespace-nowrap font-medium text-teal-600 md:mt-0 md:text-right">
              Mar 2024 - Jun 2024
            </div>
          </div>

          {/* <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:pr-12">
            <div className="md:w-3/4">
              <h3 className="mb-1 font-heading text-2xl font-bold uppercase text-slate-900">
                Electronic Transactions Development Agency
              </h3>
              <p className="mb-2 text-lg italic text-teal-600">
                Software Engineering Intern
              </p>
              <ul className="list-inside list-disc space-y-1 text-base font-light text-slate-600">
                <li>
                  Evaluated more than 10 large language models and machine
                  learning models on 5 metrics: explainability, safety,
                  repeatability, objectivity and robustness using AIVerify.
                </li>
              </ul>
            </div>
            <div className="mt-2 whitespace-nowrap font-medium text-teal-600 md:mt-0 md:text-right">
              Jan 2024 - Mar 2024
            </div>
          </div> */}
        </section>

        {/* 3. Education Section */}
        <section
          id="education"
          className="flex flex-col justify-center border-b border-slate-200 py-20"
        >
          <h2 className="mb-12 font-heading text-5xl font-bold uppercase tracking-tight text-slate-900">
            Education
          </h2>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:pr-12 mb-12">
            <div className="md:w-3/4">
              <h3 className="mb-1 font-heading text-2xl font-bold uppercase text-slate-900">
                National University of Singapore (NUS)
              </h3>
              <p className="mb-2 text-lg text-slate-500">
                Bachelor of Engineering
              </p>
              <p className="text-base font-light">
                Major in Computer Engineering
              </p>
              <p className="text-base font-light">
                Accredited Specialisation in Internet of Things (IoT)
              </p>
              <p className="text-base font-light">
                Student at{" "}
                <a
                  href="https://nuscollege.nus.edu.sg/"
                  className="text-teal-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NUS Honor's College
                </a>{" "}
              </p>
            </div>
            <div className="mt-2 whitespace-nowrap font-medium text-teal-600 md:mt-0 md:text-right">
              Jul 2024 - Jul 2028
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:pr-12">
            <div className="md:w-3/4">
              <h3 className="mb-1 font-heading text-2xl font-bold uppercase text-slate-900">
                Tulane University
              </h3>
              <p className="mb-2 text-lg text-slate-500">Exchange Student</p>
            </div>
            <div className="mt-2 whitespace-nowrap font-medium text-teal-600 md:mt-0 md:text-right">
              Aug 2026 - Dec 2026
            </div>
          </div>
        </section>

        {/* 4. Achievements Section */}
        <section
          id="achievements"
          className="flex flex-col justify-center border-b border-slate-200 py-20"
        >
          <h2 className="mb-12 font-heading text-5xl font-bold uppercase tracking-tight text-slate-900">
            Awards & Scholarship
          </h2>
          <ul className="list-inside list-disc space-y-4 text-lg font-light">
            <li>
              <span className="font-semibold text-slate-900">
                'Most Sustainable Solution' prize
              </span>{" "}
              in NUS' annual makeathon IDEATE, 2024
            </li>
            <li>
              <span className="font-semibold text-slate-900">
                ASEAN Scholarship
              </span>{" "}
              from NUS, 2024
            </li>
            <li>
              <span className="font-semibold text-slate-900">Silver Medal</span>{" "}
              in Singapore National Olympiad in Informatics, 2023
            </li>
            <li>
              <span className="font-semibold text-slate-900">Silver Medal</span>{" "}
              in Singapore National Olympiad in Informatics, 2021
            </li>
          </ul>
        </section>

        {/* 5. Skills Section */}
        <section
          id="skills"
          className="flex flex-col justify-center border-b border-slate-200 py-20"
        >
          <h2 className="mb-12 font-heading text-5xl font-bold uppercase tracking-tight text-slate-900">
            Technical Skills
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 font-heading text-xl font-bold uppercase text-slate-900">
                Programming Languages
              </h3>
              <div className="flex flex-wrap gap-2 text-sm font-medium">
                {["Python", "Typescript", "C++", "Java"].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-slate-100 px-3 py-1 text-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-heading text-xl font-bold uppercase text-slate-900">
                DevOps
              </h3>
              <div className="flex flex-wrap gap-2 text-sm font-medium">
                {["Git", "Linux"].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-slate-100 px-3 py-1 text-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-heading text-xl font-bold uppercase text-slate-900">
                Languages
              </h3>
              <div className="flex flex-wrap gap-2 text-sm font-medium">
                {["English (Native)", "Thai (Conversational)"].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-slate-100 px-3 py-1 text-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-heading text-xl font-bold uppercase text-slate-900">
                Hardware & Other
              </h3>
              <div className="flex flex-wrap gap-2 text-sm font-medium">
                {[
                  "3D Printing",
                  "Soldering",
                  "Crimping",
                  "AI API Agents",
                  "Prompt Engineering",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-slate-100 px-3 py-1 text-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. Projects and Coursework Section (Partial replace starting at Freelance) */}
        <section id="projects" className="flex flex-col justify-center py-20">
          <h2 className="mb-12 font-heading text-5xl font-bold uppercase tracking-tight text-slate-900">
            Projects & Coursework
          </h2>

          <div className="mb-10">
            <h3 className="mb-8 border-b border-slate-200 pb-2 font-heading text-2xl font-bold uppercase text-slate-900">
              Freelance & Personal
            </h3>

            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:pr-12">
              <div className="md:w-3/4">
                <h4 className="mb-2 font-heading text-xl font-bold uppercase text-slate-900">
                  Sunnymind
                </h4>
                <p className="text-justify text-base font-light leading-relaxed text-slate-600">
                  Implemented a full-stack website to collect and assess the
                  mental health of NUS students as part of a nursing student's
                  thesis project. The platform features a survey evaluating
                  mental health status using standardized metrics (DASS-21,
                  GAD-7, and PHQ-9). Developed an AI chatbot using the Gemini
                  API to provide tailored mental health advice, alongside a
                  curated video library for meditation and stress management.
                  Engineered the system for secure, anonymous data collection in
                  strict compliance with NUS PDPA guidelines. The stack utilized
                  Typescript, React Native/Expo, PostgreSQL, and Supabase for
                  backend integration.
                </p>
              </div>
              <div className="mt-2 whitespace-nowrap font-medium text-teal-600 md:mt-0 md:text-right">
                2025
              </div>
            </div>

            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:pr-12">
              <div className="md:w-3/4">
                <h4 className="mb-2 font-heading text-xl font-bold uppercase text-slate-900">
                  Impact Experience
                </h4>
                <p className="text-justify text-base font-light leading-relaxed text-slate-600">
                  As part of the NUSC programme, I collaborated within a team of
                  6 over two years to investigate environmental and systemic
                  issues in a low-income area called the Kali Code Community,
                  located beside the Code River. We conducted independent
                  fieldwork—interviewing locals, researching regional solutions,
                  surveying responses, and meeting stakeholders and politicians.
                  Identifying extensive plastic trash collection issues stemming
                  from systemic factors, a teammate and I built the{" "}
                  <a
                    href="https://github.com/Reiten966/Polyformer"
                    className="text-teal-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Polyformer
                  </a>{" "}
                  from scratch as a prototype. This device helps the community
                  recycle by melting plastic waste into filaments to be upselled
                  to makers' studios or universities. Through this, I developed
                  strong hardware skills in 3D printing, crimping, wiring,
                  assembly methods, soldering, and embedded electronics.
                </p>
              </div>
              <div className="mt-2 whitespace-nowrap font-medium text-teal-600 md:mt-0 md:text-right">
                2025 - 2027
              </div>
            </div>
          </div>

          <div className="mb-14">
            <h3 className="mb-8 border-b border-slate-200 pb-2 font-heading text-2xl font-bold uppercase text-slate-900">
              Course-Related Projects
            </h3>

            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:pr-12">
              <div className="md:w-3/4">
                <h4 className="mb-2 font-heading text-xl font-bold uppercase text-slate-900">
                  CG1111 - Engineering Principles and Practice I
                </h4>
                <p className="text-justify text-base font-light leading-relaxed text-slate-600">
                  For this module, my team of three engineered an autonomous
                  maze-solving robot using Arduino C++ built upon a baseline
                  mBot chassis. The challenge was to navigate a complex maze
                  without wall collisions and automatically execute specific
                  maneuvers upon detecting distinct floor colors. I implemented
                  a Proportional-Integral-Derivative (PID) control loop for
                  precise, drift-free locomotion and integrated
                  custom-calibrated IR sensors on a breadboard for accurate
                  distance measurement. The most difficult implementation was
                  the color detection system; I developed a custom sequential
                  flashing routine that mapped reflected light intensity into a
                  3D RGB vector space, utilizing 3D Euclidean distance math to
                  reliably classify floor colors and trigger state-machine
                  interrupts.
                </p>
              </div>
              <div className="mt-2 whitespace-nowrap font-medium text-teal-600 md:mt-0 md:text-right">
                2025
              </div>
            </div>

            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:pr-12">
              <div className="md:w-3/4">
                <h4 className="mb-2 font-heading text-xl font-bold uppercase text-slate-900">
                  CG2111 - Engineering Principles and Practice II
                </h4>
                <p className="text-justify text-base font-light leading-relaxed text-slate-600">
                  Working in a team of three, we developed a remote-controlled
                  Lidar-mapping robot to simulate a high-stakes
                  search-and-rescue mission in zero-visibility, unknown terrain.
                  The problem required the operator to navigate the robot from a
                  separate room, map an obstacle-filled environment, and
                  retrieve designated targets using a custom-engineered
                  mechanical claw. Using PySlam, a simplified form of
                  Simultaneous Localization and Mapping (SLAM), we were able to
                  navigate "blind," by mapping the terrain and controlling the
                  robot using the command line, successfully retrieve targets
                  and mapping out the entire environment
                </p>
              </div>
              <div className="mt-2 whitespace-nowrap font-medium text-teal-600 md:mt-0 md:text-right">
                2025
              </div>
            </div>

            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:pr-12">
              <div className="md:w-3/4">
                <h4 className="mb-2 font-heading text-xl font-bold uppercase text-slate-900">
                  EE2026 - Digital Design
                </h4>
                <p className="text-justify text-base font-light leading-relaxed text-slate-600">
                  In this course focusing on digital logic and hardware
                  description languages, I designed and implemented a fully
                  functional hardware calculator on a Basys 3 FPGA. The problem
                  required building a complex, modular logic system capable of
                  robust arithmetic operations and user I/O without relying on
                  sequential software or a traditional microcontroller. Using
                  Verilog HDL, I engineered a pipelined Arithmetic Logic Unit
                  (ALU) supporting fixed-point multiplication, division, and
                  exponentiation. A major technical hurdle was managing strict
                  hardware timing constraints and concurrency, which I resolved
                  by implementing Block RAM (BRAM) memory management and a
                  custom handshake protocol to seamlessly integrate the input
                  streaming system with OLED display outputs.
                </p>
              </div>
              <div className="mt-2 whitespace-nowrap font-medium text-teal-600 md:mt-0 md:text-right">
                2025
              </div>
            </div>

            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:pr-12">
              <div className="md:w-3/4">
                <h4 className="mb-2 font-heading text-xl font-bold uppercase text-slate-900">
                  CG2271 - Real-Time Operating Systems
                </h4>
                <p className="text-justify text-base font-light leading-relaxed text-slate-600">
                  For this course, our team developed an IoT-enabled smart
                  laundry monitoring system to alert residents of unpredictable
                  rain or high humidity. The problem required processing
                  real-time environmental data locally while pushing remote
                  alerts to a user's phone. Using FreeRTOS, I distributed the
                  system across an ESP32 and an MCXC444 microcontroller. A
                  significant technical challenge was ensuring reliable UART
                  communication while simultaneously handling network requests;
                  I solved this by leveraging the ESP32's dual-core
                  architecture—isolating sensor polling on Core 1 and
                  Wi-Fi/Telegram API operations on Core 0 using Mutexes. On the
                  MCXC444, I bypassed resource-heavy polling by implementing
                  deferred interrupt processing via FreeRTOS binary semaphores
                  and prioritized queues, ensuring flawless packet transmission
                  via a custom 0xAA sync-byte protocol.
                </p>
              </div>
              <div className="mt-2 whitespace-nowrap font-medium text-teal-600 md:mt-0 md:text-right">
                2026
              </div>
            </div>

            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:pr-12">
              <div className="md:w-3/4">
                <h4 className="mb-2 font-heading text-xl font-bold uppercase text-slate-900">
                  CS2113 - Software Engineering & Object-Oriented Programming
                </h4>
                <p className="text-justify text-base font-light leading-relaxed text-slate-600">
                  Working in a team of two, I developed "Ledger67," a
                  comprehensive command-line double-entry accounting system
                  written in Java 17. The project aimed to help individuals and
                  small businesses manage financial transactions efficiently
                  while strictly enforcing the fundamental accounting equation
                  (Assets = Liabilities + Equity). I engineered a hierarchical
                  account parsing system (e.g., Assets:Bank:DBS), regex-based
                  data filtering, and managed issues on Github. A key technical
                  challenge was architecting validation system that
                  mathematically verifies multi-posting transactions upon input,
                  handles dynamic UI-assisted CLI prompts, and managing the Git
                  and GitOps for the team.
                </p>
              </div>
              <div className="mt-2 whitespace-nowrap font-medium text-teal-600 md:mt-0 md:text-right">
                2026
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-8 border-b border-slate-200 pb-2 font-heading text-2xl font-bold uppercase text-slate-900">
              Research Essays
            </h3>

            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:pr-12">
              <div className="md:w-3/4">
                <h4 className="mb-2 font-heading text-xl font-bold uppercase text-slate-900">
                  NGT - Global Thinking
                </h4>
                <p className="text-justify text-base font-light leading-relaxed text-slate-600">
                  I researched an extensive presentation on how orientalism is
                  still present in the norms of American culture, pulling from
                  contemporary examples and explaining the changes in the forms
                  it now inhabit. I argued that it became more insidious, hiding
                  behind the veil of being 'American' while reinforcing the
                  norms of white America while alienating other cultures like
                  Asians.
                </p>
              </div>
              <div className="mt-2 whitespace-nowrap font-medium text-teal-600 md:mt-0 md:text-right">
                2025
              </div>
            </div>

            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:pr-12">
              <div className="md:w-3/4">
                <h4 className="mb-2 font-heading text-xl font-bold uppercase text-slate-900">
                  NTW - Thinking and Writing
                </h4>
                <p className="text-justify text-base font-light leading-relaxed text-slate-600">
                  I researched a 3000-word academic paper investigating the
                  ethics of different types of taxation. Examples include land
                  tax, wealth tax, GST tax. I performed close review of relevant
                  land taxation laws and the history behind them, as implemented
                  in European countries (Brown & Hepworth, 2002). Comparative
                  insights were also derived from other countries with robust
                  land taxation systems, outside Europe. My study also took a
                  close look at Nozick’s literature to evaluate land taxation,
                  using the key principles in his entitlement theory of justice.
                  Moreover, I also evaluated the practical validity of these
                  policies.
                </p>
              </div>
              <div className="mt-2 whitespace-nowrap font-medium text-teal-600 md:mt-0 md:text-right">
                2025
              </div>
            </div>

            <div className="flex flex-col justify-between gap-4 md:flex-row md:pr-12">
              <div className="md:w-3/4">
                <h4 className="mb-2 font-heading text-xl font-bold uppercase text-slate-900">
                  GEX - Global Perspectives
                </h4>
                <p className="text-justify text-base font-light leading-relaxed text-slate-600">
                  GEX is an NUSC exclusive program where students embark on a
                  month-long overseas learning journey. I went to China,
                  visiting Shanghia, Hangzhou, Tianjing and Beijing. In that
                  time, I visited many companies and organisations including
                  Tencent, Alibaba, Sanhua and HengTong. I was gifted with the
                  opportunity to learn and be immersed in a different world and
                  culture. My end project was a 3000-word essay on technological
                  development and culture in China and my predictions for the
                  coming future, primarily focusing on artificial intelligence,
                  predictive algorithms and their potential impact on society.
                </p>
              </div>
              <div className="mt-2 whitespace-nowrap font-medium text-teal-600 md:mt-0 md:text-right">
                2025
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
