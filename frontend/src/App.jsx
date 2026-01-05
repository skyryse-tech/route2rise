import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { authService } from './services/authService';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Sidebar } from './components/Sidebar';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Leads } from './pages/Leads';
import './styles/global.css';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    console.log('Checking authentication...');
    if (!authService.isAuthenticated()) {
      console.log('No token found');
      setIsAuthenticated(false);
      return;
    }

    const verified = await authService.verify();
    const authenticated = !!verified;
    console.log('Auth verification result:', authenticated);
    setIsAuthenticated(authenticated);
  };

  useEffect(() => {
    // Initial auth check
    checkAuth().then(() => setLoading(false));

    // Recheck auth every 5 seconds to catch login state changes
    const interval = setInterval(() => {
      checkAuth();
    }, 5000);

    // Also listen for storage changes
    const handleStorageChange = () => {
      console.log('Storage changed, rechecking auth...');
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <div className="app-layout">
                <Sidebar />
                <div className="main-content">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/leads" element={<Leads />} />
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </div>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
