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
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email: string, password: string) => {
    let role: Role | null = null;

    // 🔥 Replace with real API later
    if (email === "admin@test.com") role = "admin";
    if (email === "officer@test.com") role = "officer";

    if (!role) {
      alert("Invalid credentials");
      return;
    }

    const loggedUser: User = { email, role };

    setUser(loggedUser);
    localStorage.setItem("user", JSON.stringify(loggedUser));

    navigate(role === "admin" ? "/admin/dashboard" : "/officer/dashboard");
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
  if (!context)
    throw new Error("useAuth must be used inside AuthProvider");
  return context;
};