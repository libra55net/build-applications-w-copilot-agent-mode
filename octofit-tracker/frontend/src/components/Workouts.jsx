import { useEffect, useState } from 'react'

function getWorkoutsUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/'
}

function extractItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.results)) return payload.results
  return []
}

export default function Workouts() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        setLoading(true)
        setError('')
        const response = await fetch(getWorkoutsUrl(), {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const payload = await response.json()
        setItems(extractItems(payload))
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(`Failed to load workouts: ${err.message}`)
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
      <h2 className="h4 mb-3">Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <ul className="list-group">
          {items.map((workout) => (
            <li key={workout._id ?? workout.id ?? workout.title} className="list-group-item">
              <div className="fw-semibold">{workout.title ?? 'Workout'}</div>
              <small className="text-body-secondary">
                {workout.difficulty ?? 'unknown'} · {workout.durationMinutes ?? '-'} min
              </small>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
