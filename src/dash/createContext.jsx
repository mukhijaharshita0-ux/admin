import React, { createContext, useState } from "react";


export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    birthDate: "",
    phone: "",
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}
