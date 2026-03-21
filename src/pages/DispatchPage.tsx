import { useAuth } from "../context/AuthContext";
import DispatchClerkView from "../components/dispatch/DispatchClerkView";
import SuperAdminDispatchView from "../components/dispatch/SuperAdminDispatchView";

const DispatchPage = () => {
  const { user } = useAuth();

  // Role-based conditional rendering
  if (user?.role === "DispatchClerk") {
    return <DispatchClerkView />;
  }

  if (user?.role === "SuperAdmin" || user?.role === "ExecutiveViewer") {
    return <SuperAdminDispatchView />;
  }

  // Fallback for other roles (should not reach here due to route protection)
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
        <p className="text-slate-600">Your role does not have access to the Dispatch module.</p>
      </div>
    </div>
  );
};

export default DispatchPage;
