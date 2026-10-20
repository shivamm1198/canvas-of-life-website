"use client"

import { useState } from "react"
import { toast } from "sonner"
import { ArrowRight } from "lucide-react"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("Please enter a valid email")
        toast.success("You’re on the list ✨", { description: "Welcome to the Canvas Of Life family." })
        setEmail("")
      }}
      className="flex overflow-hidden rounded-full border border-paper/20 bg-paper/5 focus-within:border-gold"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        aria-label="Email address"
        className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-paper placeholder:text-paper/40 focus:outline-none"
      />
      <button type="submit" aria-label="Subscribe" className="grid w-11 place-items-center bg-gold text-wine hover:bg-gold-soft">
        <ArrowRight className="size-4" />
      </button>
    </form>
  )
}
