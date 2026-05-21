import { Experience } from "@/types";

interface TimelineItemProps {
  experience: Experience;
  isLast?: boolean;
}

export default function TimelineItem({
  experience,
  isLast = false,
}: TimelineItemProps) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <div
          className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
            experience.current ? "bg-accent" : "bg-neutral-300"
          }`}
        />
        {!isLast && <div className="w-px flex-1 bg-neutral-200 mt-2" />}
      </div>

      <div className="pb-8">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-semibold text-neutral-900">
            {experience.company}
          </span>
          {experience.current && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent-light text-accent font-medium">
              재직 중
            </span>
          )}
        </div>
        <p className="text-sm text-accent font-medium mt-0.5">
          {experience.role}
        </p>
        <p className="text-xs text-neutral-400 mt-0.5">{experience.period}</p>
        <ul className="mt-3 space-y-1">
          {experience.description.map((item, i) => (
            <li key={i} className="text-sm text-neutral-600 flex gap-2">
              <span className="text-neutral-300 flex-shrink-0">—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
