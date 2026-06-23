import { Link } from 'react-router-dom'
import { useClientsContext } from '../../context/ClientsContext'
import { useServicesContext } from '../../context/ServicesContext'
import { STATUS_LABELS } from '../../types/report'
import { formatCurrency, formatDateTime } from '../../utils/format'
import { calculateLifePath } from '../../utils/numerology'

export function DashboardPage() {
  const { clients } = useClientsContext()
  const { services } = useServicesContext()

  const totalReports = clients.reduce((sum, c) => sum + c.reports.length, 0)
  const pending = clients
    .flatMap((c) => c.reports.filter((r) => r.status === 'agendado' || r.status === 'em_analise'))
    .length

  const upcomingReports = clients
    .flatMap((c) =>
      c.reports
        .filter((r) => r.status === 'agendado')
        .map((r) => ({ client: c, report: r })),
    )
    .sort((a, b) => (a.report.date > b.report.date ? 1 : -1))
    .slice(0, 6)

  const activeServices = services.filter((s) => s.active).length
  const revenue = clients
    .flatMap((c) => c.reports)
    .reduce((sum, r) => {
      const service = services.find((svc) => svc.id === r.serviceId)
      return sum + (service?.price ?? 0)
    }, 0)

  return (
    <>
      <header className="app-header">
        <div>
          <h1 className="app-header__title">Dashboard</h1>
          <p className="app-header__subtitle">Visão geral da consultoria demo</p>
        </div>
        <Link to="/app/clientes" className="btn btn--primary btn--sm">
          + Novo cliente
        </Link>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card__value">{clients.length}</div>
          <div className="stat-card__label">Clientes</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__value">{totalReports}</div>
          <div className="stat-card__label">Relatórios</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__value">{activeServices}</div>
          <div className="stat-card__label">Serviços ativos</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__value">{pending}</div>
          <div className="stat-card__label">Em andamento</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel__header">
          <h2 className="panel__title">Receita demo</h2>
        </div>
        <p className="dashboard-revenue">{formatCurrency(revenue)}</p>
      </div>

      <div className="panel">
        <div className="panel__header">
          <h2 className="panel__title">Próximos relatórios</h2>
        </div>
        {upcomingReports.length === 0 ? (
          <p>Nenhum relatório agendado.</p>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Caminho</th>
                  <th>Status</th>
                  <th>Data</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {upcomingReports.map(({ client, report }) => (
                  <tr key={report.id}>
                    <td>{client.name}</td>
                    <td>{calculateLifePath(client.birthDate) ?? report.lifePathNumber}</td>
                    <td>{STATUS_LABELS[report.status]}</td>
                    <td>{formatDateTime(report.date)}</td>
                    <td>
                      <Link to={`/app/clientes/${client.id}`} className="btn btn--outline btn--sm">
                        Ver ficha
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
