import { useState } from "react";
import { Truck, Plus, Clock, CheckCircle, Search, X } from "lucide-react";
import { mockDispatchRecords } from "../data/mockData";
import { documentCategories, generateUID } from "../types/data";
import type { DispatchRecord } from "../types/data";
import CompanyAutocomplete from "../components/CompanyAutocomplete";

const DispatchPage = () => {
  const [dispatchRecords, setDispatchRecords] = useState<DispatchRecord[]>(mockDispatchRecords);
  const [viewMode, setViewMode] = useState<"all" | "pending">("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  
  // Create form state
  const [createForm, setCreateForm] = useState({
    recipientName: "",
    comp_id: "",
    companyName: "",
    documentCategory: "",
    address: "",
    awbNumber: "",
    deliveryNoteRequired: false
  });
  
  const [generatedUID, setGeneratedUID] = useState<string>("");

  // Search filters
  const [filters, setFilters] = useState({
    globalSearch: "",
    dateRange: { start: "", end: "" },
    statusFilter: "All"
  });

  // Pending status updates
  const [pendingUpdates, setPendingUpdates] = useState<Record<string, { status: string; deliveryDate: string }>>({});

  // Calculate metrics
  const totalDispatches = dispatchRecords.length;
  const pendingCount = dispatchRecords.filter(r => r.status === "Pending").length;
  const deliveredCount = dispatchRecords.filter(r => r.status === "Delivered").length;

  // Handle document category change - generate UID
  const handleCategoryChange = (category: string) => {
    setCreateForm(prev => ({ ...prev, documentCategory: category }));
    if (category) {
      const uid = generateUID(category, dispatchRecords.length + 1);
      setGeneratedUID(uid);
    }
  };

  // Handle create form submission
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!createForm.recipientName || !createForm.comp_id || !createForm.documentCategory || !createForm.address || !createForm.awbNumber) {
      alert("Please fill all required fields");
      return;
    }

    const newRecord: DispatchRecord = {
      uid: generatedUID,
      comp_id: createForm.comp_id,
      companyName: createForm.companyName,
      recipientName: createForm.recipientName,
      recipientAddress: createForm.address,
      documentCategory: createForm.documentCategory,
      deliveryNoteRequired: createForm.deliveryNoteRequired,
      status: createForm.deliveryNoteRequired ? "In Transit" : "Pending",
      awbNumber: createForm.awbNumber,
      dispatchDate: new Date().toISOString().split('T')[0]
    };

    setDispatchRecords([...dispatchRecords, newRecord]);
    
    // Reset form
    setCreateForm({
      recipientName: "",
      comp_id: "",
      companyName: "",
      documentCategory: "",
      address: "",
      awbNumber: "",
      deliveryNoteRequired: false
    });
    setGeneratedUID("");
    setShowCreateModal(false);
    
    // Show success toast
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  // Filter records based on view mode
  const filteredRecords = (viewMode === "all" ? dispatchRecords : dispatchRecords.filter(r => r.status === "In Transit" && r.deliveryNoteRequired)).filter(record => {
    const matchesGlobalSearch = !filters.globalSearch || 
      record.uid.toLowerCase().includes(filters.globalSearch.toLowerCase()) ||
      record.companyName.toLowerCase().includes(filters.globalSearch.toLowerCase()) ||
      record.recipientName.toLowerCase().includes(filters.globalSearch.toLowerCase()) ||
      (record.awbNumber && record.awbNumber.toLowerCase().includes(filters.globalSearch.toLowerCase()));
    
    const matchesDateRange = !filters.dateRange.start || (record.dispatchDate && record.dispatchDate >= filters.dateRange.start);
    
    const matchesStatus = filters.statusFilter === "All" || record.status === filters.statusFilter;
    
    return matchesGlobalSearch && matchesDateRange && matchesStatus;
  });

  // Handle pending status update
  const handlePendingUpdate = (uid: string) => {
    const update = pendingUpdates[uid];
    if (!update || !update.status || !update.deliveryDate) {
      alert("Please select status and delivery date");
      return;
    }

    setDispatchRecords(prev => 
      prev.map(record => 
        record.uid === uid 
          ? { ...record, status: update.status as any, deliveryDate: update.deliveryDate }
          : record
      )
    );

    const newUpdates = { ...pendingUpdates };
    delete newUpdates[uid];
    setPendingUpdates(newUpdates);
    
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-3 rounded-xl shadow-lg">
            <Truck className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dispatch Management</h1>
            <p className="text-slate-600 text-sm">Track and manage document dispatch operations</p>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Truck className="text-blue-600" size={20} />
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">Total</span>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Dispatches</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{totalDispatches}</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="text-orange-600" size={20} />
              </div>
              <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded">Pending</span>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Status</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{pendingCount}</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">Delivered</span>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Delivery Confirmation</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{deliveredCount}</p>
          </div>
        </div>

        {/* Compact Search & Filter Row + View Toggle */}
        <div className="flex flex-col md:flex-row gap-4 items-end">
          {/* Search & Filters */}
          <div className="flex-1 flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search UID, Company, Recipient, AWB..."
                value={filters.globalSearch}
                onChange={(e) => setFilters(prev => ({ ...prev, globalSearch: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <input
              type="date"
              value={filters.dateRange.start}
              onChange={(e) => setFilters(prev => ({ ...prev, dateRange: { ...prev.dateRange, start: e.target.value } }))}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("all")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                viewMode === "all"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Records
            </button>
            <button
              onClick={() => setViewMode("pending")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                viewMode === "pending"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Pending Updates
            </button>
          </div>

          {/* New Dispatch Button */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-95 shadow-sm hover:shadow-md"
          >
            <Plus size={18} />
            New Dispatch
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider">UID</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Company</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Recipient</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Category</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Dispatch Date</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider">AWB</th>
                  <th className="text-left py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Status</span>
                      <select
                        value={filters.statusFilter}
                        onChange={(e) => setFilters(prev => ({ ...prev, statusFilter: e.target.value }))}
                        className="px-2 py-1 border border-slate-300 rounded text-xs bg-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                      >
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </th>
                  {viewMode === "pending" && <th className="text-left py-3 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={viewMode === "pending" ? 8 : 7} className="py-8 px-4 text-center text-slate-500">
                      No records found
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((record) => (
                    <tr key={record.uid} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-900 text-sm">{record.uid}</td>
                      <td className="py-3 px-4 text-slate-600 text-sm">{record.companyName}</td>
                      <td className="py-3 px-4 text-slate-600 text-sm">{record.recipientName}</td>
                      <td className="py-3 px-4 text-slate-600 text-sm">{record.documentCategory}</td>
                      <td className="py-3 px-4 text-slate-600 text-sm">{record.dispatchDate || "-"}</td>
                      <td className="py-3 px-4 font-medium text-slate-900 text-sm">{record.awbNumber || "-"}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          record.status === "Delivered" ? "bg-green-100 text-green-800" :
                          record.status === "In Transit" ? "bg-orange-100 text-orange-800" :
                          "bg-slate-100 text-slate-800"
                        }`}>
                          {record.status}
                        </span>
                      </td>
                      {viewMode === "pending" && (
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <select
                              value={pendingUpdates[record.uid]?.status || "In Transit"}
                              onChange={(e) => setPendingUpdates(prev => ({
                                ...prev,
                                [record.uid]: { ...prev[record.uid], status: e.target.value }
                              }))}
                              className="px-2 py-1 border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-400"
                            >
                              <option value="In Transit">In Transit</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                            <input
                              type="date"
                              value={pendingUpdates[record.uid]?.deliveryDate || ""}
                              onChange={(e) => setPendingUpdates(prev => ({
                                ...prev,
                                [record.uid]: { ...prev[record.uid], deliveryDate: e.target.value }
                              }))}
                              className="px-2 py-1 border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-400"
                            />
                            <button
                              onClick={() => handlePendingUpdate(record.uid)}
                              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold transition-all"
                            >
                              Save
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Dispatch Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Create Dispatch</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 hover:bg-slate-100 rounded-lg transition-all"
              >
                <X size={20} className="text-slate-600" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              {/* Recipient Name */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-slate-700">Recipient Name *</label>
                <input
                  type="text"
                  value={createForm.recipientName}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, recipientName: e.target.value }))}
                  placeholder="Enter recipient name"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>

              {/* Company Name */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-slate-700">Company Name *</label>
                <CompanyAutocomplete
                  value={createForm.comp_id}
                  onChange={(compId, compName) => {
                    setCreateForm(prev => ({ ...prev, comp_id: compId, companyName: compName }));
                  }}
                  placeholder="Search company..."
                />
              </div>

              {/* Document Category */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-slate-700">Document Category *</label>
                <select
                  value={createForm.documentCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  required
                >
                  <option value="">Select Category</option>
                  {documentCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Generated UID Display */}
              {generatedUID && (
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Generated UID</p>
                  <p className="text-lg font-bold text-blue-700 font-mono">{generatedUID}</p>
                </div>
              )}

              {/* Address */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-slate-700">Delivery Address *</label>
                <textarea
                  value={createForm.address}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter complete address"
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none"
                  required
                />
              </div>

              {/* AWB Number */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-slate-700">AWB / Courier Number *</label>
                <input
                  type="text"
                  value={createForm.awbNumber}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, awbNumber: e.target.value }))}
                  placeholder="Enter AWB number"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>

              {/* Delivery Note Required */}
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <input
                  type="checkbox"
                  checked={createForm.deliveryNoteRequired}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, deliveryNoteRequired: e.target.checked }))}
                  className="w-4 h-4 rounded border-slate-300 cursor-pointer"
                />
                <label className="text-sm font-semibold text-slate-700 cursor-pointer">
                  Delivery Note Required?
                </label>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all transform hover:-translate-y-0.5 active:scale-95"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg font-semibold animate-fade-in-up">
          ✓ Operation completed successfully
        </div>
      )}
    </div>
  );
};

export default DispatchPage;
