"use client"

import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 9999,
  size = "md",
  className,
}: {
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  size?: "sm" | "md"
  className?: string
}) {
  const btn = cn("grid place-items-center text-ink/70 hover:text-maroon disabled:opacity-30", size === "sm" ? "size-7" : "size-10")
  return (
    <div className={cn("inline-flex items-center rounded-full border border-border bg-card", className)}>
      <button type="button" className={btn} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label="Decrease quantity">
        <Minus className="size-3.5" />
      </button>
      <span className={cn("min-w-8 text-center tabular-nums", size === "sm" ? "text-sm" : "text-base")}>{value}</span>
      <button type="button" className={btn} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label="Increase quantity">
        <Plus className="size-3.5" />
      </button>
    </div>
  )
}
