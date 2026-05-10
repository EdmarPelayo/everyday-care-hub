import { useMemo, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import Card from "../../components/Card";
import {
  patientProfile,
  relativeActivityFeed,
  relativeSafetyAlerts,
  relativeMessages,
  familySupportTasks,
  relativeAppointments,
  relativePrivacyPermissions,
  visitCallSchedule
} from "../../data/mockPatients";

export default function RelativeDashboard() {
  const [tasks, setTasks] = useState(familySupportTasks);
  const [messageText, setMessageText] = useState("");

  const completedTasks = tasks.filter((task) => task.completed).length;

  const urgentAlerts = relativeSafetyAlerts.filter(
    (alert) => alert.level === "danger"
  ).length;

  const peaceOfMindScore = useMemo(() => {
    let score = 100;

    if (patientProfile.routineCompletion < 80) score -= 10;
    if (patientProfile.medicationAdherence < 85) score -= 10;
    if (urgentAlerts > 0) score -= 20;
    if (completedTasks < 2) score -= 5;

    return Math.max(score, 0);
  }, [urgentAlerts, completedTasks]);

  const relativeInference = useMemo(() => {
    if (urgentAlerts > 0) {
      return {
        level: "High",
        message:
          "Your loved one may need immediate attention because there is an active safety alert.",
        action:
          "Check the safety alert, message the caregiver, or call the patient."
      };
    }

    if (patientProfile.routineCompletion < 80) {
      return {
        level: "Moderate",
        message:
          "Your loved one is mostly okay, but some daily routines are still unfinished.",
        action:
          "Send a supportive message or schedule a quick family check-in."
      };
    }

    return {
      level: "Low",
      message:
        "Your loved one appears stable today based on check-ins, medication status, and routine progress.",
      action:
        "No urgent action needed. A friendly message would still be helpful."
    };
  }, [urgentAlerts]);

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function sendMessage(event) {
    event.preventDefault();

    if (!messageText.trim()) {
      return;
    }

    alert(`Message sent: ${messageText}`);
    setMessageText("");
  }

  return (
    <DashboardLayout
      title="Relative Dashboard"
      subtitle="Family wellness updates, safety alerts, check-ins, messages, and limited care visibility."
    >
      <div className="relative-dashboard">
        <div className="relative-hero">
          <div>
            <h2>Family View for {patientProfile.name}</h2>
            <p>
              Stay connected with wellness updates while respecting patient
              privacy.
            </p>
          </div>

          <div className="peace-score-circle">
            <span>{peaceOfMindScore}</span>
            <p>Peace Score</p>
          </div>
        </div>

        <div className="stats-row">
          <Card title="Peace-of-Mind Score">
            <p
              className={
                peaceOfMindScore >= 85
                  ? "large-number status-good"
                  : peaceOfMindScore >= 70
                  ? "large-number status-warning"
                  : "large-number status-danger"
              }
            >
              {peaceOfMindScore}/100
            </p>
            <p>
              Based on check-ins, medication status, routines, and safety
              alerts.
            </p>
          </Card>

          <Card title="Last Check-In">
            <p>
              <strong>{patientProfile.lastCheckIn}</strong>
            </p>
            <p>{patientProfile.name} last checked in from home.</p>
          </Card>

          <Card title="Safety Status">
            <p
              className={
                urgentAlerts > 0 ? "status-danger" : "status-good"
              }
            >
              {urgentAlerts > 0 ? "Needs Attention" : "No urgent alerts"}
            </p>
            <p>{urgentAlerts} urgent safety alerts active.</p>
          </Card>

          <Card title="Next Appointment">
            <p>
              <strong>{patientProfile.nextAppointment}</strong>
            </p>
            <p>Appointment visibility only. Editing is restricted.</p>
          </Card>
        </div>

        <div className="relative-main-grid">
          <Card title="Family Check-In Recommendation">
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={
                  relativeInference.level === "High"
                    ? "status-danger"
                    : relativeInference.level === "Moderate"
                    ? "status-warning"
                    : "status-good"
                }
              >
                {relativeInference.level}
              </span>
            </p>

            <p>{relativeInference.message}</p>

            <div className="suggested-action">
              <strong>Suggested Family Action:</strong>
              <p>{relativeInference.action}</p>
            </div>
          </Card>

          <Card title="Limited Activity Feed">
            <ul className="timeline-list">
              {relativeActivityFeed.map((item) => (
                <li key={item.id}>
                  <span className={`timeline-dot ${item.level}`}></span>
                  <div>
                    <strong>{item.time}</strong>
                    <p>{item.message}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Safety Alerts">
            <ul className="list">
              {relativeSafetyAlerts.map((alert) => (
                <li key={alert.id} className={`status-${alert.level}`}>
                  <strong>{alert.type}:</strong> {alert.message}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="card-grid">
          <Card title="Message Center">
            <ul className="list">
              {relativeMessages.map((message) => (
                <li key={message.id}>
                  <strong>{message.from}:</strong> {message.text}
                </li>
              ))}
            </ul>

            <form onSubmit={sendMessage} className="message-form">
              <input
                type="text"
                placeholder="Send a message..."
                value={messageText}
                onChange={(event) => setMessageText(event.target.value)}
              />
              <button className="secondary-button" type="submit">
                Send
              </button>
            </form>
          </Card>

          <Card title="Family Support Tasks">
            <ul className="patient-checklist">
              {tasks.map((task) => (
                <li key={task.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />
                    <span>
                      {task.task} — <strong>{task.owner}</strong>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Visit / Call Scheduler">
            <ul className="list">
              {visitCallSchedule.map((item) => (
                <li key={item.id}>
                  <strong>{item.type}</strong>
                  <br />
                  {item.date} at {item.time}
                  <br />
                  <span>{item.note}</span>
                </li>
              ))}
            </ul>

            <button className="secondary-button">Schedule Check-In</button>
          </Card>

          <Card title="Appointment Awareness">
            <ul className="list">
              {relativeAppointments.map((appointment) => (
                <li key={appointment.id}>
                  <strong>{appointment.title}</strong>
                  <br />
                  {appointment.date} at {appointment.time}
                  <br />
                  <span>{appointment.note}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Privacy Permissions">
            <p>This is what your patient allows you to see.</p>

            <ul className="list">
              {relativePrivacyPermissions.map((permission) => (
                <li key={permission.id}>
                  {permission.allowed ? "✅" : "❌"}{" "}
                  <strong>{permission.feature}</strong>: {permission.detail}
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Wellness Summary">
            <p>
              <strong>Mood:</strong> {patientProfile.mood}
            </p>
            <p>
              <strong>Location:</strong> {patientProfile.location}
            </p>
            <p>
              <strong>Routine Completion:</strong>{" "}
              {patientProfile.routineCompletion}%
            </p>
            <p>
              <strong>Medication Adherence:</strong>{" "}
              {patientProfile.medicationAdherence}%
            </p>
          </Card>

          <Card title="Transportation Help">
            <p>Upcoming appointment may require a ride.</p>
            <button className="secondary-button">Offer Ride</button>
          </Card>

          <Card title="Caregiver Contact">
            <p>
              Contact the caregiver for non-emergency support or daily updates.
            </p>
            <button className="secondary-button">Message Caregiver</button>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}