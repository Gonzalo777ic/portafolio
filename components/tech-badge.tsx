import { cn } from "@/lib/utils"

interface TechBadgeProps {
  name: string
  variant?: "default" | "outline"
}

export function TechBadge({ name, variant = "default" }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-all",
        variant === "default"
          ? "bg-primary/10 text-primary"
          : "border border-border text-foreground hover:border-primary hover:text-primary",
      )}
    >
      {name}
    </span>
  )
}
