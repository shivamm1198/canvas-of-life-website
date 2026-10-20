import { cn } from "@/lib/utils"

export function SectionHeading({
  kicker,
  title,
  sub,
  align = "left",
  className,
  light,
}: {
  kicker?: string
  title: React.ReactNode
  sub?: React.ReactNode
  align?: "left" | "center"
  className?: string
  light?: boolean
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {kicker && <p className={cn("font-hand text-2xl", light ? "text-gold-soft" : "text-rose")}>{kicker}</p>}
      <h2 className={cn("text-balance text-4xl font-medium leading-[1.05] sm:text-5xl", light ? "text-paper" : "text-wine")}>{title}</h2>
      {sub && <p className={cn("mt-4 text-pretty text-base leading-relaxed sm:text-lg", light ? "text-paper/70" : "text-muted-foreground")}>{sub}</p>}
    </div>
  )
}
