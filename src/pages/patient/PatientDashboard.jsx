import { useMemo, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import Card from "../../components/Card";
import {
  patientProfile,
  medications,
  dailyRoutines,
  patientAppointments,
  patientMessages,
  clothingSuggestions,
  cookingSteps,
  accessibilitySettings,
  privacyControls,
  patientWellnessLogs
} from "../../data/mockPatients";

export default function PatientDashboard() {
  const [routineItems, setRoutineItems] = useState(dailyRoutines);
  const [sosSent, setSosSent] = useState(false);

  const completedRoutines = routineItems.filter((item) => item.completed).length;
  const totalRoutines = routineItems.length;
  const routinePercent = Math.round((completedRoutines / totalRoutines) * 100);

  const upcomingMeds = medications.filter((med) => med.status !== "Taken");

  const patientInference = useMemo(() => {
    const missedTasks = totalRoutines - completedRoutines;
    const missedMeds = medications.filter((med) => med.status === "Missed").length;

    if (missedMeds > 0 || routinePercent < 60) {
      return {
        level: "High",
        message:
          "You may need help today because some important medication or routine tasks are not complete.",
        action:
          "Ask your caregiver for help or press SOS if you feel unsafe."
      };
    }

    if (missedTasks >= 2 || upcomingMeds.length >= 2) {
      return {
        level: "Moderate",
        message:
          "You still have a few care tasks left today, but you are making progress.",
        action:
          "Finish your next medication reminder and complete one routine task."
      };
    }

    return {
      level: "Low",
      message:
        "You are doing well today. Your medication and routine progress look stable.",
      action:
        "Keep following your reminders and check in again later."
    };
  }, [routineItems, routinePercent, completedRoutines, totalRoutines, upcomingMeds.length]);

  function toggleRoutine(id) {
    setRoutineItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function handleSOS() {
    setSosSent(true);
  }

  return (
    <DashboardLayout
      title="Patient Dashboard"
      subtitle="Your daily care hub for medication, routines, appointments, safety, and support."
    >
      <div className="patient-dashboard">
        <div className="patient-hero">
          <div>
            <h2>Hello, {patientProfile.name}</h2>
            <p>
              Today’s goal: stay on track with medication, hydration, meals, and
              check-ins.
            </p>
          </div>

          <button
            className={sosSent ? "sos-button sos-sent" : "sos-button"}
            onClick={handleSOS}
          >
            {sosSent ? "SOS Sent" : "Emergency SOS"}
          </button>
        </div>

        {sosSent && (
          <div className="sos-alert">
            Emergency alert sent to doctor, nurse, caregiver, and relative with
            your current location.
          </div>
        )}

        <div className="stats-row">
          <Card title="Medication Progress">
            <p className="large-number">
              {medications.filter((med) => med.status === "Taken").length}/
              {medications.length}
            </p>
            <p>Medications completed today.</p>
          </Card>

          <Card title="Routine Progress">
            <p className="large-number">{routinePercent}%</p>
            <p>
              {completedRoutines} of {totalRoutines} routines completed.
            </p>
          </Card>

          <Card title="Next Appointment">
            <p>
              <strong>{patientProfile.nextAppointment}</strong>
            </p>
            <p>Upcoming care team visit.</p>
          </Card>

          <Card title="Last Check-In">
            <p>
              <strong>{patientProfile.lastCheckIn}</strong>
            </p>
            <p>Your care team can see your latest check-in.</p>
          </Card>
        </div>

        <div className="patient-main-grid">
          <Card title="Patient Wellness Inference">
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={
                  patientInference.level === "High"
                    ? "status-danger"
                    : patientInference.level === "Moderate"
                    ? "status-warning"
                    : "status-good"
                }
              >
                {patientInference.level}
              </span>
            </p>

            <p>{patientInference.message}</p>

            <div className="suggested-action">
              <strong>Suggested Next Step:</strong>
              <p>{patientInference.action}</p>
            </div>
          </Card>

          <Card title="Medication Reminders">
            <ul className="list">
              {medications.map((med) => (
                <li key={med.id}>
                  <strong>{med.name}</strong> — {med.dosage} — {med.time} —{" "}
                  <span
                    className={
                      med.status === "Taken"
                        ? "status-good"
                        : med.status === "Missed"
                        ? "status-danger"
                        : "status-warning"
                    }
                  >
                    {med.status}
                  </span>
                </li>
              ))}
            </ul>

            <button className="secondary-button">Confirm Medication</button>
          </Card>

          <Card title="Daily Routine Checklist">
            <ul className="patient-checklist">
              {routineItems.map((item) => (
                <li key={item.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleRoutine(item.id)}
                    />
                    <span>{item.task}</span>
                  </label>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="card-grid">
          <Card title="Appointments">
            <ul className="list">
              {patientAppointments.map((appointment) => (
                <li key={appointment.id}>
                  <strong>{appointment.title}</strong>
                  <br />
                  {appointment.date} at {appointment.time}
                  <br />
                  <span>{appointment.location}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Cooking Guide">
            <p>Step-by-step meal help for today.</p>

            <ol className="list">
              {cookingSteps.map((step) => (
                <li key={step.id}>{step.instruction}</li>
              ))}
            </ol>

            <button className="secondary-button">Start Voice Guide</button>
          </Card>

          <Card title="Clothing Assistant">
            <p>Recommended outfit based on weather and comfort needs.</p>

            <ul className="list">
              {clothingSuggestions.map((item) => (
                <li key={item.id}>
                  <strong>{item.item}:</strong> {item.reason}
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Messages">
            <ul className="list">
              {patientMessages.map((message) => (
                <li key={message.id}>
                  <strong>{message.from}:</strong> {message.text}
                </li>
              ))}
            </ul>

            <button className="secondary-button">Open Messages</button>
          </Card>

          <Card title="Accessibility Settings">
            <ul className="list">
              {accessibilitySettings.map((setting) => (
                <li key={setting.id}>
                  {setting.enabled ? "✅" : "⬜"} {setting.label}
                </li>
              ))}
            </ul>

            <button className="secondary-button">Update Accessibility</button>
          </Card>

          <Card title="Privacy Controls">
            <p>You control what each person can see.</p>

            <ul className="list">
              {privacyControls.map((control) => (
                <li key={control.id}>
                  <strong>{control.role}:</strong> {control.access}
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Wellness Log">
            <ul className="list">
              {patientWellnessLogs.map((log) => (
                <li key={log.id}>
                  <strong>{log.time}:</strong> {log.note}
                </li>
              ))}
            </ul>

            <button className="secondary-button">Add Wellness Note</button>
          </Card>

          <Card title="Hydration Reminder">
            <p className="large-number">4/8</p>
            <p>Cups of water completed today.</p>
            <button className="secondary-button">Log Water</button>
          </Card>

          <Card title="Safety Check-In">
            <p>Let your care team know you are okay.</p>
            <button className="secondary-button">Send Check-In</button>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}