import Link from "next/link"
import { MapPin, MessageCircle } from "lucide-react"
import { InstagramIcon as Instagram } from "@/components/icons"
import { Logo } from "./logo"
import { NewsletterForm } from "./newsletter-form"
import { categories } from "@/lib/products"
import { site } from "@/lib/site"
import { whatsappLink } from "@/lib/whatsapp"

export function Footer() {
  return (
    <footer className="mt-24 bg-wine text-paper/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div className="space-y-5">
          <Logo light />
          <p className="max-w-xs text-sm leading-relaxed">{site.description}</p>
          <div className="flex gap-3">
            <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-10 place-items-center rounded-full border border-paper/20 hover:bg-paper/10">
              <Instagram className="size-4" />
            </a>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid size-10 place-items-center rounded-full border border-paper/20 hover:bg-paper/10">
              <MessageCircle className="size-4" />
            </a>
          </div>
          <p className="flex items-center gap-2 text-sm">
            <MapPin className="size-4 text-gold" /> Handmade in {site.city} · Pan-India delivery
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg text-paper">Shop</h3>
          <ul className="space-y-2.5 text-sm">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/shop?category=${c.id}`} className="hover:text-gold-soft">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg text-paper">Help</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/build-a-hamper" className="hover:text-gold-soft">Build a hamper</Link></li>
            <li><Link href="/corporate" className="hover:text-gold-soft">Corporate & bulk orders</Link></li>
            <li><Link href="/about" className="hover:text-gold-soft">Our story</Link></li>
            <li><Link href="/#faq" className="hover:text-gold-soft">FAQs</Link></li>
            <li><a href={whatsappLink("Hi! I need help with an order.")} target="_blank" rel="noreferrer" className="hover:text-gold-soft">Chat on WhatsApp</a></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 font-display text-lg text-paper">Letters from the studio</h3>
          <p className="mb-4 text-sm">New drops, festive collections and early access — once a month, never spam.</p>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-paper/50 sm:flex-row sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} {site.name} by {site.founder}. All rights reserved.</p>
          <p>{site.demoNotice}</p>
        </div>
      </div>
    </footer>
  )
}
