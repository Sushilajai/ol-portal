import { useState } from "react";
import { Pencil, Trash2, Plus, Target, DollarSign, TrendingUp, Filter, Search } from "lucide-react";
import { mockTargetRecords, mockDividendRecords, stakeholderCategories } from "../data/mockData";
import type { TargetRecord, DividendRecord } from "../types/data";
import { useAuth } from "../context/AuthContext";
import CompanyAutocomplete from "../components/CompanyAutocomplete";

const LiquidationPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"target" | "dividend">("target");
  const [targetRecords, setTargetRecords] = useState<TargetRecord[]>(mockTargetRecords);
  const [dividendRecords, setDividendRecords] = useState<DividendRecord[]>(mockDividendRecords);
  
  const [targetForm, setTargetForm] = useState({
    comp_id: "",
    companyName: "",
    reportFilingDate: "",
    dissolutionDate: ""
  });

  const [dividendForm, setDividendForm] = useState({
    comp_id: "",
    companyName: "",
    reportFiledOn: "",
    dividendAmount: "",
    stakeholderCategory: "",
    orderDate: "",
    bankTransferDate: ""
  });

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    petitionSearch: "",
    statusFilter: "All"
  });

  const allRecords = [
    ...targetRecords.map(r => ({ ...r, type: 'target' as const })),
    ...dividendRecords.map(r => ({ ...r, type: 'dividend' as const }))
  ];

  const filteredRecords = allRecords.filter(record => {
    const recordDate = record.type === 'target' ? record.reportFilingDate : record.reportFiledOn;
    const matchesDateRange = (!filters.startDate || recordDate >= filters.startDate) &&
                            (!filters.endDate || recordDate <= filters.endDate);
    const matchesPetition = !filters.petitionSearch || 
                           record.companyName.toLowerCase().includes(filters.petitionSearch.toLowerCase()) ||
                           record.comp_id.toLowerCase().includes(filters.petitionSearch.toLowerCase());
    const matchesStatus = filters.statusFilter === "All" || 
                         (filters.statusFilter === "Target" && record.type === 'target') ||
                         (filters.statusFilter === "Dividend" && record.type === 'dividend');
    
    return matchesDateRange && matchesPetition && matchesStatus;
  });

  const handleTargetInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTargetForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDividendInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDividendForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTargetSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRecord: TargetRecord = {
      id: `T${String(targetRecords.length + 1).padStart(3, '0')}`,
      comp_id: targetForm.comp_id,
      companyName: targetForm.companyName,
      reportFilingDate: targetForm.reportFilingDate,
      dissolutionDate: targetForm.dissolutionDate
    };

    setTargetRecords(prev => [...prev, newRecord]);
    setTargetForm({ comp_id: "", companyName: "", reportFilingDate: "", dissolutionDate: "" });
  };

  const handleDividendSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRecord: DividendRecord = {
      id: `D${String(dividendRecords.length + 1).padStart(3, '0')}`,
      comp_id: dividendForm.comp_id,
      companyName: dividendForm.companyName,
      reportFiledOn: dividendForm.reportFiledOn,
      dividendAmount: parseFloat(dividendForm.dividendAmount),
      stakeholderCategory: dividendForm.stakeholderCategory,
      orderDate: dividendForm.orderDate,
      bankTransferDate: dividendForm.bankTransferDate
    };

    setDividendRecords(prev => [...prev, newRecord]);
    setDividendForm({
      comp_id: "", companyName: "", reportFiledOn: "", dividendAmount: "",
      stakeholderCategory: "", orderDate: "", bankTransferDate: ""
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up">
        
        {/* Enhanced Page Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white rounded-2xl shadow-lg px-6 py-4 mb-4">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-3 rounded-xl">
              <TrendingUp className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Target & Dividend Management
              </h1>
              <p className="text-slate-600 text-sm">Manage liquidation timelines and dividend distributions</p>
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
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Type</label>
                    <select
                      name="statusFilter"
                      value={filters.statusFilter}
                      onChange={handleFilterChange}
                      className="input-field"
                    >
                      <option value="All">All Types</option>
                      <option value="Target">Target Timeline</option>
                      <option value="Dividend">Dividend Payout</option>
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
                    <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-3 rounded-xl shadow-lg">
                      <TrendingUp className="text-white" size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">All Records</h2>
                  </div>
                  <span className="badge badge-info shadow-md">
                    {filteredRecords.length} of {allRecords.length} Records
                  </span>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200 shadow-sm">
                      <tr>
                        <th className="text-left py-4 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider">Company</th>
                        <th className="text-left py-4 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider">Type</th>
                        <th className="text-left py-4 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider">Filing Date</th>
                        <th className="text-left py-4 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredRecords.map((record, idx) => (
                        <tr key={record.id} className={`transition-all duration-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 hover:shadow-md`}>
                          <td className="py-4 px-6">
                            <div>
                              <p className="font-semibold text-slate-900">{record.companyName}</p>
                              <p className="text-sm text-slate-500">ID: {record.comp_id}</p>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`badge shadow-sm ${record.type === 'target' ? 'badge-info' : 'badge-success'}`}>
                              {record.type === 'target' ? 'Target' : 'Dividend'}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-slate-600 font-medium">
                            {record.type === 'target' ? record.reportFilingDate : record.reportFiledOn}
                          </td>
                          <td className="py-4 px-6 text-slate-600">
                            {record.type === 'target' 
                              ? `Dissolution: ${record.dissolutionDate}`
                              : `Amount: ₹${record.dividendAmount.toLocaleString()}`
                            }
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
          /* Regular User 60/40 Split View */
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
            
            {/* Left Section - Enhanced Form (60%) */}
            <div className="xl:col-span-3">
              <div className="form-section shadow-lg">
                
                {/* Enhanced Tab Headers */}
                <div className="flex mb-8 bg-slate-100 rounded-2xl p-2">
                  <button
                    onClick={() => setActiveTab("target")}
                    className={`flex items-center gap-3 px-6 py-4 text-sm font-semibold rounded-xl transition-all duration-300 flex-1 ${
                      activeTab === "target"
                        ? "bg-white text-teal-600 shadow-lg transform -translate-y-0.5"
                        : "text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    <Target size={20} />
                    Target Timeline
                  </button>
                  <button
                    onClick={() => setActiveTab("dividend")}
                    className={`flex items-center gap-3 px-6 py-4 text-sm font-semibold rounded-xl transition-all duration-300 flex-1 ${
                      activeTab === "dividend"
                        ? "bg-white text-cyan-600 shadow-lg transform -translate-y-0.5"
                        : "text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    <DollarSign size={20} />
                    Dividend Payout
                  </button>
                </div>
                
                {/* Target Timeline Form */}
                {activeTab === "target" && (
                  <form onSubmit={handleTargetSubmit} className="space-y-6 animate-fade-in-up">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-3 rounded-xl">
                        <Target className="text-white" size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800">Add Target Timeline</h3>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Company Name *
                      </label>
                      <CompanyAutocomplete
                        value={targetForm.comp_id}
                        onChange={(compId, compName) => {
                          setTargetForm(prev => ({
                            ...prev,
                            comp_id: compId,
                            companyName: compName
                          }));
                        }}
                        placeholder="Search and select company..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                          Report Filing Date *
                        </label>
                        <input
                          type="date"
                          name="reportFilingDate"
                          value={targetForm.reportFilingDate}
                          onChange={handleTargetInputChange}
                          required
                          className="input-field"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                          Dissolution Date *
                        </label>
                        <input
                          type="date"
                          name="dissolutionDate"
                          value={targetForm.dissolutionDate}
                          onChange={handleTargetInputChange}
                          required
                          className="input-field"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full py-4 text-lg"
                    >
                      <Plus size={20} className="mr-2" />
                      Add Target Timeline
                    </button>
                  </form>
                )}

                {/* Dividend Payout Form */}
                {activeTab === "dividend" && (
                  <form onSubmit={handleDividendSubmit} className="space-y-6 animate-fade-in-up">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-xl">
                        <DollarSign className="text-white" size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800">Add Dividend Payout</h3>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Company Name *
                      </label>
                      <CompanyAutocomplete
                        value={dividendForm.comp_id}
                        onChange={(compId, compName) => {
                          setDividendForm(prev => ({
                            ...prev,
                            comp_id: compId,
                            companyName: compName
                          }));
                        }}
                        placeholder="Search and select company..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                          Report Filed On *
                        </label>
                        <input
                          type="date"
                          name="reportFiledOn"
                          value={dividendForm.reportFiledOn}
                          onChange={handleDividendInputChange}
                          required
                          className="input-field"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                          Dividend Amount (₹) *
                        </label>
                        <input
                          type="number"
                          name="dividendAmount"
                          value={dividendForm.dividendAmount}
                          onChange={handleDividendInputChange}
                          required
                          min="0"
                          step="0.01"
                          className="input-field"
                          placeholder="Enter amount"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Stakeholder Category *
                      </label>
                      <select
                        name="stakeholderCategory"
                        value={dividendForm.stakeholderCategory}
                        onChange={handleDividendInputChange}
                        required
                        className="input-field"
                      >
                        <option value="">Select Category</option>
                        {stakeholderCategories.map(category => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                          Order Date *
                        </label>
                        <input
                          type="date"
                          name="orderDate"
                          value={dividendForm.orderDate}
                          onChange={handleDividendInputChange}
                          required
                          className="input-field"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                          Bank Transfer Date *
                        </label>
                        <input
                          type="date"
                          name="bankTransferDate"
                          value={dividendForm.bankTransferDate}
                          onChange={handleDividendInputChange}
                          required
                          className="input-field"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full py-4 text-lg"
                    >
                      <Plus size={20} className="mr-2" />
                      Add Dividend Payout
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Section - Enhanced Table (40%) */}
            <div className="xl:col-span-2">
              <div className="form-section shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-purple-500 to-violet-600 p-3 rounded-xl">
                      <TrendingUp className="text-white" size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Records</h2>
                  </div>
                  <span className="badge badge-info">
                    {targetRecords.length + dividendRecords.length} Total
                  </span>
                </div>
                
                <div className="table-container">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="table-header">
                        <tr>
                          <th className="text-left px-4 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Company</th>
                          <th className="text-left px-4 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Type</th>
                          <th className="text-left px-4 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Date</th>
                          <th className="text-left px-4 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {targetRecords.map((record) => (
                          <tr key={record.id} className="table-row">
                            <td className="px-4 py-4">
                              <p className="font-semibold text-slate-900 text-sm">{record.companyName}</p>
                            </td>
                            <td className="px-4 py-4">
                              <span className="badge badge-info text-xs">Target</span>
                            </td>
                            <td className="px-4 py-4 text-sm text-slate-600">{record.reportFilingDate}</td>
                            <td className="px-4 py-4">
                              <div className="flex gap-2">
                                <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200">
                                  <Pencil size={16} />
                                </button>
                                <button className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200">
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {dividendRecords.map((record) => (
                          <tr key={record.id} className="table-row">
                            <td className="px-4 py-4">
                              <p className="font-semibold text-slate-900 text-sm">{record.companyName}</p>
                            </td>
                            <td className="px-4 py-4">
                              <span className="badge badge-success text-xs">Dividend</span>
                            </td>
                            <td className="px-4 py-4 text-sm text-slate-600">{record.reportFiledOn}</td>
                            <td className="px-4 py-4">
                              <div className="flex gap-2">
                                <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200">
                                  <Pencil size={16} />
                                </button>
                                <button className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200">
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

export default LiquidationPage;
