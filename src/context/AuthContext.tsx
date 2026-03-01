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

  let role: Role | null = null;

  if (email === "admin@senseware.net" && password === "admin123") {
    role = "admin";
  } else if (
    email === "vinodvalmiki@mca.gov.in" &&
    password === "vinod@1234"
  ) {
    role = "officer";
  }

  if (!role) {
    return "Invalid email or password";
  }

  const loggedUser: User = { email, role };

  setUser(loggedUser);
  localStorage.setItem("user", JSON.stringify(loggedUser));

  navigate(
    role === "admin"
      ? "/admin/dashboard"
      : "/officer/dashboard"
  );

  return null;
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");   // redirect to login page
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