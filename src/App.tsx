import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import BillingPage from "./pages/BillingPage";
import LiquidationPage from "./pages/LiquidationPage";
import DispatchPage from "./pages/DispatchPage";
import AllUsersPage from "./pages/AllUsersPage";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        element={
          <ProtectedRoute allowedRoles={["SuperAdmin", "ExecutiveViewer", "OfficerViewer", "AccountsAdmin", "TD_Admin", "DispatchClerk"]}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard - SuperAdmin and ExecutiveViewer */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRoles={["SuperAdmin", "ExecutiveViewer", "OfficerViewer"]}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Profile - All authenticated users */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute allowedRoles={["SuperAdmin", "ExecutiveViewer", "OfficerViewer", "AccountsAdmin", "TD_Admin", "DispatchClerk"]}>
              <Profile />
            </ProtectedRoute>
          } 
        />
        
        {/* Billing - AccountsAdmin, SuperAdmin, and OfficerViewer */}
        <Route 
          path="/billing" 
          element={
            <ProtectedRoute allowedRoles={["AccountsAdmin", "SuperAdmin", "OfficerViewer"]}>
              <BillingPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Liquidation - TD_Admin, SuperAdmin, and OfficerViewer */}
        <Route 
          path="/liquidation" 
          element={
            <ProtectedRoute allowedRoles={["TD_Admin", "SuperAdmin", "OfficerViewer"]}>
              <LiquidationPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Dispatch - DispatchClerk, SuperAdmin, and OfficerViewer */}
        <Route 
          path="/dispatch" 
          element={
            <ProtectedRoute allowedRoles={["DispatchClerk", "SuperAdmin", "OfficerViewer"]}>
              <DispatchPage />
            </ProtectedRoute>
          } 
        />
        
        {/* All Users - SuperAdmin only */}
        <Route 
          path="/users" 
          element={
            <ProtectedRoute allowedRoles={["SuperAdmin"]}>
              <AllUsersPage />
            </ProtectedRoute>
          } 
        />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;