interface SectionHeaderProps {
  title: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeader({
  title,
  description,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div
      className={`space-y-2 ${centered ? "text-center mx-auto max-w-3xl" : ""}`}
    >
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && (
        <p className="text-muted-foreground text-lg">{description}</p>
      )}
    </div>
  );
}
