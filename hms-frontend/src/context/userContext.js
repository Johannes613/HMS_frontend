// create user context
import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(""); // default user is admin
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
