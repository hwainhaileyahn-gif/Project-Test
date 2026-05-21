import { Skill } from "@/types";

interface SkillBadgeProps {
  skill: Skill;
}

export default function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-accent-light text-accent">
      {skill.name}
    </span>
  );
}
