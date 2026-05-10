import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout({ title, subtitle, children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>Every-Day App</h2>
        <p className="sidebar-subtitle">
          One platform for patients, doctors, nurses, caregivers, and relatives.
        </p>

        <div className="sidebar-user">
          <p><strong>{user?.name}</strong></p>
          <p>Role: {user?.role}</p>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </header>

        {children}
      </main>
    </div>
  );
}
