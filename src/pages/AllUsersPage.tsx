import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { mockUsers, mockSections, mockBranchOfficers, mockCompanies } from "../data/mockData";
import type { UserRecord, Section, BranchOfficer, Company } from "../types/data";

const AllUsersPage = () => {
  const [activeTab, setActiveTab] = useState<"users" | "master" | "office">("users");
  const [users, setUsers] = useState<UserRecord[]>(mockUsers);
  const [sections, setSections] = useState<Section[]>(mockSections);
  const [branchOfficers, setBranchOfficers] = useState<BranchOfficer[]>(mockBranchOfficers);
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [showOfficerModal, setShowOfficerModal] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserRecord | null>(null);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [editingOfficer, setEditingOfficer] = useState<BranchOfficer | null>(null);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "AccountsAdmin" as const,
    temporaryPassword: "",
  });

  const [sectionForm, setSectionForm] = useState({
    name: "",
    description: "",
  });

  const [officerForm, setOfficerForm] = useState({
    name: "",
    email: "",
    sections: [] as string[],
  });

  const [companyForm, setCompanyForm] = useState({
    name: "",
    status: "Active" as "Active" | "Dissolved",
    windingUpDate: "",
    petitionNo: ""
  });

  // Users Tab
  const handleAddUser = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "", role: "AccountsAdmin", temporaryPassword: "" });
    setShowUserModal(true);
  };

  const handleSaveUser = () => {
    if (!formData.name || !formData.email || !formData.temporaryPassword) return;

    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, name: formData.name, email: formData.email, role: formData.role } : u));
    } else {
      const newUser: UserRecord = {
        id: `U${String(users.length + 1).padStart(3, "0")}`,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        department: formData.role === "AccountsAdmin" ? "Accounts" : formData.role === "TD_Admin" ? "Target & Dividend" : "Dispatch",
      };
      setUsers([...users, newUser]);
    }
    setShowUserModal(false);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  // Sections Tab
  const handleAddSection = () => {
    setEditingSection(null);
    setSectionForm({ name: "", description: "" });
    setShowSectionModal(true);
  };

  const handleSaveSection = () => {
    if (!sectionForm.name) return;

    if (editingSection) {
      setSections(sections.map(s => s.id === editingSection.id ? { ...s, ...sectionForm } : s));
    } else {
      const newSection: Section = {
        id: `S${String(sections.length + 1).padStart(3, "0")}`,
        ...sectionForm,
      };
      setSections([...sections, newSection]);
    }
    setShowSectionModal(false);
  };

  const handleDeleteSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
  };

  // Branch Officers Tab
  const handleAddOfficer = () => {
    setEditingOfficer(null);
    setOfficerForm({ name: "", email: "", sections: [] });
    setShowOfficerModal(true);
  };

  const handleSaveOfficer = () => {
    if (!officerForm.name || !officerForm.email || officerForm.sections.length === 0) return;

    if (editingOfficer) {
      setBranchOfficers(branchOfficers.map(o => o.id === editingOfficer.id ? { ...o, ...officerForm } : o));
    } else {
      const newOfficer: BranchOfficer = {
        id: `BO${String(branchOfficers.length + 1).padStart(3, "0")}`,
        ...officerForm,
      };
      setBranchOfficers([...branchOfficers, newOfficer]);
    }
    setShowOfficerModal(false);
  };

  const handleDeleteOfficer = (id: string) => {
    setBranchOfficers(branchOfficers.filter(o => o.id !== id));
  };

  const toggleSectionSelection = (sectionId: string) => {
    setOfficerForm(prev => ({
      ...prev,
      sections: prev.sections.includes(sectionId)
        ? prev.sections.filter(s => s !== sectionId)
        : [...prev.sections, sectionId]
    }));
  };

  // Companies Tab
  const handleAddCompany = () => {
    setEditingCompany(null);
    setCompanyForm({ name: "", status: "Active", windingUpDate: "", petitionNo: "" });
    setShowCompanyModal(true);
  };

  const handleSaveCompany = () => {
    if (!companyForm.name || !companyForm.petitionNo) return;

    if (editingCompany) {
      setCompanies(companies.map(c => c.comp_id === editingCompany.comp_id ? { ...c, ...companyForm } : c));
    } else {
      // Generate 4-digit comp_id
      const maxId = Math.max(...companies.map(c => parseInt(c.comp_id)), 0);
      const newCompId = String(maxId + 1).padStart(4, '0');
      
      const newCompany: Company = {
        comp_id: newCompId,
        ...companyForm
      };
      setCompanies([...companies, newCompany]);
    }
    setShowCompanyModal(false);
  };

  const handleDeleteCompany = (comp_id: string) => {
    setCompanies(companies.filter(c => c.comp_id !== comp_id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1 h-12 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full"></div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">Users</h1>
              <p className="text-slate-600 text-lg">Manage users, master data, and office structure</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-10 bg-white rounded-2xl p-2 shadow-sm border border-slate-100 w-fit">
          {[
            { id: "users", label: "Users Management", icon: "👥" },
            { id: "master", label: "Master Data", icon: "📊" },
            { id: "office", label: "Office Structure", icon: "🏢" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 font-semibold transition-all duration-300 rounded-xl flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="space-y-6">
            <button
              onClick={handleAddUser}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
            >
              <Plus size={22} /> Add New User
            </button>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden hover:shadow-xl transition-all">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200 shadow-sm">
                  <tr>
                    <th className="px-8 py-5 text-left font-bold text-slate-700 uppercase tracking-wider">Name</th>
                    <th className="px-8 py-5 text-left font-bold text-slate-700 uppercase tracking-wider">Email</th>
                    <th className="px-8 py-5 text-left font-bold text-slate-700 uppercase tracking-wider">Role</th>
                    <th className="px-8 py-5 text-left font-bold text-slate-700 uppercase tracking-wider">Department</th>
                    <th className="px-8 py-5 text-center font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <tr key={user.id} className={`border-b border-slate-100 transition-all duration-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:shadow-md`}>
                      <td className="px-8 py-5 text-slate-900 font-semibold">{user.name}</td>
                      <td className="px-8 py-5 text-slate-600">{user.email}</td>
                      <td className="px-8 py-5">
                        <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-xs font-bold shadow-sm">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-slate-600 font-medium">{user.department}</td>
                      <td className="px-8 py-5 flex justify-center gap-3">
                        <button
                          onClick={() => {
                            setEditingUser(user);
                            setFormData({ name: user.name, email: user.email, role: user.role as any, temporaryPassword: "" });
                            setShowUserModal(true);
                          }}
                          className="p-3 hover:bg-blue-100 rounded-xl transition-all duration-200 transform hover:scale-110 active:scale-95"
                        >
                          <Edit2 size={18} className="text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-3 hover:bg-red-100 rounded-xl transition-all duration-200 transform hover:scale-110 active:scale-95"
                        >
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Master Data Tab */}
        {activeTab === "master" && (
          <div className="space-y-12">
            {/* Companies Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full"></div>
                  <h2 className="text-3xl font-bold text-slate-900">Companies</h2>
                </div>
                <button
                  onClick={handleAddCompany}
                  className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
                >
                  <Plus size={22} /> Add Company
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden hover:shadow-xl transition-all">
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-slate-200 shadow-sm">
                    <tr>
                      <th className="px-8 py-5 text-left font-bold text-slate-700 uppercase tracking-wider">Comp ID</th>
                      <th className="px-8 py-5 text-left font-bold text-slate-700 uppercase tracking-wider">Company Name</th>
                      <th className="px-8 py-5 text-left font-bold text-slate-700 uppercase tracking-wider">Status</th>
                      <th className="px-8 py-5 text-left font-bold text-slate-700 uppercase tracking-wider">Petition No</th>
                      <th className="px-8 py-5 text-left font-bold text-slate-700 uppercase tracking-wider">Winding Up Date</th>
                      <th className="px-8 py-5 text-center font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map((company, idx) => (
                      <tr key={company.comp_id} className={`border-b border-slate-100 transition-all duration-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:shadow-md`}>
                        <td className="px-8 py-5 text-slate-900 font-bold text-lg">{company.comp_id}</td>
                        <td className="px-8 py-5 text-slate-900 font-semibold">{company.name}</td>
                        <td className="px-8 py-5">
                          <span className={`px-4 py-2 rounded-full text-xs font-bold shadow-sm ${
                            company.status === "Active" 
                              ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700" 
                              : "bg-gradient-to-r from-red-100 to-pink-100 text-red-700"
                          }`}>
                            {company.status}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-slate-600 font-medium">{company.petitionNo}</td>
                        <td className="px-8 py-5 text-slate-600">{company.windingUpDate || "-"}</td>
                        <td className="px-8 py-5 flex justify-center gap-3">
                          <button
                            onClick={() => {
                              setEditingCompany(company);
                              setCompanyForm({ 
                                name: company.name, 
                                status: company.status, 
                                windingUpDate: company.windingUpDate || "",
                                petitionNo: company.petitionNo || ""
                              });
                              setShowCompanyModal(true);
                            }}
                            className="p-3 hover:bg-blue-100 rounded-xl transition-all duration-200 transform hover:scale-110 active:scale-95"
                          >
                            <Edit2 size={18} className="text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteCompany(company.comp_id)}
                            className="p-3 hover:bg-red-100 rounded-xl transition-all duration-200 transform hover:scale-110 active:scale-95"
                          >
                            <Trash2 size={18} className="text-red-600" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sections Section */}
            <div className="space-y-6 border-t border-slate-200 pt-12">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-amber-600 to-orange-600 rounded-full"></div>
                  <h2 className="text-3xl font-bold text-slate-900">Sections</h2>
                </div>
                <button
                  onClick={handleAddSection}
                  className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
                >
                  <Plus size={22} /> Add Section
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden hover:shadow-xl transition-all">
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-amber-50 to-orange-50 border-b-2 border-slate-200 shadow-sm">
                    <tr>
                      <th className="px-8 py-5 text-left font-bold text-slate-700 uppercase tracking-wider">Section ID</th>
                      <th className="px-8 py-5 text-left font-bold text-slate-700 uppercase tracking-wider">Name</th>
                      <th className="px-8 py-5 text-left font-bold text-slate-700 uppercase tracking-wider">Description</th>
                      <th className="px-8 py-5 text-center font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sections.map((section, idx) => (
                      <tr key={section.id} className={`border-b border-slate-100 transition-all duration-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:shadow-md`}>
                        <td className="px-8 py-5 text-slate-900 font-bold">{section.id}</td>
                        <td className="px-8 py-5 text-slate-900 font-semibold">{section.name}</td>
                        <td className="px-8 py-5 text-slate-600">{section.description}</td>
                        <td className="px-8 py-5 flex justify-center gap-3">
                          <button
                            onClick={() => {
                              setEditingSection(section);
                              setSectionForm({ name: section.name, description: section.description || "" });
                              setShowSectionModal(true);
                            }}
                            className="p-3 hover:bg-blue-100 rounded-xl transition-all duration-200 transform hover:scale-110 active:scale-95"
                          >
                            <Edit2 size={18} className="text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteSection(section.id)}
                            className="p-3 hover:bg-red-100 rounded-xl transition-all duration-200 transform hover:scale-110 active:scale-95"
                          >
                            <Trash2 size={18} className="text-red-600" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Office Structure Tab */}
        {activeTab === "office" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-teal-600 to-cyan-600 rounded-full"></div>
                <h2 className="text-3xl font-bold text-slate-900">Branch Officers</h2>
              </div>
              <button
                onClick={handleAddOfficer}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
              >
                <Plus size={22} /> Add Branch Officer
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden hover:shadow-xl transition-all">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-teal-50 to-cyan-50 border-b-2 border-slate-200 shadow-sm">
                  <tr>
                    <th className="px-8 py-5 text-left font-bold text-slate-700 uppercase tracking-wider">Name</th>
                    <th className="px-8 py-5 text-left font-bold text-slate-700 uppercase tracking-wider">Email</th>
                    <th className="px-8 py-5 text-left font-bold text-slate-700 uppercase tracking-wider">Assigned Sections</th>
                    <th className="px-8 py-5 text-center font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {branchOfficers.map((officer, idx) => (
                    <tr key={officer.id} className={`border-b border-slate-100 transition-all duration-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 hover:shadow-md`}>
                      <td className="px-8 py-5 text-slate-900 font-semibold">{officer.name}</td>
                      <td className="px-8 py-5 text-slate-600">{officer.email}</td>
                      <td className="px-8 py-5">
                        <div className="flex flex-wrap gap-2">
                          {officer.sections.map(sectionId => {
                            const section = sections.find(s => s.id === sectionId);
                            return (
                              <span key={sectionId} className="px-3 py-2 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 rounded-lg text-xs font-bold shadow-sm">
                                {section?.name}
                              </span>
                            );
                          })}
                        </div>
                      </td>
                      <td className="px-8 py-5 flex justify-center gap-3">
                        <button
                          onClick={() => {
                            setEditingOfficer(officer);
                            setOfficerForm({ name: officer.name, email: officer.email, sections: officer.sections });
                            setShowOfficerModal(true);
                          }}
                          className="p-3 hover:bg-blue-100 rounded-xl transition-all duration-200 transform hover:scale-110 active:scale-95"
                        >
                          <Edit2 size={18} className="text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteOfficer(officer.id)}
                          className="p-3 hover:bg-red-100 rounded-xl transition-all duration-200 transform hover:scale-110 active:scale-95"
                        >
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-slate-900">
                {editingUser ? "Edit User" : "Add New User"}
              </h2>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  className="w-full px-5 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all"
                >
                  <option value="AccountsAdmin">Accounts Admin</option>
                  <option value="TD_Admin">T&D Admin</option>
                  <option value="DispatchClerk">Dispatch Clerk</option>
                  <option value="SuperAdmin">Super Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Temporary Password *</label>
                <input
                  type="text"
                  value={formData.temporaryPassword}
                  onChange={(e) => setFormData({ ...formData, temporaryPassword: e.target.value })}
                  className="w-full px-5 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all"
                  placeholder="Enter temporary password"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-10">
              <button
                onClick={() => setShowUserModal(false)}
                className="flex-1 px-5 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUser}
                className="flex-1 px-5 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section Modal */}
      {showSectionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-amber-600 to-orange-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-slate-900">
                {editingSection ? "Edit Section" : "Add Section"}
              </h2>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Section Name</label>
                <input
                  type="text"
                  value={sectionForm.name}
                  onChange={(e) => setSectionForm({ ...sectionForm, name: e.target.value })}
                  className="w-full px-5 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all"
                  placeholder="Enter section name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Description</label>
                <input
                  type="text"
                  value={sectionForm.description}
                  onChange={(e) => setSectionForm({ ...sectionForm, description: e.target.value })}
                  className="w-full px-5 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all"
                  placeholder="Enter description"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-10">
              <button
                onClick={() => setShowSectionModal(false)}
                className="flex-1 px-5 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSection}
                className="flex-1 px-5 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Officer Modal */}
      {showOfficerModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 border border-slate-100 max-h-96 overflow-y-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-teal-600 to-cyan-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-slate-900">
                {editingOfficer ? "Edit Branch Officer" : "Add Branch Officer"}
              </h2>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Name</label>
                <input
                  type="text"
                  value={officerForm.name}
                  onChange={(e) => setOfficerForm({ ...officerForm, name: e.target.value })}
                  className="w-full px-5 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition-all"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Email</label>
                <input
                  type="email"
                  value={officerForm.email}
                  onChange={(e) => setOfficerForm({ ...officerForm, email: e.target.value })}
                  className="w-full px-5 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition-all"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Assign Sections</label>
                <div className="space-y-2 max-h-40 overflow-y-auto bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {sections.map(section => (
                    <label key={section.id} className="flex items-center gap-3 p-2 hover:bg-white rounded-lg cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={officerForm.sections.includes(section.id)}
                        onChange={() => toggleSectionSelection(section.id)}
                        className="w-5 h-5 rounded border-slate-300 accent-teal-600"
                      />
                      <span className="text-sm font-medium text-slate-700">{section.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-10">
              <button
                onClick={() => setShowOfficerModal(false)}
                className="flex-1 px-5 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveOfficer}
                className="flex-1 px-5 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Company Modal */}
      {showCompanyModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-slate-900">
                {editingCompany ? "Edit Company" : "Add New Company"}
              </h2>
            </div>
            <div className="space-y-5">
              {editingCompany && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">Comp ID</label>
                  <input
                    type="text"
                    value={editingCompany.comp_id}
                    disabled
                    className="w-full px-5 py-3 border-2 border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-semibold"
                  />
                  <p className="text-xs text-slate-500 mt-2">Auto-generated (cannot be changed)</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Company Name</label>
                <input
                  type="text"
                  value={companyForm.name}
                  onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                  className="w-full px-5 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all"
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Status</label>
                <select
                  value={companyForm.status}
                  onChange={(e) => setCompanyForm({ ...companyForm, status: e.target.value as any })}
                  className="w-full px-5 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all"
                >
                  <option value="Active">Active</option>
                  <option value="Dissolved">Dissolved</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Petition No</label>
                <input
                  type="text"
                  value={companyForm.petitionNo}
                  onChange={(e) => setCompanyForm({ ...companyForm, petitionNo: e.target.value })}
                  className="w-full px-5 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all"
                  placeholder="e.g., CP-2024/001"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Winding Up Date</label>
                <input
                  type="date"
                  value={companyForm.windingUpDate}
                  onChange={(e) => setCompanyForm({ ...companyForm, windingUpDate: e.target.value })}
                  className="w-full px-5 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-10">
              <button
                onClick={() => setShowCompanyModal(false)}
                className="flex-1 px-5 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCompany}
                className="flex-1 px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsersPage;
