import { NextRequest, NextResponse } from 'next/server'
import { searchJobs } from '@/lib/jsearch'

// GET /api/jobs/search?query=M%26A+Analyst&page=1&country=kr&date_posted=month
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const query = searchParams.get('query')
  if (!query) {
    return NextResponse.json({ error: 'query 파라미터가 필요합니다.' }, { status: 400 })
  }

  try {
    const data = await searchJobs({
      query,
      page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
      num_pages: searchParams.get('num_pages') ? Number(searchParams.get('num_pages')) : 1,
      country: searchParams.get('country') ?? undefined,
      language: searchParams.get('language') ?? undefined,
      date_posted: (searchParams.get('date_posted') as 'all' | 'today' | '3days' | 'week' | 'month') ?? undefined,
      work_from_home: searchParams.get('work_from_home') === 'true' ? true : undefined,
      employment_types: searchParams.get('employment_types') ?? undefined,
      job_requirements: searchParams.get('job_requirements') ?? undefined,
    })

    return NextResponse.json(data)
  } catch (err) {
    const message = err instanceof Error ? err.message : '알 수 없는 오류'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
