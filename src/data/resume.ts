import { Education, Experience, Skill } from "@/types";

export const educations: Education[] = [
  {
    id: "edu-01",
    school: "연세대학교",
    degree: "학사",
    major: "경영학과",
    period: "2006.03 — 2010.02",
    description: "재무·회계 심화 전공, 경영전략 우수논문상 수상",
  },
  {
    id: "edu-02",
    school: "CFA Institute",
    degree: "자격증",
    major: "CFA (공인재무분석사) Level III 취득",
    period: "2013",
    description: "기업가치평가·포트폴리오 관리·재무분석 전 영역 합격",
  },
  {
    id: "edu-03",
    school: "서울대학교 대학원",
    degree: "석사",
    major: "경영학과 (재무관리 전공)",
    period: "2018.03 — 2020.02",
    description: "M&A 시너지 효과와 기업가치 변동에 관한 실증 연구",
  },
];

export const experiences: Experience[] = [
  {
    id: "exp-01",
    company: "글로벌 전략컨설팅 A사",
    role: "시니어 M&A 어드바이저",
    period: "2020.03 — 현재",
    description: [
      "중견·대기업 대상 M&A 자문 및 기업 구조개편 전략 수립 (누적 거래 규모 1조 원+)",
      "Cross-border 딜 8건 리드: 실사(Due Diligence), 가치평가, 협상 전략 전반 총괄",
      "PMI(인수 후 통합) 로드맵 설계 및 100일 플랜 실행 지원",
      "주니어 컨설턴트 6명 멘토링 및 팀 역량 강화 프로그램 운영",
    ],
    current: true,
  },
  {
    id: "exp-02",
    company: "국내 사모펀드 B사",
    role: "투자심사역 (Investment Associate)",
    period: "2015.07 — 2020.02",
    description: [
      "바이아웃·그로스 투자 딜소싱 및 투자심사 보고서 작성",
      "LBO 모델링·DCF 분석을 통한 포트폴리오 기업 가치평가",
      "구조개편 대상 기업 재무·운영 효율화 과제 도출 및 실행 모니터링",
      "투자 포트폴리오 5개사 이사회 옵저버로 참여, Exit 2건 성공(IPO·전략적 매각)",
    ],
    current: false,
  },
  {
    id: "exp-03",
    company: "대형 투자은행 C사",
    role: "재무 애널리스트",
    period: "2010.03 — 2015.06",
    description: [
      "기업금융(ECM·DCM) 딜 지원: IPO, 유상증자, 회사채 발행 업무",
      "산업별 리서치 및 피어 컴퍼니 분석 보고서 작성",
      "M&A 자문팀 협업 — 인수 타깃 스크리닝·재무 모델 구축",
    ],
    current: false,
  },
];

export const skills: Skill[] = [
  // 재무 분석
  { name: "기업가치평가(DCF·LBO)", category: "finance" },
  { name: "재무모델링", category: "finance" },
  { name: "포트폴리오 관리", category: "finance" },
  { name: "M&A 실사(DD)", category: "finance" },
  // 전략
  { name: "구조개편 전략", category: "strategy" },
  { name: "PMI 설계", category: "strategy" },
  { name: "딜소싱·협상", category: "strategy" },
  { name: "사업계획 수립", category: "strategy" },
  // 도구
  { name: "Excel / VBA", category: "tool" },
  { name: "Bloomberg Terminal", category: "tool" },
  { name: "Capital IQ", category: "tool" },
  { name: "PowerPoint", category: "tool" },
  // 법률·규제
  { name: "계약 검토", category: "legal" },
  { name: "공시·규제 대응", category: "legal" },
];
