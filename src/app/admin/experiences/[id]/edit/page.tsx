import { notFound } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { experiences } from '@/../drizzle/schema'
import ExperienceForm from '@/components/admin/ExperienceForm'
import { updateExperience } from '@/app/actions/resume'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditExperiencePage({ params }: Props) {
  const { id } = await params

  const exp = await db.query.experiences.findFirst({
    where: eq(experiences.id, id),
    with: {
      descriptions: {
        orderBy: (d, { asc }) => [asc(d.sortOrder)],
      },
    },
  })

  if (!exp) notFound()

  const action = updateExperience.bind(null, id)
  const descriptionsText = exp.descriptions.map((d) => d.content).join('\n')

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
          <h1 className="text-2xl font-bold text-neutral-900">경력 수정</h1>
          <p className="text-sm text-neutral-500 mt-1">{exp.company} · {exp.role}</p>
        </div>
        <div className="bg-white rounded-2xl border border-neutral-100 p-8 shadow-sm">
          <ExperienceForm
            action={action}
            defaultValues={{
              company: exp.company,
              role: exp.role,
              startedAt: exp.startedAt,
              endedAt: exp.endedAt,
              sortOrder: exp.sortOrder,
              descriptions: descriptionsText,
            }}
          />
        </div>
      </div>
    </div>
  )
}
