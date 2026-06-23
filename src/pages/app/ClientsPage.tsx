import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useClientsContext } from '../../context/ClientsContext'
import type { ClientInput } from '../../types/client'
import { getSignMeta, getSunSign, type ZodiacSign } from '../../utils/zodiac'

const EMPTY: ClientInput = {
  name: '',
  email: '',
  phone: '',
  birthDate: '',
  sunSign: 'aries',
  notes: '',
}

export function ClientsPage() {
  const { clients, addClient, deleteClient } = useClientsContext()
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')
  const [form, setForm] = useState<ClientInput>(EMPTY)
  const [error, setError] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return clients
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        getSignMeta(c.sunSign as ZodiacSign).label.toLowerCase().includes(q),
    )
  }, [clients, search])

  function handleBirthDateChange(value: string) {
    const sign = getSunSign(value)
    setForm((prev) => ({
      ...prev,
      birthDate: value,
      sunSign: sign ?? prev.sunSign,
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('Nome é obrigatório.')
      return
    }
    if (!form.birthDate) {
      setError('Data de nascimento é obrigatória.')
      return
    }
    const client = addClient(form)
    setShowModal(false)
    setForm(EMPTY)
    setError('')
    window.location.hash = `#/app/clientes/${client.id}`
  }

  function handleDelete(id: string, name: string) {
    if (window.confirm(`Excluir cliente ${name}?`)) {
      deleteClient(id)
    }
  }

  return (
    <>
      <header className="app-header">
        <div>
          <h1 className="app-header__title">Clientes</h1>
          <p className="app-header__subtitle">{clients.length} cadastrados</p>
        </div>
        <button type="button" className="btn btn--primary btn--sm" onClick={() => setShowModal(true)}>
          + Novo cliente
        </button>
      </header>

      <div className="panel">
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label htmlFor="search-clients">Buscar</label>
          <input
            id="search-clients"
            type="search"
            placeholder="Nome, e-mail, telefone ou numerologia..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Signo</th>
                <th>Relatórios</th>
                <th>Telefone</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{getSignMeta(c.sunSign as ZodiacSign).label}</td>
                  <td>{c.reports.length}</td>
                  <td>{c.phone || '—'}</td>
                  <td>
                    <div className="table-actions">
                      <Link to={`/app/clientes/${c.id}`} className="btn btn--outline btn--sm">
                        Abrir
                      </Link>
                      <button
                        type="button"
                        className="btn btn--danger btn--sm"
                        onClick={() => handleDelete(c.id, c.name)}
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
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <form className="modal" onSubmit={handleSubmit}>
            <h2 id="modal-title" className="modal__title">Novo cliente</h2>
            {error && <p className="form-error" role="alert">{error}</p>}
            <div className="form-group">
              <label htmlFor="c-name">Nome *</label>
              <input
                id="c-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="c-email">E-mail</label>
              <input
                id="c-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="c-phone">Telefone</label>
              <input
                id="c-phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="c-birth">Data de nascimento *</label>
              <input
                id="c-birth"
                type="date"
                value={form.birthDate}
                onChange={(e) => handleBirthDateChange(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="c-notes">Observações</label>
              <textarea
                id="c-notes"
                rows={2}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>
            <div className="modal__actions">
              <button type="button" className="btn btn--outline" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button type="submit" className="btn btn--primary">Salvar</button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
