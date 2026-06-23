import { WHATSAPP_NUMBER, PRACTITIONER } from '../config/constants'

export interface ContactFormData {
  nome: string
  telefone: string
  email: string
  servico: string
  dataNascimento: string
  mensagem: string
}

export function validateContactForm(data: ContactFormData): Record<string, string> {
  const errors: Record<string, string> = {}

  if (!data.nome.trim()) errors.nome = 'Informe seu nome.'
  if (!data.telefone.trim()) errors.telefone = 'Informe seu telefone.'
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'E-mail inválido.'
  }
  if (!data.servico) errors.servico = 'Selecione um serviço.'
  if (!data.dataNascimento?.trim()) errors.dataNascimento = 'Informe sua data de nascimento.'

  return errors
}

export function buildWhatsAppMessage(data: ContactFormData): string {
  const lines = [
    `Olá, ${PRACTITIONER.name}! Gostaria de agendar uma consulta.`,
    '',
    `*Nome:* ${data.nome.trim()}`,
    `*Telefone:* ${data.telefone.trim()}`,
  ]

  if (data.email.trim()) lines.push(`*E-mail:* ${data.email.trim()}`)
  lines.push(`*Serviço:* ${data.servico}`)
  lines.push(`*Data de nascimento:* ${data.dataNascimento}`)
  if (data.mensagem.trim()) lines.push(`*Mensagem:* ${data.mensagem.trim()}`)

  return lines.join('\n')
}

export function buildWhatsAppUrl(data: ContactFormData): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(data))}`
}

export function buildQuickWhatsAppUrl(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

export function buildLifePathWhatsAppUrl(number: number, birthDate: string): string {
  const text = `Olá, ${PRACTITIONER.name}! Meu número do caminho de vida é *${number}* (nascimento: ${birthDate}). Gostaria de agendar um mapa numerológico completo.`
  return buildQuickWhatsAppUrl(text)
}
