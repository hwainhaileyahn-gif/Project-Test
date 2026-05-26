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

## Database (Supabase + Drizzle ORM)

### ⚠️ DB 작업 전 반드시 확인할 파일

| 파일 | 역할 |
|---|---|
| `docs/db/erd.md` | **ERD 및 테이블 설계 문서** — 스키마 변경 전 여기서 구조 파악 |
| `drizzle/schema.ts` | Drizzle 스키마 정의 — 테이블 추가/수정 시 이 파일을 수정 |
| `drizzle.config.ts` | Drizzle Kit 설정 |
| `src/lib/db.ts` | DB 클라이언트 (서버 컴포넌트·Server Actions에서 import) |

### DB 작업 규칙

1. **스키마 변경** 시 `drizzle/schema.ts` 수정 → `npm run db:push` (개발) 또는 `npm run db:generate` + `npm run db:migrate` (프로덕션)
2. **ERD 변경** 시 `docs/db/erd.md`의 Mermaid 다이어그램도 함께 업데이트
3. `ended_at IS NULL` = 현재 재직 중 / 재학 중으로 처리 (`is_current` 컬럼 없음)
4. 모든 테이블에 `sort_order` 컬럼이 있으므로 프론트엔드 표시 순서는 이 값으로 제어

### DB 명령어

```bash
npm run db:push       # 스키마를 DB에 즉시 반영 (개발용)
npm run db:generate   # 마이그레이션 파일 생성
npm run db:migrate    # 마이그레이션 실행
npm run db:studio     # Drizzle Studio GUI 실행
```

### 테이블 목록

| 테이블 | 설명 |
|---|---|
| `experiences` | 경력 (입사일·퇴사일 포함) |
| `experience_descriptions` | 경력 상세 설명 (1:N) |
| `educations` | 학력 |
| `skills` | 핵심 역량 |
| `projects` | 프로젝트 |
| `project_tags` | 프로젝트 태그 (1:N) |

## Deployment

Vercel 배포 권장. `main` 브랜치 push 시 자동 재배포.
