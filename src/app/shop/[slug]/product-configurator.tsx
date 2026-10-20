"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import { Check, Clock, Hand, Heart, ImagePlus, MapPin, ShieldCheck, Star, Truck, X } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { QtyStepper } from "@/components/qty-stepper"
import { useCart } from "@/store/cart"
import { useWishlist } from "@/store/wishlist"
import { useMounted } from "@/hooks/use-mounted"
import { formatINR } from "@/lib/format"
import type { Product } from "@/lib/products"
import { whatsappLink } from "@/lib/whatsapp"
import { cn } from "@/lib/utils"

const addOns = [
  { id: "wrap", label: "Premium gift wrap & ribbon", price: 99 },
  { id: "letter", label: "Handwritten letter (up to 150 words)", price: 149 },
  { id: "choc", label: "Add a box of Belgian chocolates", price: 249 },
  { id: "flowers", label: "Dried flower bunch", price: 299 },
]

type Photo = { name: string; url: string }

export function ProductConfigurator({ product: p }: { product: Product }) {
  const mounted = useMounted()
  const add = useCart((s) => s.add)
  const wished = useWishlist((s) => s.slugs.includes(p.slug))
  const toggleWish = useWishlist((s) => s.toggle)

  const [size, setSize] = useState(p.sizes?.find((s) => s.delta === 0)?.label ?? p.sizes?.[0]?.label)
  const [extras, setExtras] = useState<string[]>([])
  const [names, setNames] = useState("")
  const [date, setDate] = useState("")
  const [message, setMessage] = useState("")
  const [photos, setPhotos] = useState<Photo[]>([])
  const [qty, setQty] = useState(p.minQty ?? 1)
  const [pincode, setPincode] = useState("")
  const [eta, setEta] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const sizeDelta = p.sizes?.find((s) => s.label === size)?.delta ?? 0
  const extrasTotal = addOns.filter((a) => extras.includes(a.id)).reduce((s, a) => s + a.price, 0)
  const unitPrice = p.price + sizeDelta + extrasTotal
  const maxPhotos = p.personalise.photos ?? 0

  useEffect(() => () => photos.forEach((ph) => URL.revokeObjectURL(ph.url)), []) // eslint-disable-line react-hooks/exhaustive-deps

  const options = useMemo(() => {
    const o: { label: string; value: string }[] = []
    if (size) o.push({ label: "Size", value: size })
    if (names) o.push({ label: "Names", value: names })
    if (date) o.push({ label: "Date", value: new Date(date).toLocaleDateString("en-IN", { dateStyle: "medium" }) })
    if (message) o.push({ label: "Message", value: message })
    if (photos.length) o.push({ label: "Photos", value: `${photos.length} uploaded` })
    for (const a of addOns) if (extras.includes(a.id)) o.push({ label: "Add-on", value: a.label })
    return o
  }, [size, names, date, message, photos.length, extras])

  const onFiles = (files: FileList | null) => {
    if (!files) return
    const room = maxPhotos - photos.length
    const picked = Array.from(files).filter((f) => f.type.startsWith("image/")).slice(0, room)
    if (files.length > room) toast.info(`This gift holds up to ${maxPhotos} photos`)
    setPhotos((prev) => [...prev, ...picked.map((f) => ({ name: f.name, url: URL.createObjectURL(f) }))])
  }

  const checkPincode = () => {
    if (!/^[1-9]\d{5}$/.test(pincode)) return toast.error("Enter a valid 6-digit pincode")
    const lead = Number(p.leadTime.match(/(\d+)\D*$/)?.[1] ?? 6)
    const transit = pincode.startsWith("400") ? 1 : pincode.startsWith("4") ? 2 : 4
    const d = new Date()
    d.setDate(d.getDate() + lead + transit)
    setEta(d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }))
  }

  const addToBag = () => {
    add({ slug: p.slug, name: p.name, image: p.images[0], visual: p.visual, unitPrice, qty, minQty: p.minQty, options })
    toast.success("Added to your gift bag", { description: p.name })
  }

  const waMessage = [
    `Hi Canvas Of Life! I'd like to order:`,
    `🎁 ${p.name} × ${qty}`,
    ...options.map((o) => `• ${o.label}: ${o.value}`),
    `Price: ${formatINR(unitPrice * qty)}`,
  ].join("\n")

  return (
    <div>
      <div className="flex items-center gap-2 text-sm">
        <span className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn("size-4", i < Math.round(p.rating) ? "fill-gold text-gold" : "text-border")} />
          ))}
        </span>
        <span className="font-medium">{p.rating.toFixed(1)}</span>
        <span className="text-muted-foreground">· {p.reviews} reviews</span>
      </div>
      <h1 className="mt-3 text-4xl font-medium leading-[1.05] text-wine sm:text-5xl">{p.name}</h1>
      <p className="mt-2 font-hand text-2xl text-rose">{p.tagline}</p>

      <div className="mt-6 flex items-baseline gap-3">
        <span className="font-display text-4xl text-ink">{formatINR(unitPrice)}</span>
        {p.compareAt && sizeDelta === 0 && extrasTotal === 0 && (
          <>
            <span className="text-lg text-muted-foreground line-through">{formatINR(p.compareAt)}</span>
            <span className="rounded-full bg-blush px-2.5 py-0.5 text-xs font-semibold text-maroon">
              Save {Math.round((1 - p.price / p.compareAt) * 100)}%
            </span>
          </>
        )}
        {p.minQty && p.minQty > 1 && <span className="text-sm text-muted-foreground">per unit · min {p.minQty} units</span>}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Inclusive of all taxes · Free handwritten note</p>

      <p className="mt-6 leading-relaxed text-ink/85">{p.description}</p>

      <div className="mt-8 space-y-8 border-t border-border/70 pt-8">
        {p.sizes && (
          <Field label="Choose size" hint={size}>
            <div className="flex flex-wrap gap-2">
              {p.sizes.map((s) => (
                <button
                  key={s.label}
                  onClick={() => setSize(s.label)}
                  className={cn(
                    "rounded-xl border px-4 py-2.5 text-sm transition",
                    size === s.label ? "border-maroon bg-maroon text-white" : "border-border bg-card hover:border-rose"
                  )}
                >
                  {s.label}
                  {s.delta !== 0 && <span className="ml-1.5 opacity-75">{s.delta > 0 ? "+" : "−"}{formatINR(Math.abs(s.delta))}</span>}
                </button>
              ))}
            </div>
          </Field>
        )}

        <div className="space-y-5 rounded-2xl border border-rose/25 bg-blush/30 p-5 sm:p-6">
          <div>
            <h2 className="font-display text-xl text-wine">Make it yours ✍️</h2>
            <p className="text-sm text-muted-foreground">Share the details now — or send them on WhatsApp after you order.</p>
          </div>
          {p.personalise.names && (
            <Field label="Name(s) on the gift">
              <Input value={names} onChange={(e) => setNames(e.target.value)} placeholder="e.g. Aarav & Meera" maxLength={40} className="h-11 bg-paper" />
            </Field>
          )}
          {p.personalise.date && (
            <Field label="Special date">
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-11 bg-paper" />
            </Field>
          )}
          {p.personalise.message && (
            <Field label="Your message" hint={`${message.length}/200`}>
              <Textarea value={message} onChange={(e) => setMessage(e.target.value.slice(0, 200))} placeholder="Happy 3 years, my favourite person…" className="min-h-24 bg-paper" />
            </Field>
          )}
          {maxPhotos > 0 && (
            <Field label="Upload photos" hint={`${photos.length}/${maxPhotos}`}>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  onFiles(e.dataTransfer.files)
                }}
                className="rounded-xl border-2 border-dashed border-rose/40 bg-paper p-4"
              >
                {photos.length > 0 && (
                  <div className="mb-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
                    {photos.map((ph, i) => (
                      <div key={ph.url} className="group relative aspect-square overflow-hidden rounded-lg">
                        {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
                        <img src={ph.url} alt={ph.name} className="absolute inset-0 size-full object-cover" />
                        <button
                          onClick={() => setPhotos((prev) => prev.filter((_, j) => j !== i))}
                          className="absolute right-1 top-1 grid size-5 place-items-center rounded-full bg-wine/80 text-white opacity-0 transition group-hover:opacity-100"
                          aria-label={`Remove ${ph.name}`}
                        >
                          <X className="size-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {photos.length < maxPhotos && (
                  <button onClick={() => fileRef.current?.click()} className="flex w-full flex-col items-center gap-1 py-3 text-center">
                    <ImagePlus className="size-6 text-rose" />
                    <span className="text-sm font-medium text-wine">Click or drop photos here</span>
                    <span className="text-xs text-muted-foreground">JPG or PNG · up to {maxPhotos} photos · stays on your device in this demo</span>
                  </button>
                )}
                <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => onFiles(e.target.files)} />
              </div>
            </Field>
          )}
        </div>

        <Field label="Add a little extra">
          <div className="grid gap-2 sm:grid-cols-2">
            {addOns.map((a) => {
              const on = extras.includes(a.id)
              return (
                <label
                  key={a.id}
                  className={cn("flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition", on ? "border-maroon bg-blush/40" : "border-border bg-card hover:border-rose")}
                >
                  <Checkbox checked={on} onCheckedChange={(c) => setExtras((x) => (c ? [...x, a.id] : x.filter((id) => id !== a.id)))} />
                  <span className="flex-1 leading-snug">{a.label}</span>
                  <span className="text-muted-foreground">+{formatINR(a.price)}</span>
                </label>
              )
            })}
          </div>
        </Field>

        <Field label="Check delivery date">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                inputMode="numeric"
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  setEta(null)
                }}
                onKeyDown={(e) => e.key === "Enter" && checkPincode()}
                placeholder="Enter pincode"
                className="h-11 bg-card pl-9"
              />
            </div>
            <Button variant="outline" className="h-11 rounded-xl px-5" onClick={checkPincode}>
              Check
            </Button>
          </div>
          {eta && (
            <p className="mt-2 flex items-center gap-1.5 text-sm text-emerald-700">
              <Check className="size-4" /> Estimated delivery by <b>{eta}</b>
            </p>
          )}
        </Field>

        <div className="flex flex-wrap items-center gap-3">
          <QtyStepper value={qty} min={p.minQty ?? 1} onChange={setQty} />
          <Button onClick={addToBag} className="h-12 flex-1 rounded-full text-base">
            Add to bag · {formatINR(unitPrice * qty)}
          </Button>
          <Button
            variant="outline"
            size="icon-lg"
            className="size-12 rounded-full"
            onClick={() => toast(toggleWish(p.slug) ? "Saved to wishlist ♡" : "Removed from wishlist")}
            aria-label="Toggle wishlist"
          >
            <Heart className={cn(mounted && wished && "fill-maroon text-maroon")} />
          </Button>
        </div>
        <a
          href={whatsappLink(waMessage)}
          target="_blank"
          rel="noreferrer"
          className="-mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-whatsapp/60 text-sm font-medium text-[#128c4b] transition hover:bg-whatsapp/10"
        >
          Prefer chatting? Order this on WhatsApp
        </a>

        <ul className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          {[
            [Hand, "Handmade in Mumbai"],
            [Clock, p.leadTime],
            [Truck, "Pan-India delivery"],
            [ShieldCheck, "Secure checkout"],
          ].map(([Icon, label]) => {
            const I = Icon as typeof Hand
            return (
              <li key={label as string} className="flex flex-col items-center gap-1.5 rounded-xl bg-card p-3 text-center text-xs text-muted-foreground">
                <I className="size-5 text-maroon" />
                {label as string}
              </li>
            )
          })}
        </ul>

        <Accordion defaultValue={["included"]} className="w-full">
          <AccordionItem value="included">
            <AccordionTrigger className="font-display text-lg text-wine">What’s included</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                {p.includes.map((x) => (
                  <li key={x} className="flex items-center gap-2">
                    <Check className="size-4 text-maroon" /> {x}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="delivery">
            <AccordionTrigger className="font-display text-lg text-wine">Making & delivery</AccordionTrigger>
            <AccordionContent className="leading-relaxed text-muted-foreground">
              Every piece is made to order. {p.leadTime}, then 1–5 days in transit depending on your city. Orders above ₹1,999 ship free;
              Mumbai express delivery is available at checkout.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="care">
            <AccordionTrigger className="font-display text-lg text-wine">Care</AccordionTrigger>
            <AccordionContent className="leading-relaxed text-muted-foreground">
              Keep away from direct sunlight and moisture. Dust gently with a dry, soft cloth. LED pieces run on USB or AA batteries.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2.5 flex items-baseline justify-between">
        <span className="text-sm font-medium">{label}</span>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </div>
  )
}
