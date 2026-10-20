"use client"

import Image from "next/image"
import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { toast } from "sonner"
import { Check, Minus, Plus, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/store/cart"
import { boxes, hamperItems, type BoxId, type HamperGroup } from "@/lib/hamper"
import { formatINR, unsplash } from "@/lib/format"
import { cn } from "@/lib/utils"

const groups: HamperGroup[] = ["Treats", "Self-care", "Keepsakes", "Festive"]

export function HamperBuilder() {
  const add = useCart((s) => s.add)
  const [boxId, setBoxId] = useState<BoxId>("blush")
  const [counts, setCounts] = useState<Record<string, number>>({ "choc-bar": 1, candle: 1 })
  const [group, setGroup] = useState<HamperGroup>("Treats")
  const [to, setTo] = useState("")
  const [note, setNote] = useState("")

  const box = boxes.find((b) => b.id === boxId)!
  const chosen = hamperItems.filter((i) => counts[i.id])
  const used = chosen.reduce((s, i) => s + counts[i.id], 0)
  const itemsTotal = chosen.reduce((s, i) => s + i.price * counts[i.id], 0)
  const total = box.price + itemsTotal
  const full = used >= box.capacity

  const change = (id: string, delta: number) => {
    if (delta > 0 && full) {
      toast.info(`The ${box.name} holds ${box.capacity} items — try a bigger box!`)
      return
    }
    setCounts((c) => {
      const n = Math.max(0, (c[id] ?? 0) + delta)
      const next = { ...c, [id]: n }
      if (!n) delete next[id]
      return next
    })
  }

  const pickBox = (id: BoxId) => {
    setBoxId(id)
    const cap = boxes.find((b) => b.id === id)!.capacity
    if (used > cap) toast.warning(`That box holds ${cap} items — remove a few to fit.`)
  }

  const addToBag = () => {
    if (!used) return toast.error("Add at least one item to your hamper")
    if (used > box.capacity) return toast.error(`Too many items for the ${box.name}`)
    add({
      slug: "build-a-hamper",
      href: "/build-a-hamper",
      name: `Custom Hamper — ${box.name}`,
      image: box.image,
      visual: "plain",
      unitPrice: total,
      qty: 1,
      options: [
        { label: "Items", value: chosen.map((i) => `${i.name}${counts[i.id] > 1 ? ` ×${counts[i.id]}` : ""}`).join(", ") },
        ...(to ? [{ label: "For", value: to }] : []),
        ...(note ? [{ label: "Note", value: note }] : []),
      ],
    })
    toast.success("Your hamper is in the bag 🎁")
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-10 pt-8 sm:px-6 lg:grid-cols-[1fr_24rem]">
      <div className="space-y-14">
        {/* Step 1 */}
        <section>
          <Step n={1} title="Pick your box" />
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {boxes.map((b) => (
              <button
                key={b.id}
                onClick={() => pickBox(b.id)}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border-2 bg-card text-left transition",
                  boxId === b.id ? "border-maroon shadow-[0_18px_40px_-24px_rgb(120_30_50/0.8)]" : "border-transparent hover:border-rose/40"
                )}
              >
                <div className="relative aspect-[4/3]">
                  <Image src={unsplash(b.image, 600)} alt="" fill sizes="(min-width:640px) 25vw, 90vw" className="object-cover" />
                  {boxId === b.id && (
                    <span className="absolute right-3 top-3 grid size-7 place-items-center rounded-full bg-maroon text-white">
                      <Check className="size-4" />
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-baseline justify-between">
                    <p className="font-display text-lg text-wine">{b.name}</p>
                    <p className="text-sm font-medium">{formatINR(b.price)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{b.blurb}</p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-rose">Holds {b.capacity} items</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Step 2 */}
        <section>
          <Step n={2} title="Fill it up" />
          <div className="scrollbar-none mt-5 flex gap-2 overflow-x-auto">
            {groups.map((g) => (
              <button
                key={g}
                onClick={() => setGroup(g)}
                className={cn("shrink-0 rounded-full px-4 py-2 text-sm transition", group === g ? "bg-wine text-paper" : "border border-border bg-card hover:border-rose")}
              >
                {g}
              </button>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {hamperItems
              .filter((i) => i.group === group)
              .map((i) => {
                const n = counts[i.id] ?? 0
                return (
                  <div key={i.id} className={cn("flex flex-col rounded-2xl border bg-card p-4 transition", n ? "border-maroon/60 bg-blush/30" : "border-border")}>
                    <span className="grid size-14 place-items-center rounded-full bg-paper text-3xl shadow-inner">{i.emoji}</span>
                    <p className="mt-3 text-sm font-medium leading-snug">{i.name}</p>
                    <p className="text-sm text-muted-foreground">{formatINR(i.price)}</p>
                    <div className="mt-auto pt-3">
                      {n === 0 ? (
                        <Button variant="outline" className="h-9 w-full rounded-full" onClick={() => change(i.id, 1)}>
                          <Plus /> Add
                        </Button>
                      ) : (
                        <div className="flex h-9 items-center justify-between rounded-full bg-maroon px-1 text-white">
                          <button className="grid size-7 place-items-center rounded-full hover:bg-white/15" onClick={() => change(i.id, -1)} aria-label={`Remove one ${i.name}`}>
                            <Minus className="size-3.5" />
                          </button>
                          <span className="text-sm font-medium tabular-nums">{n}</span>
                          <button className="grid size-7 place-items-center rounded-full hover:bg-white/15" onClick={() => change(i.id, 1)} aria-label={`Add one ${i.name}`}>
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
          </div>
        </section>

        {/* Step 3 */}
        <section>
          <Step n={3} title="Add your note" />
          <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_2fr]">
            <Input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Who’s it for?" className="h-11 bg-card" maxLength={30} />
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value.slice(0, 180))}
              placeholder="We’ll hand-letter this on a card…"
              className="min-h-24 bg-card"
            />
          </div>
        </section>
      </div>

      {/* Live preview */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-3xl bg-card p-5 shadow-[0_30px_60px_-40px_rgb(58_26_32/0.8)] ring-1 ring-border/60">
          <div className="flex items-center justify-between">
            <p className="font-display text-xl text-wine">Your hamper</p>
            <button onClick={() => setCounts({})} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-maroon">
              <RotateCcw className="size-3" /> Reset
            </button>
          </div>

          <BoxPreview boxId={boxId} capacity={box.capacity} items={chosen.flatMap((i) => Array.from({ length: counts[i.id] }, (_, k) => ({ key: `${i.id}-${k}`, emoji: i.emoji })))} />

          <div className="mt-4">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{used} of {box.capacity} spots filled</span>
              {full && <span className="text-maroon">Box is full</span>}
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
              <motion.div className="h-full rounded-full bg-maroon" animate={{ width: `${Math.min(100, (used / box.capacity) * 100)}%` }} />
            </div>
          </div>

          <ul className="mt-5 space-y-2 border-t border-dashed pt-4 text-sm">
            <li className="flex justify-between">
              <span>{box.name}</span>
              <span className="tabular-nums">{formatINR(box.price)}</span>
            </li>
            {chosen.map((i) => (
              <li key={i.id} className="flex justify-between text-muted-foreground">
                <span>
                  {i.emoji} {i.name} {counts[i.id] > 1 && `×${counts[i.id]}`}
                </span>
                <span className="tabular-nums">{formatINR(i.price * counts[i.id])}</span>
              </li>
            ))}
            <li className="flex justify-between text-muted-foreground">
              <span>💌 Handwritten note & wrap</span>
              <span>Free</span>
            </li>
          </ul>
          <div className="mt-4 flex items-baseline justify-between border-t pt-4">
            <span>Total</span>
            <motion.span key={total} initial={{ scale: 1.15, color: "var(--maroon)" }} animate={{ scale: 1, color: "var(--ink)" }} className="font-display text-3xl tabular-nums">
              {formatINR(total)}
            </motion.span>
          </div>
          <Button onClick={addToBag} className="mt-4 h-12 w-full rounded-full text-base">
            Add hamper to bag
          </Button>
        </div>
      </aside>
    </div>
  )
}

function Step({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-9 place-items-center rounded-full bg-wine font-display text-paper">{n}</span>
      <h2 className="text-3xl text-wine">{title}</h2>
    </div>
  )
}

function BoxPreview({ boxId, capacity, items }: { boxId: BoxId; capacity: number; items: { key: string; emoji: string }[] }) {
  const shell = {
    kraft: "kraft-texture",
    blush: "bg-[linear-gradient(160deg,oklch(0.88_0.06_10),oklch(0.8_0.08_10))]",
    crate: "bg-[repeating-linear-gradient(180deg,oklch(0.62_0.07_55)_0_22px,oklch(0.52_0.06_50)_22px_25px)]",
  }[boxId]
  return (
    <div className={cn("relative mt-4 rounded-2xl p-3 shadow-[inset_0_-10px_20px_rgb(0_0_0/0.15)] transition-colors duration-500", shell)}>
      <div className={cn("grid min-h-40 gap-2 rounded-xl bg-[oklch(0.96_0.03_80/0.85)] p-3", capacity > 6 ? "grid-cols-4" : capacity > 4 ? "grid-cols-3" : "grid-cols-2")}>
        <AnimatePresence>
          {items.slice(0, capacity).map((it) => (
            <motion.span
              key={it.key}
              layout
              initial={{ y: -40, opacity: 0, rotate: -20 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="grid aspect-square place-items-center rounded-lg bg-paper text-4xl shadow-sm"
            >
              {it.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
        {Array.from({ length: Math.max(0, capacity - items.length) }).map((_, i) => (
          <span key={i} className="aspect-square rounded-lg border-2 border-dashed border-wine/15" />
        ))}
      </div>
      {boxId === "blush" && <div className="pointer-events-none absolute inset-3 rounded-xl bg-gradient-to-br from-white/40 via-transparent to-transparent" />}
      <div className="pointer-events-none absolute -top-2 left-1/2 h-4 w-24 -translate-x-1/2 rounded-full bg-maroon shadow" />
    </div>
  )
}
