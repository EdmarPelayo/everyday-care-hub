import { createContext, useContext, useEffect, useState } from "react";
import { users } from "../data/users";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("everyday_user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  function login(username, password) {
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Invalid username or password."
      };
    }

    const safeUser = {
      id: foundUser.id,
      name: foundUser.name,
      username: foundUser.username,
      role: foundUser.role
    };

    setUser(safeUser);
    localStorage.setItem("everyday_user", JSON.stringify(safeUser));

    return {
      success: true,
      user: safeUser
    };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("everyday_user");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
