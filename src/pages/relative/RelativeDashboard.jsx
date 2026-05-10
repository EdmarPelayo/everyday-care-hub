import DashboardLayout from "../../components/DashboardLayout";
import Card from "../../components/Card";
import {
  patientProfile,
  alerts,
  dailyRoutines
} from "../../data/mockPatients";

export default function RelativeDashboard() {
  const visibleRoutines = dailyRoutines.slice(0, 2);

  return (
    <DashboardLayout
      title="Relative Dashboard"
      subtitle="A limited family view with wellness updates, notifications, and emergency awareness."
    >
      <div className="card-grid">
        <Card title="Wellness Summary">
          <p><strong>Patient:</strong> {patientProfile.name}</p>
          <p><strong>Last Check-In:</strong> {patientProfile.lastCheckIn}</p>
          <p><strong>Mood:</strong> {patientProfile.mood}</p>
        </Card>

        <Card title="Limited Activity Feed">
          <ul className="list">
            {visibleRoutines.map((routine) => (
              <li key={routine.id}>
                {routine.completed ? "✅" : "⬜"} {routine.task}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Notifications">
          <ul className="list">
            {alerts.map((alert) => (
              <li key={alert.id} className={`status-${alert.level}`}>
                {alert.message}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Emergency SOS Receipt">
          <p>
            If SOS is triggered, this relative account would receive an emergency alert.
          </p>
          <p className="status-good">SOS status: No active emergency.</p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
