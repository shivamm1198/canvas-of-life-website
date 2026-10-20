export const tiers = [
  { min: 25, off: 0.05, label: "25–49" },
  { min: 50, off: 0.1, label: "50–99" },
  { min: 100, off: 0.15, label: "100–249" },
  { min: 250, off: 0.2, label: "250+" },
]

export const tierFor = (qty: number) => [...tiers].reverse().find((t) => qty >= t.min) ?? tiers[0]

export const branding = [
  { id: "logo", label: "Logo printed on box & card", price: 49 },
  { id: "names", label: "Individual name tags", price: 29 },
  { id: "ribbon", label: "Custom brand-colour ribbon", price: 19 },
]
