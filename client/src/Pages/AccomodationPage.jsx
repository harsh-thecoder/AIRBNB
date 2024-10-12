import React from 'react'
import { Link } from 'react-router-dom'

function AccomodationPage() {
  return (
    <div className='text-center mt-6'>
      <Link className=' inline-flex bg-primary text-white py-2 px-4 rounded-full gap-1' to={'/account/accommodation/new'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add new Place</Link>
    </div>
  )
}

export default AccomodationPage