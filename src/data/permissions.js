export const permissions = {
  patient: {
    viewMedicationLog: "Full",
    receiveMissedDoseAlert: true,
    editReminders: true,
    viewDailyRoutines: "Full",
    sendSecureMessage: true,
    accessHealthTrends: "Full",
    sosAlert: "Sends"
  },
  doctor: {
    viewMedicationLog: "Full",
    receiveMissedDoseAlert: true,
    editReminders: true,
    viewDailyRoutines: "Summary",
    sendSecureMessage: true,
    accessHealthTrends: "Full",
    sosAlert: "Receives"
  },
  nurse: {
    viewMedicationLog: "Full",
    receiveMissedDoseAlert: true,
    editReminders: true,
    viewDailyRoutines: "Full",
    sendSecureMessage: true,
    accessHealthTrends: "Full",
    sosAlert: "Receives"
  },
  caregiver: {
    viewMedicationLog: "Full",
    receiveMissedDoseAlert: true,
    editReminders: true,
    viewDailyRoutines: "Full",
    sendSecureMessage: true,
    accessHealthTrends: "Summary",
    sosAlert: "Receives"
  },
  relative: {
    viewMedicationLog: "Limited",
    receiveMissedDoseAlert: true,
    editReminders: false,
    viewDailyRoutines: "Limited",
    sendSecureMessage: true,
    accessHealthTrends: "No",
    sosAlert: "Receives"
  }
};
