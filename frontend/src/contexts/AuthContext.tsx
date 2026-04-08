import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_CREDENTIALS = {
  email: "admin@opsportal.com",
  password: "admin123",
  user: { email: "admin@opsportal.com", name: "Admin User", role: "platform_user" },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Mock auth — accepts any non-empty credentials for demo, or use the preset ones
    await new Promise((r) => setTimeout(r, 600));
    if (email && password) {
      setUser(
        email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password
          ? MOCK_CREDENTIALS.user
          : { email, name: email.split("@")[0], role: "platform_user" }
      );
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
