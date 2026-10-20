import { Camera, Gift, PenLine, Truck } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"

const steps = [
  { icon: Gift, title: "Pick your gift", body: "Choose a frame, scrapbook or hamper — or build one from scratch." },
  { icon: Camera, title: "Share your story", body: "Upload photos, names and dates right on the product page. No more lost DMs." },
  { icon: PenLine, title: "We handcraft it", body: "Afreen’s studio designs every piece by hand and sends you a preview." },
  { icon: Truck, title: "Delivered with love", body: "Gift-wrapped with a handwritten note and shipped anywhere in India." },
]

export function HowItWorks() {
  return (
    <section className="kraft-texture relative">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading kicker="simple as 1, 2, 3, 4" title="How your gift comes to life" align="center" />
        <ol className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div aria-hidden className="absolute left-[12%] right-[12%] top-10 hidden border-t-2 border-dashed border-wine/25 lg:block" />
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <li className="relative h-full rounded-2xl bg-paper p-7 shadow-[0_18px_40px_-26px_rgb(58_26_32/0.6)]">
                <div className="flex items-center justify-between">
                  <span className="grid size-14 place-items-center rounded-full bg-blush text-maroon">
                    <s.icon className="size-6" />
                  </span>
                  <span className="font-display text-5xl text-wine/10">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-xl text-wine">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
