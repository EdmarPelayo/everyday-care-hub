import DashboardLayout from "../../components/DashboardLayout";
import Card from "../../components/Card";
import {
  patientProfile,
  medications,
  dailyRoutines,
  messages
} from "../../data/mockPatients";

export default function PatientDashboard() {
  return (
    <DashboardLayout
      title="Patient Dashboard"
      subtitle="Your personal daily care view with reminders, routines, messages, and emergency tools."
    >
      <div className="card-grid">
        <Card title="Medication Reminders">
          <ul className="list">
            {medications.map((med) => (
              <li key={med.id}>
                {med.name} — {med.dosage} at {med.time} — {med.status}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Daily Routine Checklist">
          <ul className="list">
            {dailyRoutines.map((routine) => (
              <li key={routine.id}>
                {routine.completed ? "✅" : "⬜"} {routine.task}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Emergency SOS">
          <p>
            Pressing SOS would alert your doctor, nurse, caregiver, and relative
            with your current location.
          </p>
          <p className="status-danger">SOS status: Ready</p>
        </Card>

        <Card title="Messages">
          <ul className="list">
            {messages.map((message) => (
              <li key={message.id}>
                <strong>{message.from}:</strong> {message.text}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Upcoming Appointment">
          <p>{patientProfile.nextAppointment}</p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
