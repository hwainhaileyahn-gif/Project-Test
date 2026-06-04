import { NextRequest, NextResponse } from 'next/server'
import { getJobDetails } from '@/lib/jsearch'

// GET /api/jobs/:id?country=us
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { searchParams } = req.nextUrl

  try {
    const data = await getJobDetails(id, {
      country: searchParams.get('country') ?? undefined,
      language: searchParams.get('language') ?? undefined,
    })

    if (!data.data?.length) {
      return NextResponse.json({ error: '해당 채용 공고를 찾을 수 없습니다.' }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (err) {
    const message = err instanceof Error ? err.message : '알 수 없는 오류'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
