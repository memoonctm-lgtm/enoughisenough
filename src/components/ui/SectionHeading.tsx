import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && "text-center", "mb-12", className)}>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">{subtitle}</p>
      )}
      <div
        className={cn(
          "mt-4 h-1 w-16 rounded-full bg-secondary",
          centered && "mx-auto"
        )}
      />
    </div>
  );
}
