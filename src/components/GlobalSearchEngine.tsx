import { useState } from "react";
import { Building2, ArrowLeft, DollarSign, Truck, FileText } from "lucide-react";
import type { Company, BillingRecord, DividendRecord, DispatchRecord, TargetRecord } from "../types/data";

interface SearchResult {
  company: Company;
  billingRecords: BillingRecord[];
  dividendRecords: DividendRecord[];
  targetRecords: TargetRecord[];
  dispatchRecords: DispatchRecord[];
}

interface GlobalSearchEngineProps {
  searchResults: SearchResult | null;
  onSearchChange?: (hasResults: boolean) => void;
}

const GlobalSearchEngine = ({ searchResults, onSearchChange }: GlobalSearchEngineProps) => {
  const [activeTab, setActiveTab] = useState<"billing" | "liquidation" | "dispatch">("billing");

  const handleClear = () => {
    setActiveTab("billing");
    onSearchChange?.(false);
  };

  if (!searchResults) {
    return null;
  }

  const { company, billingRecords, dividendRecords, dispatchRecords } = searchResults;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Back Button */}
      <button
        onClick={handleClear}
        className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all duration-200"
      >
        <ArrowLeft size={20} />
        Back to Dashboard Overview
      </button>

      {/* Company Profile Header */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 border border-slate-200 shadow-sm">
        <div className="flex items-start gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-2xl shadow-lg">
            <Building2 className="text-white" size={32} />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">{company.name}</h2>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-sm text-slate-600 font-medium">
                Company ID: <span className="font-bold text-slate-900">{company.comp_id}</span>
              </span>
              <span className={`px-4 py-2 rounded-full text-xs font-bold shadow-sm ${
                company.status === "Active"
                  ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700"
                  : "bg-gradient-to-r from-red-100 to-pink-100 text-red-700"
              }`}>
                {company.status}
              </span>
              <span className="text-sm text-slate-600">
                Petition No: <span className="font-semibold">{company.petitionNo}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-sm border border-slate-100 w-fit">
        {[
          { id: "billing", label: "Billing History", icon: DollarSign },
          { id: "liquidation", label: "Liquidation & Dividends", icon: FileText },
          { id: "dispatch", label: "Dispatch Log", icon: Truck }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 font-semibold transition-all duration-300 rounded-xl flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Billing Tab */}
        {activeTab === "billing" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <tr>
                  <th className="px-8 py-5 text-left font-bold text-slate-900">Submission Date</th>
                  <th className="px-8 py-5 text-left font-bold text-slate-900">Category</th>
                  <th className="px-8 py-5 text-left font-bold text-slate-900">Amount</th>
                  <th className="px-8 py-5 text-left font-bold text-slate-900">Status</th>
                  <th className="px-8 py-5 text-left font-bold text-slate-900">Payment Date</th>
                </tr>
              </thead>
              <tbody>
                {billingRecords.length > 0 ? (
                  billingRecords.map((bill, idx) => (
                    <tr key={bill.id} className={`border-b border-slate-100 transition-all duration-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50`}>
                      <td className="px-8 py-5 text-slate-900 font-medium">{bill.submissionDate}</td>
                      <td className="px-8 py-5 text-slate-600">{bill.billCategory}</td>
                      <td className="px-8 py-5 text-slate-900 font-semibold">₹{bill.amount.toLocaleString()}</td>
                      <td className="px-8 py-5">
                        <span className={`px-4 py-2 rounded-full text-xs font-bold shadow-sm ${
                          bill.status === "Paid"
                            ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700"
                            : "bg-gradient-to-r from-red-100 to-pink-100 text-red-700"
                        }`}>
                          {bill.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-slate-600">{bill.paymentDate || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-8 py-12 text-center text-slate-500">
                      No billing records found for this company
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Liquidation & Dividends Tab */}
        {activeTab === "liquidation" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <tr>
                  <th className="px-8 py-5 text-left font-bold text-slate-900">Report Filed On</th>
                  <th className="px-8 py-5 text-left font-bold text-slate-900">Stakeholder Category</th>
                  <th className="px-8 py-5 text-left font-bold text-slate-900">Dividend Amount</th>
                  <th className="px-8 py-5 text-left font-bold text-slate-900">Bank Transfer Date</th>
                </tr>
              </thead>
              <tbody>
                {dividendRecords.length > 0 ? (
                  dividendRecords.map((dividend, idx) => (
                    <tr key={dividend.id} className={`border-b border-slate-100 transition-all duration-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50`}>
                      <td className="px-8 py-5 text-slate-900 font-medium">{dividend.reportFiledOn}</td>
                      <td className="px-8 py-5 text-slate-600">{dividend.stakeholderCategory}</td>
                      <td className="px-8 py-5 text-slate-900 font-semibold">₹{dividend.dividendAmount.toLocaleString()}</td>
                      <td className="px-8 py-5 text-slate-600">{dividend.bankTransferDate || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-8 py-12 text-center text-slate-500">
                      No dividend records found for this company
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Dispatch Tab */}
        {activeTab === "dispatch" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <tr>
                  <th className="px-8 py-5 text-left font-bold text-slate-900">UID</th>
                  <th className="px-8 py-5 text-left font-bold text-slate-900">Recipient Name</th>
                  <th className="px-8 py-5 text-left font-bold text-slate-900">AWB Number</th>
                  <th className="px-8 py-5 text-left font-bold text-slate-900">Dispatch Status</th>
                  <th className="px-8 py-5 text-left font-bold text-slate-900">Delivery Date</th>
                </tr>
              </thead>
              <tbody>
                {dispatchRecords.length > 0 ? (
                  dispatchRecords.map((dispatch, idx) => (
                    <tr key={dispatch.uid} className={`border-b border-slate-100 transition-all duration-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50`}>
                      <td className="px-8 py-5 text-slate-900 font-bold">{dispatch.uid}</td>
                      <td className="px-8 py-5 text-slate-600">{dispatch.recipientName}</td>
                      <td className="px-8 py-5 text-slate-600 font-medium">{dispatch.awbNumber}</td>
                      <td className="px-8 py-5">
                        <span className={`px-4 py-2 rounded-full text-xs font-bold shadow-sm ${
                          dispatch.status === "Delivered"
                            ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700"
                            : dispatch.status === "Dispatched"
                            ? "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700"
                            : "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700"
                        }`}>
                          {dispatch.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-slate-600">{dispatch.deliveryDate || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-8 py-12 text-center text-slate-500">
                      No dispatch records found for this company
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalSearchEngine;
