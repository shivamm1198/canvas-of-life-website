import type { Metadata } from "next"
import { HamperBuilder } from "./hamper-builder"

export const metadata: Metadata = {
  title: "Build your own hamper",
  description: "Pick a box, fill it with treats, keepsakes and festive goodies, add a handwritten note — handmade in Mumbai.",
}

export default function BuildAHamperPage() {
  return (
    <div className="paper-grain">
      <div className="mx-auto max-w-7xl px-4 pb-6 pt-12 text-center sm:px-6">
        <p className="font-hand text-2xl text-rose">your hamper, your rules</p>
        <h1 className="text-5xl font-medium text-wine sm:text-6xl">Build-a-hamper</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Choose a box, fill it with things they’ll love and we’ll hand-pack it with ribbon, filler and a handwritten note.
        </p>
      </div>
      <HamperBuilder />
    </div>
  )
}
