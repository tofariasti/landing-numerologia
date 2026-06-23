import { AnimatedSection } from '../ui/AnimatedSection'

const TESTIMONIALS = [
  {
    name: 'Patrícia Lima',
    role: 'Advogada · Leão',
    text: 'A leitura do mapa natal trouxe clareza sobre minha carreira. Luna explica com profundidade e leveza.',
    rating: 5,
  },
  {
    name: 'Diego Martins',
    role: 'Designer · Escorpião',
    text: 'Fiz sinastria com minha parceira e saímos entendendo melhor nossos ciclos e diferenças.',
    rating: 5,
  },
  {
    name: 'Ana Beatriz',
    role: 'Psicóloga · Peixes',
    text: 'A revolução solar virou ritual de aniversário. Recomendo para quem busca autoconhecimento sério.',
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <AnimatedSection className="testimonials section section--alt" id="depoimentos" aria-labelledby="testimonials-title">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <span className="section-label">Depoimentos</span>
          <h2 className="section-title" id="testimonials-title">
            Quem já consultou com Luna
          </h2>
        </div>
        <div className="testimonials__grid">
          {TESTIMONIALS.map((t) => (
            <blockquote key={t.name} className="testimonial-card">
              <div className="testimonial-card__stars" aria-label={`${t.rating} de 5 estrelas`}>
                {'★'.repeat(t.rating)}
              </div>
              <p>&ldquo;{t.text}&rdquo;</p>
              <footer>
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
