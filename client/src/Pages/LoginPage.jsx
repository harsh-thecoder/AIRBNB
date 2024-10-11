import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../Components/UserContext';

function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect,setRediect] = useState(false);
  const {setUser} = useContext(UserContext);

  async function user_login(e) {
    e.preventDefault();
    try{
      const userInfo = await axios.post('/login', {
        email,
        password,
      });
      setUser(userInfo);
      alert('Login Successfull');
      setRediect(true);
    }
    catch(e){
      alert('Login Failed');
    }
    
  }

  if(redirect){
    return <Navigate to = {"/"}/>
  }

  return (
    <div className='grow flex items-center justify-around'>
      <div className='mb-32'>
        <h1 className='text-4xl text-center mb-4'> Login </h1>
        <form className='max-w-md mx-auto border mt-4' onSubmit={user_login}>
          <input type="email"
            placeholder='Enter your Email'
            value={email}
            onChange={e => setEmail(e.target.value)} />
          <input type="password"
            placeholder='Enter your Password'
            value={password}
            onChange={e => setPassword(e.target.value)} />
          <button className='primary'>Login</button>
          <div className='flex justify-center gap-2 py-2'>
            Don't have an Account
            <Link to={'/register'} className='text-blue-600 underline'>
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage