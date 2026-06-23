export type ServiceCategory = 'numerologia' | 'mapa_astral' | 'relacionamento' | 'previsao'

export interface Service {
  id: string
  name: string
  category: ServiceCategory
  price: number
  durationMinutes: number
  description: string
  active: boolean
}

export type ServiceInput = Omit<Service, 'id'>

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  numerologia: 'Numerologia',
  mapa_astral: 'Mapa astral',
  relacionamento: 'Relacionamentos',
  previsao: 'Previsões',
}
