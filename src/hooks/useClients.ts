import { useCallback, useEffect, useState } from 'react'
import { SEED_CLIENTS } from '../data/seedClients'
import { STORAGE_KEYS } from '../config/constants'
import type { Client, ClientInput } from '../types/client'
import type { Report, ReportInput } from '../types/report'
import { calculateLifePath } from '../utils/numerology'

function loadClients(): Client[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.clients)
    if (!raw) return SEED_CLIENTS
    const parsed = JSON.parse(raw) as Client[]
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SEED_CLIENTS
  } catch {
    return SEED_CLIENTS
  }
}

function persistClients(clients: Client[]) {
  localStorage.setItem(STORAGE_KEYS.clients, JSON.stringify(clients))
}

export function useClients() {
  const [clients, setClients] = useState<Client[]>(() => loadClients())

  useEffect(() => {
    persistClients(clients)
  }, [clients])

  const addClient = useCallback((input: ClientInput) => {
    const client: Client = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      reports: input.reports ?? [],
    }
    setClients((prev) => [...prev, client])
    return client
  }, [])

  const updateClient = useCallback((id: string, updates: Partial<Client>) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    )
  }, [])

  const deleteClient = useCallback((id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id))
  }, [])

  const getClient = useCallback(
    (id: string) => clients.find((c) => c.id === id),
    [clients],
  )

  const addReport = useCallback((clientId: string, report: ReportInput) => {
    const newReport: Report = {
      ...report,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    setClients((prev) =>
      prev.map((c) =>
        c.id === clientId ? { ...c, reports: [...c.reports, newReport] } : c,
      ),
    )
    return newReport
  }, [])

  const updateReport = useCallback((clientId: string, report: Report) => {
    setClients((prev) =>
      prev.map((c) => {
        if (c.id !== clientId) return c
        const reports = c.reports.some((r) => r.id === report.id)
          ? c.reports.map((r) => (r.id === report.id ? report : r))
          : [...c.reports, report]
        return { ...c, reports }
      }),
    )
  }, [])

  const deleteReport = useCallback((clientId: string, reportId: string) => {
    setClients((prev) =>
      prev.map((c) =>
        c.id === clientId
          ? { ...c, reports: c.reports.filter((r) => r.id !== reportId) }
          : c,
      ),
    )
  }, [])

  const resetClients = useCallback(() => {
    setClients(SEED_CLIENTS)
  }, [])

  return {
    clients,
    addClient,
    updateClient,
    deleteClient,
    getClient,
    addReport,
    updateReport,
    deleteReport,
    resetClients,
    calculateLifePath,
  }
}

export type ClientsContextValue = ReturnType<typeof useClients>
