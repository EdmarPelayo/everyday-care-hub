import DashboardLayout from "../../components/DashboardLayout";
import Card from "../../components/Card";
import {
  patientProfile,
  dailyRoutines,
  alerts
} from "../../data/mockPatients";

export default function CaregiverDashboard() {
  return (
    <DashboardLayout
      title="Home Caretaker Dashboard"
      subtitle="Remote monitoring, scheduling, task completion, outfit approval, and instant care alerts."
    >
      <div className="card-grid">
        <Card title="Remote Dashboard">
          <p><strong>Patient:</strong> {patientProfile.name}</p>
          <p><strong>Last Check-In:</strong> {patientProfile.lastCheckIn}</p>
          <p><strong>Location:</strong> {patientProfile.location}</p>
        </Card>

        <Card title="Daily Routine Monitoring">
          <ul className="list">
            {dailyRoutines.map((routine) => (
              <li key={routine.id}>
                {routine.completed ? "✅" : "⬜"} {routine.task}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Shared Scheduling">
          <p>Next appointment: {patientProfile.nextAppointment}</p>
          <p className="status-good">Calendar sync placeholder enabled.</p>
        </Card>

        <Card title="Outfit Approval">
          <p>
            Suggested outfit: comfortable sweater, slip-resistant shoes, and light jacket.
          </p>
          <p className="status-good">Inference: Weather-safe and mobility-friendly.</p>
        </Card>

        <Card title="Instant Alerts">
          <ul className="list">
            {alerts.map((alert) => (
              <li key={alert.id} className={`status-${alert.level}`}>
                {alert.message}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
}
