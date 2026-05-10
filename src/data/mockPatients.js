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
