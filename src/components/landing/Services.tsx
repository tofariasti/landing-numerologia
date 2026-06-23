import { AnimatedSection } from '../ui/AnimatedSection'
import { IMAGES } from '../../config/constants'

const SERVICE_CARDS = [
  {
    icon: '☉',
    title: 'Mapa natal completo',
    desc: 'Sol, Lua, Ascendente, casas e aspectos — a fotografia do seu céu no nascimento.',
    price: 'A partir de R$ 280',
  },
  {
    icon: '♡',
    title: 'Sinastria de casal',
    desc: 'Compatibilidade, desafios e linguagens afetivas entre duas cartas natais.',
    price: 'A partir de R$ 320',
  },
  {
    icon: '↻',
    title: 'Revolução solar',
    desc: 'Temas centrais e oportunidades para o seu ano pessoal que começa no aniversário.',
    price: 'A partir de R$ 220',
  },
  {
    icon: '☽',
    title: 'Trânsitos atuais',
    desc: 'Panorama dos movimentos planetários e janelas favoráveis do momento.',
    price: 'A partir de R$ 180',
  },
  {
    icon: '∞',
    title: 'Astrologia kármica',
    desc: 'Nodos lunares, Saturno e lições de alma para quem busca sentido mais profundo.',
    price: 'A partir de R$ 350',
  },
  {
    icon: '✦',
    title: 'Consulta expressa',
    desc: 'Uma pergunta objetiva com orientação prática em sessão de 30 minutos.',
    price: 'A partir de R$ 120',
  },
]

export function Services() {
  return (
    <AnimatedSection className="services section section--alt" id="servicos" aria-labelledby="services-title">
      <div className="container">
        <div className="services__header">
          <div>
            <span className="section-label">Serviços</span>
            <h2 className="section-title" id="services-title">
              Leituras para cada fase da sua jornada
            </h2>
            <p className="section-lead">
              Do primeiro contato com o mapa natal às previsões do ano — encontre
              o formato ideal para o que você busca agora.
            </p>
          </div>
          <div className="services__image">
            <img
              src={IMAGES.services}
              alt="Céu noturno estrelado com constelações visíveis acima de montanhas"
              loading="lazy"
            />
          </div>
        </div>
        <div className="services__grid">
          {SERVICE_CARDS.map((card) => (
            <article key={card.title} className="service-card">
              <span className="service-card__icon" aria-hidden="true">
                {card.icon}
              </span>
              <h3 className="service-card__title">{card.title}</h3>
              <p className="service-card__desc">{card.desc}</p>
              <p className="service-card__price">{card.price}</p>
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
