import { useEffect, useState } from 'react'

function getUsersUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/'
}

function extractItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.results)) return payload.results
  return []
}

export default function Users() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        setLoading(true)
        setError('')
        const response = await fetch(getUsersUrl(), {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const payload = await response.json()
        setItems(extractItems(payload))
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(`Failed to load users: ${err.message}`)
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
      <h2 className="h4 mb-3">Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <ul className="list-group">
          {items.map((user) => (
            <li key={user._id ?? user.id ?? user.email} className="list-group-item">
              <div className="fw-semibold">{user.name ?? 'Unknown user'}</div>
              <small className="text-body-secondary">{user.email ?? 'No email'}</small>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
