"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Heart, Menu, Search, ShoppingBag } from "lucide-react"
import { Logo } from "./logo"
import { SearchDialog } from "./search-dialog"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cartCount, useCart } from "@/store/cart"
import { useWishlist } from "@/store/wishlist"
import { useMounted } from "@/hooks/use-mounted"
import { nav, site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Header() {
  const mounted = useMounted()
  const lines = useCart((s) => s.lines)
  const setOpen = useCart((s) => s.setOpen)
  const wish = useWishlist((s) => s.slugs.length)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const count = mounted ? cartCount(lines) : 0

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setSearchOpen((o) => !o)
      }
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("keydown", onKey)
    }
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-300",
        scrolled ? "border-border/70 bg-paper/85 shadow-[0_6px_24px_-18px_rgb(60_20_20/0.5)] backdrop-blur-md" : "border-transparent bg-paper"
      )}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" />}>
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-[85%] bg-paper p-6">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <Logo />
            <nav className="mt-8 flex flex-col gap-1">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="rounded-lg px-3 py-3 font-display text-xl text-wine hover:bg-blush/60">
                  {n.label}
                </Link>
              ))}
              <Link href="/wishlist" className="rounded-lg px-3 py-3 font-display text-xl text-wine hover:bg-blush/60">
                Wishlist
              </Link>
            </nav>
            <p className="mt-auto font-hand text-xl text-rose">Handmade with love in {site.city} 📍</p>
          </SheetContent>
        </Sheet>

        <Logo className="mr-auto lg:mr-8" />

        <nav className="hidden flex-1 items-center gap-1 lg:flex">
          {nav.map((n) => {
            const active = n.href === pathname
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-[0.9rem] text-ink/80 transition-colors hover:text-maroon",
                  active && "text-maroon",
                  n.label === "Diwali 2026" && "font-medium text-maroon"
                )}
              >
                {n.label === "Diwali 2026" && <span className="mr-1">🪔</span>}
                {n.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            onClick={() => setSearchOpen(true)}
            className="hidden h-9 gap-2 rounded-full border border-border bg-card/70 px-3 text-muted-foreground md:inline-flex"
          >
            <Search className="size-4" />
            <span className="text-[0.82rem]">Search gifts</span>
            <kbd className="rounded bg-muted px-1.5 text-[0.7rem]">Ctrl K</kbd>
          </Button>
          <Button variant="ghost" size="icon-lg" className="md:hidden" onClick={() => setSearchOpen(true)} aria-label="Search">
            <Search className="size-5" />
          </Button>
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative hidden size-9 items-center justify-center rounded-lg hover:bg-muted sm:inline-flex"
          >
            <Heart className="size-5" />
            {mounted && wish > 0 && <Dot n={wish} />}
          </Link>
          <Button variant="ghost" size="icon-lg" className="relative" onClick={() => setOpen(true)} aria-label={`Cart, ${count} items`}>
            <ShoppingBag className="size-5" />
            {count > 0 && <Dot n={count} />}
          </Button>
        </div>
      </div>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  )
}

function Dot({ n }: { n: number }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 grid min-w-[1.15rem] place-items-center rounded-full bg-maroon px-1 text-[0.65rem] font-semibold leading-[1.15rem] text-white">
      {n}
    </span>
  )
}
