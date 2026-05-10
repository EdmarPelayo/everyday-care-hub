# Every-Day Care Hub Skeleton

A React + Vite prototype for a role-based care hub with different logins and dashboards for:

- Doctor
- Nurse
- Patient
- Home Caretaker / Caregiver
- Relative

## Run locally

Make sure Node is v20.19+ or v22.12+.

```bash
node -v
npm install
npm run dev
```

Then open:

```bash
http://localhost:5173
```

## Hardcoded Logins

Doctor:

```txt
username: doctor1
password: doctor123
```

Nurse:

```txt
username: nurse1
password: nurse123
```

Patient:

```txt
username: patient1
password: patient123
```

Home Caretaker / Caregiver:

```txt
username: caretaker1
password: caretaker123
```

Relative:

```txt
username: relative1
password: relative123
```

## Main idea

The app uses hardcoded users inside `src/data/users.js`.

After login, the app stores the user in localStorage and sends them to a role-specific dashboard.

Each role sees different information/inferences:

- Patient: medication reminders, routines, SOS, messages
- Doctor: health summaries, prescriptions, clinical alerts, adherence trends
- Nurse: daily task oversight, vitals, shift notes, medication witness
- Caregiver: remote dashboard, shared scheduling, outfit approval, alerts
- Relative: limited activity feed, wellness updates, SOS alerts

## Folder Structure

```txt
src/
├── main.jsx
├── App.jsx
├── index.css
├── data/
│   ├── users.js
│   ├── mockPatients.js
│   └── permissions.js
├── context/
│   └── AuthContext.jsx
├── routes/
│   └── ProtectedRoute.jsx
├── components/
│   ├── DashboardLayout.jsx
│   ├── Card.jsx
│   └── LoginForm.jsx
└── pages/
    ├── LoginPage.jsx
    ├── Unauthorized.jsx
    ├── patient/
    │   └── PatientDashboard.jsx
    ├── doctor/
    │   └── DoctorDashboard.jsx
    ├── nurse/
    │   └── NurseDashboard.jsx
    ├── caregiver/
    │   └── CaregiverDashboard.jsx
    └── relative/
        └── RelativeDashboard.jsx
```
