import { useState } from "react";
import { Truck, Search, Filter } from "lucide-react";
import { mockDispatchRecords } from "../../data/mockData";
import type { DispatchRecord } from "../../types/data";

const SuperAdminDispatchView = () => {
  const [dispatchRecords] = useState<DispatchRecord[]>(mockDispatchRecords);

  // Advanced filters
  const [filters, setFilters] = useState({
    globalSearch: "",
    dodStart: "",
    dodEnd: "",
    awbSearch: "",
    statusFilter: "All"
  });

  // Filter records based on all criteria
  const filteredRecords = dispatchRecords.filter(record => {
    const matchesGlobalSearch = !filters.globalSearch || 
      record.uid.toLowerCase().includes(filters.globalSearch.toLowerCase()) ||
      record.companyName.toLowerCase().includes(filters.globalSearch.toLowerCase());
    
    const matchesAWB = !filters.awbSearch || 
      (record.awbNumber && record.awbNumber.toLowerCase().includes(filters.awbSearch.toLowerCase()));
    
    const matchesDODStart = !filters.dodStart || (record.dispatchDate && record.dispatchDate >= filters.dodStart);
    const matchesDODEnd = !filters.dodEnd || (record.dispatchDate && record.dispatchDate <= filters.dodEnd);
    
    const matchesStatus = filters.statusFilter === "All" || record.status === filters.statusFilter;
    
    return matchesGlobalSearch && matchesAWB && matchesDODStart && matchesDODEnd && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <Truck size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Dispatch Audit Dashboard</h1>
            <p className="text-slate-300 text-sm">Comprehensive dispatch records audit and monitoring</p>
          </div>
        </div>
      </div>

      {/* Advanced Filter Bar */}
      <div className="bg-slate-50 border-b border-slate-200 p-6">
        <div className="max-w-full mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={18} className="text-slate-600" />
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Advanced Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Global Search */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-600 uppercase">UID / Company</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={14} />
                <input
                  type="text"
                  placeholder="Search UID or Company..."
                  value={filters.globalSearch}
                  onChange={(e) => setFilters(prev => ({ ...prev, globalSearch: e.target.value }))}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                />
              </div>
            </div>

            {/* DOD Start Date */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-600 uppercase">DOD From</label>
              <input
                type="date"
                value={filters.dodStart}
                onChange={(e) => setFilters(prev => ({ ...prev, dodStart: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
              />
            </div>

            {/* DOD End Date */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-600 uppercase">DOD To</label>
              <input
                type="date"
                value={filters.dodEnd}
                onChange={(e) => setFilters(prev => ({ ...prev, dodEnd: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
              />
            </div>

            {/* AWB Search */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-600 uppercase">AWB Number</label>
              <input
                type="text"
                placeholder="Search AWB..."
                value={filters.awbSearch}
                onChange={(e) => setFilters(prev => ({ ...prev, awbSearch: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
              />
            </div>

            {/* Status Filter */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-600 uppercase">Status</label>
              <select
                value={filters.statusFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, statusFilter: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-xs text-slate-600">
            Showing <span className="font-semibold text-slate-900">{filteredRecords.length}</span> of <span className="font-semibold text-slate-900">{dispatchRecords.length}</span> records
          </div>
        </div>
      </div>

      {/* Master Data Table */}
      <div className="p-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider">UID</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Dispatch Date</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Company</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Recipient</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Category</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider">AWB</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Delivery Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 px-4 text-center text-slate-500">
                      No records found matching the selected filters
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((record) => (
                    <tr key={record.uid} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-900 text-xs">{record.uid}</td>
                      <td className="py-3 px-4 text-slate-600 text-xs">{record.dispatchDate || "-"}</td>
                      <td className="py-3 px-4 text-slate-600 text-xs">{record.companyName}</td>
                      <td className="py-3 px-4 text-slate-600 text-xs">{record.recipientName}</td>
                      <td className="py-3 px-4 text-slate-600 text-xs">{record.documentCategory}</td>
                      <td className="py-3 px-4 font-medium text-slate-900 text-xs">{record.awbNumber || "-"}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          record.status === "Delivered" ? "bg-green-100 text-green-800" :
                          record.status === "In Transit" ? "bg-orange-100 text-orange-800" :
                          "bg-slate-100 text-slate-800"
                        }`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 text-xs">{record.deliveryDate || "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDispatchView;
