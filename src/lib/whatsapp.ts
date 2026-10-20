import { site } from "./site"

export const whatsappLink = (message?: string) => {
  const base = `https://wa.me/${site.whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
