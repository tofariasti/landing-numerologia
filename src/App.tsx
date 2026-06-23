import { HashRouter, Routes, Route } from 'react-router-dom'
import { useServices } from './hooks/useServices'
import { useClients } from './hooks/useClients'
import { ServicesContext } from './context/ServicesContext'
import { ClientsContext } from './context/ClientsContext'
import { LandingPage } from './pages/LandingPage'
import { AppLayout } from './components/app/AppLayout'
import { DashboardPage } from './pages/app/DashboardPage'
import { ClientsPage } from './pages/app/ClientsPage'
import { ClientDetailPage } from './pages/app/ClientDetailPage'
import { ServicesPage } from './pages/app/ServicesPage'
import { SettingsPage } from './pages/app/SettingsPage'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const servicesState = useServices()
  const clientsState = useClients()
  useTheme()

  return (
    <ServicesContext.Provider value={servicesState}>
      <ClientsContext.Provider value={clientsState}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="clientes" element={<ClientsPage />} />
              <Route path="clientes/:id" element={<ClientDetailPage />} />
              <Route path="servicos" element={<ServicesPage />} />
              <Route path="configuracoes" element={<SettingsPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </ClientsContext.Provider>
    </ServicesContext.Provider>
  )
}
