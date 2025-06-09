// src/helpers/Skills.ts
export interface Skill {
  icon: string;
  title: string;
  desc: string;
  proficiency: number; // Added to match the data
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

const skills: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        title: "JavaScript",
        desc: "Core Language for Web Development (Frontend & Backend)",
        proficiency: 95,
      },
      {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        title: "TypeScript",
        desc: "JavaScript with Static Typing",
        proficiency: 85,
      },
      {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        title: "React.js",
        desc: "Library for Building User Interfaces",
        proficiency: 80,
      },
      {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        title: "Next.js",
        desc: "React Framework for Full-Stack Development",
        proficiency: 80,
      },
      {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        title: "HTML",
        desc: "Markup Language for Web Pages",
        proficiency: 95,
      },
      {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        title: "CSS",
        desc: "Styling and Layout for Web Pages",
        proficiency: 90,
      },
      {
        icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
        title: "Tailwind CSS",
        desc: "Utility-First CSS Framework",
        proficiency: 75,
      },
    ],
  },
  {
    category: "Backend",
    skills: [
      {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        title: "Node.js",
        desc: "JavaScript Runtime for Backend Development",
        proficiency: 40,
      },
    ],
  },
  {
    category: "Tools",
    skills: [
      {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        title: "Git",
        desc: "Distributed Version Control System",
        proficiency: 85,
      },
      {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        title: "GitHub",
        desc: "Code Hosting and Collaboration Platform",
        proficiency: 85,
      },
      {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        title: "Figma",
        desc: "Collaborative UI/UX Design Tool",
        proficiency: 50,
      },
      {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg",
        title: "Vite",
        desc: "Frontend Build Tool and Dev Server",
        proficiency: 75,
      },
    ],
  },
  {
    category: "Mobile",
    skills: [
      {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
        title: "Dart",
        desc: "Language for Flutter App Development",
        proficiency: 65,
      },
      {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
        title: "Flutter",
        desc: "UI Toolkit for Cross-Platform Apps",
        proficiency: 65,
      },
      {
        icon: "https://static.expo.dev/static/brand/app-icon-512x512.png",
        title: "Expo",
        desc: "Framework for Building React Native Apps",
        proficiency: 65,
      },
    ],
  },
  {
    category: "Programming Languages",
    skills: [
      {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
        title: "C",
        desc: "Procedural, Low-Level Programming Language",
        proficiency: 70,
      },
    ],
  },
];

export default skills;