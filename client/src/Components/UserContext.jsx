import React, { createContext } from 'react'
export const UserContext = createContext({});

export function UserContextProvider({children}) {
  return (
    {children}
  );
}

export default UserContextProvider