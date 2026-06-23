import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useClients } from '../hooks/useClients'
import { STORAGE_KEYS } from '../config/constants'

describe('useClients', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('loads seed clients', () => {
    const { result } = renderHook(() => useClients())
    expect(result.current.clients.length).toBeGreaterThan(0)
  })

  it('adds client with report', () => {
    const { result } = renderHook(() => useClients())
    let clientId = ''
    act(() => {
      const c = result.current.addClient({
        name: 'Test User',
        email: 't@test.demo',
        phone: '51999999999',
        birthDate: '1990-05-15',
        sunSign: 'touro',
        notes: '',
      })
      clientId = c.id
      result.current.addReport(clientId, {
        serviceId: 'svc-1',
        date: new Date().toISOString(),
        lifePathNumber: 3,
        status: 'agendado',
        notes: '',
      })
    })
    const client = result.current.getClient(clientId)
    expect(client?.reports.length).toBe(1)
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.clients)!)
    expect(stored.length).toBeGreaterThan(0)
  })
})
