import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const { user } = useAuth();

  const showSidebar = user?.role === "admin";

  return (
    <div className="h-screen flex flex-col">

      {/* Top Header */}
      <Header />

      {/* Body Section */}
      <div className="flex flex-1 overflow-hidden">

        {showSidebar && (
          <div className="w-64 border-r border-slate-200 bg-slate-50">
            <Sidebar />
          </div>
        )}

        <main className="flex-1 p-6 overflow-auto bg-slate-50">
          <Outlet />
        </main>

      </div>
    </div>
  );
};
export default MainLayout;