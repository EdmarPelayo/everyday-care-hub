import { useEffect, useMemo, useRef, useState } from "react";

const copy = {
  en: {
    appName: "Smart Medication Reminder",
    className: "Accessibility and Assistive Technology",
    intro:
      "A calmer, large-print medication page with reminders, camera confirmation, caregiver updates, and refill support.",
    language: "Language",
    alertModes: "Alert modes",
    visual: "Visual",
    audio: "Audio",
    vibration: "Vibration",
    triggerAlert: "Play reminder",
    confirmDose: "Confirm dose taken",
    openCamera: "Open camera",
    capturePhoto: "Capture photo",
    closeCamera: "Close camera",
    uploadPhoto: "Upload photo instead",
    refill: "Request refill",
    notify: "Notify caregiver",
    schedule: "Today dosage schedule",
    currentDose: "Current reminder",
    caregiver: "Caregiver notifications",
    pharmacy: "Pharmacy and refill",
    accessibility: "Accessibility controls",
    largePrint: "Large print",
    highContrast: "High contrast",
    screenReader: "Screen reader updates",
    taken: "Taken",
    upcoming: "Upcoming",
    dueNow: "Due now",
    missed: "Needs attention",
    pillsLeft: "pills left",
    refillDue: "Refill due soon",
    photoReady: "Photo confirmation added.",
    caregiverSent: "Caregiver notification sent.",
    refillSent: "Refill request sent to pharmacy.",
    alertPlayed: "Reminder alert played.",
    noPhoto: "No photo confirmation yet.",
    addReminder: "Add prescription reminder",
    medicationName: "Medication name",
    dosage: "Dosage",
    time: "Time",
    instructions: "Instructions",
    quantity: "Pills left",
    status: "Status",
    saveReminder: "Save reminder",
    deleteReminder: "Delete",
    cameraUnavailable: "Camera could not start. Use photo upload instead.",
    reminderAdded: "Prescription reminder added.",
    reminderDeleted: "Prescription reminder deleted."
  },
  es: {
    appName: "Recordatorio Inteligente de Medicamentos",
    className: "Accesibilidad y Tecnologia de Asistencia",
    intro:
      "Una pagina tranquila con letra grande, recordatorios, camara, cuidador y recargas.",
    language: "Idioma",
    alertModes: "Tipos de alerta",
    visual: "Visual",
    audio: "Audio",
    vibration: "Vibracion",
    triggerAlert: "Reproducir recordatorio",
    confirmDose: "Confirmar dosis tomada",
    openCamera: "Abrir camara",
    capturePhoto: "Capturar foto",
    closeCamera: "Cerrar camara",
    uploadPhoto: "Subir foto",
    refill: "Solicitar recarga",
    notify: "Avisar al cuidador",
    schedule: "Horario de dosis de hoy",
    currentDose: "Recordatorio actual",
    caregiver: "Notificaciones al cuidador",
    pharmacy: "Farmacia y recarga",
    accessibility: "Controles de accesibilidad",
    largePrint: "Letra grande",
    highContrast: "Alto contraste",
    screenReader: "Avisos para lector de pantalla",
    taken: "Tomada",
    upcoming: "Proxima",
    dueNow: "Ahora",
    missed: "Necesita atencion",
    pillsLeft: "pastillas restantes",
    refillDue: "Recarga pronto",
    photoReady: "Confirmacion con foto agregada.",
    caregiverSent: "Notificacion enviada al cuidador.",
    refillSent: "Solicitud enviada a la farmacia.",
    alertPlayed: "Recordatorio reproducido.",
    noPhoto: "Aun no hay foto de confirmacion.",
    addReminder: "Agregar recordatorio",
    medicationName: "Nombre del medicamento",
    dosage: "Dosis",
    time: "Hora",
    instructions: "Instrucciones",
    quantity: "Pastillas restantes",
    status: "Estado",
    saveReminder: "Guardar recordatorio",
    deleteReminder: "Eliminar",
    cameraUnavailable: "No se pudo abrir la camara. Use subir foto.",
    reminderAdded: "Recordatorio agregado.",
    reminderDeleted: "Recordatorio eliminado."
  }
};

const initialSchedule = [
  {
    id: 1,
    time: "08:00",
    name: "Metformin",
    dose: "500 mg",
    instructions: "Take with breakfast",
    status: "taken",
    pillsLeft: 24
  },
  {
    id: 2,
    time: "12:30",
    name: "Lisinopril",
    dose: "10 mg",
    instructions: "Take with a full glass of water",
    status: "dueNow",
    pillsLeft: 7
  },
  {
    id: 3,
    time: "20:00",
    name: "Atorvastatin",
    dose: "20 mg",
    instructions: "Take after dinner",
    status: "upcoming",
    pillsLeft: 18
  }
];

const emptyReminder = {
  name: "",
  dose: "",
  time: "09:00",
  instructions: "",
  pillsLeft: "30",
  status: "upcoming"
};

const statusClass = {
  taken: "good",
  upcoming: "neutral",
  dueNow: "urgent",
  missed: "danger"
};

function formatTime(time) {
  const [hourValue, minute] = time.split(":");
  const hour = Number(hourValue);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${minute} ${period}`;
}

export default function App() {
  const [language, setLanguage] = useState("en");
  const [schedule, setSchedule] = useState(initialSchedule);
  const [form, setForm] = useState(emptyReminder);
  const [alertModes, setAlertModes] = useState({
    visual: true,
    audio: true,
    vibration: true
  });
  const [largePrint, setLargePrint] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [photoPreview, setPhotoPreview] = useState("");
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [activity, setActivity] = useState([
    {
      id: 1,
      message: "12:00 PM: Reminder prepared for Lisinopril."
    }
  ]);
  const [liveMessage, setLiveMessage] = useState("");

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const t = copy[language];
  const currentDose = useMemo(() => {
    return (
      schedule.find((item) => item.status === "dueNow") ||
      schedule.find((item) => item.status === "upcoming") ||
      schedule[0] ||
      null
    );
  }, [schedule]);

  useEffect(() => {
    return () => stopCamera();
  }, []);

  function addActivity(message) {
    setActivity((items) =>
      [{ id: crypto.randomUUID(), message }, ...items].slice(0, 6)
    );
    setLiveMessage(message);
  }

  function updateForm(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function addReminder(event) {
    event.preventDefault();

    const reminder = {
      id: Date.now(),
      name: form.name.trim(),
      dose: form.dose.trim(),
      time: form.time,
      instructions: form.instructions.trim() || "No special instructions",
      status: form.status,
      pillsLeft: Number(form.pillsLeft) || 0
    };

    if (!reminder.name || !reminder.dose || !reminder.time) {
      addActivity("Medication name, dosage, and time are required.");
      return;
    }

    setSchedule((items) =>
      [...items, reminder].sort((a, b) => a.time.localeCompare(b.time))
    );
    setForm(emptyReminder);
    addActivity(`${formatTime(reminder.time)}: ${reminder.name} ${t.reminderAdded}`);
  }

  function deleteReminder(id) {
    const reminder = schedule.find((item) => item.id === id);
    setSchedule((items) => items.filter((item) => item.id !== id));
    addActivity(`${reminder?.name || "Reminder"} ${t.reminderDeleted}`);
  }

  function toggleAlertMode(mode) {
    setAlertModes((current) => ({
      ...current,
      [mode]: !current[mode]
    }));
  }

  function playAlert() {
    if (!currentDose) {
      return;
    }

    if (alertModes.audio && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(
        new SpeechSynthesisUtterance(
          `${currentDose.name}, ${currentDose.dose}. ${currentDose.instructions}`
        )
      );
    }

    if (alertModes.vibration && "vibrate" in navigator) {
      navigator.vibrate([220, 120, 220]);
    }

    addActivity(`${formatTime(currentDose.time)}: ${t.alertPlayed}`);
  }

  function confirmDose() {
    if (!currentDose) {
      return;
    }

    setSchedule((items) =>
      items.map((item) =>
        item.id === currentDose.id ? { ...item, status: "taken" } : item
      )
    );
    addActivity(`${formatTime(currentDose.time)}: ${currentDose.name} ${t.taken}.`);
  }

  async function openCamera() {
    setCameraError("");

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError(t.cameraUnavailable);
      addActivity(t.cameraUnavailable);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false
      });

      streamRef.current = stream;
      setCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      setCameraError(t.cameraUnavailable);
      addActivity(t.cameraUnavailable);
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraActive(false);
  }

  function capturePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      return;
    }

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    setPhotoPreview(canvas.toDataURL("image/png"));
    stopCamera();
    addActivity(`${currentDose ? formatTime(currentDose.time) : ""}: ${t.photoReady}`);
  }

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setPhotoPreview(URL.createObjectURL(file));
    addActivity(`${currentDose ? formatTime(currentDose.time) : ""}: ${t.photoReady}`);
  }

  function requestRefill() {
    if (!currentDose) {
      return;
    }

    addActivity(`${currentDose.name}: ${t.refillSent}`);
  }

  function notifyCaregiver() {
    addActivity(`Caregiver: ${t.caregiverSent}`);
  }

  const rootClass = [
    "medication-app",
    largePrint ? "large-print" : "",
    highContrast ? "high-contrast" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <main className={rootClass} lang={language}>
      <div className="sr-only" aria-live="polite">
        {liveMessage}
      </div>

      <section className="hero-panel" aria-labelledby="page-title">
        <div>
          <p className="eyebrow">{t.className}</p>
          <h1 id="page-title">{t.appName}</h1>
          <p className="intro">{t.intro}</p>
        </div>

        <div className={alertModes.visual ? "visual-alert active" : "visual-alert"}>
          <span aria-hidden="true">!</span>
          <strong>{currentDose ? formatTime(currentDose.time) : "--"}</strong>
          <p>{currentDose?.name || "No reminders"}</p>
        </div>
      </section>

      <section className="control-strip" aria-label={t.accessibility}>
        <label>
          <span>{t.language}</span>
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            aria-label={t.language}
          >
            <option value="en">English</option>
            <option value="es">Espanol</option>
          </select>
        </label>

        <Toggle checked={largePrint} label={t.largePrint} onChange={setLargePrint} />
        <Toggle
          checked={highContrast}
          label={t.highContrast}
          onChange={setHighContrast}
        />
        <Toggle checked label={t.screenReader} disabled />
      </section>

      <div className="dashboard-grid">
        <section className="dose-card primary-card" aria-labelledby="current-dose">
          <div className="section-heading">
            <p className="eyebrow">{t.currentDose}</p>
            <h2 id="current-dose">{currentDose?.name || "No reminder selected"}</h2>
          </div>

          {currentDose ? (
            <div className="dose-detail">
              <span>{formatTime(currentDose.time)}</span>
              <strong>{currentDose.dose}</strong>
              <p>{currentDose.instructions}</p>
            </div>
          ) : (
            <p className="empty-state">Add a prescription reminder to get started.</p>
          )}

          <div className="action-grid">
            <button type="button" className="action-button alert" onClick={playAlert}>
              <span aria-hidden="true">A</span>
              {t.triggerAlert}
            </button>
            <button type="button" className="action-button good" onClick={confirmDose}>
              <span aria-hidden="true">C</span>
              {t.confirmDose}
            </button>
            <button type="button" className="action-button camera" onClick={openCamera}>
              <span aria-hidden="true">P</span>
              {t.openCamera}
            </button>
          </div>

          <div className="camera-area">
            {cameraActive && (
              <div className="camera-panel">
                <video ref={videoRef} autoPlay playsInline muted />
                <div className="camera-actions">
                  <button type="button" className="secondary-button" onClick={capturePhoto}>
                    {t.capturePhoto}
                  </button>
                  <button type="button" className="ghost-button" onClick={stopCamera}>
                    {t.closeCamera}
                  </button>
                </div>
              </div>
            )}

            {cameraError && <p className="camera-error">{cameraError}</p>}

            <button
              type="button"
              className="text-button"
              onClick={() => fileInputRef.current?.click()}
            >
              {t.uploadPhoto}
            </button>
            <input
              ref={fileInputRef}
              className="sr-only"
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handlePhotoChange}
              aria-label={t.uploadPhoto}
            />
            <canvas ref={canvasRef} className="sr-only" />
          </div>

          <div className="photo-confirmation">
            {photoPreview ? (
              <img src={photoPreview} alt="Medication confirmation preview" />
            ) : (
              <div className="photo-placeholder">{t.noPhoto}</div>
            )}
          </div>
        </section>

        <section className="dose-card form-card" aria-labelledby="add-title">
          <div className="section-heading">
            <p className="eyebrow">Prescription setup</p>
            <h2 id="add-title">{t.addReminder}</h2>
          </div>

          <form className="reminder-form" onSubmit={addReminder}>
            <label>
              <span>{t.medicationName}</span>
              <input
                value={form.name}
                onChange={(event) => updateForm("name", event.target.value)}
                placeholder="Example: Vitamin D"
              />
            </label>

            <label>
              <span>{t.dosage}</span>
              <input
                value={form.dose}
                onChange={(event) => updateForm("dose", event.target.value)}
                placeholder="Example: 1000 IU"
              />
            </label>

            <label>
              <span>{t.time}</span>
              <input
                type="time"
                value={form.time}
                onChange={(event) => updateForm("time", event.target.value)}
              />
            </label>

            <label>
              <span>{t.quantity}</span>
              <input
                type="number"
                min="0"
                value={form.pillsLeft}
                onChange={(event) => updateForm("pillsLeft", event.target.value)}
              />
            </label>

            <label>
              <span>{t.status}</span>
              <select
                value={form.status}
                onChange={(event) => updateForm("status", event.target.value)}
              >
                <option value="upcoming">{t.upcoming}</option>
                <option value="dueNow">{t.dueNow}</option>
                <option value="taken">{t.taken}</option>
                <option value="missed">{t.missed}</option>
              </select>
            </label>

            <label className="wide-field">
              <span>{t.instructions}</span>
              <input
                value={form.instructions}
                onChange={(event) => updateForm("instructions", event.target.value)}
                placeholder="Example: Take with food"
              />
            </label>

            <button type="submit" className="secondary-button form-submit">
              {t.saveReminder}
            </button>
          </form>
        </section>

        <section className="dose-card" aria-labelledby="alerts-title">
          <div className="section-heading">
            <p className="eyebrow">{t.alertModes}</p>
            <h2 id="alerts-title">Reminder signals</h2>
          </div>

          <div className="toggle-stack">
            <Toggle
              checked={alertModes.visual}
              label={t.visual}
              onChange={() => toggleAlertMode("visual")}
            />
            <Toggle
              checked={alertModes.audio}
              label={t.audio}
              onChange={() => toggleAlertMode("audio")}
            />
            <Toggle
              checked={alertModes.vibration}
              label={t.vibration}
              onChange={() => toggleAlertMode("vibration")}
            />
          </div>
        </section>

        <section className="dose-card schedule-card" aria-labelledby="schedule-title">
          <div className="section-heading">
            <p className="eyebrow">{t.schedule}</p>
            <h2 id="schedule-title">Large-print doses</h2>
          </div>

          <div className="schedule-list">
            {schedule.map((item) => (
              <article className="schedule-item" key={item.id}>
                <div>
                  <time>{formatTime(item.time)}</time>
                  <h3>{item.name}</h3>
                  <p>
                    {item.dose} - {item.instructions}
                  </p>
                </div>
                <div className="schedule-actions">
                  <span className={`status-pill ${statusClass[item.status]}`}>
                    {t[item.status]}
                  </span>
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => deleteReminder(item.id)}
                  >
                    {t.deleteReminder}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="dose-card" aria-labelledby="pharmacy-title">
          <div className="section-heading">
            <p className="eyebrow">{t.pharmacy}</p>
            <h2 id="pharmacy-title">{t.refillDue}</h2>
          </div>

          <div
            className="refill-meter"
            aria-label={`${currentDose?.pillsLeft || 0} ${t.pillsLeft}`}
          >
            <span
              style={{
                width: `${Math.min((currentDose?.pillsLeft || 0) * 5, 100)}%`
              }}
            />
          </div>
          <p className="supporting-text">
            {currentDose?.name || "No medication"}: {currentDose?.pillsLeft || 0}{" "}
            {t.pillsLeft}
          </p>
          <button type="button" className="secondary-button" onClick={requestRefill}>
            {t.refill}
          </button>
        </section>

        <section className="dose-card" aria-labelledby="caregiver-title">
          <div className="section-heading">
            <p className="eyebrow">{t.caregiver}</p>
            <h2 id="caregiver-title">Maria Chen</h2>
          </div>

          <p className="supporting-text">
            Sends missed-dose alerts, confirmation updates, and refill requests
            to the selected caregiver contact.
          </p>
          <button type="button" className="secondary-button" onClick={notifyCaregiver}>
            {t.notify}
          </button>
        </section>

        <section className="dose-card activity-card" aria-labelledby="activity-title">
          <div className="section-heading">
            <p className="eyebrow">Live log</p>
            <h2 id="activity-title">Recent updates</h2>
          </div>

          <ul>
            {activity.map((item) => (
              <li key={item.id}>{item.message}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

function Toggle({ checked, disabled = false, label, onChange }) {
  return (
    <label className={disabled ? "toggle disabled" : "toggle"}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
      />
      <span aria-hidden="true" />
      <strong>{label}</strong>
    </label>
  );
}
