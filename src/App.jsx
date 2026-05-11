import { useEffect, useMemo, useRef, useState } from "react";
import { compareAsc, format, parse } from "date-fns";
import { GEMINI_API_KEY, GEMINI_MODEL } from "./geminiConfig";

const copy = {
  en: {
    appName: "Everyday Helper",
    className: "Accessibility and Assistive Technology",
    intro:
      "A calm, large-print medication helper with custom schedules, photo confirmation, caregiver updates, and refill support.",
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
    expectedPills: "Expected pills",
    today: "Today",
    userTab: "Medication",
    dailyTab: "Daily Life",
    cookingTab: "Cooking",
    caregiverTab: "Caregiver",
    dailyTitle: "Daily Life Reminders",
    dailyIntro:
      "Create accessible reminders for appointments, laundry, plants, pets, household tasks, hydration, self-care, or anything else in daily life.",
    dailyCategories: "Reminder categories",
    dailyList: "Today daily reminders",
    addDailyReminder: "Add daily reminder",
    reminderTitle: "Reminder title",
    category: "Category",
    repeat: "Repeat",
    notes: "Notes",
    saveDailyReminder: "Save daily reminder",
    complete: "Complete",
    reopen: "Reopen",
    noDailyReminders: "No daily reminders yet.",
    dailyAdded: "Daily reminder added.",
    dailyDeleted: "Daily reminder deleted.",
    cookingTitle: "Accessible Cooking Assistant",
    cookingIntro:
      "AI-powered cooking support for simplified recipes, step-by-step guidance, timers, voice controls, safety alerts, and visual food identification.",
    recipeInput: "Recipe, ingredients, or cooking goal",
    simplifyRecipe: "Simplify with Gemini",
    makeSteps: "Make step guide",
    identifyFood: "Identify food image",
    uploadFoodPhoto: "Upload food photo",
    cookingTimer: "Cooking timer",
    minutes: "Minutes",
    startTimer: "Start timer",
    stopTimer: "Stop timer",
    nextStep: "Next step",
    previousStep: "Previous step",
    readStep: "Read step aloud",
    voiceControl: "Voice control",
    startListening: "Start listening",
    aiOutput: "AI cooking guidance",
    keyMissing:
      "Gemini key missing. Paste your key in src/geminiConfig.js to enable AI features.",
    aiError: "Gemini request failed. Check your key and network connection.",
    loading: "Asking Gemini...",
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
      "Ayuda tranquila con letra grande, horarios personalizados, foto de confirmacion, cuidador y recargas.",
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
    expectedPills: "Pastillas esperadas",
    today: "Hoy",
    userTab: "Medicamentos",
    dailyTab: "Vida diaria",
    cookingTab: "Cocina",
    caregiverTab: "Cuidador",
    dailyTitle: "Recordatorios de Vida Diaria",
    dailyIntro:
      "Cree recordatorios accesibles para citas, lavanderia, plantas, mascotas, tareas del hogar, hidratacion, cuidado personal o cualquier rutina diaria.",
    dailyCategories: "Categorias",
    dailyList: "Recordatorios de hoy",
    addDailyReminder: "Agregar recordatorio diario",
    reminderTitle: "Titulo del recordatorio",
    category: "Categoria",
    repeat: "Repetir",
    notes: "Notas",
    saveDailyReminder: "Guardar recordatorio",
    complete: "Completar",
    reopen: "Reabrir",
    noDailyReminders: "Aun no hay recordatorios diarios.",
    dailyAdded: "Recordatorio diario agregado.",
    dailyDeleted: "Recordatorio diario eliminado.",
    cookingTitle: "Asistente de Cocina Accesible",
    cookingIntro:
      "Ayuda de cocina con IA para recetas simples, pasos guiados, temporizadores, voz, alertas de seguridad e identificacion visual.",
    recipeInput: "Receta, ingredientes u objetivo",
    simplifyRecipe: "Simplificar con Gemini",
    makeSteps: "Crear pasos",
    identifyFood: "Identificar comida",
    uploadFoodPhoto: "Subir foto de comida",
    cookingTimer: "Temporizador",
    minutes: "Minutos",
    startTimer: "Iniciar",
    stopTimer: "Detener",
    nextStep: "Siguiente paso",
    previousStep: "Paso anterior",
    readStep: "Leer paso",
    voiceControl: "Control por voz",
    startListening: "Escuchar",
    aiOutput: "Guia de cocina con IA",
    keyMissing:
      "Falta la clave de Gemini. Pegue su clave en src/geminiConfig.js.",
    aiError: "La solicitud a Gemini fallo. Revise su clave y conexion.",
    loading: "Consultando Gemini...",
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

const dailyCategories = [
  {
    id: "appointments",
    icon: "📅",
    title: "Appointments",
    tone: "teal",
    examples: [
      "Doctor, therapy, dentist alerts",
      "Transit directions with accessible routes",
      "Prep reminders for forms or fasting"
    ]
  },
  {
    id: "laundry",
    icon: "🧺",
    title: "Laundry",
    tone: "indigo",
    examples: [
      "Wash, dry, fold step notifications",
      "Timer with large countdown display",
      "Fabric care visual guides"
    ]
  },
  {
    id: "plants",
    icon: "🌿",
    title: "Plant Watering",
    tone: "green",
    examples: [
      "Plant-specific watering schedules",
      "Photo notes for each plant",
      "Seasonal care adjustments"
    ]
  },
  {
    id: "pets",
    icon: "🐾",
    title: "Pet Feeding",
    tone: "orange",
    examples: [
      "Feeding and medication reminders",
      "Vet appointment tracking",
      "Weight and health logging"
    ]
  },
  {
    id: "household",
    icon: "🏠",
    title: "Household Tasks",
    tone: "pink",
    examples: [
      "Cleaning schedule with visual checklists",
      "Garbage day alerts",
      "Bill payment reminders"
    ]
  },
  {
    id: "self-care",
    icon: "💧",
    title: "Hydration & Self-Care",
    tone: "blue",
    examples: [
      "Drink water reminders",
      "Skincare and hygiene routines",
      "Sleep schedule prompts"
    ]
  }
];

const initialDailyReminders = [
  {
    id: 1,
    title: "Drink water",
    category: "self-care",
    time: "10:00",
    repeat: "Daily",
    notes: "Use the large blue bottle.",
    completed: false
  },
  {
    id: 2,
    title: "Move laundry to dryer",
    category: "laundry",
    time: "14:30",
    repeat: "Today",
    notes: "Check delicate cycle first.",
    completed: false
  }
];

const emptyDailyReminder = {
  title: "",
  category: "appointments",
  time: "09:00",
  repeat: "Daily",
  notes: ""
};

const cookingFeatures = [
  {
    icon: "📖",
    title: "Step-by-Step Guidance",
    tone: "green",
    text:
      "One instruction at a time with large fonts, high contrast, and audio narration."
  },
  {
    icon: "⏱️",
    title: "Timers & Alerts",
    tone: "teal",
    text:
      "Automatic cooking timers with visual countdowns, sound alerts, and phone vibration."
  },
  {
    icon: "🥦",
    title: "Recipe Simplification",
    tone: "purple",
    text:
      "Gemini breaks complex recipes into accessible steps, substitutions, and safety notes."
  },
  {
    icon: "🗣️",
    title: "Voice Control",
    tone: "orange",
    text:
      "Hands-free commands such as next, back, and repeat for users holding utensils."
  },
  {
    icon: "🌡️",
    title: "Safety Alerts",
    tone: "pink",
    text:
      "Stove-on reminders, temperature warnings, and caregiver-friendly safety prompts."
  },
  {
    icon: "📷",
    title: "Visual Food Identification",
    tone: "blue",
    text:
      "Upload a food photo so Gemini can describe visible ingredients or labels."
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
  const [dailyReminders, setDailyReminders] = useState(initialDailyReminders);
  const [dailyForm, setDailyForm] = useState(emptyDailyReminder);
  const [recipeInput, setRecipeInput] = useState(
    "I have eggs, spinach, bread, and cheese. Make a simple breakfast."
  );
  const [cookingOutput, setCookingOutput] = useState(
    "Gemini guidance will appear here after you paste your key and ask for help."
  );
  const [cookingSteps, setCookingSteps] = useState([]);
  const [currentCookingStep, setCurrentCookingStep] = useState(0);
  const [cookingImage, setCookingImage] = useState(null);
  const [cookingImagePreview, setCookingImagePreview] = useState("");
  const [cookingLoading, setCookingLoading] = useState(false);
  const [cookingError, setCookingError] = useState("");
  const [timerMinutes, setTimerMinutes] = useState("5");
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
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
  const foodInputRef = useRef(null);

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

  const sortedDailyReminders = useMemo(() => {
    return [...dailyReminders].sort((a, b) =>
      compareAsc(parseReminderTime(a.time), parseReminderTime(b.time))
    );
  }, [dailyReminders]);

  useEffect(() => {
    return () => stopCamera();
  }, []);

  useEffect(() => {
    if (!timerRunning || timerSeconds <= 0) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setTimerSeconds((seconds) => {
        if (seconds <= 1) {
          window.clearInterval(timer);
          setTimerRunning(false);

          if ("vibrate" in navigator) {
            navigator.vibrate([240, 120, 240]);
          }

          if ("speechSynthesis" in window) {
            window.speechSynthesis.speak(
              new SpeechSynthesisUtterance("Cooking timer finished.")
            );
          }

          return 0;
        }

        return seconds - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [timerRunning, timerSeconds]);

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

  function updateDailyForm(field, value) {
    setDailyForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function addDailyReminder(event) {
    event.preventDefault();

    const title = dailyForm.title.trim();

    if (!title || !dailyForm.time) {
      addActivity("Daily reminder title and time are required.");
      return;
    }

    const reminder = {
      id: makeId(),
      title,
      category: dailyForm.category,
      time: dailyForm.time,
      repeat: dailyForm.repeat,
      notes: dailyForm.notes.trim(),
      completed: false
    };

    setDailyReminders((items) => [...items, reminder]);
    setDailyForm(emptyDailyReminder);
    addActivity(`${formatTime(reminder.time)}: ${title} ${t.dailyAdded}`);
  }

  function toggleDailyReminder(id) {
    setDailyReminders((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function deleteDailyReminder(id) {
    const reminder = dailyReminders.find((item) => item.id === id);
    setDailyReminders((items) => items.filter((item) => item.id !== id));
    addActivity(`${reminder?.title || "Daily reminder"} ${t.dailyDeleted}`);
  }

  async function askGemini(parts) {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === "PASTE_YOUR_GEMINI_API_KEY_HERE") {
      throw new Error(t.keyMissing);
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts
            }
          ]
        })
      }
    );

    if (!response.ok) {
      throw new Error(t.aiError);
    }

    const data = await response.json();
    return (
      data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text)
        .filter(Boolean)
        .join("\n") || "No Gemini response returned."
    );
  }

  async function runCookingPrompt(mode) {
    setCookingLoading(true);
    setCookingError("");

    const prompt =
      mode === "steps"
        ? `Create an accessible step-by-step cooking guide for this. Use short numbered steps, one action per step, plain language, safety reminders, and timer suggestions when useful:\n\n${recipeInput}`
        : `Simplify this recipe or cooking goal for an accessibility-focused cooking assistant. Include ingredients, easy substitutions, allergen flags when obvious, safety notes, and simple steps:\n\n${recipeInput}`;

    try {
      const text = await askGemini([{ text: prompt }]);
      setCookingOutput(text);
      const steps = text
        .split(/\n+/)
        .map((line) => line.replace(/^\d+[\).]\s*/, "").trim())
        .filter((line) => line.length > 12)
        .slice(0, 12);
      setCookingSteps(steps);
      setCurrentCookingStep(0);
    } catch (error) {
      setCookingError(error.message || t.aiError);
    } finally {
      setCookingLoading(false);
    }
  }

  function handleFoodImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      const [, base64 = ""] = result.split(",");
      setCookingImage({
        mimeType: file.type || "image/jpeg",
        data: base64
      });
      setCookingImagePreview(result);
    };
    reader.readAsDataURL(file);
  }

  async function identifyFoodImage() {
    if (!cookingImage) {
      setCookingError("Upload a food photo first.");
      return;
    }

    setCookingLoading(true);
    setCookingError("");

    try {
      const text = await askGemini([
        {
          text:
            "You are an accessible cooking assistant. Describe the visible food or ingredient labels in this image. Mention possible ingredients, expiry dates if readable, safety concerns, and simple meal ideas. Do not claim certainty if unclear."
        },
        {
          inline_data: {
            mime_type: cookingImage.mimeType,
            data: cookingImage.data
          }
        }
      ]);
      setCookingOutput(text);
    } catch (error) {
      setCookingError(error.message || t.aiError);
    } finally {
      setCookingLoading(false);
    }
  }

  function startCookingTimer() {
    const minutes = Number(timerMinutes) || 1;
    setTimerSeconds(Math.max(1, minutes) * 60);
    setTimerRunning(true);
  }

  function stopCookingTimer() {
    setTimerRunning(false);
    setTimerSeconds(0);
  }

  function speakCurrentStep() {
    const step = cookingSteps[currentCookingStep] || cookingOutput;

    if ("speechSynthesis" in window && step) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(step));
    }
  }

  function moveCookingStep(direction) {
    setCurrentCookingStep((index) => {
      const next = index + direction;
      return Math.min(Math.max(next, 0), Math.max(cookingSteps.length - 1, 0));
    });
  }

  function startVoiceCommands() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setCookingError("Voice control is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();

      if (command.includes("next")) {
        moveCookingStep(1);
      } else if (command.includes("back") || command.includes("previous")) {
        moveCookingStep(-1);
      } else if (command.includes("repeat") || command.includes("read")) {
        speakCurrentStep();
      }
    };
    recognition.start();
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
            className={activeTab === "daily" ? "tab-button active" : "tab-button"}
            onClick={() => setActiveTab("daily")}
          >
            {t.dailyTab}
          </button>
          <button
            type="button"
            className={activeTab === "cooking" ? "tab-button active" : "tab-button"}
            onClick={() => setActiveTab("cooking")}
          >
            {t.cookingTab}
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

      {activeTab === "daily" && (
        <>
          <section className="daily-hero" aria-labelledby="daily-title">
            <div>
              <p className="eyebrow">{t.dailyTab}</p>
              <h1 id="daily-title">📅 {t.dailyTitle}</h1>
              <p className="intro">{t.dailyIntro}</p>
            </div>
          </section>

          <div className="daily-grid">
            <section className="dose-card daily-categories-card" aria-labelledby="daily-categories-title">
              <div className="section-heading">
                <p className="eyebrow">{t.dailyCategories}</p>
                <h2 id="daily-categories-title">Choose any kind of reminder</h2>
              </div>

              <div className="life-category-grid">
                {dailyCategories.map((category) => (
                  <article className={`life-category-card ${category.tone}`} key={category.id}>
                    <header>
                      <span aria-hidden="true">{category.icon}</span>
                      <h3>{category.title}</h3>
                    </header>

                    <ul>
                      {category.examples.map((example) => (
                        <li key={example}>{example}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section className="dose-card" aria-labelledby="add-daily-title">
              <div className="section-heading">
                <p className="eyebrow">{t.addDailyReminder}</p>
                <h2 id="add-daily-title">Create a daily reminder</h2>
              </div>

              <form className="daily-form" onSubmit={addDailyReminder}>
                <label>
                  <span>{t.reminderTitle}</span>
                  <input
                    value={dailyForm.title}
                    onChange={(event) => updateDailyForm("title", event.target.value)}
                    placeholder="Example: Feed the cat"
                  />
                </label>

                <label>
                  <span>{t.category}</span>
                  <select
                    value={dailyForm.category}
                    onChange={(event) => updateDailyForm("category", event.target.value)}
                  >
                    {dailyCategories.map((category) => (
                      <option value={category.id} key={category.id}>
                        {category.icon} {category.title}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>{t.time}</span>
                  <input
                    type="time"
                    value={dailyForm.time}
                    onChange={(event) => updateDailyForm("time", event.target.value)}
                  />
                </label>

                <label>
                  <span>{t.repeat}</span>
                  <select
                    value={dailyForm.repeat}
                    onChange={(event) => updateDailyForm("repeat", event.target.value)}
                  >
                    <option>Daily</option>
                    <option>Weekdays</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Today</option>
                  </select>
                </label>

                <label className="wide-field">
                  <span>{t.notes}</span>
                  <input
                    value={dailyForm.notes}
                    onChange={(event) => updateDailyForm("notes", event.target.value)}
                    placeholder="Example: Use the accessible entrance"
                  />
                </label>

                <button type="submit" className="secondary-button form-submit">
                  {t.saveDailyReminder}
                </button>
              </form>
            </section>

            <section className="dose-card daily-list-card" aria-labelledby="daily-list-title">
              <div className="section-heading">
                <p className="eyebrow">{t.dailyList}</p>
                <h2 id="daily-list-title">Large-print daily schedule</h2>
              </div>

              {sortedDailyReminders.length === 0 ? (
                <p className="empty-state">{t.noDailyReminders}</p>
              ) : (
                <div className="daily-reminder-list">
                  {sortedDailyReminders.map((reminder) => {
                    const category = dailyCategories.find(
                      (item) => item.id === reminder.category
                    );

                    return (
                      <article
                        className={
                          reminder.completed
                            ? "daily-reminder-item completed"
                            : "daily-reminder-item"
                        }
                        key={reminder.id}
                      >
                        <div className={`daily-icon ${category?.tone || "teal"}`}>
                          <span aria-hidden="true">{category?.icon || "✓"}</span>
                        </div>

                        <div>
                          <time dateTime={reminder.time}>
                            {formatTime(reminder.time)}
                          </time>
                          <h3>{reminder.title}</h3>
                          <p>
                            {category?.title || t.category} - {reminder.repeat}
                            {reminder.notes ? ` - ${reminder.notes}` : ""}
                          </p>
                        </div>

                        <div className="daily-actions">
                          <button
                            type="button"
                            className="secondary-button"
                            onClick={() => toggleDailyReminder(reminder.id)}
                          >
                            {reminder.completed ? t.reopen : t.complete}
                          </button>
                          <button
                            type="button"
                            className="delete-button"
                            onClick={() => deleteDailyReminder(reminder.id)}
                          >
                            {t.deleteReminder}
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        </>
      )}

      {activeTab === "cooking" && (
        <>
          <section className="cooking-hero" aria-labelledby="cooking-title">
            <div>
              <p className="eyebrow">{t.cookingTab}</p>
              <h1 id="cooking-title">🔍 {t.cookingTitle}</h1>
              <p className="intro">{t.cookingIntro}</p>
            </div>
          </section>

          <div className="cooking-grid">
            <section className="dose-card cooking-feature-card" aria-labelledby="cooking-features-title">
              <div className="section-heading">
                <p className="eyebrow">Gemini-powered support</p>
                <h2 id="cooking-features-title">Accessible cooking features</h2>
              </div>

              <div className="cooking-feature-grid">
                {cookingFeatures.map((feature) => (
                  <article className={`cooking-feature ${feature.tone}`} key={feature.title}>
                    <h3>
                      <span aria-hidden="true">{feature.icon}</span>
                      {feature.title}
                    </h3>
                    <p>{feature.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="dose-card cooking-assistant-card" aria-labelledby="recipe-title">
              <div className="section-heading">
                <p className="eyebrow">Gemini</p>
                <h2 id="recipe-title">Recipe simplification</h2>
              </div>

              {(!GEMINI_API_KEY ||
                GEMINI_API_KEY === "PASTE_YOUR_GEMINI_API_KEY_HERE") && (
                <p className="key-warning">{t.keyMissing}</p>
              )}

              <label className="cooking-textarea-label">
                <span>{t.recipeInput}</span>
                <textarea
                  value={recipeInput}
                  onChange={(event) => setRecipeInput(event.target.value)}
                  rows="7"
                />
              </label>

              <div className="cooking-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => runCookingPrompt("simplify")}
                  disabled={cookingLoading}
                >
                  {t.simplifyRecipe}
                </button>
                <button
                  type="button"
                  className="ghost-button"
                  onClick={() => runCookingPrompt("steps")}
                  disabled={cookingLoading}
                >
                  {t.makeSteps}
                </button>
              </div>
            </section>

            <section className="dose-card" aria-labelledby="food-id-title">
              <div className="section-heading">
                <p className="eyebrow">Camera AI</p>
                <h2 id="food-id-title">Visual food identification</h2>
              </div>

              <button
                type="button"
                className="secondary-button"
                onClick={() => foodInputRef.current?.click()}
              >
                {t.uploadFoodPhoto}
              </button>
              <input
                ref={foodInputRef}
                className="sr-only"
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFoodImageChange}
              />

              <div className="food-preview">
                {cookingImagePreview ? (
                  <img src={cookingImagePreview} alt="Food to identify" />
                ) : (
                  <span>Upload a food or label photo.</span>
                )}
              </div>

              <button
                type="button"
                className="ghost-button full-width"
                onClick={identifyFoodImage}
                disabled={cookingLoading}
              >
                {t.identifyFood}
              </button>
            </section>

            <section className="dose-card" aria-labelledby="timer-title">
              <div className="section-heading">
                <p className="eyebrow">{t.cookingTimer}</p>
                <h2 id="timer-title">Timers & alerts</h2>
              </div>

              <div className="timer-display" aria-live="polite">
                {String(Math.floor(timerSeconds / 60)).padStart(2, "0")}:
                {String(timerSeconds % 60).padStart(2, "0")}
              </div>

              <label>
                <span>{t.minutes}</span>
                <input
                  type="number"
                  min="1"
                  value={timerMinutes}
                  onChange={(event) => setTimerMinutes(event.target.value)}
                />
              </label>

              <div className="cooking-actions">
                <button type="button" className="secondary-button" onClick={startCookingTimer}>
                  {t.startTimer}
                </button>
                <button type="button" className="ghost-button" onClick={stopCookingTimer}>
                  {t.stopTimer}
                </button>
              </div>
            </section>

            <section className="dose-card cooking-output-card" aria-labelledby="ai-output-title">
              <div className="section-heading">
                <p className="eyebrow">{t.aiOutput}</p>
                <h2 id="ai-output-title">
                  {cookingLoading ? t.loading : "Step-by-step guidance"}
                </h2>
              </div>

              {cookingError && <p className="camera-error">{cookingError}</p>}

              {cookingSteps.length > 0 && (
                <div className="current-step">
                  <span>
                    Step {currentCookingStep + 1} of {cookingSteps.length}
                  </span>
                  <p>{cookingSteps[currentCookingStep]}</p>
                </div>
              )}

              <div className="step-controls">
                <button type="button" className="ghost-button" onClick={() => moveCookingStep(-1)}>
                  {t.previousStep}
                </button>
                <button type="button" className="secondary-button" onClick={speakCurrentStep}>
                  {t.readStep}
                </button>
                <button type="button" className="ghost-button" onClick={() => moveCookingStep(1)}>
                  {t.nextStep}
                </button>
                <button type="button" className="text-button" onClick={startVoiceCommands}>
                  {t.startListening}
                </button>
              </div>

              <pre className="ai-output">{cookingOutput}</pre>
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
