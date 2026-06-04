import { JobDetail } from '@/lib/jsearch'

const EMP_TYPE_LABEL: Record<string, string> = {
  FULLTIME: '정규직',
  PARTTIME: '파트타임',
  CONTRACTOR: '계약직',
  INTERN: '인턴',
}

const WORK_ARR_LABEL: Record<string, string> = {
  REMOTE: '원격',
  HYBRID: '하이브리드',
  ONSITE: '오피스',
}

function relativeDate(utc: string) {
  const days = Math.floor((Date.now() - new Date(utc).getTime()) / 86_400_000)
  if (days === 0) return '오늘'
  if (days < 7) return `${days}일 전`
  if (days < 30) return `${Math.floor(days / 7)}주 전`
  return `${Math.floor(days / 30)}개월 전`
}

function fmtSalary(min: number | null, max: number | null, period: string | null) {
  if (!min && !max) return null
  const k = (n: number) => `$${Math.round(n / 1000)}k`
  const range =
    min && max ? `${k(min)} – ${k(max)}` : min ? `${k(min)}+` : `~${k(max!)}`
  const suffix =
    period === 'YEAR' ? '/yr' : period === 'MONTH' ? '/mo' : period === 'HOUR' ? '/hr' : ''
  return range + suffix
}

export default function JobCard({ job }: { job: JobDetail }) {
  const salary = fmtSalary(job.job_min_salary, job.job_max_salary, job.job_salary_period)
  const empLabel = EMP_TYPE_LABEL[job.job_employment_type] ?? job.job_employment_type
  const workLabel = job.work_arrangement ? WORK_ARR_LABEL[job.work_arrangement] ?? null : null
  const location = [job.job_city, job.job_state, job.job_country].filter(Boolean).join(', ')
  const responsibilities = job.job_highlights?.Responsibilities?.slice(0, 2) ?? []

  return (
    <div className="group flex flex-col rounded-2xl border border-neutral-200 bg-white hover:shadow-lg hover:border-neutral-300 transition-all duration-300 overflow-hidden">
      {/* 헤더 */}
      <div className="flex items-start gap-4 p-5 pb-4">
        {/* 회사 로고 */}
        <div className="w-11 h-11 rounded-xl border border-neutral-100 bg-neutral-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {job.employer_logo ? (
            <img
              src={job.employer_logo}
              alt={job.employer_name}
              className="w-full h-full object-contain p-1"
            />
          ) : (
            <span className="text-base font-bold text-neutral-400">
              {job.employer_name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        {/* 회사명 + 뱃지 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-neutral-600 truncate">
              {job.employer_name}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent-light text-accent font-medium whitespace-nowrap">
              {empLabel}
            </span>
            {workLabel && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500 font-medium whitespace-nowrap">
                {workLabel}
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-400 mt-0.5 truncate">{location}</p>
        </div>
      </div>

      {/* 직무명 */}
      <div className="px-5">
        <h3 className="text-base font-semibold text-neutral-900 leading-snug line-clamp-2 group-hover:text-accent transition-colors">
          {job.job_title}
        </h3>
      </div>

      {/* 주요 업무 */}
      {responsibilities.length > 0 && (
        <ul className="px-5 mt-3 space-y-1">
          {responsibilities.map((r, i) => (
            <li key={i} className="text-xs text-neutral-500 flex gap-1.5 leading-relaxed">
              <span className="text-neutral-300 flex-shrink-0 mt-0.5">—</span>
              <span className="line-clamp-1">{r}</span>
            </li>
          ))}
        </ul>
      )}

      {/* 푸터 */}
      <div className="mt-auto px-5 py-4 flex items-center justify-between gap-3 border-t border-neutral-100 mt-4">
        <div className="flex items-center gap-3 min-w-0">
          {salary ? (
            <span className="text-sm font-semibold text-neutral-800 whitespace-nowrap">{salary}</span>
          ) : (
            <span className="text-xs text-neutral-400">급여 미공개</span>
          )}
          <span className="text-xs text-neutral-400 whitespace-nowrap">
            {relativeDate(job.job_posted_at_datetime_utc)}
          </span>
        </div>
        <a
          href={job.job_apply_link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-accent hover:text-accent-dark transition-colors whitespace-nowrap flex-shrink-0"
        >
          지원하기 →
        </a>
      </div>
    </div>
  )
}
