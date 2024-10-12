import React, { useContext } from 'react'
import { UserContext } from '../Components/UserContext'
import { Navigate } from 'react-router-dom';

function AccountPage() {
    const {ready,user} = useContext(UserContext);
    if(!ready){
        return "Loading......"
    }

    if(!user && !ready){
        <Navigate to = {'/login'}/>
    }

  return (
    <div>
        My user is {user.name}
    </div>
  )
}

export default AccountPage