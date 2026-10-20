import type { Metadata } from "next"
import { Suspense } from "react"
import { ShopView } from "./shop-view"

export const metadata: Metadata = {
  title: "Shop handmade gifts",
  description: "LED frames, miniature frames, scrapbooks, albums, hampers and Diwali 2026 gifts — handmade in Mumbai.",
}

export default function ShopPage() {
  return (
    <Suspense>
      <ShopView />
    </Suspense>
  )
}
