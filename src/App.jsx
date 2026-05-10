import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Unauthorized from "./pages/Unauthorized";

import PatientDashboard from "./pages/patient/PatientDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import NurseDashboard from "./pages/nurse/NurseDashboard";
import CaregiverDashboard from "./pages/caregiver/CaregiverDashboard";
import RelativeDashboard from "./pages/relative/RelativeDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function HomeRedirect() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={`/${user.role}`} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route
        path="/patient"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <PatientDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/doctor"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/nurse"
        element={
          <ProtectedRoute allowedRoles={["nurse"]}>
            <NurseDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/caregiver"
        element={
          <ProtectedRoute allowedRoles={["caregiver"]}>
            <CaregiverDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/relative"
        element={
          <ProtectedRoute allowedRoles={["relative"]}>
            <RelativeDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
