import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from '../ui/AnimatedSection'
import {
  calculateLifePath,
  formatLifePathResult,
  validateBirthDate,
} from '../../utils/numerology'
import { buildLifePathWhatsAppUrl } from '../../utils/whatsapp'

export function LifePathCalculator() {
  const [birthDate, setBirthDate] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ReturnType<typeof formatLifePathResult> | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validationError = validateBirthDate(birthDate)
    if (validationError) {
      setError(validationError)
      setResult(null)
      return
    }
    const number = calculateLifePath(birthDate)!
    setError(null)
    setResult(formatLifePathResult(number))
  }

  return (
    <AnimatedSection className="life-path section" id="numerologia">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <span className="section-label">Ferramenta interativa</span>
          <h2 className="section-title">Calcule seu número do caminho de vida</h2>
          <p className="section-lead" style={{ marginInline: 'auto' }}>
            Informe sua data de nascimento e descubra o número que revela missão,
            talentos e desafios da sua alma.
          </p>
        </div>

        <form className="life-path__form" onSubmit={handleSubmit} aria-labelledby="life-path-title">
          <h3 id="life-path-title" className="visually-hidden">
            Calculadora do caminho de vida
          </h3>
          <div className="form-group">
            <label htmlFor="birth-date">Data de nascimento</label>
            <input
              id="birth-date"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              aria-describedby={error ? 'lp-error' : undefined}
            />
          </div>

          {error && (
            <p id="lp-error" className="form-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="btn btn--primary" style={{ width: '100%' }}>
            Revelar meu número
          </button>

          <AnimatePresence>
            {result && (
              <motion.div
                className="life-path-result"
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="life-path-result__number" aria-hidden="true">
                  {result.number}
                </div>
                <div className="life-path-result__title">{result.title}</div>
                <p className="life-path-result__text">{result.text}</p>
                <a
                  href={buildLifePathWhatsAppUrl(result.number, birthDate)}
                  className="btn btn--outline"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: '1rem', width: '100%' }}
                >
                  Agendar mapa completo via WhatsApp
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </AnimatedSection>
  )
}
