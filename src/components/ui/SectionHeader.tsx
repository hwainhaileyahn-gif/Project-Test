interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <h2
        className="text-3xl font-bold tracking-tight text-neutral-900"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-neutral-600 text-base">{subtitle}</p>
      )}
      <div
        className={`mt-4 h-0.5 w-12 bg-accent ${centered ? "mx-auto" : ""}`}
      />
    </div>
  );
}
