import { Experience, Skill } from "@/types";

export const experiences: Experience[] = [
  {
    id: "exp-01",
    company: "회사명",
    role: "직함",
    period: "2023.01 — 현재",
    description: [
      "주요 업무 내용을 간략히 작성합니다.",
      "성과나 사용 기술을 명시합니다.",
      "팀 규모나 프로젝트 규모를 언급합니다.",
    ],
    current: true,
  },
  {
    id: "exp-02",
    company: "이전 회사명",
    role: "직함",
    period: "2021.03 — 2022.12",
    description: [
      "주요 업무 내용을 간략히 작성합니다.",
      "성과나 사용 기술을 명시합니다.",
    ],
    current: false,
  },
];

export const skills: Skill[] = [
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "HTML/CSS", category: "frontend" },
  { name: "JavaScript", category: "frontend" },
  { name: "Figma", category: "design" },
  { name: "Tailwind CSS", category: "design" },
  { name: "Git", category: "tool" },
  { name: "GitHub", category: "tool" },
  { name: "Vercel", category: "tool" },
];
