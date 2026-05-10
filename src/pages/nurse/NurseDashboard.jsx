import DashboardLayout from "../../components/DashboardLayout";
import Card from "../../components/Card";
import {
  patientProfile,
  dailyRoutines,
  medications,
  vitals
} from "../../data/mockPatients";

export default function NurseDashboard() {
  return (
    <DashboardLayout
      title="Nurse Dashboard"
      subtitle="Daily oversight for routines, vitals, medication witnessing, and shift handoff notes."
    >
      <div className="card-grid">
        <Card title="Daily Task Oversight">
          <p>{patientProfile.routineCompletion}% routine completion today.</p>
          <ul className="list">
            {dailyRoutines.map((routine) => (
              <li key={routine.id}>
                {routine.completed ? "✅" : "⚠️"} {routine.task}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Vitals Logging">
          <ul className="list">
            {vitals.map((vital) => (
              <li key={vital.id}>
                {vital.label}: {vital.value}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Medication Witness">
          <ul className="list">
            {medications.map((med) => (
              <li key={med.id}>
                {med.name}: {med.status}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Shift Handoff Notes">
          <p>
            Patient completed morning medication. Blood pressure check still needs
            verification before evening handoff.
          </p>
        </Card>

        <Card title="Escalation Pathway">
          <p className="status-warning">
            If blood pressure check is missed again, notify caregiver and doctor.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
