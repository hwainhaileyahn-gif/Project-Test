import { notFound } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { educations } from '@/../drizzle/schema'
import EducationForm from '@/components/admin/EducationForm'
import { updateEducation } from '@/app/actions/resume'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditEducationPage({ params }: Props) {
  const { id } = await params

  const edu = await db.query.educations.findFirst({
    where: eq(educations.id, id),
  })

  if (!edu) notFound()

  const action = updateEducation.bind(null, id)

  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-600 transition-colors mb-6"
          >
            ← 포트폴리오로 돌아가기
          </a>
          <h1 className="text-2xl font-bold text-neutral-900">학력 수정</h1>
          <p className="text-sm text-neutral-500 mt-1">{edu.school} · {edu.degree}</p>
        </div>
        <div className="bg-white rounded-2xl border border-neutral-100 p-8 shadow-sm">
          <EducationForm
            action={action}
            defaultValues={{
              school: edu.school,
              degree: edu.degree,
              major: edu.major,
              startedAt: edu.startedAt,
              endedAt: edu.endedAt,
              description: edu.description,
              sortOrder: edu.sortOrder,
            }}
          />
        </div>
      </div>
    </div>
  )
}
