import { Hero } from "@/components/home/hero"
import { Highlights } from "@/components/home/highlights"
import { Bestsellers } from "@/components/home/bestsellers"
import { DiwaliBand } from "@/components/home/diwali-band"
import { Spotlight } from "@/components/home/spotlight"
import { Occasions } from "@/components/home/occasions"
import { HowItWorks } from "@/components/home/how-it-works"
import { HamperPromo } from "@/components/home/hamper-promo"
import { Reviews } from "@/components/home/reviews"
import { InstagramStrip } from "@/components/home/instagram-strip"
import { Faq, faqs } from "@/components/home/faq"
import { site } from "@/lib/site"

export default function Home() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Store",
      name: site.name,
      founder: site.founder,
      description: site.description,
      address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "IN" },
      sameAs: [site.instagram],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Highlights />
      <Bestsellers />
      <DiwaliBand />
      <Spotlight />
      <Occasions />
      <HowItWorks />
      <HamperPromo />
      <Reviews />
      <InstagramStrip />
      <Faq />
    </>
  )
}
