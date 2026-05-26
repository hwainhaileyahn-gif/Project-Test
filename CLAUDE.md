# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hailey의 개인 포트폴리오 웹사이트입니다. 투자/구조개편 전문가로서의 경력, 프로젝트, 연락처를 담은 싱글 페이지 사이트입니다.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (`@theme` 블록으로 커스텀 토큰 정의, `tailwind.config.ts` 없음)
- **Font**: Inter (`next/font/google`)
- **Utilities**: clsx + tailwind-merge (`src/lib/utils.ts`의 `cn()`)

## Development

```bash
npm run dev      # 개발 서버 http://localhost:3000
npm run build    # 프로덕션 빌드
npm run lint     # ESLint
```

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Tailwind v4 @theme 토큰 (색상, 폰트, 애니메이션)
│   ├── layout.tsx           # 루트 레이아웃 (메타데이터, Navbar, Footer)
│   └── page.tsx             # 4개 섹션 조합
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       # 고정 상단 nav (모바일 햄버거 포함)
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx         # 소개 섹션 (id="about")
│   │   ├── Projects.tsx     # 프로젝트 그리드 (id="projects")
│   │   ├── Resume.tsx       # 경력 타임라인 + 스킬 (id="resume")
│   │   └── Contact.tsx      # 연락처 (id="contact")
│   └── ui/
│       ├── ProjectCard.tsx
│       ├── TimelineItem.tsx
│       ├── SkillBadge.tsx
│       └── SectionHeader.tsx
├── data/
│   ├── projects.ts          # 프로젝트 데이터 (여기서 수정)
│   └── resume.ts            # 경력 + 스킬 데이터 (여기서 수정)
├── types/index.ts           # Project, Experience, Skill 인터페이스
└── lib/utils.ts             # cn() 헬퍼
```

## Content Editing

실제 콘텐츠를 수정할 때는 아래 파일만 편집하면 됩니다:

- **프로젝트 추가/수정**: `src/data/projects.ts`
- **경력/스킬 수정**: `src/data/resume.ts`
- **자기소개 문구**: `src/components/sections/Hero.tsx`
- **프로필 사진**: `public/profile.jpg` 에 파일 추가 후 Hero.tsx의 `<img>` 태그 연결

## Design Tokens (globals.css)

| 토큰 | 값 | 용도 |
|---|---|---|
| `--color-accent` | `#4f6ef7` | 버튼, 링크, 강조 |
| `--color-accent-light` | `#eef1ff` | 뱃지 배경 |
| `--color-neutral-900` | `#111111` | 헤딩 |
| `--color-neutral-600` | `#525252` | 본문 |

## Deployment

Vercel 배포 권장. `main` 브랜치 push 시 자동 재배포.
