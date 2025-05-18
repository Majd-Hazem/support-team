// src/contexts/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);

  const login = (type) => {
    setIsAuthenticated(true);
    setUserType(type);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserType(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userType,
        login,
        logout, // ✅ تأكد من وجود logout هنا
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook مخصص للوصول للسياق
export const useAuth = () => useContext(AuthContext);
