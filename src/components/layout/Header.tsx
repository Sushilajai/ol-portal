import {
  ChevronDown,
  LogOut,
  User,
  LayoutDashboard,
  DollarSign,
  Target,
  Truck,
  Users,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/img/OL.png";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const handleNewDispatch = () => {
    // Dispatch event to trigger modal in DispatchClerkView
    window.dispatchEvent(new CustomEvent('openDispatchModal'));
  };

  const getNavigationItems = () => {
    if (!user) return [];

    const items = [];

    if (user.role === "SuperAdmin") {
      items.push(
        { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, gradient: "from-[#0F2D5C] to-[#1E3A8A]", bgGradient: "from-[#EEF2FF] to-[#E0E7FF]", textColor: "text-[#1E3A8A]" },
        { to: "/billing", label: "Billing", icon: DollarSign, gradient: "from-[#B45309] to-[#EA580C]", bgGradient: "from-[#FFF7ED] to-[#FFEDD5]", textColor: "text-[#B45309]" },
        { to: "/liquidation", label: "Liquidation", icon: Target, gradient: "from-[#0F766E] to-[#0E7490]", bgGradient: "from-[#ECFEFF] to-[#E0F2FE]", textColor: "text-[#0E7490]" },
        { to: "/dispatch", label: "Dispatch", icon: Truck, gradient: "from-[#7C3AED] to-[#A855F7]", bgGradient: "from-[#F3E8FF] to-[#EDE9FE]", textColor: "text-[#7C3AED]" }
      );
    }

    if (user.role === "ExecutiveViewer") {
      items.push(
        { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, gradient: "from-[#0F2D5C] to-[#1E3A8A]", bgGradient: "from-[#EEF2FF] to-[#E0E7FF]", textColor: "text-[#1E3A8A]" }
      );
    }

    if (user.role === "OfficerViewer") {
      items.push(
        { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, gradient: "from-[#0F2D5C] to-[#1E3A8A]", bgGradient: "from-[#EEF2FF] to-[#E0E7FF]", textColor: "text-[#1E3A8A]" },
        { to: "/billing", label: "Billing", icon: DollarSign, gradient: "from-[#B45309] to-[#EA580C]", bgGradient: "from-[#FFF7ED] to-[#FFEDD5]", textColor: "text-[#B45309]" },
        { to: "/liquidation", label: "Liquidation", icon: Target, gradient: "from-[#0F766E] to-[#0E7490]", bgGradient: "from-[#ECFEFF] to-[#E0F2FE]", textColor: "text-[#0E7490]" }
      );
    }

    if (user.role === "AccountsAdmin") {
      items.push(
        { to: "/billing", label: "Billing", icon: DollarSign, gradient: "from-[#B45309] to-[#EA580C]", bgGradient: "from-[#FFF7ED] to-[#FFEDD5]", textColor: "text-[#B45309]" }
      );
    }

    if (user.role === "TD_Admin") {
      items.push(
        { to: "/liquidation", label: "Liquidation", icon: Target, gradient: "from-[#0F766E] to-[#0E7490]", bgGradient: "from-[#ECFEFF] to-[#E0F2FE]", textColor: "text-[#0E7490]" }
      );
    }

    if (user.role === "DispatchClerk") {
      // Don't add Dispatch to navigation for DispatchClerk
    }

    if (user.role === "SuperAdmin") {
      items.push(
        { to: "/users", label: "Users", icon: Users, gradient: "from-[#065F46] to-[#047857]", bgGradient: "from-[#ECFDF5] to-[#D1FAE5]", textColor: "text-[#047857]" }
      );
    }

    return items;
  };

  const navigationItems = getNavigationItems();

  return (
    <header className="w-full bg-white/95 backdrop-blur-sm border-b border-slate-200/50 shadow-lg sticky top-0 z-50" style={{ paddingTop: "10px" }}>
      <div className="flex items-center justify-between px-6 h-16">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-8">
          {/* Enhanced Logo */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <img
                src={logo}
                alt="Official Liquidator"
                className="h-16 object-contain filter drop-shadow-md"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-6 relative">
          {/* Enhanced Navigation Menu */}
          <nav className="flex items-center gap-3 ml-6">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg ${
                      isActive
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-xl scale-105`
                        : `bg-gradient-to-r ${item.bgGradient} ${item.textColor} hover:shadow-md border border-white/50`
                    }`
                  }
                >
                  <IconComponent size={18} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* New Dispatch Button (Only for DispatchClerk on /dispatch route) */}
          {user?.role === "DispatchClerk" && location.pathname === "/dispatch" && (
            <button
              onClick={handleNewDispatch}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg shadow-md"
            >
              <Plus size={18} />
              New Dispatch
            </button>
          )}

          {/* Enhanced User Dropdown */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setOpen(!open)}
          >
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-11 h-11 flex items-center justify-center rounded-2xl font-bold text-white shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-0.5">
              {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
              <p className="text-xs text-slate-500">{user?.role}</p>
            </div>
            <ChevronDown size={16} className="text-slate-500 group-hover:text-slate-700 transition-colors" />
          </div>

          {open && (
            <div className="absolute right-0 top-16 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl py-3 z-50 animate-fade-in-up">
              <div className="px-6 py-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-12 h-12 flex items-center justify-center rounded-xl font-bold text-white">
                    {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{user?.name}</p>
                    <p className="text-sm text-slate-500">{user?.role}</p>
                    <p className="text-xs text-slate-400">{user?.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="px-3 py-2">
                <NavLink
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 hover:bg-slate-50 rounded-xl flex items-center gap-3 cursor-pointer text-sm font-medium text-slate-700 hover:text-slate-900 transition-all duration-200"
                >
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <User size={16} className="text-blue-600" />
                  </div>
                  Profile Settings
                </NavLink>
                
                <div 
                  className="px-4 py-3 hover:bg-red-50 rounded-xl flex items-center gap-3 cursor-pointer text-sm font-medium text-slate-700 hover:text-red-600 transition-all duration-200" 
                  onClick={handleLogout}
                >
                  <div className="bg-red-100 p-2 rounded-lg">
                    <LogOut size={16} className="text-red-600" />
                  </div>
                  Sign Out
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;