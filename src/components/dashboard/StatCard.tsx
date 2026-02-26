import {
  Building2,
  FileText,
  Clock,
  GitMerge,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react";
interface Props {
  title: string;
  value: string;
  subtitle: string;
  type: "companies" | "documents" | "pending" | "amalgamation";
  trend?: "up" | "down" | "neutral";
}
const StatCard = ({ title, value, subtitle, type, trend }: Props) => {

  const config = {
    companies: {
      icon: Building2,
      gradient: "from-blue-500 to-blue-600",
    },
    documents: {
      icon: FileText,
      gradient: "from-purple-500 to-purple-600",
    },
    pending: {
      icon: Clock,
      gradient: "from-orange-500 to-orange-600",
    },
    amalgamation: {
      icon: GitMerge,
      gradient: "from-emerald-500 to-emerald-600",
    },
  };

  const Icon = config[type].icon;

  const trendStyles = {
    up: "text-green-600 bg-green-50",
    down: "text-red-600 bg-red-50",
    neutral: "text-gray-500 bg-gray-100",
  };

  const TrendIcon =
    trend === "up"
      ? ArrowUpRight
      : trend === "down"
      ? ArrowDownRight
      : Minus;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">

      {/* Top Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-500 text-sm font-medium">
          {title}
        </div>

        <div
          className={`p-3 rounded-lg bg-gradient-to-r ${config[type].gradient} text-white shadow-sm`}
        >
          <Icon size={18} />
        </div>
      </div>

      {/* Value */}
      <div className="text-3xl font-semibold text-slate-800">
        {value}
      </div>

      {/* Trend */}
      {trend && (
        <div
          className={`mt-3 inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm font-medium ${trendStyles[trend]}`}
        >
          <TrendIcon size={14} />
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default StatCard;