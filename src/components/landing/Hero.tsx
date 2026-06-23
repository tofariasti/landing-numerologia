import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FadeIn } from '../ui/AnimatedSection'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { PRACTITIONER, IMAGES } from '../../config/constants'
import { handleSectionNav } from '../../utils/scroll'
import { buildQuickWhatsAppUrl } from '../../utils/whatsapp'

export function Hero() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero__stars" aria-hidden="true">
        <span className="hero__star hero__star--1" />
        <span className="hero__star hero__star--2" />
        <span className="hero__star hero__star--3" />
        <span className="hero__star hero__star--4" />
      </div>

      <div className="hero__bg" aria-hidden="true">
        <img src={IMAGES.hero} alt="" loading="eager" />
        <div className="hero__overlay" />
      </div>

      <div className="container hero__content">
        <FadeIn>
          <span className="hero__badge">✦ {PRACTITIONER.city}</span>
          <h1 className="hero__title" id="hero-title">
            Os números revelam o caminho da sua <em>alma</em>
          </h1>
          <p className="hero__subtitle">
            {PRACTITIONER.name} — {PRACTITIONER.title}. Mapas numerológicos,
            ano pessoal e integração com astrologia em {PRACTITIONER.city}.
          </p>
          <div className="hero__ctas">
            <a
              href="#numerologia"
              className="btn btn--primary"
              onClick={(e) => handleSectionNav(e, 'numerologia')}
            >
              Calcular caminho de vida
            </a>
            <a
              href={buildQuickWhatsAppUrl(
                `Olá, ${PRACTITIONER.name}! Gostaria de agendar um mapa numerológico.`,
              )}
              className="btn btn--ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            <Link to="/app" className="btn btn--outline hero__demo-btn">
              Painel demo
            </Link>
          </div>
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-value">{PRACTITIONER.experienceYears}+</span>
              <span className="hero__stat-label">Anos de estudo</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-value">{PRACTITIONER.consultations}+</span>
              <span className="hero__stat-label">Consultas</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-value">{PRACTITIONER.mapsDelivered}+</span>
              <span className="hero__stat-label">Mapas entregues</span>
            </div>
          </div>
        </FadeIn>

        <motion.div
          className="hero__visual"
          initial={reducedMotion ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <div className="hero__card">
            <img
              src={IMAGES.heroCard}
              alt="Mesa com caderno de numerologia, cristais e números sagrados"
              loading="lazy"
            />
            <p>
              <strong>Relatórios completos</strong> com caminho de vida, missão
              e ciclos — presencial ou online.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
