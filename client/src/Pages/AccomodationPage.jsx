import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import AccountNavigation from '../Components/AccountNavigation';
import axios from 'axios'

function AccomodationPage() {
  const [places,setPlaces] = useState([]);
  useEffect(() => {
     axios.get('/user-accommodations').then(({data}) => {
      setPlaces(data);
     })
  },[])
  return (
    <div>
      <AccountNavigation/>
        <div className='text-center mt-6'>
          <Link className=' inline-flex bg-primary text-white py-2 px-4 rounded-full gap-1' to={'/account/accommodations/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add new Place
          </Link>
        </div>
        <div className='mt-4'>
          {places.length > 0 && places.map((place,index) => (
            <Link to = {'/account/accommodations/'+place._id} className='flex cursor-pointer gap-4 bg-gray-200 my-2 p-4 rounded-2xl'>
              <div className='w-32 h-32 flex bg-gray-500'>
                   {place.photos.length > 0 && (
                    <img className='object-cover' src ={'http://localhost:4000/uploads/' + place.photos[0]} alt="" />
                   )}
              </div>
              <div className=''>
                  <h2 className='text-xl'>{place.title}</h2>
                  <p className='text-sm mt-2'>{place.description}</p>
              </div>
            </Link>
          ))}
        </div>
    </div>
  )
}

export default AccomodationPage