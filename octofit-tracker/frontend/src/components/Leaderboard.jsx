import { useEffect, useState } from 'react'

function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api'
}

function extractItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.results)) return payload.results
  return []
}

export default function Leaderboard() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        setLoading(true)
        setError('')
        const response = await fetch(`${getApiBaseUrl()}/leaderboard/`, {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const payload = await response.json()
        setItems(extractItems(payload))
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(`Failed to load leaderboard: ${err.message}`)
        }
      } finally {
        setLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [])

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <ul className="list-group">
          {items.map((board) => (
            <li key={board._id ?? board.id ?? board.period} className="list-group-item">
              <div className="fw-semibold">{board.period ?? 'Current Period'}</div>
              <small className="text-body-secondary">
                Entries: {Array.isArray(board.entries) ? board.entries.length : 0}
              </small>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
