
import React, {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("role");
  });


  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });


  // Update React authentication states
  const setAuthData = (userData, userToken, role) => {
    setUser(userData);
    setToken(userToken);
    setUserRole(role);

    localStorage.setItem("role", role);
    localStorage.setItem("token", userToken);
    localStorage.setItem(
    "user",
    JSON.stringify(userData)
    );
  };

  const clearAuthData = () => {
    setUser(null);
    setToken(null);
    setUserRole(null);  

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
 }


  const isAuthenticated = token ? true : false;


  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        userRole,
        isAuthenticated,
        setAuthData,
        clearAuthData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};

