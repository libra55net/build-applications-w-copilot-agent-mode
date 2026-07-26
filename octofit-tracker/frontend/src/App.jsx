import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api'

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="mb-2">OctoFit Tracker</h1>
        <p className="text-body-secondary mb-2">Presentation tier (React 19 + Vite)</p>
        <div className="alert alert-info py-2 mb-0" role="alert">
          API Base URL: <code>{apiBaseUrl}</code>
        </div>
      </header>

      <nav className="nav nav-pills flex-wrap gap-2 mb-4">
        <NavLink to="/users" className="nav-link">Users</NavLink>
        <NavLink to="/teams" className="nav-link">Teams</NavLink>
        <NavLink to="/activities" className="nav-link">Activities</NavLink>
        <NavLink to="/leaderboard" className="nav-link">Leaderboard</NavLink>
        <NavLink to="/workouts" className="nav-link">Workouts</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  )
}

export default App
