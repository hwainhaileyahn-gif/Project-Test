# JSearch Job API 연동 스펙

> **Provider**: [RapidAPI — JSearch](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch)  
> **Base URL**: `https://jsearch.p.rapidapi.com`

---

## 인증

모든 요청에 아래 헤더를 포함해야 합니다.

| 헤더 | 값 |
|---|---|
| `x-rapidapi-host` | `jsearch.p.rapidapi.com` |
| `x-rapidapi-key` | 환경 변수 `RAPIDAPI_KEY` 사용 (절대 코드에 하드코딩 금지) |
| `Content-Type` | `application/json` |

`.env.local` 및 Vercel 환경 변수에 아래 키를 설정합니다:

```env
RAPIDAPI_KEY=your_api_key_here
```

---

## 엔드포인트 목록

| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/search` | 키워드로 채용 공고 검색 |
| GET | `/job-details` | 특정 채용 공고 상세 조회 |
| GET | `/estimated-salary` | 직종별 예상 연봉 조회 |
| GET | `/search-filters` | 검색 필터 옵션 목록 조회 |

---

## 1. 채용 공고 상세 조회

### `GET /job-details`

특정 `job_id`에 해당하는 채용 공고의 전체 정보를 반환합니다.

#### 요청 파라미터

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `job_id` | string | ✅ | 채용 공고 고유 ID |
| `country` | string | ❌ | 국가 코드 (기본값: `us`). 예: `kr`, `us`, `gb` |
| `language` | string | ❌ | 응답 언어 코드. 예: `en`, `ko` |

#### 요청 예시

```bash
curl --request GET \
  --url 'https://jsearch.p.rapidapi.com/job-details?job_id=qIsPjUMr0Em0hqHoAAAAAA%3D%3D&country=us' \
  --header 'Content-Type: application/json' \
  --header 'x-rapidapi-host: jsearch.p.rapidapi.com' \
  --header 'x-rapidapi-key: $RAPIDAPI_KEY'
```

#### 응답 스키마

```typescript
interface JobDetailsResponse {
  status: string           // "OK" | "ERROR"
  request_id: string       // 요청 추적 ID
  parameters: {
    job_id: string
    country: string
    language: string
  }
  data: JobDetail[]        // 보통 1개 아이템
}
```

---

## 데이터 모델

### `JobDetail`

| 필드 | 타입 | 설명 |
|---|---|---|
| `job_id` | string | 채용 공고 고유 ID |
| `job_title` | string | 직무 제목 |
| `employer_name` | string | 회사명 |
| `employer_logo` | string \| null | 회사 로고 이미지 URL |
| `employer_website` | string \| null | 회사 웹사이트 URL |
| `job_publisher` | string | 공고 출처 (예: LinkedIn, Indeed) |
| `job_employment_type` | string | 고용 형태 (예: `FULLTIME`, `PARTTIME`, `CONTRACTOR`) |
| `job_employment_types` | string[] | 고용 형태 목록 |
| `job_apply_link` | string | 지원 링크 URL |
| `job_apply_is_direct` | boolean | 직접 지원 가능 여부 |
| `apply_options` | ApplyOption[] | 지원 경로 목록 |
| `job_description` | string | 채용 공고 전문 (HTML 포함 가능) |
| `job_is_remote` | boolean \| null | 원격 근무 여부 |
| `job_posted_at` | string | 게시 날짜 (자연어) |
| `job_posted_at_timestamp` | number | 게시 시각 (Unix timestamp) |
| `job_posted_at_datetime_utc` | string | 게시 시각 (ISO 8601 UTC) |
| `job_location` | string | 근무지 (전체 형식) |
| `job_city` | string | 도시 |
| `job_state` | string | 주/도 |
| `job_country` | string | 국가 코드 |
| `job_latitude` | number | 위도 |
| `job_longitude` | number | 경도 |
| `job_benefits` | string[] \| null | 복리후생 목록 |
| `job_google_link` | string | Google 검색 링크 |
| `job_min_salary` | number \| null | 최소 연봉 |
| `job_max_salary` | number \| null | 최대 연봉 |
| `job_salary_period` | string \| null | 급여 기간 (예: `YEAR`, `MONTH`, `HOUR`) |
| `job_highlights` | JobHighlights | 자격요건·혜택·주요 업무 요약 |
| `job_onet_soc` | string | O*NET 직업 코드 |
| `job_onet_job_zone` | string | O*NET 직업 Zone (1~5) |
| `employer_reviews` | EmployerReview[] | 회사 리뷰 (Glassdoor 등) |
| `work_arrangement` | string \| null | 근무 형태 (예: `REMOTE`, `HYBRID`, `ONSITE`) |
| `seniority_level` | string \| null | 시니어리티 (예: `Entry level`, `Mid-Senior level`) |
| `required_experience_years` | number \| null | 요구 경력 연수 |
| `education_required` | EducationRequired | 요구 학력 |
| `visa_sponsorship` | boolean \| null | 비자 스폰서십 여부 |
| `relocation_required` | boolean \| null | 이전 필요 여부 |
| `relocation_assistance` | boolean \| null | 이전 지원 여부 |
| `required_technologies` | string[] | 필수 기술 스택 |
| `preferred_technologies` | string[] | 우대 기술 스택 |
| `methodologies` | string[] | 개발 방법론 (예: Agile, Scrum) |
| `industry` | string | 산업군 |
| `job_function` | string | 직무 기능 분류 |
| `has_management_responsibilities` | boolean | 관리직 여부 |
| `ai_ml_involved` | boolean | AI/ML 관련 직무 여부 |
| `benefits_extended` | string[] | 상세 복리후생 목록 |
| `soft_skills` | string[] | 소프트 스킬 목록 |

---

### 중첩 타입

#### `ApplyOption`

```typescript
interface ApplyOption {
  publisher: string     // 지원 플랫폼명
  apply_link: string    // 지원 URL
  is_direct: boolean    // 직접 지원 여부
}
```

#### `JobHighlights`

```typescript
interface JobHighlights {
  Qualifications?: string[]    // 자격요건
  Benefits?: string[]          // 혜택
  Responsibilities?: string[]  // 주요 업무
}
```

#### `EmployerReview`

```typescript
interface EmployerReview {
  publisher: string       // 리뷰 플랫폼 (예: Glassdoor)
  employer_name: string
  score: number           // 평점 (0.0 ~ max_score)
  num_stars: number       // 별점 (0.0 ~ 5.0)
  review_count: number    // 리뷰 수
  max_score: number       // 최대 점수
  reviews_link: string    // 리뷰 페이지 URL
}
```

#### `EducationRequired`

```typescript
interface EducationRequired {
  level: string | null   // 학력 수준 (예: "Bachelor's Degree")
  field: string | null   // 전공 분야
}
```

---

## 2. 채용 공고 검색

### `GET /search`

키워드 기반으로 채용 공고를 검색합니다.

#### 요청 파라미터

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `query` | string | ✅ | 검색어. 예: `"Software Engineer in Seoul"` |
| `page` | number | ❌ | 페이지 번호 (기본값: `1`) |
| `num_pages` | number | ❌ | 반환 페이지 수 (기본값: `1`, 최대: `20`) |
| `country` | string | ❌ | 국가 코드 (기본값: `us`) |
| `language` | string | ❌ | 응답 언어 |
| `date_posted` | string | ❌ | 게시 기간 필터: `all` \| `today` \| `3days` \| `week` \| `month` |
| `work_from_home` | boolean | ❌ | 원격 근무 필터 |
| `employment_types` | string | ❌ | 고용 형태: `FULLTIME,PARTTIME,CONTRACTOR,INTERN` |
| `job_requirements` | string | ❌ | 경력 요건: `no_degree,under_3_years_experience,more_than_3_years_experience` |

#### 요청 예시

```bash
curl --request GET \
  --url 'https://jsearch.p.rapidapi.com/search?query=M%26A+Analyst+in+Seoul&country=kr&page=1&num_pages=1' \
  --header 'x-rapidapi-host: jsearch.p.rapidapi.com' \
  --header 'x-rapidapi-key: $RAPIDAPI_KEY'
```

#### 응답 스키마

```typescript
interface JobSearchResponse {
  status: string
  request_id: string
  parameters: {
    query: string
    page: number
    num_pages: number
    country: string
    language: string
  }
  data: JobDetail[]
}
```

---

## Next.js 연동 가이드

### API Route 구현 위치

```
src/app/api/
  jobs/
    search/route.ts      # GET /api/jobs/search?query=...
    [id]/route.ts        # GET /api/jobs/:id
```

### 공통 fetch 유틸리티 위치

```
src/lib/
  jsearch.ts             # JSearch API 클라이언트
```

### 환경 변수

| 키 | 설명 |
|---|---|
| `RAPIDAPI_KEY` | RapidAPI 발급 API 키 |

### 구현 시 주의사항

1. `RAPIDAPI_KEY`는 **서버 사이드 전용** — `NEXT_PUBLIC_` 접두사를 붙이지 않습니다
2. API Route(`route.ts`)를 통해서만 호출하여 키를 클라이언트에 노출하지 않습니다
3. JSearch 무료 플랜은 **월 200회** 요청 제한이 있습니다 — 필요 시 캐싱을 적용합니다
4. `job_description`은 HTML이 포함될 수 있어 렌더링 시 `dangerouslySetInnerHTML` 또는 sanitize 처리가 필요합니다
5. `job_min_salary` / `job_max_salary`는 `null`일 수 있으므로 항상 nullish 처리합니다

---

## 응답 상태 코드

| HTTP 코드 | 의미 |
|---|---|
| 200 | 성공 |
| 400 | 잘못된 요청 파라미터 |
| 401 | 인증 실패 (API 키 오류) |
| 429 | 요청 한도 초과 (Rate Limit) |
| 500 | JSearch 서버 오류 |

---

*최초 작성: 2026-06-04*
