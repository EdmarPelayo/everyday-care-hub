import { useMemo, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import Card from "../../components/Card";
import {
  nurseAssignedPatients,
  nurseTasks,
  medicationVerifications,
  abnormalVitalsAlerts,
  shiftHandoffNotes,
  symptomLogs,
  nurseEscalations
} from "../../data/mockPatients";

export default function NurseDashboard() {
  const [selectedPatientId, setSelectedPatientId] = useState(
    nurseAssignedPatients[0].id
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const selectedPatient =
    nurseAssignedPatients.find((patient) => patient.id === selectedPatientId) ||
    nurseAssignedPatients[0];

  const filteredPatients = nurseAssignedPatients.filter((patient) => {
    const matchesSearch = patient.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesPriority =
      priorityFilter === "All" || patient.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  const tasksDueToday = nurseTasks.filter((task) => !task.completed).length;

  const abnormalVitalsCount = abnormalVitalsAlerts.filter(
    (alert) => alert.level === "danger" || alert.level === "warning"
  ).length;

  const escalationsNeeded = nurseEscalations.filter(
    (escalation) => escalation.status === "Open"
  ).length;

  const nurseInference = useMemo(() => {
    if (
      selectedPatient.priority === "High" ||
      selectedPatient.missedMedications >= 2 ||
      selectedPatient.abnormalVitals >= 2
    ) {
      return {
        level: "High",
        message:
          "Patient should be checked soon due to missed medications, abnormal vitals, or delayed check-in.",
        action:
          "Recheck vitals, verify medication status, and notify the doctor if symptoms continue."
      };
    }

    if (
      selectedPatient.priority === "Moderate" ||
      selectedPatient.symptoms.length > 0
    ) {
      return {
        level: "Moderate",
        message:
          "Patient has some care concerns that should be monitored during this shift.",
        action:
          "Complete unfinished tasks, check symptoms, and document a handoff note."
      };
    }

    return {
      level: "Low",
      message:
        "Patient appears stable based on current task completion, vitals, and medication verification.",
      action: "Continue normal shift monitoring."
    };
  }, [selectedPatient]);

  return (
    <DashboardLayout
      title="Nurse Dashboard"
      subtitle="Daily care oversight, medication verification, vitals logging, shift notes, and escalation support."
    >
      <div className="nurse-dashboard">
        <div className="stats-row">
          <Card title="Assigned Patients">
            <p className="large-number">{nurseAssignedPatients.length}</p>
            <p>Patients assigned during this shift.</p>
          </Card>

          <Card title="Tasks Due Today">
            <p className="large-number status-warning">{tasksDueToday}</p>
            <p>Care tasks still not completed.</p>
          </Card>

          <Card title="Abnormal Vitals">
            <p className="large-number status-danger">{abnormalVitalsCount}</p>
            <p>Vitals needing nurse attention.</p>
          </Card>

          <Card title="Escalations Needed">
            <p className="large-number status-danger">{escalationsNeeded}</p>
            <p>Open items that may need doctor follow-up.</p>
          </Card>
        </div>

        <div className="nurse-main-grid">
          <Card title="Priority Patient Queue">
            <div className="form-group">
              <label>Search Patient</label>
              <input
                type="text"
                placeholder="Search by patient name..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Filter by Priority</label>
              <select
                className="select-input"
                value={priorityFilter}
                onChange={(event) => setPriorityFilter(event.target.value)}
              >
                <option value="All">All</option>
                <option value="Low">Low Priority</option>
                <option value="Moderate">Moderate Priority</option>
                <option value="High">High Priority</option>
              </select>
            </div>

            <ul className="patient-list">
              {filteredPatients.map((patient) => (
                <li
                  key={patient.id}
                  className={
                    selectedPatient.id === patient.id
                      ? "patient-list-item active"
                      : "patient-list-item"
                  }
                  onClick={() => setSelectedPatientId(patient.id)}
                >
                  <div>
                    <strong>{patient.name}</strong>
                    <p>{patient.condition}</p>
                  </div>

                  <span
                    className={`risk-pill risk-${patient.priority.toLowerCase()}`}
                  >
                    {patient.priority}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Selected Patient Care Summary">
            <p>
              <strong>Name:</strong> {selectedPatient.name}
            </p>
            <p>
              <strong>Age:</strong> {selectedPatient.age}
            </p>
            <p>
              <strong>Condition:</strong> {selectedPatient.condition}
            </p>
            <p>
              <strong>Room / Location:</strong> {selectedPatient.location}
            </p>
            <p>
              <strong>Last Check-In:</strong> {selectedPatient.lastCheckIn}
            </p>
            <p>
              <strong>Last Medication Verified:</strong>{" "}
              {selectedPatient.lastMedicationVerified}
            </p>
            <p>
              <strong>Last Meal Completed:</strong>{" "}
              {selectedPatient.lastMealCompleted}
            </p>
          </Card>

          <Card title="Nurse AI Inference">
            <p>
              <strong>Care Priority:</strong>{" "}
              <span
                className={
                  nurseInference.level === "High"
                    ? "status-danger"
                    : nurseInference.level === "Moderate"
                    ? "status-warning"
                    : "status-good"
                }
              >
                {nurseInference.level}
              </span>
            </p>

            <p>{nurseInference.message}</p>

            <div className="suggested-action">
              <strong>Suggested Nurse Action:</strong>
              <p>{nurseInference.action}</p>
            </div>
          </Card>
        </div>

        <div className="card-grid">
          <Card title="Daily Task Oversight">
            <ul className="list">
              {nurseTasks.map((task) => (
                <li key={task.id}>
                  {task.completed ? "✅" : "⬜"} {task.task} —{" "}
                  <strong>{task.assignedTime}</strong>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Medication Witness / Verification">
            <ul className="list">
              {medicationVerifications.map((med) => (
                <li key={med.id}>
                  <strong>{med.name}</strong> — {med.time} —{" "}
                  <span
                    className={
                      med.status === "Verified"
                        ? "status-good"
                        : med.status === "Late"
                        ? "status-warning"
                        : "status-danger"
                    }
                  >
                    {med.status}
                  </span>
                </li>
              ))}
            </ul>

            <button className="secondary-button">Verify Medication</button>
          </Card>

          <Card title="Vitals Logging">
            <div className="vitals-form">
              <input type="text" placeholder="Blood pressure, ex: 120/80" />
              <input type="text" placeholder="Heart rate, ex: 78 bpm" />
              <input type="text" placeholder="Glucose, ex: 120 mg/dL" />
              <input type="text" placeholder="Temperature, ex: 98.6°F" />
              <input type="text" placeholder="Oxygen level, ex: 98%" />
            </div>

            <button className="secondary-button">Save Vitals</button>
          </Card>

          <Card title="Abnormal Vitals Alerts">
            <ul className="list">
              {abnormalVitalsAlerts.map((alert) => (
                <li key={alert.id} className={`status-${alert.level}`}>
                  {alert.patient}: {alert.message}
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Symptom Logging">
            <ul className="list">
              {symptomLogs.map((symptom) => (
                <li key={symptom.id}>
                  <strong>{symptom.patient}:</strong> {symptom.symptom} —{" "}
                  {symptom.severity}
                </li>
              ))}
            </ul>

            <button className="secondary-button">Add Symptom Note</button>
          </Card>

          <Card title="Shift Handoff Notes">
            <ul className="list">
              {shiftHandoffNotes.map((note) => (
                <li key={note.id}>
                  <strong>{note.time}:</strong> {note.note}
                </li>
              ))}
            </ul>

            <button className="secondary-button">Add Handoff Note</button>
          </Card>

          <Card title="Escalation Panel">
            <ul className="list">
              {nurseEscalations.map((item) => (
                <li key={item.id}>
                  <strong>{item.patient}:</strong> {item.reason} —{" "}
                  <span
                    className={
                      item.status === "Open"
                        ? "status-danger"
                        : "status-good"
                    }
                  >
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>

            <button className="secondary-button">Notify Doctor</button>
          </Card>

          <Card title="Routine Completion Tracker">
            <p>
              <strong>{selectedPatient.routineCompletion}%</strong> routine
              completion today.
            </p>
            <p>
              <strong>Missed Routines:</strong> {selectedPatient.missedRoutines}
            </p>
            <p
              className={
                selectedPatient.routineCompletion >= 85
                  ? "status-good"
                  : selectedPatient.routineCompletion >= 70
                  ? "status-warning"
                  : "status-danger"
              }
            >
              Inference:{" "}
              {selectedPatient.routineCompletion >= 85
                ? "Routine completion looks stable."
                : selectedPatient.routineCompletion >= 70
                ? "Some routines need follow-up."
                : "Routine decline needs attention."}
            </p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}