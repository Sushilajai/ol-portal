import { Search, Bell, Inbox, ChevronDown, LogOut, User } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white px-6 py-4 shadow-sm border-b border-slate-200 flex justify-between items-center">

      {/* CENTER: Doc Inward + Search */}
      <div className="flex items-center gap-4 w-2/3">

        {/* Doc Inward Button */}
       <button className="
  flex items-center gap-2
  px-5 py-2.5
  rounded-lg
  text-white
  bg-gradient-to-r from-sky-800 to-sky-600
  shadow-md
  hover:shadow-lg
  hover:scale-[1.02]
  transition
">
  <Inbox size={18} />
  <span className="font-medium">Doc Inward</span>
</button>

        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search cases, companies, documents..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

      </div>

      {/* RIGHT: Notification + User Dropdown */}
      <div className="flex items-center gap-5 relative">

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

          <div className="text-sm">
            <div className="font-medium text-slate-700">Officer A</div>
            <div className="text-xs text-slate-500">
              Senior Liquidator
            </div>
          </div>

          <ChevronDown size={16} className="text-slate-500" />
        </div>

        {/* Dropdown Menu */}
        {open && (
          <div className="absolute right-0 top-14 w-48 bg-white border border-slate-200 rounded-lg shadow-md py-2 z-50">
            
            <div className="px-4 py-2 hover:bg-slate-100 flex items-center gap-2 cursor-pointer text-sm">
              <User size={16} />
              Profile
            </div>

            <div className="px-4 py-2 hover:bg-slate-100 flex items-center gap-2 cursor-pointer text-sm">
              <LogOut size={16} />
              Logout
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Header;