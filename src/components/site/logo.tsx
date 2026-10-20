import Link from "next/link"
import { cn } from "@/lib/utils"

export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <Link href="/" aria-label="Canvas Of Life — home" className={cn("group inline-flex flex-col leading-none", className)}>
      <span className={cn("font-display text-[1.45rem] font-semibold tracking-tight", light ? "text-paper" : "text-wine")}>
        Canvas <span className={cn("font-normal italic transition-colors group-hover:text-rose", light ? "text-gold" : "text-maroon")}>of</span> Life
      </span>
      <span className={cn("font-hand -mt-0.5 pl-6 text-[0.95rem]", light ? "text-gold-soft" : "text-rose")}>by Afreen Perothian</span>
    </Link>
  )
}
