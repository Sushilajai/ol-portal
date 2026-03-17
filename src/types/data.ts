// Data types for the RBAC system

export interface Company {
  comp_id: string; // 4-digit company ID
  name: string;
  status: "Active" | "Dissolved";
  windingUpDate?: string;
  petitionNo?: string;
}

export interface BillingRecord {
  id: string;
  comp_id: string;
  companyName: string;
  billCategory: string;
  submissionDate: string;
  amount: number;
  description: string;
  status: "Unpaid" | "Paid";
  paymentDate?: string;
}

export interface TargetRecord {
  id: string;
  comp_id: string;
  companyName: string;
  reportFilingDate: string;
  dissolutionDate: string;
}

export interface DividendRecord {
  id: string;
  comp_id: string;
  companyName: string;
  reportFiledOn: string;
  dividendAmount: number;
  stakeholderCategory: string;
  orderDate: string;
  bankTransferDate: string;
}

export interface DispatchRecord {
  uid: string; // Format: Comp_id-Finyear-DocCategory-Section-DocID
  comp_id: string;
  recipientName: string;
  recipientAddress: string;
  documentCategory: string;
  deliveryNoteRequired: boolean;
  status: "Pending" | "Dispatched" | "Delivered";
  awbNumber?: string;
  dispatchDate?: string;
  deliveryDate?: string;
}

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "SuperAdmin" | "ExecutiveViewer" | "AccountsAdmin" | "TD_Admin" | "DispatchClerk";
  department: string;
}

export interface Section {
  id: string;
  name: string;
  description?: string;
}

export interface BranchOfficer {
  id: string;
  name: string;
  email: string;
  sections: string[]; // Array of section IDs
}

// UID Generator utility
export const generateUID = (comp_id: string, docCategory: string, section: string): string => {
  const currentYear = new Date().getFullYear();
  const finYear = `${currentYear.toString().slice(-2)}${(currentYear + 1).toString().slice(-2)}`;
  const docId = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  
  return `${comp_id}-${finYear}-${docCategory.padStart(2, '0')}-${section.padStart(2, '0')}-${docId}`;
};