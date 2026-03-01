import {
  Search,
  Bell,
  ChevronDown,
  LogOut,
  User,
   LayoutDashboard,
  Inbox,
  GitMerge,
  Building2,
  FileBarChart2,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
 
const Header = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
    const handleLogout = () => {
    logout();
  };
  

  return (
  
    <header className="w-full bg-white border-b border-slate-200 shadow-sm" style={{ paddingTop: "10px" }}>
      <div className="flex items-center justify-between px-6 h-16">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-8">

          {/* Logo */}
          <div className="flex items-center gap-2">
<img
          src="../src/assets/img/OL.jpg"
          alt="Official Liquidator"
          className="h-16 object-contain"
        />
        
          </div>

          {/* Navigation Menu */}
     

    </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-6 relative">
 <nav className="flex items-center gap-4 ml-6">

  {/* Dashboard */}
  <NavLink
    to="/officer/dashboard"
    className={({ isActive }) =>
      `flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
      ${
        isActive
          ? "bg-gradient-to-r from-[#0F2D5C] to-[#1E3A8A] text-white shadow-lg"
          : "bg-gradient-to-r from-[#EEF2FF] to-[#E0E7FF] text-[#1E3A8A] hover:shadow-md hover:-translate-y-0.5"
      }`
    }
  >
    <LayoutDashboard size={18} />
    Dashboard
  </NavLink>

  {/* Doc Inward */}
  <NavLink
    to="/document"
    className={({ isActive }) =>
      `flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
      ${
        isActive
          ? "bg-gradient-to-r from-[#B45309] to-[#EA580C] text-white shadow-lg"
          : "bg-gradient-to-r from-[#FFF7ED] to-[#FFEDD5] text-[#B45309] hover:shadow-md hover:-translate-y-0.5"
      }`
    }
  >
    <Inbox size={18} />
    Doc Inward
  </NavLink>

  {/* Amalgamation */}
  <NavLink
    to="/amalgamation"
    className={({ isActive }) =>
      `flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
      ${
        isActive
          ? "bg-gradient-to-r from-[#0F766E] to-[#0E7490] text-white shadow-lg"
          : "bg-gradient-to-r from-[#ECFEFF] to-[#E0F2FE] text-[#0E7490] hover:shadow-md hover:-translate-y-0.5"
      }`
    }
  >
    <GitMerge size={18} />
    Amalgamation
  </NavLink>

  {/* Establishment */}
  <NavLink
    to="/establishment"
    className={({ isActive }) =>
      `flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
      ${
        isActive
          ? "bg-gradient-to-r from-[#3730A3] to-[#4338CA] text-white shadow-lg"
          : "bg-gradient-to-r from-[#EEF2FF] to-[#E0E7FF] text-[#4338CA] hover:shadow-md hover:-translate-y-0.5"
      }`
    }
  >
    <Building2 size={18} />
    Establishment
  </NavLink>

  {/* Reports */}
  <NavLink
    to="/ReportingPage"
    className={({ isActive }) =>
      `flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
      ${
        isActive
          ? "bg-gradient-to-r from-[#065F46] to-[#047857] text-white shadow-lg"
          : "bg-gradient-to-r from-[#ECFDF5] to-[#D1FAE5] text-[#047857] hover:shadow-md hover:-translate-y-0.5"
      }`
    }
  >
    <FileBarChart2 size={18} />
    Reports
  </NavLink>

</nav> 
          {/* Search */}
          <div className="relative w-64">
            <Search
              className="absolute left-3 top-2.5 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Notification */}
          <div className="relative cursor-pointer">
            <Bell className="text-slate-600" size={20} />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </div>

          {/* User Dropdown */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <div className="bg-blue-100 text-blue-700 w-9 h-9 flex items-center justify-center rounded-full font-semibold">
              OA
            </div>

            <ChevronDown size={16} className="text-slate-500" />
          </div>

          {open && (
            <div className="absolute right-0 top-14 w-48 bg-white border border-slate-200 rounded-lg shadow-md py-2 z-50">

              <div className="px-4 py-2 hover:bg-slate-100 flex items-center gap-2 cursor-pointer text-sm">
                <User size={16} />
                Profile
              </div>

              <div className="px-4 py-2 hover:bg-slate-100 flex items-center gap-2 cursor-pointer text-sm" onClick={handleLogout}
>
                <LogOut size={16} />
                Logout
              </div>

            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;