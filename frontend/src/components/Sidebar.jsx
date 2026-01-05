import './Sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';

export const Sidebar = () => {
  const location = useLocation();
  const user = authService.getCurrentUser();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1><span className="brand-pill">Route 2 Rise</span></h1>
        <p>Lead Management</p>
      </div>

      {/* Mobile header - different div */}
      <div className="mobile-header">
        <span className="brand-pill-mobile">Route 2 Rise</span>
      </div>

      <nav className="sidebar-nav">
        <Link
          to="/dashboard"
          className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}
        >

          <span>Dashboard</span>
        </Link>
        <Link
          to="/leads"
          className={`nav-item ${isActive('/leads') ? 'active' : ''}`}
        >

          <span>Leads</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <p className="founder-name">{user.founder}</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
};
