import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("freshcart_user");
    const keepSignedIn = localStorage.getItem("freshcart_keepSignedIn") === "true";
    if (stored && keepSignedIn) {
      return JSON.parse(stored);
    }
    return null;
  });

  const login = (userData) => {
    const userObj = {
      firstName: userData.firstName || "John",
      lastName: userData.lastName || "Doe",
      email: userData.email || "",
      phone: userData.phone || "",
      dateOfBirth: userData.dateOfBirth || "",
      profilePicture: userData.profilePicture || null,
    };
    setUser(userObj);
    localStorage.setItem("freshcart_user", JSON.stringify(userObj));
    
    // Store keepSignedIn flag
    if (userData.keepSignedIn) {
      localStorage.setItem("freshcart_keepSignedIn", "true");
    } else {
      localStorage.removeItem("freshcart_keepSignedIn");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("freshcart_user");
    localStorage.removeItem("freshcart_keepSignedIn");
  };

  const updateUser = (updatedData) => {
    const updated = { ...user, ...updatedData };
    setUser(updated);
    localStorage.setItem("freshcart_user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}