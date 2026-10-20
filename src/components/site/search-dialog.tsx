"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Gift, Sparkles } from "lucide-react"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { categories, products } from "@/lib/products"
import { formatINR, unsplash } from "@/lib/format"

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const router = useRouter()
  const go = (href: string) => {
    onOpenChange(false)
    router.push(href)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} title="Search gifts" description="Find a gift by name, occasion or category">
      <Command>
        <CommandInput placeholder="Try “LED frame”, “anniversary” or “Diwali”…" />
        <CommandList className="max-h-[60vh]">
          <CommandEmpty>No gifts found — try “hamper” or message us on WhatsApp for something custom.</CommandEmpty>
          <CommandGroup heading="Gifts">
            {products.map((p) => (
              <CommandItem
                key={p.slug}
                value={`${p.name} ${p.tagline} ${p.category} ${p.occasions.join(" ")}`}
                onSelect={() => go(`/shop/${p.slug}`)}
                className="gap-3"
              >
                <span className="relative size-10 shrink-0 overflow-hidden rounded-md bg-muted">
                  <Image src={unsplash(p.images[0], 120)} alt="" fill sizes="40px" className="object-cover" />
                </span>
                <span className="flex-1 truncate">{p.name}</span>
                <span className="text-xs text-muted-foreground">{formatINR(p.price)}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Categories">
            {categories.map((c) => (
              <CommandItem key={c.id} value={`category ${c.name}`} onSelect={() => go(`/shop?category=${c.id}`)}>
                <Gift className="text-rose" />
                {c.name}
              </CommandItem>
            ))}
            <CommandItem value="build your own hamper custom" onSelect={() => go("/build-a-hamper")}>
              <Sparkles className="text-gold" />
              Build your own hamper
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
