import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "project-01",
    title: "포트폴리오 웹사이트",
    description:
      "Next.js와 TypeScript로 제작한 개인 포트폴리오 사이트입니다. 미니멀한 디자인과 반응형 레이아웃을 적용했습니다.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    imageUrl: "",
    liveUrl: "",
    githubUrl: "https://github.com/hwainhaileyahn-gif/Project-Test",
    featured: true,
  },
  {
    id: "project-02",
    title: "프로젝트 이름",
    description:
      "프로젝트에 대한 간략한 설명을 작성해주세요. 어떤 문제를 해결했는지, 어떤 기술을 사용했는지 서술합니다.",
    tags: ["React", "JavaScript"],
    imageUrl: "",
    liveUrl: "",
    githubUrl: "",
    featured: true,
  },
  {
    id: "project-03",
    title: "프로젝트 이름",
    description:
      "프로젝트에 대한 간략한 설명을 작성해주세요. 어떤 문제를 해결했는지, 어떤 기술을 사용했는지 서술합니다.",
    tags: ["Figma", "UI/UX"],
    imageUrl: "",
    liveUrl: "",
    githubUrl: "",
    featured: true,
  },
];
