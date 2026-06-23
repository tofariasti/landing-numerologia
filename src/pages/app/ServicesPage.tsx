import { useMemo, useState } from 'react'
import { useServicesContext } from '../../context/ServicesContext'
import type { ServiceInput, ServiceCategory } from '../../types/service'
import { CATEGORY_LABELS } from '../../types/service'
import { formatCurrency } from '../../utils/format'

const EMPTY: ServiceInput = {
  name: '',
  category: 'numerologia',
  price: 0,
  durationMinutes: 60,
  description: '',
  active: true,
}

export function ServicesPage() {
  const { services, addService, updateService, deleteService } = useServicesContext()
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [form, setForm] = useState<ServiceInput>(EMPTY)
  const [error, setError] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return services
    return services.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        CATEGORY_LABELS[s.category].toLowerCase().includes(q),
    )
  }, [services, search])

  function openModal(serviceId?: string) {
    setShowModal(true)
    setError('')
    if (serviceId) {
      const service = services.find((s) => s.id === serviceId)
      if (service) {
        setEditingId(serviceId)
        setForm({
          name: service.name,
          category: service.category,
          price: service.price,
          durationMinutes: service.durationMinutes,
          description: service.description,
          active: service.active,
        })
      }
    } else {
      setEditingId(null)
      setForm(EMPTY)
    }
  }

  function closeModal() {
    setShowModal(false)
    setEditingId(null)
    setForm(EMPTY)
    setError('')
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('Nome é obrigatório.')
      return
    }
    if (form.price <= 0) {
      setError('Informe um preço válido.')
      return
    }
    if (editingId) {
      updateService(editingId, form)
    } else {
      addService(form)
    }
    closeModal()
  }

  function handleDelete(id: string, name: string) {
    if (window.confirm(`Excluir serviço ${name}?`)) {
      deleteService(id)
    }
  }

  return (
    <>
      <header className="app-header">
        <div>
          <h1 className="app-header__title">Serviços</h1>
          <p className="app-header__subtitle">{services.length} consultas cadastradas</p>
        </div>
        <button type="button" className="btn btn--primary btn--sm" onClick={() => openModal()}>
          + Novo serviço
        </button>
      </header>

      <div className="panel">
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label htmlFor="search-services">Buscar</label>
          <input
            id="search-services"
            type="search"
            placeholder="Nome, categoria ou descrição..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Serviço</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Duração</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td>
                    <strong>{s.name}</strong>
                    <br />
                    <small style={{ color: 'var(--color-text-muted)' }}>{s.description}</small>
                  </td>
                  <td>{CATEGORY_LABELS[s.category]}</td>
                  <td>{formatCurrency(s.price)}</td>
                  <td>{s.durationMinutes} min</td>
                  <td>{s.active ? 'Ativo' : 'Inativo'}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        type="button"
                        className="btn btn--outline btn--sm"
                        onClick={() => openModal(s.id)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn--danger btn--sm"
                        onClick={() => handleDelete(s.id, s.name)}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="svc-modal-title">
          <form className="modal" onSubmit={handleSubmit}>
            <h2 id="svc-modal-title" className="modal__title">
              {editingId ? 'Editar serviço' : 'Novo serviço'}
            </h2>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <div className="form-group">
              <label htmlFor="s-name">Nome *</label>
              <input
                id="s-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="s-category">Categoria</label>
                <select
                  id="s-category"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value as ServiceCategory })
                  }
                >
                  {(Object.keys(CATEGORY_LABELS) as ServiceCategory[]).map((cat) => (
                    <option key={cat} value={cat}>
                      {CATEGORY_LABELS[cat]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="s-duration">Duração (min)</label>
                <input
                  id="s-duration"
                  type="number"
                  min="15"
                  step="15"
                  value={form.durationMinutes}
                  onChange={(e) =>
                    setForm({ ...form, durationMinutes: parseInt(e.target.value, 10) || 60 })
                  }
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="s-price">Preço (R$)</label>
              <input
                id="s-price"
                type="number"
                min="0"
                step="0.01"
                value={form.price || ''}
                onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="s-desc">Descrição</label>
              <textarea
                id="s-desc"
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                />{' '}
                Serviço ativo
              </label>
            </div>
            <div className="modal__actions">
              <button type="button" className="btn btn--outline" onClick={closeModal}>
                Cancelar
              </button>
              <button type="submit" className="btn btn--primary">
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
