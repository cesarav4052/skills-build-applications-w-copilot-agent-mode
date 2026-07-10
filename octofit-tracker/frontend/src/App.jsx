import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function Home() {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-5">
        <h1 className="display-5 fw-bold mb-3">OctoFit Tracker</h1>
        <p className="lead text-muted mb-4">
          A modern multi-tier fitness tracking app for workouts, teams, and leaderboards.
        </p>
        <p className="text-muted mb-0">
          Configure <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to use Codespaces URLs for the API.
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <nav className="navbar navbar-expand-lg navbar-light bg-white rounded shadow-sm mb-4 px-3">
            <div className="container-fluid">
              <span className="navbar-brand fw-bold">OctoFit</span>
              <div className="navbar-nav flex-row flex-wrap gap-2">
                {navItems.map((item) => (
                  <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;
