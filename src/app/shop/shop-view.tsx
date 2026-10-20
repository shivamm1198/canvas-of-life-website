"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useMemo } from "react"
import { SlidersHorizontal, X } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { categories, getCategory, occasions, products, type Occasion } from "@/lib/products"
import { formatINR } from "@/lib/format"
import { cn } from "@/lib/utils"

const sorts = {
  featured: "Featured",
  popular: "Most loved",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
} as const
type Sort = keyof typeof sorts

const PRICE_CAP = 5000

export function ShopView() {
  const params = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const category = params.get("category")
  const occasion = params.get("occasion") as Occasion | null
  const sort = (params.get("sort") as Sort) || "featured"
  const max = Number(params.get("max")) || PRICE_CAP

  const update = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params)
    for (const [k, v] of Object.entries(patch)) {
      if (v === null || v === "") next.delete(k)
      else next.set(k, v)
    }
    const qs = next.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  const list = useMemo(() => {
    let l = products.filter(
      (p) => (!category || p.category === category) && (!occasion || p.occasions.includes(occasion)) && p.price <= max
    )
    if (sort === "popular") l = [...l].sort((a, b) => b.reviews - a.reviews)
    if (sort === "price-asc") l = [...l].sort((a, b) => a.price - b.price)
    if (sort === "price-desc") l = [...l].sort((a, b) => b.price - a.price)
    return l
  }, [category, occasion, sort, max])

  const cat = category ? getCategory(category) : undefined
  const occ = occasions.find((o) => o.id === occasion)
  const activeCount = [category, occasion, max < PRICE_CAP ? "max" : null].filter(Boolean).length

  const filters = (
    <div className="space-y-9">
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Category</h3>
        <ul className="space-y-0.5">
          <li>
            <FilterLink active={!category} onClick={() => update({ category: null })}>
              All gifts <span className="text-muted-foreground">{products.length}</span>
            </FilterLink>
          </li>
          {categories.map((c) => (
            <li key={c.id}>
              <FilterLink active={category === c.id} onClick={() => update({ category: c.id })}>
                {c.name}
                <span className="text-muted-foreground">{products.filter((p) => p.category === c.id).length}</span>
              </FilterLink>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Occasion</h3>
        <div className="flex flex-wrap gap-2">
          {occasions.map((o) => (
            <button
              key={o.id}
              onClick={() => update({ occasion: occasion === o.id ? null : o.id })}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition",
                occasion === o.id ? "border-maroon bg-maroon text-white" : "border-border bg-card hover:border-rose"
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 flex justify-between text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Max price <span className="normal-case tracking-normal text-ink">{max >= PRICE_CAP ? "Any" : formatINR(max)}</span>
        </h3>
        <Slider
          value={[max]}
          min={500}
          max={PRICE_CAP}
          step={250}
          onValueChange={(v) => {
            const n = typeof v === "number" ? v : v[0]
            update({ max: n >= PRICE_CAP ? null : String(n) })
          }}
        />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>₹500</span>
          <span>₹5,000+</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
      <div className="border-b border-border/70 py-10 sm:py-14">
        <nav className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-maroon">Home</Link> <span className="mx-1.5">/</span>
          <Link href="/shop" className="hover:text-maroon">Shop</Link>
          {cat && (
            <>
              <span className="mx-1.5">/</span>
              <span className="text-ink">{cat.name}</span>
            </>
          )}
        </nav>
        <h1 className="mt-4 text-5xl font-medium text-wine sm:text-6xl">{cat ? cat.name : occ ? `${occ.label} gifts` : "All gifts"}</h1>
        <p className="mt-3 max-w-xl text-lg text-muted-foreground">
          {cat ? cat.blurb : "Every piece is handmade to order in our Mumbai studio — personalised with your photos, names and story."}
        </p>
      </div>

      <div className="grid gap-10 pt-8 lg:grid-cols-[15rem_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28">{filters}</div>
        </aside>

        <div>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Sheet>
                <SheetTrigger render={<Button variant="outline" className="h-10 rounded-full px-4 lg:hidden" />}>
                  <SlidersHorizontal /> Filters {activeCount > 0 && `(${activeCount})`}
                </SheetTrigger>
                <SheetContent side="left" className="w-[85%] overflow-y-auto bg-paper p-6">
                  <SheetTitle className="mb-6 font-display text-2xl text-wine">Filters</SheetTitle>
                  {filters}
                </SheetContent>
              </Sheet>
              <p className="text-sm text-muted-foreground">{list.length} gifts</p>
              {occ && <Chip onClear={() => update({ occasion: null })}>{occ.label}</Chip>}
              {cat && <Chip onClear={() => update({ category: null })}>{cat.name}</Chip>}
              {max < PRICE_CAP && <Chip onClear={() => update({ max: null })}>Under {formatINR(max)}</Chip>}
            </div>
            <Select items={sorts} value={sort} onValueChange={(v) => update({ sort: v === "featured" ? null : (v as string) })}>
              <SelectTrigger className="h-10! rounded-full bg-card px-4">
                <span className="text-muted-foreground">Sort:</span>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(sorts).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {list.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border py-24 text-center">
              <p className="font-display text-2xl text-wine">Nothing matches just yet</p>
              <p className="mt-2 text-muted-foreground">We make custom pieces all the time — tell us what you have in mind.</p>
              <Button variant="outline" className="mt-6 rounded-full" onClick={() => router.replace(pathname)}>
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 xl:grid-cols-3">
              {list.map((p, i) => (
                <ProductCard key={p.slug} product={p} priority={i < 3} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FilterLink({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[0.92rem] transition",
        active ? "bg-blush font-medium text-maroon" : "hover:bg-muted"
      )}
    >
      {children}
    </button>
  )
}

function Chip({ children, onClear }: { children: React.ReactNode; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-blush px-3 py-1 text-sm text-maroon">
      {children}
      <button onClick={onClear} aria-label="Remove filter" className="hover:text-wine">
        <X className="size-3.5" />
      </button>
    </span>
  )
}
