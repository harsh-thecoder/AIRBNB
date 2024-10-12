import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user,setUser] = useState(null);
    const [ready,setReady] = useState(false);
    useEffect(() => {
       if(!user) {
          axios.get('/profile').then(({data}) => {
            setUser(data);
            setReady(true);
          });
       }
    },[]);
  return (
    // if user is not getting identified then we can use ready in that case
    <UserContext.Provider value={{user,ready,setUser}}> 
        {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider