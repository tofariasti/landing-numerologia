import { AnimatedSection } from '../ui/AnimatedSection'
import { PRACTITIONER, IMAGES } from '../../config/constants'

export function About() {
  return (
    <AnimatedSection className="about section" id="sobre" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__media">
          <img
            src={IMAGES.about}
            alt="Numeróloga em consulta acolhedora com mapa astral aberto sobre a mesa"
            loading="lazy"
          />
          <div className="about__badge">
            <span>Desde 2012</span>
            <strong>+{PRACTITIONER.experienceYears} anos</strong>
            estudando os céus
          </div>
        </div>
        <div className="about__content">
          <span className="section-label">Sobre</span>
          <h2 className="section-title" id="about-title">
            Astrologia como ferramenta de autoconhecimento
          </h2>
          <p className="section-lead">
            Sou {PRACTITIONER.name}, {PRACTITIONER.title.toLowerCase()}. Traduço o
            linguajar dos astros em orientações práticas para decisões, relações
            e propósito de vida.
          </p>
          <ul className="about__features">
            <li>
              <strong>Humanizada</strong> — escuta ativa antes de cada leitura
            </li>
            <li>
              <strong>Técnica</strong> — formação em numerologia helenística e psicológica
            </li>
            <li>
              <strong>Ética</strong> — sem previsões fatalistas; foco em potencial e escolha
            </li>
            <li>
              <strong>Acessível</strong> — sessões online para todo o Brasil
            </li>
          </ul>
        </div>
      </div>
    </AnimatedSection>
  )
}
