const messages = [
  "✨ Diwali 2026 — open for corporate & festive orders",
  "🚚 Pan-India delivery from Mumbai",
  `💌 Free shipping above ₹1,999`,
  "🎁 20,000+ happy orders & counting",
  "🏢 Bulk gifting from 25 units",
]

export function AnnouncementBar() {
  const row = [...messages, ...messages]
  return (
    <div className="overflow-hidden bg-wine text-[0.8rem] text-gold-soft">
      <div className="flex w-max animate-marquee gap-12 py-2 hover:[animation-play-state:paused]">
        {row.map((m, i) => (
          <span key={i} className="whitespace-nowrap tracking-wide">
            {m}
          </span>
        ))}
      </div>
    </div>
  )
}
