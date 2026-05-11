import { useEffect, useMemo, useRef, useState } from "react";
import { compareAsc, format, parse } from "date-fns";

const copy = {
  en: {
    appName: "Everyday Helper",
    className: "Accessibility and Assistive Technology",
    intro:
      "A calm, large-print medication helper with custom schedules, camera review, caregiver updates, and refill support.",
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
    times: "Reminder times",
    time: "Time",
    instructions: "Instructions",
    quantity: "Pills left",
    pillCount: "Pills expected",
    status: "Status",
    addAnotherTime: "Add another time",
    removeTime: "Remove time",
    saveReminder: "Save reminder",
    deleteReminder: "Delete",
    cameraUnavailable: "Camera could not start. Use photo upload instead.",
    reminderAdded: "Prescription reminder added.",
    reminderDeleted: "Prescription reminder deleted.",
    photoReview: "Photo review",
    expectedPills: "Expected pills",
    detectedPills: "Detected pills",
    runReview: "Review photo",
    approveDose: "Approve dose",
    reviewNeeded: "Needs photo review",
    reviewMatch: "Matches expected dose",
    reviewMismatch: "Dose mismatch",
    reviewHelp:
      "For this prototype, enter the detected pill count after looking at the image. A real version would connect this step to a vision model.",
    simulation: "Simulate detection",
    approved: "Dose approved from photo review.",
    mismatch:
      "Detected count does not match the expected dose. Caregiver review recommended.",
    today: "Today",
    userTab: "Medication",
    caregiverTab: "Caregiver",
    caregiverDashboard: "Caregiver updates",
    caregiverIntro:
      "Medication status, confirmation photos, refill notices, and the full reminder schedule for the person you support.",
    careLog: "Care update log",
    noCareUpdates: "No caregiver updates yet.",
    photoEvidence: "Photo evidence",
    scheduleSnapshot: "Reminder schedule",
    noPhotoAttached: "No photo attached"
  },
  es: {
    appName: "Everyday Helper",
    className: "Accesibilidad y Tecnologia de Asistencia",
    intro:
      "Ayuda tranquila con letra grande, horarios personalizados, camara, cuidador y recargas.",
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
    times: "Horas de recordatorio",
    time: "Hora",
    instructions: "Instrucciones",
    quantity: "Pastillas restantes",
    pillCount: "Pastillas esperadas",
    status: "Estado",
    addAnotherTime: "Agregar otra hora",
    removeTime: "Eliminar hora",
    saveReminder: "Guardar recordatorio",
    deleteReminder: "Eliminar",
    cameraUnavailable: "No se pudo abrir la camara. Use subir foto.",
    reminderAdded: "Recordatorio agregado.",
    reminderDeleted: "Recordatorio eliminado.",
    photoReview: "Revision de foto",
    expectedPills: "Pastillas esperadas",
    detectedPills: "Pastillas detectadas",
    runReview: "Revisar foto",
    approveDose: "Aprobar dosis",
    reviewNeeded: "Necesita revision",
    reviewMatch: "Coincide con la dosis",
    reviewMismatch: "Dosis no coincide",
    reviewHelp:
      "Para este prototipo, ingrese el numero detectado despues de mirar la imagen. Una version real usaria un modelo de vision.",
    simulation: "Simular deteccion",
    approved: "Dosis aprobada por revision de foto.",
    mismatch:
      "El numero detectado no coincide con la dosis esperada. Se recomienda revisar con cuidador.",
    today: "Hoy",
    userTab: "Medicamentos",
    caregiverTab: "Cuidador",
    caregiverDashboard: "Actualizaciones para cuidador",
    caregiverIntro:
      "Estado de medicamentos, fotos de confirmacion, avisos de recarga y el horario completo.",
    careLog: "Registro de cuidado",
    noCareUpdates: "Aun no hay actualizaciones.",
    photoEvidence: "Evidencia con foto",
    scheduleSnapshot: "Horario de recordatorios",
    noPhotoAttached: "Sin foto adjunta"
  }
};

const initialSchedule = [
  {
    id: 1,
    time: "08:00",
    name: "Metformin",
    dose: "500 mg",
    pillCount: 1,
    instructions: "Take with breakfast",
    status: "taken",
    pillsLeft: 24
  },
  {
    id: 2,
    time: "12:30",
    name: "Lisinopril",
    dose: "10 mg",
    pillCount: 1,
    instructions: "Take with a full glass of water",
    status: "dueNow",
    pillsLeft: 7
  },
  {
    id: 3,
    time: "20:00",
    name: "Atorvastatin",
    dose: "20 mg",
    pillCount: 1,
    instructions: "Take after dinner",
    status: "upcoming",
    pillsLeft: 18
  }
];

const emptyReminder = {
  name: "",
  pillsLeft: "30",
  times: [
    {
      id: 1,
      time: "09:00",
      dose: "",
      pillCount: "1",
      instructions: "",
      status: "upcoming"
    }
  ]
};

const statusClass = {
  taken: "good",
  upcoming: "neutral",
  dueNow: "urgent",
  missed: "danger"
};

function parseReminderTime(time) {
  return parse(time, "HH:mm", new Date());
}

function formatTime(time) {
  return format(parseReminderTime(time), "h:mm a");
}

function makeId() {
  return crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;
}

export default function App() {
  const [language, setLanguage] = useState("en");
  const today = new Date();
  const [activeTab, setActiveTab] = useState("medication");
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
  const [detectedPills, setDetectedPills] = useState("");
  const [photoReview, setPhotoReview] = useState({
    status: "reviewNeeded",
    message: "No photo has been reviewed yet."
  });
  const [activity, setActivity] = useState([
    {
      id: 1,
      message: "12:00 PM: Reminder prepared for Lisinopril."
    }
  ]);
  const [caregiverUpdates, setCaregiverUpdates] = useState([
    {
      id: 1,
      time: "12:00 PM",
      title: "Reminder prepared",
      detail: "Lisinopril reminder is due today at 12:30 PM.",
      photo: ""
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

  const sortedSchedule = useMemo(() => {
    return [...schedule].sort((a, b) =>
      compareAsc(parseReminderTime(a.time), parseReminderTime(b.time))
    );
  }, [schedule]);

  useEffect(() => {
    return () => stopCamera();
  }, []);

  function addActivity(message) {
    setActivity((items) =>
      [{ id: makeId(), message }, ...items].slice(0, 6)
    );
    setLiveMessage(message);
  }

  function addCaregiverUpdate(title, detail, photo = "") {
    setCaregiverUpdates((items) =>
      [
        {
          id: makeId(),
          time: format(new Date(), "h:mm a"),
          title,
          detail,
          photo
        },
        ...items
      ].slice(0, 10)
    );
  }

  function updateForm(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function updateTimeRow(id, field, value) {
    setForm((current) => ({
      ...current,
      times: current.times.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  }

  function addTimeRow() {
    setForm((current) => ({
      ...current,
      times: [
        ...current.times,
        {
          id: Date.now(),
          time: "09:00",
          dose: "",
          pillCount: "1",
          instructions: "",
          status: "upcoming"
        }
      ]
    }));
  }

  function removeTimeRow(id) {
    setForm((current) => ({
      ...current,
      times:
        current.times.length === 1
          ? current.times
          : current.times.filter((item) => item.id !== id)
    }));
  }

  function addReminder(event) {
    event.preventDefault();

    const medicationName = form.name.trim();
    const reminders = form.times.map((item) => ({
      id: makeId(),
      name: medicationName,
      dose: item.dose.trim(),
      time: item.time,
      pillCount: Number(item.pillCount) || 1,
      instructions: item.instructions.trim() || "No special instructions",
      status: item.status,
      pillsLeft: Number(form.pillsLeft) || 0
    }));

    if (
      !medicationName ||
      reminders.some((item) => !item.dose || !item.time || item.pillCount < 1)
    ) {
      addActivity("Medication name, dosage, time, and expected pill count are required.");
      return;
    }

    setSchedule((items) =>
      [...items, ...reminders].sort((a, b) =>
        compareAsc(parseReminderTime(a.time), parseReminderTime(b.time))
      )
    );
    setForm(emptyReminder);
    addActivity(`${medicationName}: ${reminders.length} ${t.reminderAdded}`);
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
    addCaregiverUpdate(
      "Medication taken",
      `${currentDose.name} ${currentDose.dose} was marked taken at ${formatTime(
        currentDose.time
      )}.`,
      photoPreview
    );
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
    const photo = canvas.toDataURL("image/png");
    setPhotoPreview(photo);
    setPhotoReview({
      status: "reviewNeeded",
      message: t.reviewNeeded
    });
    setDetectedPills("");
    stopCamera();
    addActivity(`${currentDose ? formatTime(currentDose.time) : ""}: ${t.photoReady}`);
    addCaregiverUpdate(
      "Medication photo uploaded",
      currentDose
        ? `${currentDose.name} photo was added for the ${formatTime(
            currentDose.time
          )} reminder.`
        : "Medication confirmation photo was added.",
      photo
    );
  }

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const photo = URL.createObjectURL(file);
    setPhotoPreview(photo);
    setPhotoReview({
      status: "reviewNeeded",
      message: t.reviewNeeded
    });
    setDetectedPills("");
    addActivity(`${currentDose ? formatTime(currentDose.time) : ""}: ${t.photoReady}`);
    addCaregiverUpdate(
      "Medication photo uploaded",
      currentDose
        ? `${currentDose.name} photo was added for the ${formatTime(
            currentDose.time
          )} reminder.`
        : "Medication confirmation photo was added.",
      photo
    );
  }

  function reviewPhoto(count = detectedPills) {
    if (!currentDose || !photoPreview) {
      return;
    }

    const detected = Number(count);
    const expected = Number(currentDose.pillCount) || 1;
    const matches = detected === expected;
    const message = matches ? t.reviewMatch : t.reviewMismatch;

    setDetectedPills(String(count));
    setPhotoReview({
      status: matches ? "reviewMatch" : "reviewMismatch",
      message
    });
    addActivity(matches ? `${currentDose.name}: ${message}.` : `${currentDose.name}: ${t.mismatch}`);
    addCaregiverUpdate(
      matches ? "Photo review matched" : "Photo review needs attention",
      matches
        ? `${currentDose.name} photo review matched ${expected} expected pill(s).`
        : `${currentDose.name} photo review detected ${detected || 0} pill(s), expected ${expected}.`,
      photoPreview
    );
  }

  function simulateDetection() {
    if (!currentDose) {
      return;
    }

    reviewPhoto(currentDose.pillCount || 1);
  }

  function approvePhotoDose() {
    if (!currentDose || photoReview.status !== "reviewMatch") {
      return;
    }

    confirmDose();
    addActivity(`${currentDose.name}: ${t.approved}`);
    addCaregiverUpdate(
      "Dose approved",
      `${currentDose.name} was approved after photo review.`,
      photoPreview
    );
  }

  function requestRefill() {
    if (!currentDose) {
      return;
    }

    addActivity(`${currentDose.name}: ${t.refillSent}`);
    addCaregiverUpdate(
      "Refill requested",
      `${currentDose.name} refill request was sent. ${currentDose.pillsLeft} ${t.pillsLeft}.`
    );
  }

  function notifyCaregiver() {
    addActivity(`Caregiver: ${t.caregiverSent}`);
    addCaregiverUpdate(
      "Caregiver notified",
      "A manual caregiver notification was sent from Everyday Helper.",
      photoPreview
    );
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

      <header className="site-header">
        <div>
          <p className="eyebrow">{t.className}</p>
          <strong>{t.appName}</strong>
          <div className="date-strip">
            <span>{t.today}: {format(today, "EEEE, MMMM d, yyyy")}</span>
          </div>
        </div>

        <nav className="tab-bar" aria-label="Everyday Helper pages">
          <button
            type="button"
            className={activeTab === "medication" ? "tab-button active" : "tab-button"}
            onClick={() => setActiveTab("medication")}
          >
            {t.userTab}
          </button>
          <button
            type="button"
            className={activeTab === "caregiver" ? "tab-button active" : "tab-button"}
            onClick={() => setActiveTab("caregiver")}
          >
            {t.caregiverTab}
          </button>
        </nav>
      </header>

      {activeTab === "medication" && (
      <>
      <section className="hero-panel" aria-labelledby="page-title">
        <div>
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
              <small>
                {t.expectedPills}: {currentDose.pillCount || 1}
              </small>
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

          <div className={`photo-review ${photoReview.status}`}>
            <div className="section-heading">
              <p className="eyebrow">{t.photoReview}</p>
              <h2>{photoReview.message}</h2>
            </div>
            <p className="supporting-text">{t.reviewHelp}</p>

            <div className="review-grid">
              <div className="review-stat">
                <span>{t.expectedPills}</span>
                <strong>{currentDose?.pillCount || 1}</strong>
              </div>

              <label>
                <span>{t.detectedPills}</span>
                <input
                  type="number"
                  min="0"
                  value={detectedPills}
                  onChange={(event) => setDetectedPills(event.target.value)}
                />
              </label>
            </div>

            <div className="review-actions">
              <button type="button" className="secondary-button" onClick={() => reviewPhoto()}>
                {t.runReview}
              </button>
              <button type="button" className="ghost-button" onClick={simulateDetection}>
                {t.simulation}
              </button>
              <button
                type="button"
                className="action-button good"
                disabled={photoReview.status !== "reviewMatch"}
                onClick={approvePhotoDose}
              >
                <span aria-hidden="true">C</span>
                {t.approveDose}
              </button>
            </div>
          </div>
        </section>

        <section className="dose-card schedule-card" aria-labelledby="schedule-title">
          <div className="section-heading">
            <p className="eyebrow">{t.schedule}</p>
            <h2 id="schedule-title">Large-print doses</h2>
          </div>

          <div className="schedule-list">
            {sortedSchedule.map((item) => (
              <article className="schedule-item" key={item.id}>
                <div>
                  <time dateTime={item.time}>{formatTime(item.time)}</time>
                  <h3>{item.name}</h3>
                  <p>
                    {item.dose} - {item.instructions} - {t.expectedPills}:{" "}
                    {item.pillCount || 1}
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
              <span>{t.quantity}</span>
              <input
                type="number"
                min="0"
                value={form.pillsLeft}
                onChange={(event) => updateForm("pillsLeft", event.target.value)}
              />
            </label>

            <div className="time-builder wide-field">
              <div className="time-builder-header">
                <h3>{t.times}</h3>
                <button type="button" className="text-button" onClick={addTimeRow}>
                  {t.addAnotherTime}
                </button>
              </div>

              {form.times.map((item, index) => (
                <fieldset className="time-row" key={item.id}>
                  <legend>Reminder {index + 1}</legend>

                  <label>
                    <span>{t.time}</span>
                    <input
                      type="time"
                      value={item.time}
                      onChange={(event) =>
                        updateTimeRow(item.id, "time", event.target.value)
                      }
                    />
                  </label>

                  <label>
                    <span>{t.dosage}</span>
                    <input
                      value={item.dose}
                      onChange={(event) =>
                        updateTimeRow(item.id, "dose", event.target.value)
                      }
                      placeholder="Example: 1000 IU"
                    />
                  </label>

                  <label>
                    <span>{t.pillCount}</span>
                    <input
                      type="number"
                      min="1"
                      value={item.pillCount}
                      onChange={(event) =>
                        updateTimeRow(item.id, "pillCount", event.target.value)
                      }
                    />
                  </label>

                  <label>
                    <span>{t.status}</span>
                    <select
                      value={item.status}
                      onChange={(event) =>
                        updateTimeRow(item.id, "status", event.target.value)
                      }
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
                      value={item.instructions}
                      onChange={(event) =>
                        updateTimeRow(item.id, "instructions", event.target.value)
                      }
                      placeholder="Example: Take with food"
                    />
                  </label>

                  <button
                    type="button"
                    className="delete-button wide-field"
                    onClick={() => removeTimeRow(item.id)}
                    disabled={form.times.length === 1}
                  >
                    {t.removeTime}
                  </button>
                </fieldset>
              ))}
            </div>

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
      </>
      )}

      {activeTab === "caregiver" && (
        <div className="dashboard-grid caregiver-grid">
          <section className="dose-card primary-card" aria-labelledby="caregiver-dashboard">
            <div className="section-heading">
              <p className="eyebrow">{t.caregiverTab}</p>
              <h2 id="caregiver-dashboard">{t.caregiverDashboard}</h2>
            </div>
            <p className="supporting-text">{t.caregiverIntro}</p>

            <div className="caregiver-summary">
              <div>
                <span>{t.taken}</span>
                <strong>{schedule.filter((item) => item.status === "taken").length}</strong>
              </div>
              <div>
                <span>{t.dueNow}</span>
                <strong>{schedule.filter((item) => item.status === "dueNow").length}</strong>
              </div>
              <div>
                <span>{t.missed}</span>
                <strong>{schedule.filter((item) => item.status === "missed").length}</strong>
              </div>
            </div>
          </section>

          <section className="dose-card activity-card" aria-labelledby="care-log-title">
            <div className="section-heading">
              <p className="eyebrow">{t.careLog}</p>
              <h2 id="care-log-title">Latest user updates</h2>
            </div>

            {caregiverUpdates.length === 0 ? (
              <p className="empty-state">{t.noCareUpdates}</p>
            ) : (
              <div className="care-log">
                {caregiverUpdates.map((item) => (
                  <article className="care-log-item" key={item.id}>
                    <div>
                      <time>{item.time}</time>
                      <h3>{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>

                    <div className="care-photo">
                      {item.photo ? (
                        <img src={item.photo} alt={`${item.title} ${t.photoEvidence}`} />
                      ) : (
                        <span>{t.noPhotoAttached}</span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="dose-card schedule-card" aria-labelledby="care-schedule-title">
            <div className="section-heading">
              <p className="eyebrow">{t.scheduleSnapshot}</p>
              <h2 id="care-schedule-title">{t.schedule}</h2>
            </div>

            <div className="schedule-list">
              {sortedSchedule.map((item) => (
                <article className="schedule-item" key={item.id}>
                  <div>
                    <time dateTime={item.time}>{formatTime(item.time)}</time>
                    <h3>{item.name}</h3>
                    <p>
                      {item.dose} - {item.instructions} - {t.expectedPills}:{" "}
                      {item.pillCount || 1}
                    </p>
                  </div>
                  <div className="schedule-actions">
                    <span className={`status-pill ${statusClass[item.status]}`}>
                      {t[item.status]}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}
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
