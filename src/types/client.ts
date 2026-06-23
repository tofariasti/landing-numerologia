import type { ZodiacSign } from '../utils/zodiac'
import type { Report } from './report'

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  birthDate: string
  sunSign: ZodiacSign
  notes: string
  createdAt: string
  reports: Report[]
}

export type ClientInput = Omit<Client, 'id' | 'createdAt' | 'reports'> & {
  reports?: Report[]
}
