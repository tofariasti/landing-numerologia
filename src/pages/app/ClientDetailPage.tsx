import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useClientsContext } from '../../context/ClientsContext'
import { useServicesContext } from '../../context/ServicesContext'
import type { Report, ReportStatus } from '../../types/report'
import { STATUS_LABELS } from '../../types/report'
import { formatCurrency, formatDateTime } from '../../utils/format'
import { calculateLifePath } from '../../utils/numerology'

const EMPTY_REPORT = {
  serviceId: '',
  date: '',
  lifePathNumber: 1,
  status: 'agendado' as ReportStatus,
  notes: '',
}

export function ClientDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { getClient, addReport, updateReport, deleteReport } = useClientsContext()
  const { services } = useServicesContext()
  const client = id ? getClient(id) : undefined

  const [showForm, setShowForm] = useState(false)
  const [editingReport, setEditingReport] = useState<Report | null>(null)
  const [reportForm, setReportForm] = useState(EMPTY_REPORT)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!client) {
    return (
      <div className="panel">
        <p>Cliente não encontrado.</p>
        <Link to="/app/clientes">← Voltar</Link>
      </div>
    )
  }

  const lifePath = calculateLifePath(client.birthDate)

  function openForm(report?: Report) {
    setShowForm(true)
    setErrors({})
    if (report) {
      setEditingReport(report)
      setReportForm({
        serviceId: report.serviceId,
        date: report.date.slice(0, 16),
        lifePathNumber: report.lifePathNumber,
        status: report.status,
        notes: report.notes,
      })
    } else {
      setEditingReport(null)
      setReportForm({
        ...EMPTY_REPORT,
        lifePathNumber: lifePath ?? 1,
      })
    }
  }

  function closeForm() {
    setShowForm(false)
    setEditingReport(null)
    setReportForm(EMPTY_REPORT)
    setErrors({})
  }

  function saveReport(e: React.FormEvent) {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!reportForm.serviceId) newErrors.serviceId = 'Selecione um serviço.'
    if (!reportForm.date) newErrors.date = 'Informe data e hora.'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const payload = {
      serviceId: reportForm.serviceId,
      date: new Date(reportForm.date).toISOString(),
      lifePathNumber: reportForm.lifePathNumber,
      status: reportForm.status,
      notes: reportForm.notes,
    }

    if (editingReport) {
      updateReport(client!.id, { ...editingReport, ...payload })
    } else {
      addReport(client!.id, payload)
    }
    closeForm()
  }

  function handleDeleteReport(reportId: string) {
    if (window.confirm('Excluir este relatório?')) {
      deleteReport(client!.id, reportId)
    }
  }

  return (
    <>
      <header className="app-header">
        <div>
          <h1 className="app-header__title">{client.name}</h1>
          <p className="app-header__subtitle">
            Caminho de vida: {lifePath ?? '—'} · {client.birthDate.split('-').reverse().join('/')}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Link to="/app/clientes" className="btn btn--outline btn--sm">← Clientes</Link>
          <button type="button" className="btn btn--primary btn--sm" onClick={() => openForm()}>
            + Novo relatório
          </button>
        </div>
      </header>

      <div className="panel">
        <h2 className="panel__title">Dados do cliente</h2>
        <p><strong>E-mail:</strong> {client.email || '—'}</p>
        <p><strong>Telefone:</strong> {client.phone || '—'}</p>
        <p><strong>Observações:</strong> {client.notes || '—'}</p>
      </div>

      <div className="panel">
        <div className="panel__header">
          <h2 className="panel__title">Relatórios ({client.reports.length})</h2>
        </div>
        {client.reports.length === 0 ? (
          <p>Nenhum relatório cadastrado.</p>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Serviço</th>
                  <th>Data</th>
                  <th>Nº caminho</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {client.reports.map((report) => {
                  const service = services.find((s) => s.id === report.serviceId)
                  return (
                    <tr key={report.id}>
                      <td>{service?.name ?? '—'}</td>
                      <td>{formatDateTime(report.date)}</td>
                      <td>{report.lifePathNumber}</td>
                      <td>{STATUS_LABELS[report.status]}</td>
                      <td>
                        <div className="table-actions">
                          <button type="button" className="btn btn--outline btn--sm" onClick={() => openForm(report)}>
                            Editar
                          </button>
                          <button type="button" className="btn btn--danger btn--sm" onClick={() => handleDeleteReport(report.id)}>
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="report-title">
          <form className="modal" onSubmit={saveReport}>
            <h2 id="report-title" className="modal__title">
              {editingReport ? 'Editar relatório' : 'Novo relatório'}
            </h2>
            <div className="form-group">
              <label htmlFor="r-service">Serviço *</label>
              <select
                id="r-service"
                value={reportForm.serviceId}
                onChange={(e) => setReportForm({ ...reportForm, serviceId: e.target.value })}
              >
                <option value="">Selecione...</option>
                {services.filter((s) => s.active).map((s) => (
                  <option key={s.id} value={s.id}>{s.name} — {formatCurrency(s.price)}</option>
                ))}
              </select>
              {errors.serviceId && <p className="form-error" role="alert">{errors.serviceId}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="r-date">Data e hora *</label>
              <input
                id="r-date"
                type="datetime-local"
                value={reportForm.date}
                onChange={(e) => setReportForm({ ...reportForm, date: e.target.value })}
              />
              {errors.date && <p className="form-error" role="alert">{errors.date}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="r-lp">Número do caminho de vida</label>
              <input
                id="r-lp"
                type="number"
                min="1"
                max="33"
                value={reportForm.lifePathNumber}
                onChange={(e) => setReportForm({ ...reportForm, lifePathNumber: parseInt(e.target.value, 10) || 1 })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="r-status">Status</label>
              <select
                id="r-status"
                value={reportForm.status}
                onChange={(e) => setReportForm({ ...reportForm, status: e.target.value as ReportStatus })}
              >
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="r-notes">Observações</label>
              <textarea
                id="r-notes"
                rows={3}
                value={reportForm.notes}
                onChange={(e) => setReportForm({ ...reportForm, notes: e.target.value })}
              />
            </div>
            <div className="modal__actions">
              <button type="button" className="btn btn--outline" onClick={closeForm}>Cancelar</button>
              <button type="submit" className="btn btn--primary">Salvar</button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
