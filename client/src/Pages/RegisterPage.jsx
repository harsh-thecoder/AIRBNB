import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function RegisterPage() {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function register_user(ev) {
        ev.preventDefault();
        axios.post("/register", {
            name,
            contact,
            email,
            password,
        });
        alert('Registration Successfull');
    }

    return (
        <div className='grow flex items-center justify-around'>
            <div className='mb-32'>
                <h1 className='text-4xl text-center mb-4'> Register </h1>
                <form className='max-w-md mx-auto border mt-4' onSubmit={register_user}>
                    <input type="text"
                        placeholder='Enter Your Name'
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    <input type="text"
                        placeholder='Enter Your Contact Number'
                        value={contact}
                        onChange={e => setContact(e.target.value)} />
                    <input type="email"
                        placeholder='Enter your Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <input type="password"
                        placeholder='Enter your Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <button className='primary'>Register</button>
                    <div className='flex justify-center gap-2 py-2'>
                        Already have an account
                        <Link to={'/login'} className='text-blue-600 underline'>
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage