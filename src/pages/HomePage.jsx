import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="home-page">
      <nav className="home-navbar">
        <div className="brand-logo">
          <div className="brand-icon">
            <span className="brand-heart">♥</span>
            <span className="brand-plus">+</span>
          </div>

          <div>
            <h1>EveryDay</h1>
            <p>Care Hub</p>
          </div>
        </div>

        <Link to="/login" className="nav-login-button">
          Login
        </Link>
      </nav>

      <section className="home-hero">
        <div className="home-hero-content">
          <div className="home-badge">One platform · All people · Total care</div>

          <h2>The single hub for every care stakeholder.</h2>

          <p>
            Connect patients, doctors, nurses, caregivers, and relatives in one
            secure platform for daily routines, medication reminders, health
            updates, and emergency support.
          </p>

          <div className="home-actions">
            <Link to="/login" className="home-primary-button">
              Go to Login
            </Link>

            <a href="#features" className="home-secondary-button">
              View Features
            </a>
          </div>
        </div>

        <div className="home-card-preview">
          <div className="preview-header">
            <div>
              <strong>Emily Johnson</strong>
              <p>Patient wellness status</p>
            </div>

            <span className="preview-status">Stable</span>
          </div>

          <div className="preview-grid">
            <div>
              <span>Medication</span>
              <strong>88%</strong>
            </div>

            <div>
              <span>Routine</span>
              <strong>76%</strong>
            </div>

            <div>
              <span>Check-In</span>
              <strong>8:45 AM</strong>
            </div>

            <div>
              <span>Risk</span>
              <strong>Moderate</strong>
            </div>
          </div>

          <div className="preview-alert">
            Family check-in recommended later today.
          </div>
        </div>
      </section>

      <section id="features" className="home-features">
        <div className="feature-card">
          <span>👤</span>
          <h3>Patient</h3>
          <p>Medication reminders, daily routines, SOS, and accessibility tools.</p>
        </div>

        <div className="feature-card">
          <span>🩺</span>
          <h3>Doctor</h3>
          <p>Clinical summaries, risk insights, prescriptions, and alerts.</p>
        </div>

        <div className="feature-card">
          <span>💉</span>
          <h3>Nurse</h3>
          <p>Vitals logging, task oversight, medication verification, and handoffs.</p>
        </div>

        <div className="feature-card">
          <span>🤝</span>
          <h3>Caregiver</h3>
          <p>Remote monitoring, scheduling, routines, and safety alerts.</p>
        </div>

        <div className="feature-card">
          <span>👪</span>
          <h3>Relative</h3>
          <p>Family updates, wellness summaries, messages, and check-ins.</p>
        </div>
      </section>
    </main>
  );
}