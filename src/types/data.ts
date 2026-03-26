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
  uid: string; // Format: Year / Sequence No / Doc Category (e.g., 2526 / 0012 / 01)
  comp_id: string;
  companyName: string;
  recipientName: string;
  recipientAddress: string;
  documentCategory: string;
  deliveryNoteRequired: boolean;
  status: "Pending" | "In Transit" | "Delivered";
  awbNumber?: string;
  dispatchDate?: string;
  deliveryDate?: string;
}

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "SuperAdmin" | "ExecutiveViewer" | "OfficerViewer" | "AccountsAdmin" | "TD_Admin" | "DispatchClerk";
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

// Document Category to Code Mapping
export const documentCategoryMap: Record<string, string> = {
  "Sec 1": "01",
  "Sec 2": "02",
  "Sec 3": "03",
  "Sec 4": "04",
  "Sec 5": "05",
  "Amalgamation": "06",
  "Accounts": "07",
  "Admin": "08",
  "PA": "09",
  "Legal": "10"
};

export const documentCategories = Object.keys(documentCategoryMap);

// UID Generator utility - Format: Year / Sequence No / Doc Category
export const generateUID = (categoryName: string, sequenceNo: number): string => {
  const today = new Date();
  const month = today.getMonth() + 1; // 1-12
  const year = today.getFullYear();
  
  // Indian Financial Year: April to March
  // If current month is April or later, FY is current year to next year
  // If current month is before April, FY is previous year to current year
  const finYear = month >= 4 ? year : year - 1;
  const finYearCode = `${finYear.toString().slice(-2)}${(finYear + 1).toString().slice(-2)}`;
  
  const categoryCode = documentCategoryMap[categoryName] || "00";
  const seqNo = sequenceNo.toString().padStart(4, '0');
  
  return `${finYearCode} / ${seqNo} / ${categoryCode}`;
};