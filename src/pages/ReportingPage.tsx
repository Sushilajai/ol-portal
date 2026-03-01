import { useState } from "react";
import {
  FileText,
  BarChart3,
  Building2,
  Languages,
} from "lucide-react";

import DailyReport from "../pages/DailyReport";
import DailyAmalReport from "../pages/DailyAmalReport";
import DailyEstablishReport from "../pages/DailyEstablishReport";
import HindiDocReport from "../pages/HindiDocReport";

type ReportType =
  | "daily"
  | "amal"
  | "establish"
  | "hindi";

const reports = [
  {
    key: "daily",
    label: "Daily Report",
    icon: FileText,
    color: "from-blue-500 to-indigo-600",
  },
  {
    key: "amal",
    label: "Daily Amal Report",
    icon: BarChart3,
    color: "from-green-500 to-emerald-600",
  },
  {
    key: "establish",
    label: "Daily Establish Report",
    icon: Building2,
    color: "from-purple-500 to-violet-600",
  },
  {
    key: "hindi",
    label: "Hindi Doc Report",
    icon: Languages,
    color: "from-orange-500 to-red-500",
  },
];

export default function ReportingPage() {
  const [activeReport, setActiveReport] =
    useState<ReportType>("daily");

  const renderContent = () => {
    switch (activeReport) {
      case "daily":
        return <DailyReport />;
      case "amal":
        return <DailyAmalReport />;
      case "establish":
        return <DailyEstablishReport />;
      case "hindi":
        return <HindiDocReport />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-8">

      {/* ===== Heading ===== */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800">
          Reporting Dashboard
        </h3>
        <p className="text-gray-500 text-sm">
          Select a report type to view detailed analytics
        </p>
      </div>

      {/* ===== Premium Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {reports.map((report) => {
          const Icon = report.icon;
          const isActive = activeReport === report.key;

          return (
            <div
              key={report.key}
              onClick={() =>
                setActiveReport(report.key as ReportType)
              }
              className={`relative cursor-pointer rounded-2xl p-6 transition-all duration-300 transform 
              ${
                isActive
                  ? "scale-105 shadow-2xl"
                  : "hover:scale-105 hover:shadow-xl"
              }`}
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${report.color} opacity-${
                  isActive ? "100" : "80"
                }`}
              ></div>

              {/* Content */}
              <div className="relative z-10 text-white flex flex-col items-center space-y-3">
                <Icon size={36} />
                <h2 className="font-semibold text-lg text-center">
                  {report.label}
                </h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== Dynamic Content ===== */}
      <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300">
        {renderContent()}
      </div>
    </div>
  );
}