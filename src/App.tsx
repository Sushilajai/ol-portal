import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import OfficerDashboard from "./pages/OfficerDashboard";
import Company from "./pages/AddCompany";
import Document from "./pages/Document";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";
import Amalgamation from "./pages/Amalgamation";
import Establishment from "./pages/Establishment";
import ReportingPage from "./pages/ReportingPage";

function App() {
  return (
    <AuthProvider>
      <Routes>

        {/* <Route path="/ol-portal/" element={<Login />} /> */}
        <Route path="/" element={<Login />} />

        <Route
          element={
            <ProtectedRoute allowedRoles={["admin", "officer"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/company" element={<Company />} />
          <Route path="/document" element={<Document />} />
          <Route path="/amalgamation" element={<Amalgamation />} />
          <Route path="/establishment" element={<Establishment />} />
          <Route path="/officer/dashboard" element={<OfficerDashboard />} />
          <Route path="/ReportingPage" element={<ReportingPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </AuthProvider>
  );
}

export default App;