import { describe, it, expect } from 'vitest'
import { validateContactForm, buildWhatsAppMessage } from '../utils/whatsapp'

const validForm = {
  nome: 'Maria Silva',
  telefone: '(51) 99999-9999',
  email: 'maria@email.com',
  servico: 'Mapa natal completo',
  dataNascimento: '1990-05-15',
  mensagem: 'Quero agendar',
}

describe('whatsapp', () => {
  it('validates required fields', () => {
    const errors = validateContactForm({
      nome: '',
      telefone: '',
      email: '',
      servico: '',
      dataNascimento: '',
      mensagem: '',
    })
    expect(errors.nome).toBeDefined()
    expect(errors.telefone).toBeDefined()
    expect(errors.servico).toBeDefined()
    expect(errors.dataNascimento).toBeDefined()
  })

  it('builds structured message', () => {
    const msg = buildWhatsAppMessage(validForm)
    expect(msg).toContain('*Nome:* Maria Silva')
    expect(msg).toContain('Mapa natal completo')
    expect(msg).toContain('1990-05-15')
    expect(msg).toContain('Quero agendar')
  })
})
