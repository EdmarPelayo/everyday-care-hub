import DashboardLayout from "../../components/DashboardLayout";
import Card from "../../components/Card";
import {
  patientProfile,
  medications,
  alerts,
  vitals
} from "../../data/mockPatients";

export default function DoctorDashboard() {
  return (
    <DashboardLayout
      title="Doctor Dashboard"
      subtitle="Clinical summary, adherence trends, prescriptions, and high-level patient health inferences."
    >
      <div className="card-grid">
        <Card title="Patient Health Summary">
          <p><strong>Name:</strong> {patientProfile.name}</p>
          <p><strong>Age:</strong> {patientProfile.age}</p>
          <p><strong>Condition:</strong> {patientProfile.primaryCondition}</p>
          <p><strong>Mood:</strong> {patientProfile.mood}</p>
        </Card>

        <Card title="Medication Adherence">
          <p>{patientProfile.medicationAdherence}% adherence this month.</p>
          <p className="status-good">Inference: Generally stable adherence.</p>
        </Card>

        <Card title="Prescription Management">
          <ul className="list">
            {medications.map((med) => (
              <li key={med.id}>
                {med.name} — {med.dosage} — {med.time}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Clinical Alerts">
          <ul className="list">
            {alerts.map((alert) => (
              <li key={alert.id} className={`status-${alert.level}`}>
                {alert.type}: {alert.message}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Vitals Snapshot">
          <ul className="list">
            {vitals.map((vital) => (
              <li key={vital.id}>
                {vital.label}: {vital.value}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
}
