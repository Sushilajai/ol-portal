export type Role = "admin" | "officer";

export interface User {
  email: string;
  role: Role;
}