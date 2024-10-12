import React, { useContext } from 'react'
import { UserContext } from '../Components/UserContext'
import { Navigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AccountPage() {
    const {ready,user} = useContext(UserContext);
    if(!ready){
        return "Loading......"
    }

    if(!user && ready){
        <Navigate to = {'/login'}/>
    }

   const {subpage} = useParams();
   
   function linkClasses(type = null){
       let classes = 'py-2 px-4';
       if(type === subpage || subpage === undefined && type === 'profile'){
        classes += ' bg-primary text-white rounded-full';
       }
     return classes;
   }
   // ' bg-primary text-white rounded-full'

  return (
    <div>
        <nav className='mt-8 flex justify-center gap-2'>
            <Link className = {linkClasses('profile')} to={'/account'}>My Profile</Link>
            <Link className = {linkClasses('bookings')} to={'/account/bookings'}>My Bookings</Link>
            <Link className = {linkClasses('accommodations')} to={'/account/accommodations'}>My Accommodations</Link>
        </nav>
    </div>
  )
}

export default AccountPage