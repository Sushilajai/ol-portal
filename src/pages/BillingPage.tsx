import { useState } from "react";
import { Pencil, Trash2, Plus, DollarSign, Receipt, Filter, Search } from "lucide-react";
import { mockBillingRecords, billCategories } from "../data/mockData";
import type { BillingRecord } from "../types/data";
import { useAuth } from "../context/AuthContext";
import CompanyAutocomplete from "../components/CompanyAutocomplete";

const BillingPage = () => {
  const { user } = useAuth();
  const [billingRecords, setBillingRecords] = useState<BillingRecord[]>(mockBillingRecords);
  const [formData, setFormData] = useState({
    comp_id: "",
    companyName: "",
    billCategory: "",
    submissionDate: "",
    amount: "",
    description: "",
    status: "Unpaid" as "Unpaid" | "Paid",
    paymentDate: ""
  });

  // Filter states for SuperAdmin view
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    petitionSearch: "",
    statusFilter: "All"
  });

  // Filtered records for SuperAdmin view
  const filteredRecords = billingRecords.filter(record => {
    const matchesDateRange = (!filters.startDate || record.submissionDate >= filters.startDate) &&
                            (!filters.endDate || record.submissionDate <= filters.endDate);
    const matchesPetition = !filters.petitionSearch || 
                           record.companyName.toLowerCase().includes(filters.petitionSearch.toLowerCase()) ||
                           record.comp_id.toLowerCase().includes(filters.petitionSearch.toLowerCase());
    const matchesStatus = filters.statusFilter === "All" || record.status === filters.statusFilter;
    
    return matchesDateRange && matchesPetition && matchesStatus;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusToggle = (status: "Unpaid" | "Paid") => {
    setFormData(prev => ({
      ...prev,
      status,
      paymentDate: status === "Unpaid" ? "" : prev.paymentDate
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRecord: BillingRecord = {
      id: `B${String(billingRecords.length + 1).padStart(3, '0')}`,
      comp_id: formData.comp_id,
      companyName: formData.companyName,
      billCategory: formData.billCategory,
      submissionDate: formData.submissionDate,
      amount: parseFloat(formData.amount),
      description: formData.description,
      status: formData.status,
      paymentDate: formData.status === "Paid" ? formData.paymentDate : undefined
    };

    setBillingRecords(prev => [...prev, newRecord]);
    
    setFormData({
      comp_id: "",
      companyName: "",
      billCategory: "",
      submissionDate: "",
      amount: "",
      description: "",
      status: "Unpaid",
      paymentDate: ""
    });
  };

  const handleDelete = (id: string) => {
    setBillingRecords(prev => prev.filter(record => record.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up">
        
        {/* Enhanced Page Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white rounded-2xl shadow-lg px-6 py-4 mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-3 rounded-xl">
              <DollarSign className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Billing Management
              </h1>
              <p className="text-slate-600 text-sm">Manage company bills and payment tracking</p>
            </div>
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
                  {/* Date Range */}
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
                  
                  {/* Petition Search */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Search by Company/ID</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        type="text"
                        name="petitionSearch"
                        value={filters.petitionSearch}
                        onChange={handleFilterChange}
                        placeholder="Search company or ID..."
                        className="input-field pl-10"
                      />
                    </div>
                  </div>
                  
                  {/* Status Filter */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Status</label>
                    <select
                      name="statusFilter"
                      value={filters.statusFilter}
                      onChange={handleFilterChange}
                      className="input-field"
                    >
                      <option value="All">All Status</option>
                      <option value="Paid">Paid</option>
                      <option value="Unpaid">Unpaid</option>
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
                    <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-3 rounded-xl shadow-lg">
                      <Receipt className="text-white" size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">All Billing Records</h2>
                  </div>
                  <span className="badge badge-info shadow-md">
                    {filteredRecords.length} of {billingRecords.length} Records
                  </span>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200 shadow-sm">
                      <tr>
                        <th className="text-left py-4 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider">Company</th>
                        <th className="text-left py-4 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider">Category</th>
                        <th className="text-left py-4 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider">Amount</th>
                        <th className="text-left py-4 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider">Submission Date</th>
                        <th className="text-left py-4 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                        <th className="text-left py-4 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider">Payment Date</th>
                        <th className="text-left py-4 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredRecords.map((record, idx) => (
                        <tr key={record.id} className={`transition-all duration-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 hover:shadow-md`}>
                          <td className="py-4 px-6">
                            <div>
                              <p className="font-semibold text-slate-900">{record.companyName}</p>
                              <p className="text-sm text-slate-500">ID: {record.comp_id}</p>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-slate-600 font-medium">{record.billCategory}</td>
                          <td className="py-4 px-6">
                            <p className="font-bold text-slate-900">₹{record.amount.toLocaleString()}</p>
                          </td>
                          <td className="py-4 px-6 text-slate-600">{record.submissionDate}</td>
                          <td className="py-4 px-6">
                            <span className={`badge shadow-sm ${record.status === "Paid" ? 'badge-success' : 'badge-error'}`}>
                              {record.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-slate-600">{record.paymentDate || "-"}</td>
                          <td className="py-4 px-6 text-slate-600 max-w-xs truncate">{record.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Regular User 60/40 Split View */
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
            
            {/* Left Section - Enhanced Form (60%) */}
            <div className="xl:col-span-3">
              <div className="form-section">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl">
                    <Plus className="text-white" size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">Add New Bill</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Company Name - Using Autocomplete */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Company Name *
                    </label>
                    <CompanyAutocomplete
                      value={formData.comp_id}
                      onChange={(compId, compName) => {
                        setFormData(prev => ({
                          ...prev,
                          comp_id: compId,
                          companyName: compName
                        }));
                      }}
                      placeholder="Search and select company..."
                    />
                  </div>

                  {/* Bill Category */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Bill Category *
                    </label>
                    <select
                      name="billCategory"
                      value={formData.billCategory}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                    >
                      <option value="">Select Category</option>
                      {billCategories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submission Date & Amount Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Submission Date *
                      </label>
                      <input
                        type="date"
                        name="submissionDate"
                        value={formData.submissionDate}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Amount (₹) *
                      </label>
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        className="input-field"
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="input-field resize-none"
                      placeholder="Enter detailed bill description"
                    />
                  </div>

                  {/* Enhanced Status Toggle */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-slate-700">
                      Payment Status *
                    </label>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => handleStatusToggle("Unpaid")}
                        className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                          formData.status === "Unpaid"
                            ? "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg transform -translate-y-0.5"
                            : "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-600 hover:shadow-md hover:-translate-y-0.5"
                        }`}
                      >
                        Unpaid
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStatusToggle("Paid")}
                        className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                          formData.status === "Paid"
                            ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform -translate-y-0.5"
                            : "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-600 hover:shadow-md hover:-translate-y-0.5"
                        }`}
                      >
                        Paid
                      </button>
                    </div>
                  </div>

                  {/* Payment Date (conditional) */}
                  {formData.status === "Paid" && (
                    <div className="space-y-2 animate-fade-in-up">
                      <label className="block text-sm font-semibold text-slate-700">
                        Payment Date *
                      </label>
                      <input
                        type="date"
                        name="paymentDate"
                        value={formData.paymentDate}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                      />
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn-primary w-full py-4 text-lg"
                  >
                    <Plus size={20} className="mr-2" />
                    Add Bill Record
                  </button>
                </form>
              </div>
            </div>

            {/* Right Section - Enhanced Table (40%) */}
            <div className="xl:col-span-2">
              <div className="form-section shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-purple-500 to-violet-600 p-3 rounded-xl">
                      <Receipt className="text-white" size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Billing Records</h2>
                  </div>
                  <span className="badge badge-info">
                    {billingRecords.length} Records
                  </span>
                </div>
                
                <div className="table-container">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="table-header">
                        <tr>
                          <th className="text-left px-4 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Company</th>
                          <th className="text-left px-4 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Category</th>
                          <th className="text-left px-4 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Amount</th>
                          <th className="text-left px-4 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                          <th className="text-left px-4 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {billingRecords.map((record) => (
                          <tr key={record.id} className="table-row">
                            <td className="px-4 py-4">
                              <div>
                                <p className="font-semibold text-slate-900 text-sm">{record.companyName}</p>
                                <p className="text-xs text-slate-500">ID: {record.comp_id}</p>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-slate-600">{record.billCategory}</td>
                            <td className="px-4 py-4">
                              <p className="font-bold text-slate-900 text-sm">₹{record.amount.toLocaleString()}</p>
                            </td>
                            <td className="px-4 py-4">
                              <span className={`badge ${record.status === "Paid" ? 'badge-success' : 'badge-error'}`}>
                                {record.status}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex gap-2">
                                <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200">
                                  <Pencil size={16} />
                                </button>
                                <button 
                                  onClick={() => handleDelete(record.id)}
                                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingPage;