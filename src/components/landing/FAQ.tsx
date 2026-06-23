import { useState } from 'react'
import { AnimatedSection } from '../ui/AnimatedSection'

const FAQ_ITEMS = [
  {
    q: 'Preciso saber minha hora de nascimento?',
    a: 'Para o mapa natal completo, sim — a hora define o Ascendente e as casas. Se não souber, podemos trabalhar com mapa solar ou retificação aproximada.',
  },
  {
    q: 'As consultas são online?',
    a: 'Sim. Atendo por videochamada para todo o Brasil. Presencial em Porto Alegre mediante agenda.',
  },
  {
    q: 'Astrologia prevê o futuro?',
    a: 'Trabalho com potenciais e ciclos, não com destino fixo. O mapa mostra tendências; suas escolhas constroem o caminho.',
  },
  {
    q: 'Quanto tempo dura uma sessão?',
    a: 'Mapa natal: 90 min. Sinastria e revolução solar: 60–90 min. Consulta expressa: 30 min.',
  },
  {
    q: 'Recebo material depois?',
    a: 'Sim. Gravação da sessão e PDF com os pontos principais da leitura.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <AnimatedSection className="faq section" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <span className="section-label">FAQ</span>
          <h2 className="section-title" id="faq-title">
            Perguntas frequentes
          </h2>
        </div>
        <div className="faq__list">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i
            const panelId = `faq-panel-${i}`
            return (
              <div key={item.q} className={`faq__item${isOpen ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="faq__question"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  {item.q}
                </button>
                <div id={panelId} className="faq__answer" hidden={!isOpen}>
                  <p>{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </AnimatedSection>
  )
}
