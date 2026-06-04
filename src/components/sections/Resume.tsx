import Link from 'next/link'
import { db } from '@/lib/db'
import { asc } from 'drizzle-orm'
import { experiences, educations } from '@/../drizzle/schema'
import SectionHeader from '@/components/ui/SectionHeader'
import SkillBadge from '@/components/ui/SkillBadge'
import DeleteButton from '@/components/admin/DeleteButton'
import { deleteExperience, deleteEducation } from '@/app/actions/resume'
import { skills } from '@/data/resume'

const skillCategories = [
  { key: 'finance', label: '재무 분석' },
  { key: 'strategy', label: '전략' },
  { key: 'tool', label: '도구' },
  { key: 'legal', label: '법률·규제' },
  { key: 'etc', label: '기타' },
] as const

function fmtDate(d: string | null | undefined) {
  if (!d) return '현재'
  return d.slice(0, 7).replace('-', '.')
}

function fmtPeriod(startedAt: string | null, endedAt: string | null) {
  if (!startedAt) return fmtDate(endedAt)
  return `${fmtDate(startedAt)} — ${fmtDate(endedAt)}`
}

export default async function Resume() {
  const [exps, edus] = await Promise.all([
    db.query.experiences.findMany({
      orderBy: [asc(experiences.sortOrder), asc(experiences.createdAt)],
      with: {
        descriptions: {
          orderBy: (d, { asc: a }) => [a(d.sortOrder)],
        },
      },
    }),
    db.query.educations.findMany({
      orderBy: [asc(educations.sortOrder), asc(educations.createdAt)],
    }),
  ])

  return (
    <section id="resume" className="py-24 md:py-32 bg-white px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="학력 및 경력" />

        {/* 학력 */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-widest">
              학력
            </h3>
            <Link
              href="/admin/educations/new"
              className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:text-accent-dark border border-accent/30 hover:border-accent/60 bg-accent-light/60 hover:bg-accent-light px-3 py-1.5 rounded-lg transition-colors"
            >
              + 학력 추가
            </Link>
          </div>

          {edus.length === 0 ? (
            <p className="text-sm text-neutral-400 py-8 text-center border border-dashed border-neutral-200 rounded-2xl">
              등록된 학력이 없습니다.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {edus.map((edu) => {
                const deleteAction = deleteEducation.bind(null, edu.id)
                return (
                  <div
                    key={edu.id}
                    className="rounded-2xl border border-neutral-100 bg-neutral-50 p-6 hover:shadow-md transition-shadow group relative"
                  >
                    <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/admin/educations/${edu.id}/edit`}
                        className="text-xs px-2.5 py-1 rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-100 transition-colors bg-white"
                      >
                        수정
                      </Link>
                      <DeleteButton action={deleteAction} />
                    </div>
                    <span className="inline-block text-xs font-medium text-accent bg-accent-light px-2 py-0.5 rounded-full mb-3">
                      {edu.degree}
                    </span>
                    <p className="font-semibold text-neutral-900 text-base">{edu.school}</p>
                    <p className="text-sm text-neutral-600 mt-0.5">{edu.major}</p>
                    <p className="text-xs text-neutral-400 mt-1">
                      {fmtPeriod(edu.startedAt, edu.endedAt)}
                    </p>
                    {edu.description && (
                      <p className="text-xs text-neutral-500 mt-3 leading-relaxed border-t border-neutral-200 pt-3">
                        {edu.description}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* 경력 + 기술 */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-widest">
                경력
              </h3>
              <Link
                href="/admin/experiences/new"
                className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:text-accent-dark border border-accent/30 hover:border-accent/60 bg-accent-light/60 hover:bg-accent-light px-3 py-1.5 rounded-lg transition-colors"
              >
                + 경력 추가
              </Link>
            </div>

            {exps.length === 0 ? (
              <p className="text-sm text-neutral-400 py-8 text-center border border-dashed border-neutral-200 rounded-2xl">
                등록된 경력이 없습니다.
              </p>
            ) : (
              <div>
                {exps.map((exp, i) => {
                  const isCurrent = !exp.endedAt
                  const deleteAction = deleteExperience.bind(null, exp.id)
                  return (
                    <div key={exp.id} className="flex gap-5 group">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
                            isCurrent ? 'bg-accent' : 'bg-neutral-300'
                          }`}
                        />
                        {i < exps.length - 1 && (
                          <div className="w-px flex-1 bg-neutral-200 mt-2" />
                        )}
                      </div>

                      <div className="pb-8 flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className="font-semibold text-neutral-900">{exp.company}</span>
                              {isCurrent && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-accent-light text-accent font-medium">
                                  재직 중
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-accent font-medium mt-0.5">{exp.role}</p>
                            <p className="text-xs text-neutral-400 mt-0.5">
                              {fmtPeriod(exp.startedAt, exp.endedAt)}
                            </p>
                          </div>
                          <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <Link
                              href={`/admin/experiences/${exp.id}/edit`}
                              className="text-xs px-2.5 py-1 rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-100 transition-colors"
                            >
                              수정
                            </Link>
                            <DeleteButton action={deleteAction} />
                          </div>
                        </div>

                        {exp.descriptions.length > 0 && (
                          <ul className="mt-3 space-y-1">
                            {exp.descriptions.map((d) => (
                              <li key={d.id} className="text-sm text-neutral-600 flex gap-2">
                                <span className="text-neutral-300 flex-shrink-0">—</span>
                                {d.content}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* 핵심 역량 */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-widest mb-6">
              핵심 역량
            </h3>
            <div className="space-y-5">
              {skillCategories.map(({ key, label }) => {
                const filtered = skills.filter((s) => s.category === key)
                if (filtered.length === 0) return null
                return (
                  <div key={key}>
                    <p className="text-xs text-neutral-400 mb-2">{label}</p>
                    <div className="flex flex-wrap gap-2">
                      {filtered.map((skill) => (
                        <SkillBadge key={skill.name} skill={skill} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
