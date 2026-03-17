import { createContext, useContext, useState, type ReactNode } from "react";
import {
  mockCompanies,
  mockUsers,
  mockBillingRecords,
  mockTargetRecords,
  mockDividendRecords,
  mockDispatchRecords,
  mockSections,
  mockBranchOfficers,
} from "../data/mockData";
import {
  generateUID,
} from "../types/data";
import type {
  Company,
  UserRecord,
  BillingRecord,
  TargetRecord,
  DividendRecord,
  DispatchRecord,
  Section,
  BranchOfficer,
} from "../types/data";

interface UserProfile extends UserRecord {
  phoneNumber?: string;
  additionalDesignation?: string;
  profilePicture?: string;
}

interface GlobalState {
  companies: Company[];
  users: UserProfile[];
  billingRecords: BillingRecord[];
  targetRecords: TargetRecord[];
  dividendRecords: DividendRecord[];
  dispatchRecords: DispatchRecord[];
  sections: Section[];
  branchOfficers: BranchOfficer[];
}

interface GlobalContextType {
  state: GlobalState;
  // Company CRUD
  addCompany: (company: Omit<Company, "comp_id">) => void;
  updateCompany: (comp_id: string, updates: Partial<Company>) => void;
  deleteCompany: (comp_id: string) => void;
  // User CRUD
  addUser: (user: Omit<UserProfile, "id">) => void;
  updateUser: (id: string, updates: Partial<UserProfile>) => void;
  deleteUser: (id: string) => void;
  updateUserProfile: (id: string, profile: Partial<UserProfile>) => void;
  // Billing CRUD
  addBillingRecord: (record: Omit<BillingRecord, "id">) => void;
  updateBillingRecord: (id: string, updates: Partial<BillingRecord>) => void;
  deleteBillingRecord: (id: string) => void;
  // Target CRUD
  addTargetRecord: (record: Omit<TargetRecord, "id">) => void;
  updateTargetRecord: (id: string, updates: Partial<TargetRecord>) => void;
  deleteTargetRecord: (id: string) => void;
  // Dividend CRUD
  addDividendRecord: (record: Omit<DividendRecord, "id">) => void;
  updateDividendRecord: (id: string, updates: Partial<DividendRecord>) => void;
  deleteDividendRecord: (id: string) => void;
  // Dispatch CRUD
  addDispatchRecord: (record: Omit<DispatchRecord, "uid">) => void;
  updateDispatchRecord: (uid: string, updates: Partial<DispatchRecord>) => void;
  deleteDispatchRecord: (uid: string) => void;
  // Section CRUD
  addSection: (section: Omit<Section, "id">) => void;
  updateSection: (id: string, updates: Partial<Section>) => void;
  deleteSection: (id: string) => void;
  // Branch Officer CRUD
  addBranchOfficer: (officer: Omit<BranchOfficer, "id">) => void;
  updateBranchOfficer: (id: string, updates: Partial<BranchOfficer>) => void;
  deleteBranchOfficer: (id: string) => void;
  // Metrics
  getMetrics: () => {
    totalCompanies: number;
    activeCompanies: number;
    dissolvedCompanies: number;
    totalUnpaidBills: number;
    totalPaidBills: number;
    pendingDispatches: number;
    dispatchedItems: number;
    deliveredItems: number;
  };
}

const GlobalStateContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<GlobalState>({
    companies: mockCompanies,
    users: mockUsers as UserProfile[],
    billingRecords: mockBillingRecords,
    targetRecords: mockTargetRecords,
    dividendRecords: mockDividendRecords,
    dispatchRecords: mockDispatchRecords,
    sections: mockSections,
    branchOfficers: mockBranchOfficers,
  });

  // Company CRUD
  const addCompany = (company: Omit<Company, "comp_id">) => {
    const maxId = Math.max(...state.companies.map(c => parseInt(c.comp_id)), 0);
    const newCompId = String(maxId + 1).padStart(4, '0');
    setState(prev => ({
      ...prev,
      companies: [...prev.companies, { comp_id: newCompId, ...company }]
    }));
  };

  const updateCompany = (comp_id: string, updates: Partial<Company>) => {
    setState(prev => ({
      ...prev,
      companies: prev.companies.map(c => c.comp_id === comp_id ? { ...c, ...updates } : c)
    }));
  };

  const deleteCompany = (comp_id: string) => {
    setState(prev => ({
      ...prev,
      companies: prev.companies.filter(c => c.comp_id !== comp_id)
    }));
  };

  // User CRUD
  const addUser = (user: Omit<UserProfile, "id">) => {
    const maxId = Math.max(...state.users.map(u => parseInt(u.id.slice(1))), 0);
    const newId = `U${String(maxId + 1).padStart(3, '0')}`;
    setState(prev => ({
      ...prev,
      users: [...prev.users, { id: newId, ...user }]
    }));
  };

  const updateUser = (id: string, updates: Partial<UserProfile>) => {
    setState(prev => ({
      ...prev,
      users: prev.users.map(u => u.id === id ? { ...u, ...updates } : u)
    }));
  };

  const deleteUser = (id: string) => {
    setState(prev => ({
      ...prev,
      users: prev.users.filter(u => u.id !== id)
    }));
  };

  const updateUserProfile = (id: string, profile: Partial<UserProfile>) => {
    setState(prev => ({
      ...prev,
      users: prev.users.map(u => u.id === id ? { ...u, ...profile } : u)
    }));
  };

  // Billing CRUD
  const addBillingRecord = (record: Omit<BillingRecord, "id">) => {
    const maxId = Math.max(...state.billingRecords.map(b => parseInt(b.id.slice(1))), 0);
    const newId = `B${String(maxId + 1).padStart(3, '0')}`;
    setState(prev => ({
      ...prev,
      billingRecords: [...prev.billingRecords, { id: newId, ...record }]
    }));
  };

  const updateBillingRecord = (id: string, updates: Partial<BillingRecord>) => {
    setState(prev => ({
      ...prev,
      billingRecords: prev.billingRecords.map(b => b.id === id ? { ...b, ...updates } : b)
    }));
  };

  const deleteBillingRecord = (id: string) => {
    setState(prev => ({
      ...prev,
      billingRecords: prev.billingRecords.filter(b => b.id !== id)
    }));
  };

  // Target CRUD
  const addTargetRecord = (record: Omit<TargetRecord, "id">) => {
    const maxId = Math.max(...state.targetRecords.map(t => parseInt(t.id.slice(1))), 0);
    const newId = `T${String(maxId + 1).padStart(3, '0')}`;
    setState(prev => ({
      ...prev,
      targetRecords: [...prev.targetRecords, { id: newId, ...record }]
    }));
  };

  const updateTargetRecord = (id: string, updates: Partial<TargetRecord>) => {
    setState(prev => ({
      ...prev,
      targetRecords: prev.targetRecords.map(t => t.id === id ? { ...t, ...updates } : t)
    }));
  };

  const deleteTargetRecord = (id: string) => {
    setState(prev => ({
      ...prev,
      targetRecords: prev.targetRecords.filter(t => t.id !== id)
    }));
  };

  // Dividend CRUD
  const addDividendRecord = (record: Omit<DividendRecord, "id">) => {
    const maxId = Math.max(...state.dividendRecords.map(d => parseInt(d.id.slice(1))), 0);
    const newId = `D${String(maxId + 1).padStart(3, '0')}`;
    setState(prev => ({
      ...prev,
      dividendRecords: [...prev.dividendRecords, { id: newId, ...record }]
    }));
  };

  const updateDividendRecord = (id: string, updates: Partial<DividendRecord>) => {
    setState(prev => ({
      ...prev,
      dividendRecords: prev.dividendRecords.map(d => d.id === id ? { ...d, ...updates } : d)
    }));
  };

  const deleteDividendRecord = (id: string) => {
    setState(prev => ({
      ...prev,
      dividendRecords: prev.dividendRecords.filter(d => d.id !== id)
    }));
  };

  // Dispatch CRUD
  const addDispatchRecord = (record: Omit<DispatchRecord, "uid">) => {
    const uid = generateUID(record.comp_id, "01", "02");
    setState(prev => ({
      ...prev,
      dispatchRecords: [...prev.dispatchRecords, { uid, ...record }]
    }));
  };

  const updateDispatchRecord = (uid: string, updates: Partial<DispatchRecord>) => {
    setState(prev => ({
      ...prev,
      dispatchRecords: prev.dispatchRecords.map(d => d.uid === uid ? { ...d, ...updates } : d)
    }));
  };

  const deleteDispatchRecord = (uid: string) => {
    setState(prev => ({
      ...prev,
      dispatchRecords: prev.dispatchRecords.filter(d => d.uid !== uid)
    }));
  };

  // Section CRUD
  const addSection = (section: Omit<Section, "id">) => {
    const maxId = Math.max(...state.sections.map(s => parseInt(s.id.slice(1))), 0);
    const newId = `S${String(maxId + 1).padStart(3, '0')}`;
    setState(prev => ({
      ...prev,
      sections: [...prev.sections, { id: newId, ...section }]
    }));
  };

  const updateSection = (id: string, updates: Partial<Section>) => {
    setState(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === id ? { ...s, ...updates } : s)
    }));
  };

  const deleteSection = (id: string) => {
    setState(prev => ({
      ...prev,
      sections: prev.sections.filter(s => s.id !== id)
    }));
  };

  // Branch Officer CRUD
  const addBranchOfficer = (officer: Omit<BranchOfficer, "id">) => {
    const maxId = Math.max(...state.branchOfficers.map(o => parseInt(o.id.slice(2))), 0);
    const newId = `BO${String(maxId + 1).padStart(3, '0')}`;
    setState(prev => ({
      ...prev,
      branchOfficers: [...prev.branchOfficers, { id: newId, ...officer }]
    }));
  };

  const updateBranchOfficer = (id: string, updates: Partial<BranchOfficer>) => {
    setState(prev => ({
      ...prev,
      branchOfficers: prev.branchOfficers.map(o => o.id === id ? { ...o, ...updates } : o)
    }));
  };

  const deleteBranchOfficer = (id: string) => {
    setState(prev => ({
      ...prev,
      branchOfficers: prev.branchOfficers.filter(o => o.id !== id)
    }));
  };

  // Metrics
  const getMetrics = () => {
    return {
      totalCompanies: state.companies.length,
      activeCompanies: state.companies.filter(c => c.status === "Active").length,
      dissolvedCompanies: state.companies.filter(c => c.status === "Dissolved").length,
      totalUnpaidBills: state.billingRecords.filter(b => b.status === "Unpaid").reduce((sum, b) => sum + b.amount, 0),
      totalPaidBills: state.billingRecords.filter(b => b.status === "Paid").reduce((sum, b) => sum + b.amount, 0),
      pendingDispatches: state.dispatchRecords.filter(d => d.status === "Pending").length,
      dispatchedItems: state.dispatchRecords.filter(d => d.status === "Dispatched").length,
      deliveredItems: state.dispatchRecords.filter(d => d.status === "Delivered").length,
    };
  };

  return (
    <GlobalStateContext.Provider
      value={{
        state,
        addCompany,
        updateCompany,
        deleteCompany,
        addUser,
        updateUser,
        deleteUser,
        updateUserProfile,
        addBillingRecord,
        updateBillingRecord,
        deleteBillingRecord,
        addTargetRecord,
        updateTargetRecord,
        deleteTargetRecord,
        addDividendRecord,
        updateDividendRecord,
        deleteDividendRecord,
        addDispatchRecord,
        updateDispatchRecord,
        deleteDispatchRecord,
        addSection,
        updateSection,
        deleteSection,
        addBranchOfficer,
        updateBranchOfficer,
        deleteBranchOfficer,
        getMetrics,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used inside GlobalStateProvider");
  }
  return context;
};
