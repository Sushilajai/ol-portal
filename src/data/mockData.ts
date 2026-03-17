import type { Company, BillingRecord, TargetRecord, DividendRecord, DispatchRecord, UserRecord } from '../types/data';

// Mock Companies - 50 Indian Companies with 4-digit comp_id
export const mockCompanies: Company[] = [
  { comp_id: "0001", name: "Tata Steel Limited", status: "Active", windingUpDate: "2024-01-15", petitionNo: "CP-2024/001" },
  { comp_id: "0002", name: "Reliance Industries", status: "Active", windingUpDate: "2023-12-20", petitionNo: "CP-2023/045" },
  { comp_id: "0003", name: "HDFC Bank Limited", status: "Active", windingUpDate: "2024-02-10", petitionNo: "CP-2024/012" },
  { comp_id: "0004", name: "Infosys Limited", status: "Active", windingUpDate: "2024-03-05", petitionNo: "CP-2024/023" },
  { comp_id: "0005", name: "TCS (Tata Consultancy Services)", status: "Active", windingUpDate: "2023-11-30", petitionNo: "CP-2023/089" },
  { comp_id: "0006", name: "Wipro Limited", status: "Active", windingUpDate: "2024-01-20", petitionNo: "CP-2024/002" },
  { comp_id: "0007", name: "HCL Technologies", status: "Active", windingUpDate: "2024-02-15", petitionNo: "CP-2024/013" },
  { comp_id: "0008", name: "Tech Mahindra Limited", status: "Dissolved", windingUpDate: "2023-10-30", petitionNo: "CP-2023/078" },
  { comp_id: "0009", name: "Bajaj Auto Limited", status: "Active", windingUpDate: "2024-03-10", petitionNo: "CP-2024/024" },
  { comp_id: "0010", name: "Maruti Suzuki India", status: "Active", windingUpDate: "2024-01-25", petitionNo: "CP-2024/003" },
  { comp_id: "0011", name: "Hero MotoCorp Limited", status: "Active", windingUpDate: "2024-02-20", petitionNo: "CP-2024/014" },
  { comp_id: "0012", name: "Mahindra & Mahindra", status: "Active", windingUpDate: "2024-03-15", petitionNo: "CP-2024/025" },
  { comp_id: "0013", name: "Alpha Industries Ltd", status: "Active", windingUpDate: "2024-01-15", petitionNo: "CP-2024/001" },
  { comp_id: "0014", name: "Bharti Airtel Limited", status: "Active", windingUpDate: "2024-02-25", petitionNo: "CP-2024/015" },
  { comp_id: "0015", name: "Vodafone Idea Limited", status: "Dissolved", windingUpDate: "2023-09-30", petitionNo: "CP-2023/067" },
  { comp_id: "0016", name: "Jio Platforms Limited", status: "Active", windingUpDate: "2024-03-20", petitionNo: "CP-2024/026" },
  { comp_id: "0017", name: "ICICI Bank Limited", status: "Active", windingUpDate: "2024-01-30", petitionNo: "CP-2024/004" },
  { comp_id: "0018", name: "Axis Bank Limited", status: "Active", windingUpDate: "2024-02-28", petitionNo: "CP-2024/016" },
  { comp_id: "0019", name: "IDBI Bank Limited", status: "Active", windingUpDate: "2024-03-25", petitionNo: "CP-2024/027" },
  { comp_id: "0020", name: "State Bank of India", status: "Active", windingUpDate: "2024-02-05", petitionNo: "CP-2024/017" },
  { comp_id: "0021", name: "Punjab National Bank", status: "Active", windingUpDate: "2024-01-10", petitionNo: "CP-2024/005" },
  { comp_id: "0022", name: "Bank of Baroda", status: "Active", windingUpDate: "2024-03-01", petitionNo: "CP-2024/028" },
  { comp_id: "0023", name: "Canara Bank Limited", status: "Active", windingUpDate: "2024-02-10", petitionNo: "CP-2024/018" },
  { comp_id: "0024", name: "Union Bank of India", status: "Active", windingUpDate: "2024-01-05", petitionNo: "CP-2024/006" },
  { comp_id: "0025", name: "Indian Oil Corporation", status: "Active", windingUpDate: "2024-03-05", petitionNo: "CP-2024/029" },
  { comp_id: "0026", name: "Bharat Petroleum Corporation", status: "Active", windingUpDate: "2024-02-15", petitionNo: "CP-2024/019" },
  { comp_id: "0027", name: "Hindustan Petroleum Corporation", status: "Active", windingUpDate: "2024-01-20", petitionNo: "CP-2024/007" },
  { comp_id: "0028", name: "Power Grid Corporation", status: "Active", windingUpDate: "2024-03-10", petitionNo: "CP-2024/030" },
  { comp_id: "0029", name: "NTPC Limited", status: "Active", windingUpDate: "2024-02-20", petitionNo: "CP-2024/020" },
  { comp_id: "0030", name: "Coal India Limited", status: "Active", windingUpDate: "2024-01-25", petitionNo: "CP-2024/008" },
  { comp_id: "0031", name: "Gail India Limited", status: "Active", windingUpDate: "2024-03-15", petitionNo: "CP-2024/031" },
  { comp_id: "0032", name: "Hindustan Unilever Limited", status: "Active", windingUpDate: "2024-02-25", petitionNo: "CP-2024/021" },
  { comp_id: "0033", name: "ITC Limited", status: "Active", windingUpDate: "2024-01-30", petitionNo: "CP-2024/009" },
  { comp_id: "0034", name: "Nestlé India Limited", status: "Active", windingUpDate: "2024-03-20", petitionNo: "CP-2024/032" },
  { comp_id: "0035", name: "Britannia Industries", status: "Active", windingUpDate: "2024-02-28", petitionNo: "CP-2024/022" },
  { comp_id: "0036", name: "Colgate-Palmolive India", status: "Active", windingUpDate: "2024-01-15", petitionNo: "CP-2024/010" },
  { comp_id: "0037", name: "Procter & Gamble India", status: "Active", windingUpDate: "2024-03-25", petitionNo: "CP-2024/033" },
  { comp_id: "0038", name: "Godrej Industries Limited", status: "Active", windingUpDate: "2024-02-05", petitionNo: "CP-2024/023" },
  { comp_id: "0039", name: "Asian Paints Limited", status: "Active", windingUpDate: "2024-01-10", petitionNo: "CP-2024/011" },
  { comp_id: "0040", name: "Berger Paints India", status: "Active", windingUpDate: "2024-03-01", petitionNo: "CP-2024/034" },
  { comp_id: "0041", name: "Cement Corporation of India", status: "Dissolved", windingUpDate: "2023-08-30", petitionNo: "CP-2023/056" },
  { comp_id: "0042", name: "Ultratech Cement Limited", status: "Active", windingUpDate: "2024-02-10", petitionNo: "CP-2024/024" },
  { comp_id: "0043", name: "Ambuja Cements Limited", status: "Active", windingUpDate: "2024-01-05", petitionNo: "CP-2024/012" },
  { comp_id: "0044", name: "Shree Cement Limited", status: "Active", windingUpDate: "2024-03-05", petitionNo: "CP-2024/035" },
  { comp_id: "0045", name: "Dalmia Bharat Limited", status: "Active", windingUpDate: "2024-02-15", petitionNo: "CP-2024/025" },
  { comp_id: "0046", name: "JSW Steel Limited", status: "Active", windingUpDate: "2024-01-20", petitionNo: "CP-2024/013" },
  { comp_id: "0047", name: "Hindalco Industries", status: "Active", windingUpDate: "2024-03-10", petitionNo: "CP-2024/036" },
  { comp_id: "0048", name: "Vedanta Limited", status: "Active", windingUpDate: "2024-02-20", petitionNo: "CP-2024/026" },
  { comp_id: "0049", name: "Jindal Steel & Power", status: "Active", windingUpDate: "2024-01-25", petitionNo: "CP-2024/014" },
  { comp_id: "0050", name: "Sail (Steel Authority of India)", status: "Active", windingUpDate: "2024-03-15", petitionNo: "CP-2024/037" },
];

// Mock Billing Records
export const mockBillingRecords: BillingRecord[] = [
  {
    id: "B001",
    comp_id: "0001",
    companyName: "Alpha Industries Ltd",
    billCategory: "Filing Fees",
    submissionDate: "2024-03-01",
    amount: 15000,
    description: "Annual filing fees for liquidation proceedings",
    status: "Unpaid"
  },
  {
    id: "B002",
    comp_id: "0002",
    companyName: "Beta Corporation",
    billCategory: "Legal Fees",
    submissionDate: "2024-02-15",
    amount: 25000,
    description: "Legal consultation and documentation",
    status: "Paid",
    paymentDate: "2024-02-20"
  },
  {
    id: "B003",
    comp_id: "0003",
    companyName: "Gamma Enterprises",
    billCategory: "Administrative Fees",
    submissionDate: "2024-03-10",
    amount: 8000,
    description: "Administrative processing charges",
    status: "Unpaid"
  },
];

// Mock Target Records
export const mockTargetRecords: TargetRecord[] = [
  {
    id: "T001",
    comp_id: "0001",
    companyName: "Alpha Industries Ltd",
    reportFilingDate: "2024-03-15",
    dissolutionDate: "2024-06-15"
  },
  {
    id: "T002",
    comp_id: "0003",
    companyName: "Gamma Enterprises",
    reportFilingDate: "2024-03-20",
    dissolutionDate: "2024-07-20"
  },
];

// Mock Dividend Records
export const mockDividendRecords: DividendRecord[] = [
  {
    id: "D001",
    comp_id: "0002",
    companyName: "Beta Corporation",
    reportFiledOn: "2024-01-10",
    dividendAmount: 150000,
    stakeholderCategory: "Shareholders",
    orderDate: "2024-01-15",
    bankTransferDate: "2024-01-20"
  },
  {
    id: "D002",
    comp_id: "0005",
    companyName: "Epsilon Technologies",
    reportFiledOn: "2024-02-05",
    dividendAmount: 75000,
    stakeholderCategory: "Creditors",
    orderDate: "2024-02-10",
    bankTransferDate: "2024-02-15"
  },
];

// Mock Dispatch Records
export const mockDispatchRecords: DispatchRecord[] = [
  {
    uid: "0001-2425-01-02-1234",
    comp_id: "0001",
    recipientName: "Mr. Rajesh Kumar",
    recipientAddress: "123 Business Park, Andheri East, Mumbai - 400069",
    documentCategory: "Notice",
    deliveryNoteRequired: true,
    status: "Pending"
  },
  {
    uid: "0002-2425-02-01-5678",
    comp_id: "0002",
    recipientName: "Ms. Priya Sharma",
    recipientAddress: "456 Corporate Tower, Bandra West, Mumbai - 400050",
    documentCategory: "Order",
    deliveryNoteRequired: false,
    status: "Dispatched",
    awbNumber: "AWB123456789",
    dispatchDate: "2024-03-10"
  },
  {
    uid: "0003-2425-01-03-9012",
    comp_id: "0003",
    recipientName: "Dr. Amit Patel",
    recipientAddress: "789 Industrial Estate, Powai, Mumbai - 400076",
    documentCategory: "Report",
    deliveryNoteRequired: true,
    status: "Pending"
  },
  {
    uid: "0001-2425-03-04-3456",
    comp_id: "0001",
    recipientName: "Mr. Vikram Singh",
    recipientAddress: "321 Tech Park, Whitefield, Bangalore - 560066",
    documentCategory: "Notice",
    deliveryNoteRequired: true,
    status: "Dispatched",
    awbNumber: "AWB987654321",
    dispatchDate: "2024-03-08"
  },
];

// Mock Users
export const mockUsers: UserRecord[] = [
  {
    id: "U001",
    name: "Super Administrator",
    email: "superadmin@ol.gov.in",
    role: "SuperAdmin",
    department: "Administration"
  },
  {
    id: "U002",
    name: "Executive Viewer",
    email: "executive@ol.gov.in",
    role: "ExecutiveViewer",
    department: "Executive"
  },
  {
    id: "U003",
    name: "Accounts Manager",
    email: "accounts@ol.gov.in",
    role: "AccountsAdmin",
    department: "Accounts"
  },
  {
    id: "U004",
    name: "Senior Accounts Officer",
    email: "accounts2@ol.gov.in",
    role: "AccountsAdmin",
    department: "Accounts"
  },
  {
    id: "U005",
    name: "T&D Administrator",
    email: "td@ol.gov.in",
    role: "TD_Admin",
    department: "Target & Dividend"
  },
  {
    id: "U006",
    name: "Dispatch Clerk",
    email: "dispatch@ol.gov.in",
    role: "DispatchClerk",
    department: "Dispatch"
  },
];

// Bill Categories
export const billCategories = [
  "Filing Fees",
  "Legal Fees",
  "Administrative Fees",
  "Court Fees",
  "Documentation Charges",
  "Processing Fees"
];

// Stakeholder Categories
export const stakeholderCategories = [
  "Shareholders",
  "Creditors",
  "Debenture Holders",
  "Preference Shareholders",
  "Secured Creditors",
  "Unsecured Creditors"
];

// Mock Sections
export const mockSections = [
  { id: "S001", name: "Mumbai Section", description: "Western Region" },
  { id: "S002", name: "Delhi Section", description: "Northern Region" },
  { id: "S003", name: "Bangalore Section", description: "Southern Region" },
  { id: "S004", name: "Kolkata Section", description: "Eastern Region" },
  { id: "S005", name: "Ahmedabad Section", description: "Western Region" },
];

// Mock Branch Officers
export const mockBranchOfficers = [
  { id: "BO001", name: "Rajesh Kumar", email: "rajesh.kumar@ol.gov.in", sections: ["S001"] },
  { id: "BO002", name: "Priya Sharma", email: "priya.sharma@ol.gov.in", sections: ["S002", "S005"] },
  { id: "BO003", name: "Amit Patel", email: "amit.patel@ol.gov.in", sections: ["S003"] },
  { id: "BO004", name: "Neha Singh", email: "neha.singh@ol.gov.in", sections: ["S004"] },
];

// Document Categories
export const documentCategories = [
  "Notice",
  "Order",
  "Report",
  "Petition",
  "Affidavit",
  "Certificate",
  "Dividend Warrant",
  "Other"
];