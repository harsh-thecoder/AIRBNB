import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import AccountNavigation from '../Components/AccountNavigation';
import axios from 'axios'

function AccomodationPage() {
  const [places,setPlaces] = useState([]);
  useEffect(() => {
     axios.get('/accommodations').then(({data}) => {
      setPlaces(data);
     })
  },[])
  return (
    <div>
      <AccountNavigation/>
        <div className='text-center mt-6'>
          <Link className=' inline-flex bg-primary text-white py-2 px-4 rounded-full gap-1' to={'/account/accommodations/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add new Place
          </Link>
        </div>
        <div>
          {places.length > 0 && places.map(place => (
            <div>
              {places.title}
            </div>
          ))}
        </div>
    </div>
  )
}

export default AccomodationPage