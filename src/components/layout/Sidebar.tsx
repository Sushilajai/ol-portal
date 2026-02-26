import {
  LayoutDashboard,
  Building2,
  FileText,
  Users,
  BarChart3,
  Combine,
    TrendingUpDown,

  Settings,
  HelpCircle
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  const basePath =
    user?.role === "admin" ? "/admin" : "/officer";

  return (
    <div className="w-72 min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100 shadow-xl border-r border-blue-100 flex flex-col">

      {/* Logo Section */}
      <div className="px-6 py-6 border-b border-blue-100">
        <img
          src="/src/assets/img/OL.png"
          alt="Official Liquidator"
          className="h-16 object-contain"
        />
        <p className="text-xs text-slate-500 mt-2">
          High Court, Bombay
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <SidebarItem
          to={`${basePath}/dashboard`}
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
        />

        <SidebarItem
          to={`/company`}
          icon={<Building2 size={18} />}
          label="Companies"
        />

        <SidebarItem
          to={`/document`}
          icon={<FileText size={18} />}
          label="Documents"
        />
        <SidebarItem
          to={`/Amalgamation`}
          icon={<Combine size={18} />}
          label="Amalgamation"
        />
        <SidebarItem
          to={`/Establishment`}
          icon={<TrendingUpDown size={18} />}
          label="Establishment"
        />
        <SidebarItem
          to={`${basePath}/employees`}
          icon={<Users size={18} />}
          label="Employees"
        />

        <SidebarItem
          to={`${basePath}/reports`}
          icon={<BarChart3 size={18} />}
          label="Reports"
        />
      </nav>

      {/* Bottom Section */}
      <div className="px-4 py-6 border-t border-blue-100 space-y-2">

        {/* <SidebarItem
          to={`${basePath}/settings`}
          icon={<Settings size={18} />}
          label="Settings"
        />

        <SidebarItem
          to={`${basePath}/help`}
          icon={<HelpCircle size={18} />}
          label="Help & Support"
        /> */}
        <p className="text-xs text-slate-500 mt-2">©Senseware Info Media Pvt Ltd.</p>
      </div>
    </div>
  );
};

export default Sidebar;



interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
}

const SidebarItem = ({ icon, label, to }: SidebarItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
        group
        ${
          isActive
            ? "bg-gradient-to-r from-sky-800 to-sky-600 text-white shadow-md"
            : "text-slate-600 hover:bg-white hover:shadow-sm" 
        }
        `
      }
      style={({ isActive }) => ({ color: isActive ? "#fff" : "#67676c" })}>
      <div
        className={`
          p-2 rounded-lg transition
          ${
            "group-[.active]:bg-white/20"
          }
        `}
      >
        {icon}
      </div>

      <span className="font-medium tracking-wide">
        {label}
      </span>
    </NavLink>
  );
};


