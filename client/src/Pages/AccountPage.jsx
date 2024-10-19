import React, { useContext, useState } from 'react'
import { UserContext } from '../Components/UserContext'
import { Navigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AccomodationPage from './AccomodationPage';
import axios from 'axios';
import AccountNavigation from '../Components/AccountNavigation';

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

     if (redirect) {
        setUser(null);
        return <Navigate to={'/login'} />
    }

    return (
        <div>
            <AccountNavigation/>
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