// create user context
import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);
export const UserProvider = ({ children }) => {
<<<<<<< HEAD
  const [user, setUser] = useState(""); // default user is admin
=======

  const [user, setUser] = useState("doctor"); // default user is admin
>>>>>>> 091cbd5e14f920cdfe561941b4743d77b5e3c058
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole,setUserRole] = useState("patient");
  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoggedIn, setIsLoggedIn, userRole, setUserRole }}
    >
      {children}
    </UserContext.Provider>
  );
};
