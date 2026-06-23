import { useState } from 'react'
import { AnimatedSection } from '../ui/AnimatedSection'
import { PRACTITIONER, WHATSAPP_NUMBER } from '../../config/constants'
import { buildWhatsAppUrl, validateContactForm, type ContactFormData } from '../../utils/whatsapp'

const INITIAL: ContactFormData = {
  nome: '',
  telefone: '',
  email: '',
  servico: '',
  dataNascimento: '',
  mensagem: '',
}

export function Contact() {
  const [form, setForm] = useState<ContactFormData>(INITIAL)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validationErrors = validateContactForm(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setSuccess(false)
      return
    }
    window.open(buildWhatsAppUrl(form), '_blank', 'noopener,noreferrer')
    setSuccess(true)
    setForm(INITIAL)
  }

  return (
    <AnimatedSection className="contact section" id="contato" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div>
          <span className="section-label">Contato</span>
          <h2 className="section-title" id="contact-title">
            Agende sua consulta
          </h2>
          <p className="section-lead">
            Preencha o formulário e envie sua mensagem diretamente pelo WhatsApp.
          </p>

          <div className="contact__info-item">
            <div className="contact__info-icon" aria-hidden="true">📍</div>
            <div>
              <strong>Atendimento</strong>
              <p>{PRACTITIONER.address} — {PRACTITIONER.city}</p>
            </div>
          </div>
          <div className="contact__info-item">
            <div className="contact__info-icon" aria-hidden="true">📞</div>
            <div>
              <strong>Telefone</strong>
              <p>{PRACTITIONER.phone}</p>
            </div>
          </div>
          <div className="contact__info-item">
            <div className="contact__info-icon" aria-hidden="true">🕐</div>
            <div>
              <strong>Horário</strong>
              <p>{PRACTITIONER.hours}</p>
            </div>
          </div>
        </div>

        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          {success && (
            <div className="form-alert" role="alert">
              Mensagem preparada! Complete o envio no WhatsApp.
            </div>
          )}

          <div className="form-group">
            <label htmlFor="nome">Nome completo *</label>
            <input
              id="nome"
              name="nome"
              type="text"
              value={form.nome}
              onChange={handleChange}
              required
              aria-invalid={!!errors.nome}
            />
            {errors.nome && <p className="form-error" role="alert">{errors.nome}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone / WhatsApp *</label>
            <input
              id="telefone"
              name="telefone"
              type="tel"
              value={form.telefone}
              onChange={handleChange}
              required
              aria-invalid={!!errors.telefone}
            />
            {errors.telefone && <p className="form-error" role="alert">{errors.telefone}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="form-error" role="alert">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="servico">Serviço de interesse *</label>
            <select
              id="servico"
              name="servico"
              value={form.servico}
              onChange={handleChange}
              required
              aria-invalid={!!errors.servico}
            >
              <option value="">Selecione...</option>
              <option value="Mapa natal completo">Mapa natal completo</option>
              <option value="Sinastria de casal">Sinastria de casal</option>
              <option value="Revolução solar">Revolução solar</option>
              <option value="Trânsitos atuais">Trânsitos atuais</option>
              <option value="Astrologia kármica">Astrologia kármica</option>
              <option value="Consulta expressa">Consulta expressa</option>
            </select>
            {errors.servico && <p className="form-error" role="alert">{errors.servico}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="dataNascimento">Data de nascimento *</label>
            <input
              id="dataNascimento"
              name="dataNascimento"
              type="date"
              value={form.dataNascimento}
              onChange={handleChange}
              required
              aria-invalid={!!errors.dataNascimento}
            />
            {errors.dataNascimento && (
              <p className="form-error" role="alert">{errors.dataNascimento}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="mensagem">Mensagem adicional</label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows={3}
              value={form.mensagem}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn--primary" style={{ width: '100%' }}>
            Enviar via WhatsApp
          </button>
        </form>
      </div>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá, ${PRACTITIONER.name}! Gostaria de agendar uma consulta de numerologia.`)}`}
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </AnimatedSection>
  )
}
