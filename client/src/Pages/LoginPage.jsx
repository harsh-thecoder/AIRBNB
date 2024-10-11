import React from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <div className='grow flex items-center justify-around'>
        <div className='mb-32'>
          <h1 className='text-4xl text-center mb-4'> Login </h1>
          <form className='max-w-md mx-auto border mt-4'>
              <input type="email" placeholder='Enter your Email'/>
              <input type="password" placeholder='Enter your Password' />
              <button className='primary'>Login</button>
              <div className='flex justify-center gap-2 py-2'>
                  Don't have an Account 
                    <Link to = {'/register'} className='text-blue-600 underline'>
                      Register here
                    </Link>
              </div>
          </form>
        </div>
    </div>
  )
}

export default LoginPage