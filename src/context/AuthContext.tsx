import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { type User, type Role } from "../types/auth";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database with new roles
const mockUsers = [
  { email: "superadmin@ol.gov.in", password: "super123", role: "SuperAdmin" as Role, name: "Super Administrator" },
  { email: "executive@ol.gov.in", password: "exec123", role: "ExecutiveViewer" as Role, name: "Executive Viewer" },
  { email: "officer@ol.gov.in", password: "officer123", role: "OfficerViewer" as Role, name: "Officer Viewer" },
  { email: "accounts@ol.gov.in", password: "accounts123", role: "AccountsAdmin" as Role, name: "Accounts Manager" },
  { email: "td@ol.gov.in", password: "td123", role: "TD_Admin" as Role, name: "T&D Administrator" },
  { email: "dispatch@ol.gov.in", password: "dispatch123", role: "DispatchClerk" as Role, name: "Dispatch Clerk" },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email: string, password: string): string | null => {
    if (!email.trim() || !password.trim()) {
      return "Email and Password are required";
    }

    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (!foundUser) {
      return "Invalid email or password";
    }

    const loggedUser: User = { 
      email: foundUser.email, 
      role: foundUser.role, 
      name: foundUser.name 
    };

    setUser(loggedUser);
    localStorage.setItem("user", JSON.stringify(loggedUser));

    // Route to role-specific dashboard
    switch (foundUser.role) {
      case "SuperAdmin":
        navigate("/dashboard");
        break;
      case "ExecutiveViewer":
        navigate("/dashboard");
        break;
      case "OfficerViewer":
        navigate("/dashboard");
        break;
      case "AccountsAdmin":
        navigate("/billing");
        break;
      case "TD_Admin":
        navigate("/liquidation");
        break;
      case "DispatchClerk":
        navigate("/dispatch");
        break;
      default:
        navigate("/");
    }

    return null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};