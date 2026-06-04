import { searchJobs } from '@/lib/jsearch'
import SectionHeader from '@/components/ui/SectionHeader'
import JobCard from '@/components/ui/JobCard'

const DEFAULT_QUERY = 'M&A Finance Investment Banking'
const DEFAULT_COUNTRY = 'us'

export default async function JobListings() {
  let jobs: Awaited<ReturnType<typeof searchJobs>>['data'] = []
  let error: string | null = null

  try {
    const res = await searchJobs({
      query: DEFAULT_QUERY,
      country: DEFAULT_COUNTRY,
      num_pages: 1,
      date_posted: 'month',
    })
    jobs = res.data ?? []
  } catch (err) {
    error = err instanceof Error ? err.message : '채용 공고를 불러오지 못했습니다.'
  }

  return (
    <section id="jobs" className="py-24 md:py-32 bg-neutral-50 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          title="채용 공고"
          subtitle="M&A · 투자 · 기업금융 분야의 최신 공고를 모아봤습니다."
        />

        {/* 메타 행 */}
        <div className="mt-8 flex items-center justify-between flex-wrap gap-3">
          <p className="text-xs text-neutral-400">
            검색어: <span className="text-neutral-600 font-medium">{DEFAULT_QUERY}</span>
            &nbsp;·&nbsp;최근 30일 기준
          </p>
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(DEFAULT_QUERY + ' jobs')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-accent hover:text-accent-dark transition-colors"
          >
            더 많은 공고 보기 →
          </a>
        </div>

        {/* 에러 */}
        {error && (
          <div className="mt-8 rounded-2xl border border-dashed border-neutral-200 bg-white p-10 text-center">
            <p className="text-sm font-medium text-neutral-500">채용 공고를 불러올 수 없습니다</p>
            <p className="text-xs text-neutral-400 mt-1">{error}</p>
            <p className="text-xs text-neutral-400 mt-3">
              <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-600">RAPIDAPI_KEY</code> 환경 변수를 확인해주세요.
            </p>
          </div>
        )}

        {/* 빈 결과 */}
        {!error && jobs.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-neutral-200 bg-white p-10 text-center">
            <p className="text-sm text-neutral-400">검색 결과가 없습니다.</p>
          </div>
        )}

        {/* 카드 그리드 */}
        {jobs.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.slice(0, 9).map((job) => (
              <JobCard key={job.job_id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
