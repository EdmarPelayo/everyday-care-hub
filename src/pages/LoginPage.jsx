import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Every-Day Care Hub</h1>
        <p>Log in as a doctor, nurse, patient, caregiver, or relative.</p>

        <LoginForm />

        <div className="demo-logins">
          <h3>Demo Logins</h3>
          <code>doctor1 / doctor123</code>
          <code>nurse1 / nurse123</code>
          <code>patient1 / patient123</code>
          <code>caretaker1 / caretaker123</code>
          <code>relative1 / relative123</code>
        </div>
      </div>
    </div>
  );
}
