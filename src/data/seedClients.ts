import type { Client } from '../types/client'
import type { Report } from '../types/report'
import { calculateLifePath } from '../utils/numerology'

function createReport(
  serviceId: string,
  date: string,
  status: Report['status'],
  notes: string,
  birthDate: string,
): Report {
  return {
    id: crypto.randomUUID(),
    serviceId,
    date,
    lifePathNumber: calculateLifePath(birthDate) ?? 1,
    status,
    notes,
    createdAt: '2026-05-10T10:00:00.000Z',
  }
}

export const SEED_CLIENTS: Client[] = [
  {
    id: 'cli-1',
    name: 'Camila Ribeiro',
    email: 'camila.ribeiro@email.demo',
    phone: '(51) 99876-5432',
    birthDate: '1992-08-14',
    sunSign: 'leao',
    notes: 'Interesse em missão de vida e carreira.',
    createdAt: '2026-04-01T09:00:00.000Z',
    reports: [
      createReport('svc-1', '2026-06-28T14:00:00', 'agendado', 'Mapa numerológico completo', '1992-08-14'),
      createReport('svc-2', '2026-05-20T10:00:00', 'entregue', 'Caminho de vida + ano pessoal', '1992-08-14'),
    ],
  },
  {
    id: 'cli-2',
    name: 'Rafael Mendes',
    email: 'rafael.mendes@email.demo',
    phone: '(51) 98765-4321',
    birthDate: '1988-11-03',
    sunSign: 'escorpiao',
    notes: 'Casal — sinastria numerológica.',
    createdAt: '2026-05-12T14:00:00.000Z',
    reports: [
      createReport('svc-3', '2026-06-20T16:00:00', 'em_analise', 'Compatibilidade numerológica', '1988-11-03'),
    ],
  },
  {
    id: 'cli-3',
    name: 'Helena Souza',
    email: 'helena.s@email.demo',
    phone: '(51) 97654-3210',
    birthDate: '1995-02-28',
    sunSign: 'peixes',
    notes: 'Busca propósito espiritual.',
    createdAt: '2026-06-01T10:00:00.000Z',
    reports: [
      createReport('svc-4', '2026-06-25T11:00:00', 'entregue', 'Mapa + mapa astral integrado', '1995-02-28'),
    ],
  },
]
