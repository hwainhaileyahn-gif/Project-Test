import { educations, experiences, skills } from "@/data/resume";
import SectionHeader from "@/components/ui/SectionHeader";
import TimelineItem from "@/components/ui/TimelineItem";
import SkillBadge from "@/components/ui/SkillBadge";

const skillCategories: { key: string; label: string }[] = [
  { key: "finance", label: "재무 분석" },
  { key: "strategy", label: "전략" },
  { key: "tool", label: "도구" },
  { key: "legal", label: "법률·규제" },
  { key: "etc", label: "기타" },
];

export default function Resume() {
  return (
    <section id="resume" className="py-24 md:py-32 bg-white px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="학력 및 경력" />

        {/* 학력 */}
        <div className="mt-12">
          <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-widest mb-6">
            학력
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {educations.map((edu) => (
              <div
                key={edu.id}
                className="rounded-2xl border border-neutral-100 bg-neutral-50 p-6 hover:shadow-md transition-shadow"
              >
                <span className="inline-block text-xs font-medium text-accent bg-accent-light px-2 py-0.5 rounded-full mb-3">
                  {edu.degree}
                </span>
                <p className="font-semibold text-neutral-900 text-base">
                  {edu.school}
                </p>
                <p className="text-sm text-neutral-600 mt-0.5">{edu.major}</p>
                <p className="text-xs text-neutral-400 mt-1">{edu.period}</p>
                {edu.description && (
                  <p className="text-xs text-neutral-500 mt-3 leading-relaxed border-t border-neutral-200 pt-3">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 경력 + 기술 */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-widest mb-6">
              경력
            </h3>
            <div>
              {experiences.map((exp, i) => (
                <TimelineItem
                  key={exp.id}
                  experience={exp}
                  isLast={i === experiences.length - 1}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-widest mb-6">
              핵심 역량
            </h3>
            <div className="space-y-5">
              {skillCategories.map(({ key, label }) => {
                const filtered = skills.filter((s) => s.category === key);
                if (filtered.length === 0) return null;
                return (
                  <div key={key}>
                    <p className="text-xs text-neutral-400 mb-2">{label}</p>
                    <div className="flex flex-wrap gap-2">
                      {filtered.map((skill) => (
                        <SkillBadge key={skill.name} skill={skill} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
