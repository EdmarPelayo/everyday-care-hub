import { useMemo, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import Card from "../../components/Card";
import {
  patientProfile,
  medications,
  alerts,
  vitals,
  assignedPatients,
  vitalsHistory,
  careTeamNotes,
  appointmentNotes
} from "../../data/mockPatients";

export default function DoctorDashboard() {
  const [selectedPatientId, setSelectedPatientId] = useState(patientProfile.id);
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");

  const selectedPatient =
    assignedPatients.find((patient) => patient.id === selectedPatientId) ||
    patientProfile;

  const filteredPatients = assignedPatients.filter((patient) => {
    const matchesSearch = patient.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesRisk =
      riskFilter === "All" || patient.riskLevel === riskFilter;

    return matchesSearch && matchesRisk;
  });

  const highRiskCount = assignedPatients.filter(
    (patient) => patient.riskLevel === "High"
  ).length;

  const criticalAlertCount = alerts.filter(
    (alert) => alert.level === "danger"
  ).length;

  const clinicalInference = useMemo(() => {
    const missedMedication = selectedPatient.missedDoses;
    const routineDrop = selectedPatient.routineCompletion < 70;
    const elevatedVitals = selectedPatient.riskLevel === "High";

    if (missedMedication >= 3 || elevatedVitals) {
      return {
        level: "High",
        message:
          "Patient may need immediate clinical review due to missed medication or worsening health indicators.",
        action: "Request nurse follow-up and review medication plan."
      };
    }

    if (missedMedication >= 1 || routineDrop) {
      return {
        level: "Moderate",
        message:
          "Patient shows early signs of routine instability or medication non-adherence.",
        action: "Monitor trends and consider a check-in message."
      };
    }

    return {
      level: "Low",
      message:
        "Patient appears clinically stable based on current adherence and routine data.",
      action: "Continue normal monitoring."
    };
  }, [selectedPatient]);

  return (
    <DashboardLayout
      title="Doctor Dashboard"
      subtitle="Clinical summary, adherence trends, prescriptions, alerts, and doctor-specific patient health inferences."
    >
      <div className="doctor-dashboard">
        <div className="stats-row">
          <Card title="Assigned Patients">
            <p className="large-number">{assignedPatients.length}</p>
            <p>Total patients currently assigned to you.</p>
          </Card>

          <Card title="High-Risk Patients">
            <p className="large-number status-danger">{highRiskCount}</p>
            <p>Patients currently marked as high risk.</p>
          </Card>

          <Card title="Critical Alerts">
            <p className="large-number status-danger">{criticalAlertCount}</p>
            <p>Alerts needing urgent clinical attention.</p>
          </Card>

          <Card title="Upcoming Appointments">
            <p className="large-number">3</p>
            <p>Appointments scheduled in the next 7 days.</p>
          </Card>
        </div>

        <div className="doctor-main-grid">
          <Card title="Patient Search">
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
              <label>Filter by Risk</label>
              <select
                className="select-input"
                value={riskFilter}
                onChange={(event) => setRiskFilter(event.target.value)}
              >
                <option value="All">All</option>
                <option value="Low">Low Risk</option>
                <option value="Moderate">Moderate Risk</option>
                <option value="High">High Risk</option>
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
                    <p>{patient.primaryCondition}</p>
                  </div>

                  <span className={`risk-pill risk-${patient.riskLevel.toLowerCase()}`}>
                    {patient.riskLevel}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Selected Patient Summary">
            <p>
              <strong>Name:</strong> {selectedPatient.name}
            </p>
            <p>
              <strong>Age:</strong> {selectedPatient.age}
            </p>
            <p>
              <strong>Condition:</strong> {selectedPatient.primaryCondition}
            </p>
            <p>
              <strong>Emergency Contact:</strong>{" "}
              {selectedPatient.emergencyContact}
            </p>
            <p>
              <strong>Last Check-In:</strong> {selectedPatient.lastCheckIn}
            </p>
            <p>
              <strong>Next Appointment:</strong>{" "}
              {selectedPatient.nextAppointment}
            </p>
          </Card>

          <Card title="AI Clinical Inference">
            <p>
              <strong>Risk Level:</strong>{" "}
              <span
                className={
                  clinicalInference.level === "High"
                    ? "status-danger"
                    : clinicalInference.level === "Moderate"
                    ? "status-warning"
                    : "status-good"
                }
              >
                {clinicalInference.level}
              </span>
            </p>

            <p>{clinicalInference.message}</p>

            <div className="suggested-action">
              <strong>Suggested Action:</strong>
              <p>{clinicalInference.action}</p>
            </div>
          </Card>
        </div>

        <div className="card-grid">
          <Card title="Medication Adherence">
            <p>
              <strong>{selectedPatient.medicationAdherence}%</strong> adherence
              this month.
            </p>
            <p>
              <strong>Missed Doses:</strong> {selectedPatient.missedDoses}
            </p>
            <p
              className={
                selectedPatient.medicationAdherence >= 85
                  ? "status-good"
                  : selectedPatient.medicationAdherence >= 70
                  ? "status-warning"
                  : "status-danger"
              }
            >
              Inference:{" "}
              {selectedPatient.medicationAdherence >= 85
                ? "Generally stable adherence."
                : selectedPatient.medicationAdherence >= 70
                ? "Moderate adherence concern."
                : "High non-adherence risk."}
            </p>
          </Card>

          <Card title="Prescription Management">
            <ul className="list">
              {medications.map((med) => (
                <li key={med.id}>
                  <strong>{med.name}</strong> — {med.dosage} — {med.time}
                </li>
              ))}
            </ul>

            <button className="secondary-button">Edit Prescription Plan</button>
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
                  <strong>{vital.label}:</strong> {vital.value}
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Vitals Trend">
            <ul className="list">
              {vitalsHistory.map((vital) => (
                <li key={vital.id}>
                  {vital.date}: BP {vital.bloodPressure}, Glucose{" "}
                  {vital.glucose}, HR {vital.heartRate}
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Care Team Notes">
            <ul className="list">
              {careTeamNotes.map((note) => (
                <li key={note.id}>
                  <strong>{note.author}:</strong> {note.message}
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Appointment Notes">
            <ul className="list">
              {appointmentNotes.map((note) => (
                <li key={note.id}>
                  <strong>{note.date}:</strong> {note.summary}
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Care Plan Builder">
            <ul className="list">
              <li>Record blood pressure every morning for 7 days.</li>
              <li>Follow up if medication adherence drops below 80%.</li>
              <li>Request nurse check-in after any SOS event.</li>
            </ul>

            <button className="secondary-button">Add Care Plan Goal</button>
          </Card>

          <Card title="Report Export">
            <p>Generate a doctor-facing report for patient progress.</p>

            <button className="secondary-button">Export Health Report</button>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}