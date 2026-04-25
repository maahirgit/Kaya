import { MessageCircle } from 'lucide-react'

export default function FloatingWhatsApp() {
  return (
    <a href="https://wa.me/919601127234" className="floating-wa" aria-label="WhatsApp Us" target="_blank" rel="noreferrer">
      <MessageCircle className="wa-icon" />
    </a>
  )
}
