import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-100">
      {/* Top Header */}
      <Header />

      {/* Body Section */}
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;