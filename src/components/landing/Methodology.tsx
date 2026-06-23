import { AnimatedSection } from '../ui/AnimatedSection'
import { IMAGES } from '../../config/constants'

const STEPS = [
  {
    step: '01',
    title: 'Agendamento',
    desc: 'Você envia data, hora e local de nascimento. Confirmamos horário e formato (online ou presencial).',
  },
  {
    step: '02',
    title: 'Preparação',
    desc: 'Monto sua carta com software profissional e preparo os temas centrais da leitura.',
  },
  {
    step: '03',
    title: 'Sessão ao vivo',
    desc: 'Consulta de 50–90 min com espaço para perguntas. Você recebe gravação e PDF de apoio.',
  },
]

export function Methodology() {
  return (
    <AnimatedSection className="methodology section" id="metodologia" aria-labelledby="methodology-title">
      <div className="container methodology__grid">
        <div className="methodology__media">
          <img
            src={IMAGES.methodology}
            alt="Mapa do céu noturno projetado em tela durante consulta de numerologia"
            loading="lazy"
          />
        </div>
        <div>
          <span className="section-label">Metodologia</span>
          <h2 className="section-title" id="methodology-title">
            Como funciona uma consulta
          </h2>
          <p className="section-lead">
            Processo claro, acolhedor e focado em você — do agendamento ao
            material pós-sessão.
          </p>
          <ol className="methodology__steps">
            {STEPS.map((item) => (
              <li key={item.step} className="methodology__step">
                <span className="methodology__step-num">{item.step}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </AnimatedSection>
  )
}
