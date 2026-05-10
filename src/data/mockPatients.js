export const patientProfile = {
  id: 101,
  name: "Emily Johnson",
  age: 72,
  primaryCondition: "Diabetes and mild memory impairment",
  emergencyContact: "Anthony Johnson",
  medicationAdherence: 88,
  routineCompletion: 76,
  lastCheckIn: "Today at 8:45 AM",
  mood: "Stable",
  location: "Home",
  nextAppointment: "May 14, 2026 at 2:30 PM"
};

export const medications = [
  {
    id: 1,
    name: "Metformin",
    dosage: "500mg",
    time: "8:00 AM",
    status: "Taken"
  },
  {
    id: 2,
    name: "Lisinopril",
    dosage: "10mg",
    time: "12:00 PM",
    status: "Upcoming"
  },
  {
    id: 3,
    name: "Atorvastatin",
    dosage: "20mg",
    time: "8:00 PM",
    status: "Upcoming"
  }
];

export const dailyRoutines = [
  {
    id: 1,
    task: "Take morning medication",
    completed: true
  },
  {
    id: 2,
    task: "Drink water",
    completed: true
  },
  {
    id: 3,
    task: "Check blood pressure",
    completed: false
  },
  {
    id: 4,
    task: "Go for short walk",
    completed: false
  }
];

export const alerts = [
  {
    id: 1,
    type: "Medication",
    message: "Metformin was taken on time.",
    level: "good"
  },
  {
    id: 2,
    type: "Routine",
    message: "Blood pressure check has not been completed.",
    level: "warning"
  },
  {
    id: 3,
    type: "Appointment",
    message: "Upcoming doctor visit on May 14.",
    level: "good"
  }
];

export const messages = [
  {
    id: 1,
    from: "Dr. Sarah Morgan",
    text: "Please continue monitoring blood sugar before breakfast."
  },
  {
    id: 2,
    from: "Maria Caretaker",
    text: "I will stop by later to help with dinner and laundry."
  }
];

export const vitals = [
  {
    id: 1,
    label: "Blood Pressure",
    value: "128/82"
  },
  {
    id: 2,
    label: "Blood Glucose",
    value: "142 mg/dL"
  },
  {
    id: 3,
    label: "Weight",
    value: "154 lb"
  }
];

export const assignedPatients = [
  {
    id: 101,
    name: "Emily Johnson",
    age: 72,
    primaryCondition: "Diabetes and mild memory impairment",
    emergencyContact: "Anthony Johnson",
    medicationAdherence: 88,
    routineCompletion: 76,
    missedDoses: 1,
    riskLevel: "Moderate",
    lastCheckIn: "Today at 8:45 AM",
    nextAppointment: "May 14, 2026 at 2:30 PM"
  },
  {
    id: 102,
    name: "Robert Smith",
    age: 80,
    primaryCondition: "Hypertension and fall risk",
    emergencyContact: "Linda Smith",
    medicationAdherence: 62,
    routineCompletion: 51,
    missedDoses: 4,
    riskLevel: "High",
    lastCheckIn: "Yesterday at 6:15 PM",
    nextAppointment: "May 12, 2026 at 10:00 AM"
  },
  {
    id: 103,
    name: "Grace Miller",
    age: 68,
    primaryCondition: "Post-surgery recovery",
    emergencyContact: "Michael Miller",
    medicationAdherence: 95,
    routineCompletion: 91,
    missedDoses: 0,
    riskLevel: "Low",
    lastCheckIn: "Today at 9:10 AM",
    nextAppointment: "May 20, 2026 at 1:00 PM"
  },
  {
    id: 104,
    name: "James Wilson",
    age: 75,
    primaryCondition: "Heart disease monitoring",
    emergencyContact: "Samantha Wilson",
    medicationAdherence: 74,
    routineCompletion: 69,
    missedDoses: 2,
    riskLevel: "Moderate",
    lastCheckIn: "Today at 7:30 AM",
    nextAppointment: "May 16, 2026 at 3:00 PM"
  }
];

export const vitalsHistory = [
  {
    id: 1,
    date: "May 6",
    bloodPressure: "126/82",
    glucose: "118 mg/dL",
    heartRate: "76 bpm"
  },
  {
    id: 2,
    date: "May 7",
    bloodPressure: "132/86",
    glucose: "124 mg/dL",
    heartRate: "79 bpm"
  },
  {
    id: 3,
    date: "May 8",
    bloodPressure: "138/88",
    glucose: "141 mg/dL",
    heartRate: "82 bpm"
  },
  {
    id: 4,
    date: "May 9",
    bloodPressure: "129/84",
    glucose: "122 mg/dL",
    heartRate: "78 bpm"
  }
];

export const careTeamNotes = [
  {
    id: 1,
    author: "Nurse Daniel",
    message: "Patient reported dizziness after standing this morning."
  },
  {
    id: 2,
    author: "Maria Caretaker",
    message: "Lunch was completed, but patient skipped afternoon walk."
  },
  {
    id: 3,
    author: "Anthony Relative",
    message: "Family noticed patient seemed more tired than usual."
  }
];

export const appointmentNotes = [
  {
    id: 1,
    date: "April 28, 2026",
    summary:
      "Reviewed medication schedule. Continue current dosage and monitor glucose."
  },
  {
    id: 2,
    date: "May 5, 2026",
    summary:
      "Patient showed improved routine completion but needs better hydration tracking."
  }
];

export const nurseAssignedPatients = [
  {
    id: 201,
    name: "Emily Johnson",
    age: 72,
    condition: "Diabetes and mild memory impairment",
    location: "Home Care Room A",
    priority: "Moderate",
    lastCheckIn: "Today at 8:45 AM",
    lastMedicationVerified: "Today at 8:05 AM",
    lastMealCompleted: "Breakfast completed",
    missedMedications: 1,
    abnormalVitals: 1,
    routineCompletion: 76,
    missedRoutines: 2,
    symptoms: ["Dizziness"]
  },
  {
    id: 202,
    name: "Robert Smith",
    age: 80,
    condition: "Hypertension and fall risk",
    location: "Room 204",
    priority: "High",
    lastCheckIn: "Yesterday at 6:15 PM",
    lastMedicationVerified: "Yesterday at 7:50 PM",
    lastMealCompleted: "Dinner skipped",
    missedMedications: 3,
    abnormalVitals: 2,
    routineCompletion: 48,
    missedRoutines: 4,
    symptoms: ["Dizziness", "Fatigue"]
  },
  {
    id: 203,
    name: "Grace Miller",
    age: 68,
    condition: "Post-surgery recovery",
    location: "Room 112",
    priority: "Low",
    lastCheckIn: "Today at 9:10 AM",
    lastMedicationVerified: "Today at 9:00 AM",
    lastMealCompleted: "Breakfast completed",
    missedMedications: 0,
    abnormalVitals: 0,
    routineCompletion: 94,
    missedRoutines: 0,
    symptoms: []
  },
  {
    id: 204,
    name: "James Wilson",
    age: 75,
    condition: "Heart disease monitoring",
    location: "Room 310",
    priority: "Moderate",
    lastCheckIn: "Today at 7:30 AM",
    lastMedicationVerified: "Today at 7:20 AM",
    lastMealCompleted: "Breakfast partial",
    missedMedications: 1,
    abnormalVitals: 1,
    routineCompletion: 71,
    missedRoutines: 1,
    symptoms: ["Shortness of breath"]
  }
];

export const nurseTasks = [
  {
    id: 1,
    task: "Verify morning medication",
    assignedTime: "8:00 AM",
    completed: true
  },
  {
    id: 2,
    task: "Log blood pressure",
    assignedTime: "9:00 AM",
    completed: false
  },
  {
    id: 3,
    task: "Confirm breakfast completed",
    assignedTime: "9:30 AM",
    completed: true
  },
  {
    id: 4,
    task: "Assist with mobility walk",
    assignedTime: "11:00 AM",
    completed: false
  },
  {
    id: 5,
    task: "Check hydration",
    assignedTime: "12:00 PM",
    completed: false
  }
];

export const medicationVerifications = [
  {
    id: 1,
    name: "Metformin",
    time: "8:00 AM",
    status: "Verified"
  },
  {
    id: 2,
    name: "Lisinopril",
    time: "12:00 PM",
    status: "Pending"
  },
  {
    id: 3,
    name: "Atorvastatin",
    time: "8:00 PM",
    status: "Pending"
  },
  {
    id: 4,
    name: "Blood Pressure Medication",
    time: "Yesterday 7:00 PM",
    status: "Late"
  }
];

export const abnormalVitalsAlerts = [
  {
    id: 1,
    patient: "Robert Smith",
    message: "Blood pressure elevated at 158/96.",
    level: "danger"
  },
  {
    id: 2,
    patient: "Emily Johnson",
    message: "Glucose slightly elevated at 145 mg/dL.",
    level: "warning"
  },
  {
    id: 3,
    patient: "Grace Miller",
    message: "Vitals within normal range.",
    level: "good"
  }
];

export const shiftHandoffNotes = [
  {
    id: 1,
    time: "7:00 AM",
    note: "Previous nurse reported Robert had dizziness overnight."
  },
  {
    id: 2,
    time: "8:30 AM",
    note: "Emily took medication but needs glucose checked before lunch."
  },
  {
    id: 3,
    time: "10:15 AM",
    note: "James reported mild shortness of breath after walking."
  }
];

export const symptomLogs = [
  {
    id: 1,
    patient: "Robert Smith",
    symptom: "Dizziness",
    severity: "Moderate"
  },
  {
    id: 2,
    patient: "Emily Johnson",
    symptom: "Fatigue",
    severity: "Mild"
  },
  {
    id: 3,
    patient: "James Wilson",
    symptom: "Shortness of breath",
    severity: "Moderate"
  }
];

export const nurseEscalations = [
  {
    id: 1,
    patient: "Robert Smith",
    reason: "Elevated blood pressure and missed medication",
    status: "Open"
  },
  {
    id: 2,
    patient: "James Wilson",
    reason: "Shortness of breath after activity",
    status: "Open"
  },
  {
    id: 3,
    patient: "Grace Miller",
    reason: "Post-surgery pain check completed",
    status: "Resolved"
  }
];

export const patientAppointments = [
  {
    id: 1,
    title: "Primary Care Checkup",
    date: "May 14, 2026",
    time: "2:30 PM",
    location: "Wilmington Health Center"
  },
  {
    id: 2,
    title: "Blood Work",
    date: "May 18, 2026",
    time: "9:00 AM",
    location: "Quest Diagnostics"
  },
  {
    id: 3,
    title: "Physical Therapy",
    date: "May 21, 2026",
    time: "11:15 AM",
    location: "Home Visit"
  }
];

export const patientMessages = [
  {
    id: 1,
    from: "Dr. Morgan",
    text: "Please keep tracking your glucose before lunch."
  },
  {
    id: 2,
    from: "Nurse Daniel",
    text: "I will check your blood pressure later today."
  },
  {
    id: 3,
    from: "Anthony",
    text: "I’ll call you after work to check in."
  }
];

export const clothingSuggestions = [
  {
    id: 1,
    item: "Light sweater",
    reason: "Good for mild weather and easy to remove indoors."
  },
  {
    id: 2,
    item: "Slip-resistant shoes",
    reason: "Recommended because fall risk is being monitored."
  },
  {
    id: 3,
    item: "Comfort pants",
    reason: "Easy movement for walking and physical therapy."
  }
];

export const cookingSteps = [
  {
    id: 1,
    instruction: "Wash hands before starting."
  },
  {
    id: 2,
    instruction: "Take out the prepared chicken soup container."
  },
  {
    id: 3,
    instruction: "Microwave for 2 minutes."
  },
  {
    id: 4,
    instruction: "Carefully stir and check that it is warm."
  },
  {
    id: 5,
    instruction: "Sit down before eating to reduce fall risk."
  }
];

export const accessibilitySettings = [
  {
    id: 1,
    label: "Large text enabled",
    enabled: true
  },
  {
    id: 2,
    label: "High contrast mode",
    enabled: true
  },
  {
    id: 3,
    label: "Voice reminders",
    enabled: true
  },
  {
    id: 4,
    label: "Simple icon navigation",
    enabled: false
  }
];

export const privacyControls = [
  {
    id: 1,
    role: "Doctor",
    access: "Full medical view"
  },
  {
    id: 2,
    role: "Nurse",
    access: "Medication, vitals, and routines"
  },
  {
    id: 3,
    role: "Caregiver",
    access: "Routines, reminders, and safety alerts"
  },
  {
    id: 4,
    role: "Relative",
    access: "Limited wellness updates only"
  }
];

export const patientWellnessLogs = [
  {
    id: 1,
    time: "8:30 AM",
    note: "Patient checked in and reported feeling okay."
  },
  {
    id: 2,
    time: "10:15 AM",
    note: "Breakfast completed. Hydration reminder sent."
  },
  {
    id: 3,
    time: "11:00 AM",
    note: "Short walk still pending."
  }
];

export const relativeActivityFeed = [
  {
    id: 1,
    time: "8:45 AM",
    message: "Emily checked in from home.",
    level: "good"
  },
  {
    id: 2,
    time: "9:00 AM",
    message: "Morning medication was completed.",
    level: "good"
  },
  {
    id: 3,
    time: "10:15 AM",
    message: "Breakfast completed. Hydration reminder was sent.",
    level: "good"
  },
  {
    id: 4,
    time: "11:00 AM",
    message: "Short walk is still pending.",
    level: "warning"
  },
  {
    id: 5,
    time: "12:30 PM",
    message: "Caregiver added a note about lunch preparation.",
    level: "good"
  }
];

export const relativeSafetyAlerts = [
  {
    id: 1,
    type: "Check-In",
    message: "Patient checked in today.",
    level: "good"
  },
  {
    id: 2,
    type: "Routine",
    message: "Short walk has not been completed yet.",
    level: "warning"
  },
  {
    id: 3,
    type: "SOS",
    message: "No active SOS alerts.",
    level: "good"
  }
];

export const relativeMessages = [
  {
    id: 1,
    from: "Emily",
    text: "Good morning! I ate breakfast already."
  },
  {
    id: 2,
    from: "Caregiver Maria",
    text: "I helped Emily prepare lunch and reminded her to drink water."
  },
  {
    id: 3,
    from: "Nurse Daniel",
    text: "Vitals will be checked later today."
  }
];

export const familySupportTasks = [
  {
    id: 1,
    task: "Call Emily after work",
    owner: "Anthony",
    completed: false
  },
  {
    id: 2,
    task: "Bring groceries this weekend",
    owner: "Anthony",
    completed: false
  },
  {
    id: 3,
    task: "Pick up medication refill",
    owner: "Maria",
    completed: true
  },
  {
    id: 4,
    task: "Confirm ride for appointment",
    owner: "Anthony",
    completed: false
  }
];

export const relativeAppointments = [
  {
    id: 1,
    title: "Primary Care Checkup",
    date: "May 14, 2026",
    time: "2:30 PM",
    note: "Transportation may be needed."
  },
  {
    id: 2,
    title: "Blood Work",
    date: "May 18, 2026",
    time: "9:00 AM",
    note: "Patient should fast before appointment."
  },
  {
    id: 3,
    title: "Physical Therapy",
    date: "May 21, 2026",
    time: "11:15 AM",
    note: "Home visit scheduled."
  }
];

export const relativePrivacyPermissions = [
  {
    id: 1,
    feature: "Wellness updates",
    detail: "You can see general wellness and check-in status.",
    allowed: true
  },
  {
    id: 2,
    feature: "Safety alerts",
    detail: "You can receive SOS and no-check-in alerts.",
    allowed: true
  },
  {
    id: 3,
    feature: "Medication details",
    detail: "You can only see completed/not completed status.",
    allowed: true
  },
  {
    id: 4,
    feature: "Full prescriptions",
    detail: "Only doctors, nurses, and authorized caregivers can see this.",
    allowed: false
  },
  {
    id: 5,
    feature: "Doctor notes",
    detail: "Clinical notes are private unless shared by the patient.",
    allowed: false
  }
];

export const visitCallSchedule = [
  {
    id: 1,
    type: "Phone Call",
    date: "Today",
    time: "6:30 PM",
    note: "Quick family check-in after work."
  },
  {
    id: 2,
    type: "Home Visit",
    date: "Saturday",
    time: "11:00 AM",
    note: "Bring groceries and help with laundry."
  },
  {
    id: 3,
    type: "Video Call",
    date: "Sunday",
    time: "4:00 PM",
    note: "Family call with Emily and Anthony."
  }
];