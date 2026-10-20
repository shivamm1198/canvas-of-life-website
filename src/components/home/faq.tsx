import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SectionHeading } from "@/components/section-heading"
import { whatsappLink } from "@/lib/whatsapp"

export const faqs = [
  {
    q: "How long does a personalised order take?",
    a: "Most frames, hampers and boxes ship in 3–6 days. Scrapbooks, albums and custom miniature shadow boxes take 6–10 days because every page and piece is made by hand. Need it sooner? Message us on WhatsApp and we’ll try our best.",
  },
  {
    q: "Do you deliver outside Mumbai?",
    a: "Yes — we deliver pan-India. Orders above ₹1,999 ship free, and Mumbai customers can choose express delivery.",
  },
  {
    q: "How do I send my photos and details?",
    a: "Right on the product page — upload photos, add names, dates and your message before adding to bag. You can also send them on WhatsApp after ordering.",
  },
  {
    q: "Will I see a preview before you make it?",
    a: "For scrapbooks, albums and custom frames we share a design preview on WhatsApp before we start crafting, so everything is exactly how you want it.",
  },
  {
    q: "Do you take corporate and bulk Diwali orders?",
    a: "Absolutely. We craft hampers for employees and clients from 25 units onwards, with logo branding and pan-India dispatch. Use the corporate gifting page for an instant estimate.",
  },
]

export function Faq() {
  return (
    <section id="faq" className="mx-auto grid max-w-7xl scroll-mt-24 gap-10 px-4 py-24 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
      <SectionHeading
        kicker="good questions"
        title="Before you order"
        sub={
          <>
            Can’t find what you’re looking for?{" "}
            <a href={whatsappLink("Hi! I have a question about an order.")} target="_blank" rel="noreferrer" className="text-maroon underline underline-offset-4">
              Chat with us on WhatsApp
            </a>
            .
          </>
        }
      />
      <Accordion className="w-full">
        {faqs.map((f) => (
          <AccordionItem key={f.q} value={f.q} className="border-border/80">
            <AccordionTrigger className="py-5 text-left font-display text-lg text-wine hover:no-underline">{f.q}</AccordionTrigger>
            <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
