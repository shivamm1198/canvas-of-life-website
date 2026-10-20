import { Quote, Star } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { reviews } from "@/lib/reviews"

export function Reviews() {
  return (
    <section className="bg-card/60 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          kicker="20,000+ happy orders"
          title="Little notes from our people"
          sub="Reviews below are samples — the live site would pull real ones from your Instagram ‘Reviews’ highlights."
          align="center"
        />
        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 0.08} className="break-inside-avoid">
              <figure className="rounded-2xl border border-border/70 bg-paper p-6">
                <div className="flex items-center justify-between">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="size-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <Quote className="size-6 text-blush" />
                </div>
                <blockquote className="mt-4 leading-relaxed text-ink/90">{r.text}</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-blush font-display text-maroon">{r.name[0]}</span>
                  <span>
                    <span className="block text-sm font-medium">{r.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {r.city} · {r.product}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
