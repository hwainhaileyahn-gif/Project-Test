// ─── Types ────────────────────────────────────────────────────────────────────

export interface ApplyOption {
  publisher: string
  apply_link: string
  is_direct: boolean
}

export interface JobHighlights {
  Qualifications?: string[]
  Benefits?: string[]
  Responsibilities?: string[]
}

export interface EmployerReview {
  publisher: string
  employer_name: string
  score: number
  num_stars: number
  review_count: number
  max_score: number
  reviews_link: string
}

export interface EducationRequired {
  level: string | null
  field: string | null
}

export interface JobDetail {
  job_id: string
  job_title: string
  employer_name: string
  employer_logo: string | null
  employer_website: string | null
  job_publisher: string
  job_employment_type: string
  job_employment_types: string[]
  job_apply_link: string
  job_apply_is_direct: boolean
  apply_options: ApplyOption[]
  job_description: string
  job_is_remote: boolean | null
  job_posted_at: string
  job_posted_at_timestamp: number
  job_posted_at_datetime_utc: string
  job_location: string
  job_city: string
  job_state: string
  job_country: string
  job_latitude: number
  job_longitude: number
  job_benefits: string[] | null
  job_google_link: string
  job_min_salary: number | null
  job_max_salary: number | null
  job_salary_period: string | null
  job_highlights: JobHighlights
  job_onet_soc: string
  job_onet_job_zone: string
  employer_reviews: EmployerReview[]
  work_arrangement: string | null
  seniority_level: string | null
  required_experience_years: number | null
  education_required: EducationRequired
  visa_sponsorship: boolean | null
  relocation_required: boolean | null
  relocation_assistance: boolean | null
  required_technologies: string[]
  preferred_technologies: string[]
  methodologies: string[]
  industry: string
  job_function: string
  has_management_responsibilities: boolean
  ai_ml_involved: boolean
  benefits_extended: string[]
  soft_skills: string[]
}

export interface JobSearchParams {
  query: string
  page?: number
  num_pages?: number
  country?: string
  language?: string
  date_posted?: 'all' | 'today' | '3days' | 'week' | 'month'
  work_from_home?: boolean
  employment_types?: string
  job_requirements?: string
}

export interface JobSearchResponse {
  status: string
  request_id: string
  parameters: Record<string, unknown>
  data: JobDetail[]
}

export interface JobDetailsResponse {
  status: string
  request_id: string
  parameters: Record<string, unknown>
  data: JobDetail[]
}

// ─── Client ───────────────────────────────────────────────────────────────────

const BASE_URL = 'https://jsearch.p.rapidapi.com'

function getHeaders() {
  const key = process.env.RAPIDAPI_KEY
  if (!key) throw new Error('RAPIDAPI_KEY 환경 변수가 설정되지 않았습니다.')
  return {
    'Content-Type': 'application/json',
    'x-rapidapi-host': 'jsearch.p.rapidapi.com',
    'x-rapidapi-key': key,
  }
}

export async function searchJobs(params: JobSearchParams): Promise<JobSearchResponse> {
  const query = new URLSearchParams()
  query.set('query', params.query)
  if (params.page !== undefined) query.set('page', String(params.page))
  if (params.num_pages !== undefined) query.set('num_pages', String(params.num_pages))
  if (params.country) query.set('country', params.country)
  if (params.language) query.set('language', params.language)
  if (params.date_posted) query.set('date_posted', params.date_posted)
  if (params.work_from_home !== undefined) query.set('work_from_home', String(params.work_from_home))
  if (params.employment_types) query.set('employment_types', params.employment_types)
  if (params.job_requirements) query.set('job_requirements', params.job_requirements)

  const res = await fetch(`${BASE_URL}/search?${query}`, {
    headers: getHeaders(),
    next: { revalidate: 3600 }, // 1시간 캐시 (무료 플랜 요청 절약)
  })

  if (!res.ok) {
    throw new Error(`JSearch API 오류: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

export async function getJobDetails(
  jobId: string,
  options: { country?: string; language?: string } = {}
): Promise<JobDetailsResponse> {
  const query = new URLSearchParams({ job_id: jobId })
  if (options.country) query.set('country', options.country)
  if (options.language) query.set('language', options.language)

  const res = await fetch(`${BASE_URL}/job-details?${query}`, {
    headers: getHeaders(),
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    throw new Error(`JSearch API 오류: ${res.status} ${res.statusText}`)
  }

  return res.json()
}
