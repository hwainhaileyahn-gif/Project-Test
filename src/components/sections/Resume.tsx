import { experiences, skills } from "@/data/resume";
import SectionHeader from "@/components/ui/SectionHeader";
import TimelineItem from "@/components/ui/TimelineItem";
import SkillBadge from "@/components/ui/SkillBadge";

const skillCategories: { key: string; label: string }[] = [
  { key: "frontend", label: "프론트엔드" },
  { key: "design", label: "디자인" },
  { key: "tool", label: "도구" },
  { key: "backend", label: "백엔드" },
  { key: "etc", label: "기타" },
];

export default function Resume() {
  return (
    <section id="resume" className="py-24 md:py-32 bg-white px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="경력 및 기술" />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
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
              기술
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
