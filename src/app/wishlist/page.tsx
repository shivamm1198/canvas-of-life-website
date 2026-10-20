"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { buttonVariants } from "@/components/ui/button"
import { useWishlist } from "@/store/wishlist"
import { useMounted } from "@/hooks/use-mounted"
import { products } from "@/lib/products"
import { cn } from "@/lib/utils"

export default function WishlistPage() {
  const mounted = useMounted()
  const slugs = useWishlist((s) => s.slugs)
  if (!mounted) return <div className="min-h-[60vh]" />
  const list = products.filter((p) => slugs.includes(p.slug))

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <p className="font-hand text-2xl text-rose">saved for later</p>
      <h1 className="text-5xl font-medium text-wine">Your wishlist</h1>
      {list.length === 0 ? (
        <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-dashed py-20 text-center">
          <Heart className="size-10 text-rose" />
          <p className="text-muted-foreground">Tap the heart on any gift to save it here.</p>
          <Link href="/shop" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-7")}>Browse gifts</Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
