"use client"

import { useEffect, useState } from "react"

/** Persisted stores only exist in the browser — gate their output to avoid hydration mismatches. */
export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}
