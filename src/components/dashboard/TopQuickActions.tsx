import { Building2, FileText, GitMerge, BarChart3 } from "lucide-react";

const actions = [
  { title: "Add New Company", icon: Building2 },
  { title: "Submit Document", icon: FileText },
  { title: "Amalgamation", icon: GitMerge },
  { title: "View Daily Reports", icon: BarChart3 },
];

const TopQuickActions = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {actions.map((action, index) => {
        const Icon = action.icon;

        return (
          <div
            key={index}
            className="
              bg-gradient-to-r from-slate-50 to-blue-100
              border border-blue-100
              rounded-xl
              p-5
              flex items-center gap-4
              hover:shadow-md
              transition
              cursor-pointer
            "
          >
            <div className="bg-white p-3 rounded-lg shadow-sm text-blue-600">
              <Icon size={22} />
            </div>

            <div className="text-gray-700 font-medium">
              {action.title}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopQuickActions;