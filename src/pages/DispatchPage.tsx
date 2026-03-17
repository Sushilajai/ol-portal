import { useState, useRef } from "react";
import { ChevronDown, Truck, Package, CheckCircle, Clock, Plus, Mail, Filter, Search } from "lucide-react";
import { mockDispatchRecords, documentCategories } from "../data/mockData";
import type { DispatchRecord } from "../types/data";
import { generateUID } from "../types/data";
import { useAuth } from "../context/AuthContext";
import CompanyAutocomplete from "../components/CompanyAutocomplete";

const DispatchPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"create" | "pending" | "delivery">("create");
  const [dispatchRecords, setDispatchRecords] = useState<DispatchRecord[]>(mockDispatchRecords);
  const [expandedUID, setExpandedUID] = useState<string | null>(null);
  const awbInputRef = useRef<HTMLInputElement>(null);
  
  const [createForm, setCreateForm] = useState({
    comp_id: "",
    companyName: "",
    recipientName: "",
    deliveryAddress: "",
    documentCategory: "",
    deliveryNoteRequired: false
  });
  
  const [dispatchForm, setDispatchForm] = useState({
    awbNumber: "",
    dispatchDate: ""
  });

  const [deliveryConfirmationForm, setDeliveryConfirmationForm] = useState({
    deliveryStatus: "",
    deliveryDate: "",
    deliveryRemarks: ""
  });

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Filter states for SuperAdmin view
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    awbSearch: "",
    statusFilter: "All"
  });

  // Filtered records for SuperAdmin view
  const filteredRecords = dispatchRecords.filter(record => {
    const recordDate = record.dispatchDate || new Date().toISOString().split('T')[0];
    const matchesDateRange = (!filters.startDate || recordDate >= filters.startDate) &&
                            (!filters.endDate || recordDate <= filters.endDate);
    const matchesAWB = !filters.awbSearch || 
                      (record.awbNumber && record.awbNumber.toLowerCase().includes(filters.awbSearch.toLowerCase())) ||
                      record.uid.toLowerCase().includes(filters.awbSearch.toLowerCase()) ||
                      record.recipientName.toLowerCase().includes(filters.awbSearch.toLowerCase());
    const matchesStatus = filters.statusFilter === "All" || record.status === filters.statusFilter;
    
    return matchesDateRange && matchesAWB && matchesStatus;
  });

  const pendingRecords = dispatchRecords.filter(record => record.status === "Pending");
  const inTransitRecords = dispatchRecords.filter(record => record.status === "Dispatched" && record.deliveryNoteRequired);
  const deliveredRecords = dispatchRecords.filter(record => record.status === "Delivered");

  const handleCreateInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as any;
    setCreateForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const uid = generateUID(createForm.comp_id, "01", "02");
    
    const newRecord: DispatchRecord = {
      uid,
      comp_id: createForm.comp_id,
      recipientName: createForm.recipientName,
      recipientAddress: createForm.deliveryAddress,
      documentCategory: createForm.documentCategory,
      deliveryNoteRequired: createForm.deliveryNoteRequired,
      status: "Pending"
    };

    setDispatchRecords(prev => [...prev, newRecord]);
    
    setCreateForm({
      comp_id: "",
      companyName: "",
      recipientName: "",
      deliveryAddress: "",
      documentCategory: "",
      deliveryNoteRequired: false
    });
    
    setActiveTab("pending");
  };

  const handleExpandToggle = (uid: string) => {
    setExpandedUID(expandedUID === uid ? null : uid);
    if (expandedUID === uid) {
      setDispatchForm({ awbNumber: "", dispatchDate: "" });
    }
  };

  const handleDispatchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDispatchForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAWBKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, uid: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (dispatchForm.awbNumber && dispatchForm.dispatchDate) {
        handleMarkAsDispatched(uid);
      }
    }
  };

  const handleMarkAsDispatched = (uid: string) => {
    if (!dispatchForm.awbNumber || !dispatchForm.dispatchDate) {
      alert("Please fill in both AWB Number and Dispatch Date");
      return;
    }

    setDispatchRecords(prev => 
      prev.map(record => 
        record.uid === uid 
          ? { 
              ...record, 
              status: "Dispatched" as const,
              awbNumber: dispatchForm.awbNumber,
              dispatchDate: dispatchForm.dispatchDate
            }
          : record
      )
    );

    setDispatchForm({ awbNumber: "", dispatchDate: "" });
    setExpandedUID(null);
  };

  const handleDeliveryConfirmationSubmit = (uid: string) => {
    if (!deliveryConfirmationForm.deliveryStatus || !deliveryConfirmationForm.deliveryDate) {
      alert("Please fill in Delivery Status and Delivery Date");
      return;
    }

    // Update dispatch record status to Delivered
    setDispatchRecords(prev =>
      prev.map(record =>
        record.uid === uid
          ? {
              ...record,
              status: "Delivered" as const,
              deliveryDate: deliveryConfirmationForm.deliveryDate
            }
          : record
      )
    );

    // Show success toast
    setToast({ message: "Delivery status updated successfully", type: "success" });
    setTimeout(() => setToast(null), 3000);

    // Reset form and collapse
    setDeliveryConfirmationForm({ deliveryStatus: "", deliveryDate: "", deliveryRemarks: "" });
    setExpandedUID(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in-up">
        
        {/* Enhanced Mobile-First Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-3 bg-white rounded-2xl shadow-lg px-4 sm:px-6 py-4 mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-2 sm:p-3 rounded-xl">
              <Truck className="text-white w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Dispatch Management
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm">3-Tab Dispatch System</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="metric-card group">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-3 sm:p-4 rounded-2xl shadow-lg">
                <Clock className="text-white w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="badge badge-warning text-xs">Pending</span>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Awaiting Dispatch</p>
            <p className="text-2xl sm:text-3xl font-bold text-slate-800">{pendingRecords.length}</p>
          </div>

          <div className="metric-card group">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 sm:p-4 rounded-2xl shadow-lg">
                <Truck className="text-white w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="badge badge-warning text-xs">In Transit</span>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Awaiting Delivery</p>
            <p className="text-2xl sm:text-3xl font-bold text-slate-800">{inTransitRecords.length}</p>
          </div>

          <div className="metric-card group">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 sm:p-4 rounded-2xl shadow-lg">
                <CheckCircle className="text-white w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="badge badge-success text-xs">Delivered</span>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Completed</p>
            <p className="text-2xl sm:text-3xl font-bold text-slate-800">{deliveredRecords.length}</p>
          </div>
        </div>

        {/* Main Content - Conditional Rendering Based on Role */}
        {user?.role === "SuperAdmin" ? (
          /* SuperAdmin Full-Width Data Table View */
          <div className="space-y-6">
            {/* Advanced Filter Bar */}
            <div className="card shadow-lg">
              <div className="card-header">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg">
                    <Filter className="text-white" size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">Advanced Filters</h2>
                </div>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={filters.startDate}
                      onChange={handleFilterChange}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={filters.endDate}
                      onChange={handleFilterChange}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Search by AWB</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        type="text"
                        name="awbSearch"
                        value={filters.awbSearch}
                        onChange={handleFilterChange}
                        placeholder="Search AWB, UID, or recipient..."
                        className="input-field pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Status</label>
                    <select
                      name="statusFilter"
                      value={filters.statusFilter}
                      onChange={handleFilterChange}
                      className="input-field"
                    >
                      <option value="All">All Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width Data Table */}
            <div className="card shadow-lg">
              <div className="card-header">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-3 rounded-xl shadow-lg">
                      <Truck className="text-white" size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">All Dispatch Records</h2>
                  </div>
                  <span className="badge badge-info shadow-md">
                    {filteredRecords.length} of {dispatchRecords.length} Records
                  </span>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200 shadow-sm">
                      <tr>
                        <th className="text-left py-4 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider">UID</th>
                        <th className="text-left py-4 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider">Recipient</th>
                        <th className="text-left py-4 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider">Document</th>
                        <th className="text-left py-4 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                        <th className="text-left py-4 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider">AWB</th>
                        <th className="text-left py-4 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider">Delivery Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredRecords.map((record, idx) => (
                        <tr key={record.uid} className={`transition-all duration-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 hover:shadow-md`}>
                          <td className="py-4 px-6">
                            <p className="font-semibold text-slate-900">{record.uid}</p>
                          </td>
                          <td className="py-4 px-6 text-slate-600">{record.recipientName}</td>
                          <td className="py-4 px-6 text-slate-600">{record.documentCategory}</td>
                          <td className="py-4 px-6">
                            <span className={`badge ${record.status === "Delivered" ? 'badge-success' : record.status === "Dispatched" ? 'badge-info' : 'badge-warning'}`}>
                              {record.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-slate-600">{record.awbNumber || "-"}</td>
                          <td className="py-4 px-6">
                            <span className={`badge ${record.deliveryNoteRequired ? 'badge-warning' : 'badge-success'}`}>
                              {record.deliveryNoteRequired ? 'Yes' : 'No'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Regular User 3-Tab Layout */
          <div className="space-y-6">
            {/* Tab Headers */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 bg-slate-100 rounded-2xl p-2">
              {[
                { id: "create", label: "Create", icon: Mail },
                { id: "pending", label: "Pending Dispatch", icon: Package },
                { id: "delivery", label: "Delivery Confirmation", icon: CheckCircle }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 flex-1 ${
                    activeTab === tab.id
                      ? "bg-white text-purple-600 shadow-lg transform -translate-y-0.5"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  <tab.icon size={16} className="sm:w-5 sm:h-5" />
                  <span className="hidden xs:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "create" && (
              <div className="card shadow-lg">
                <div className="card-header">
                  <div className="flex items-center gap-3">
                    <Mail className="text-purple-600" size={24} />
                    <h2 className="text-xl font-bold text-slate-800">Create New Dispatch</h2>
                  </div>
                </div>
                <div className="card-body">
                  <form onSubmit={handleCreateSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">Company Name *</label>
                      <CompanyAutocomplete
                        value={createForm.comp_id}
                        onChange={(compId, compName) => {
                          setCreateForm(prev => ({
                            ...prev,
                            comp_id: compId,
                            companyName: compName
                          }));
                        }}
                        placeholder="Search and select company..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">Document Category *</label>
                      <select
                        name="documentCategory"
                        value={createForm.documentCategory}
                        onChange={handleCreateInputChange}
                        required
                        className="input-field"
                      >
                        <option value="">Select Category</option>
                        {documentCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">Recipient Name *</label>
                      <input
                        type="text"
                        name="recipientName"
                        value={createForm.recipientName}
                        onChange={handleCreateInputChange}
                        required
                        className="input-field"
                        placeholder="Enter recipient name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">Delivery Address *</label>
                      <textarea
                        name="deliveryAddress"
                        value={createForm.deliveryAddress}
                        onChange={handleCreateInputChange}
                        required
                        rows={3}
                        className="input-field resize-none"
                        placeholder="Enter complete address"
                      />
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                      <input
                        type="checkbox"
                        name="deliveryNoteRequired"
                        checked={createForm.deliveryNoteRequired}
                        onChange={handleCreateInputChange}
                        className="w-5 h-5 rounded border-slate-300 cursor-pointer"
                      />
                      <label className="text-sm font-semibold text-slate-700 cursor-pointer">
                        Delivery Note Required?
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full py-4 text-lg bg-gradient-to-r from-purple-500 to-indigo-600"
                    >
                      <Plus size={20} className="mr-2" />
                      Generate UID & Create
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === "pending" && (
              <div className="space-y-4">
                {pendingRecords.length === 0 ? (
                  <div className="card shadow-lg text-center py-12">
                    <Package className="mx-auto text-slate-300 mb-4" size={48} />
                    <p className="text-slate-600">No pending dispatches</p>
                  </div>
                ) : (
                  pendingRecords.map(record => (
                    <div key={record.uid} className="card shadow-lg overflow-hidden hover:shadow-xl transition-all">
                      <div
                        className="p-4 sm:p-6 cursor-pointer hover:bg-slate-50 transition-all"
                        onClick={() => handleExpandToggle(record.uid)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-bold text-slate-900">{record.uid}</p>
                            <p className="text-sm text-slate-600">{record.recipientName}</p>
                          </div>
                          <ChevronDown className={`transition-transform ${expandedUID === record.uid ? 'rotate-180' : ''}`} />
                        </div>
                      </div>

                      {expandedUID === record.uid && (
                        <div className="border-t border-slate-200 bg-slate-50 p-4 sm:p-6 space-y-4">
                          <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase">Recipient</p>
                            <p className="text-slate-900">{record.recipientName}</p>
                            <p className="text-sm text-slate-600 mt-2">{record.recipientAddress}</p>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-2">AWB Number *</label>
                              <input
                                ref={awbInputRef}
                                type="text"
                                value={dispatchForm.awbNumber}
                                onChange={handleDispatchInputChange}
                                onKeyDown={(e) => handleAWBKeyDown(e, record.uid)}
                                placeholder="Scan barcode or enter AWB"
                                className="input-field"
                              />
                              <p className="text-xs text-slate-500 mt-1">Press Enter to auto-submit after scanning</p>
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-2">Dispatch Date *</label>
                              <input
                                type="date"
                                name="dispatchDate"
                                value={dispatchForm.dispatchDate}
                                onChange={handleDispatchInputChange}
                                className="input-field"
                              />
                            </div>

                            <button
                              onClick={() => handleMarkAsDispatched(record.uid)}
                              className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                            >
                              <Truck size={18} className="inline mr-2" />
                              Mark as Dispatched
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "delivery" && (
              <div className="space-y-4">
                {inTransitRecords.length === 0 ? (
                  <div className="card shadow-lg text-center py-12">
                    <CheckCircle className="mx-auto text-slate-300 mb-4" size={48} />
                    <p className="text-slate-600">No delivery confirmations pending</p>
                  </div>
                ) : (
                  <>
                    {/* Toast Notification */}
                    {toast && (
                      <div className={`fixed top-4 right-4 px-6 py-4 rounded-xl shadow-lg text-white font-semibold animate-fade-in-up ${
                        toast.type === "success" 
                          ? "bg-gradient-to-r from-green-500 to-emerald-600" 
                          : "bg-gradient-to-r from-red-500 to-pink-600"
                      }`}>
                        {toast.message}
                      </div>
                    )}

                    {inTransitRecords.map(record => (
                      <div key={record.uid} className="card shadow-lg overflow-hidden hover:shadow-xl transition-all">
                        {/* Card Header - Collapsed View */}
                        <div
                          className="p-4 sm:p-6 cursor-pointer hover:bg-slate-50 transition-all"
                          onClick={() => handleExpandToggle(record.uid)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <p className="font-bold text-slate-900">{record.uid}</p>
                                <span className="badge bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 text-xs font-bold">
                                  In Transit
                                </span>
                              </div>
                              <p className="text-sm text-slate-600">{record.recipientName}</p>
                            </div>
                            <ChevronDown className={`transition-transform ${expandedUID === record.uid ? 'rotate-180' : ''}`} />
                          </div>
                        </div>

                        {/* Card Body - Expanded View */}
                        {expandedUID === record.uid && (
                          <div className="border-t border-slate-200 bg-slate-50 p-4 sm:p-6 space-y-6">
                            {/* Read-Only Details Section */}
                            <div className="space-y-4 bg-white rounded-xl p-4 border border-slate-200">
                              <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Delivery Address</p>
                                <p className="text-slate-900 font-medium">{record.recipientAddress}</p>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">AWB Number</p>
                                  <p className="text-slate-900 font-semibold">{record.awbNumber || "-"}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Dispatch Date</p>
                                  <p className="text-slate-900 font-semibold">{record.dispatchDate || "-"}</p>
                                </div>
                              </div>
                            </div>

                            {/* Delivery Confirmation Form */}
                            <div className="space-y-4 bg-blue-50 rounded-xl p-4 border border-blue-200">
                              <h3 className="font-bold text-slate-900">Delivery Confirmation</h3>

                              <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Delivery Status *</label>
                                <select
                                  value={deliveryConfirmationForm.deliveryStatus}
                                  onChange={(e) => setDeliveryConfirmationForm(prev => ({
                                    ...prev,
                                    deliveryStatus: e.target.value
                                  }))}
                                  className="input-field"
                                >
                                  <option value="">Select Status</option>
                                  <option value="Successfully Delivered">Successfully Delivered</option>
                                  <option value="Returned / RTO">Returned / RTO</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Delivery Date *</label>
                                <input
                                  type="date"
                                  value={deliveryConfirmationForm.deliveryDate}
                                  onChange={(e) => setDeliveryConfirmationForm(prev => ({
                                    ...prev,
                                    deliveryDate: e.target.value
                                  }))}
                                  className="input-field"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Delivery Remarks (Optional)</label>
                                <textarea
                                  value={deliveryConfirmationForm.deliveryRemarks}
                                  onChange={(e) => setDeliveryConfirmationForm(prev => ({
                                    ...prev,
                                    deliveryRemarks: e.target.value
                                  }))}
                                  placeholder="e.g., Signed by security guard, or reason for return..."
                                  rows={3}
                                  className="input-field resize-none"
                                />
                              </div>

                              <button
                                onClick={() => handleDeliveryConfirmationSubmit(record.uid)}
                                className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95"
                              >
                                <CheckCircle size={18} className="inline mr-2" />
                                Save Delivery Confirmation
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DispatchPage;
