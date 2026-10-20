"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

type WishlistState = {
  slugs: string[]
  toggle: (slug: string) => boolean
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      slugs: [],
      toggle: (slug) => {
        const has = get().slugs.includes(slug)
        set({ slugs: has ? get().slugs.filter((s) => s !== slug) : [...get().slugs, slug] })
        return !has
      },
    }),
    { name: "col-wishlist" }
  )
)
