import { createContext, useContext } from 'react'
import type { ClientsContextValue } from '../hooks/useClients'

export const ClientsContext = createContext<ClientsContextValue | null>(null)

export function useClientsContext() {
  const ctx = useContext(ClientsContext)
  if (!ctx) throw new Error('useClientsContext must be used within ClientsContext.Provider')
  return ctx
}
