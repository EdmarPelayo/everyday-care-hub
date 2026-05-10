import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="unauthorized-page">
      <div className="unauthorized-card">
        <h1>Unauthorized</h1>
        <p>You do not have permission to view this page.</p>
        <Link to="/">Go back to your dashboard</Link>
      </div>
    </div>
  );
}
