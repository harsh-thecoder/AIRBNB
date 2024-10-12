import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function AccomodationPage() {
  
  const { action } = useParams();
  const [title,setTitle] = useState('');
  const [address,setAddress] = useState('');
  const [image,addImage] = useState([]);
  const [photlink,setPhotolink] = useState('');
  const [description,setDescription] = useState('');
  const [perks,setPerks] = useState([]);  
  const [extrainfo,setExtrainfo] = useState('');
  const [checkin,setCheckin] = useState('');
  const [checkout,setCheckout] = useState('');
  const [maxguest,setMaxguest] = useState(1);   
  
  return (
    <div>
      {action !== 'new' && (
        <div className='text-center mt-6'>
          <Link className=' inline-flex bg-primary text-white py-2 px-4 rounded-full gap-1' to={'/account/accommodations/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add new Place</Link>
        </div>
      )}

      {action === 'new' && (
        <div>
          <form>
            <h2 className='mt-4 text-2xl'>Title</h2>
            <p className='text-sm'>Give an short,catchy and attractive title for your Place</p>
            <input type="text" placeholder='title, Ex : My most comfort place' />

            <h2 className='mt-4 text-2xl'>Address</h2>
            <p className='text-sm'>Please provide complete place of your location</p>
            <input type="text" placeholder='address' />

            <h2 className='mt-4 text-2xl'>Photos</h2>
            <p className='text-sm'>Upload attractive photos to attract the worldwide tourists</p>
            <div className='flex gap-2'>
              <input type="text" placeholder='Add Image using a Link ... jpg' />
              <button className='bg-gray-300 p-4 rounded-2xl'>Add&nbsp;Photo</button>
            </div>
            <div className='mt-3 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 text-2xl p-6 text-gray-600'>
              <button className='flex justify-center border bg-transparent rounded-2xl p-6'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                </svg>Upload&nbsp;here</button>
            </div>

            <h2 className='mt-4 text-2xl'>Description</h2>
            <p className='text-sm'>Give a brief description about your Place</p>
            <textarea placeholder='Type here...' />

            <h2 className='mt-4 text-2xl'>Perks</h2>
            <p className='text-sm'>Select your Perks</p>
            <div className='grid grid-cols-2 md:grid-cols-4 lg: gird-cols-6 gap-2 mt-2'>
              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input type="checkbox" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                </svg>
                <span>Wifi</span>
              </label>
              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input type="checkbox" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
                <span>Free Parking</span>
              </label>
              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input type="checkbox" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
                <span>Furnitures</span>
              </label>
              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input type="checkbox" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                </svg>

                <span>Private Entrance</span>
              </label>
            </div>

            <h2 className='mt-6 text-2xl'>Extra Info</h2>
            <p className='text-sm'>Rules and Regulations to be followed</p>
            <textarea />

            <h2 className='mt-4 text-2xl'>Check in & out times</h2>
            <p className='text-sm'>Make sure to have some time for cleaning of Apartment before giving key to new customers</p>
            <div className='grid sm:grid-cols-3 gap-2'>
              <div>
                <h3 className='mt-2 -mb-1 border rounded-2xl p-2'>Check in Time</h3>
                <input type="text" placeholder='Ex: 16:00' />
              </div>
              <div>
                <h3 className='mt-2 -mb-1 border rounded-2xl p-2'>Check out Time</h3>
                <input type="text" placeholder='Ex: 18:00' />
              </div>
              <div>
                <h3 className='mt-2 -mb-1 border rounded-2xl p-2'>Maximum Guests</h3>
                <input type="text" placeholder='Ex: 4 to 5'/>
              </div>
            </div>

             <div className='flex justify-center'>
                 <button className='primary max-w-sm my-4'>Save</button>
             </div>

          </form>
        </div>
      )}
    </div>
  )
}

export default AccomodationPage