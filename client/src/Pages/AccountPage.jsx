import React, { useContext, useState } from 'react'
import { UserContext } from '../Components/UserContext'
import { Navigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AccomodationPage from './AccomodationPage';
import axios from 'axios';

function AccountPage() {
    const [redirect, setRedirect] = useState(null);
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logout() {
        setRedirect('/');
        await axios.post('/logout');
    }

    const { ready, user, setUser } = useContext(UserContext);
    if (!ready) {
        return "Loading......"
    }

    if (!user && ready && !redirect) {
        <Navigate to={'/login'} />
    }


    function linkClasses(type = null) {
        let classes = 'py-2 px-4 inline-flex gap-2 rounded-full';
        if (type === subpage || subpage === undefined && type === 'profile') {
            classes += ' bg-primary  text-white';
        }
        else
        {
            classes += ' bg-gray-200 ';
        }
        return classes;
    }

    if (redirect) {
        setUser(null);
        return <Navigate to={'/login'} />
    }

    return (
        <div>
            <nav className='mt-8 flex justify-center gap-2'>
                <Link className={linkClasses('profile')} to={'/account'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    My Profile</Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    My Bookings</Link>
                <Link className={linkClasses('accommodations')} to={'/account/accommodations'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                    </svg>
                    My Accommodations</Link>
            </nav>
            {subpage === 'profile' && (
                <div className='text-center max-w-lg mx-auto mt-8'>
                    Logged in as {user.name} ({user.email}) <br />
                    <button onClick={logout} className='primary max-w-sm mt-2'>Logout</button>
                </div>
            )}

            {subpage === 'accommodations' && (
                <AccomodationPage />
            )}
        </div>
    )
}

export default AccountPage