export type Role = "SuperAdmin" | "ExecutiveViewer" | "OfficerViewer" | "AccountsAdmin" | "TD_Admin" | "DispatchClerk";

export interface User {
  email: string;
  role: Role;
  name: string;
}