export type ReportStatus = 'agendado' | 'em_analise' | 'entregue'

export interface Report {
  id: string
  serviceId: string
  date: string
  lifePathNumber: number
  status: ReportStatus
  notes: string
  createdAt: string
}

export type ReportInput = Omit<Report, 'id' | 'createdAt'>

export const STATUS_LABELS: Record<ReportStatus, string> = {
  agendado: 'Agendado',
  em_analise: 'Em análise',
  entregue: 'Entregue',
}
