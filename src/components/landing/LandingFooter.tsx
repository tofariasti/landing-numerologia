import { PRACTITIONER } from '../../config/constants'
import { handleSectionNav } from '../../utils/scroll'

export function LandingFooter() {
  return (
    <footer className="landing-footer">
      <div className="container">
        <div className="landing-footer__grid">
          <div>
            <div className="landing-footer__brand">{PRACTITIONER.name}</div>
            <p>
              {PRACTITIONER.tagline}
              <br />
              {PRACTITIONER.title} em {PRACTITIONER.city}.
            </p>
          </div>
          <div>
            <strong>Links rápidos</strong>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.75rem' }}>
              <li>
                <a href="#sobre" onClick={(e) => handleSectionNav(e, 'sobre')}>Sobre</a>
              </li>
              <li>
                <a href="#numerologia" onClick={(e) => handleSectionNav(e, 'numerologia')}>Meu numerologia</a>
              </li>
              <li>
                <a href="#contato" onClick={(e) => handleSectionNav(e, 'contato')}>Contato</a>
              </li>
            </ul>
          </div>
          <div>
            <strong>Horário</strong>
            <p style={{ marginTop: '0.75rem' }}>{PRACTITIONER.hours}</p>
          </div>
        </div>
        <div className="landing-footer__bottom">
          <span>© {new Date().getFullYear()} {PRACTITIONER.name}. Demo fictícia.</span>
          <span>
            Desenvolvido por{' '}
            <a href="https://fariasdigital.com.br/" target="_blank" rel="noopener noreferrer">
              Farias Digital
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
