import { useContext, createContext, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  getUser: () => {},
  createUser: () => {},
  deleteUser: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function getUser() {
    return user;
  }

  function createUser(data) {
    setUser(data);
    setIsAuthenticated(true);
    localStorage.setItem("token", JSON.stringify({ data }));
  }

  function deleteUser() {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        getUser,
        createUser,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
