import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Perks from '../Components/Perks';
import CheckinCheckout from '../Components/CheckinCheckout';

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
  
  function inputHeader(text){
    return (<h2 className='mt-4 text-2xl'>{text}</h2>);
  }

  function inputDescription(text){
    return (<p className='text-sm'>{text}</p>);
  }

  function getInput(header,description){
    return(
      <div>
         {inputHeader(header)}
         {inputDescription(description)}
      </div>
    )
  }

  function addPhotoylink(){

  }

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
            {getInput('Title','Give an short,catchy and attractive title for your Place')}
            <input type="text" value={title} onChange={e=> setTitle(e.target.value)} placeholder='title, Ex : My most comfort place' />

            {getInput('Address','Please provide complete place of your location')}
            <input type="text" value={address} onChange={e=> setAddress(e.target.value)} placeholder='Address' />

            {getInput('Photos','Upload attractive photos to attract the worldwide tourists')}
            <div className='flex gap-2'>
              <input type="text" value={photlink} onChange={e => setPhotolink(e.target.value)}
               placeholder='Add Image using a Link ... jpg' />
              <button className='bg-gray-300 p-4 rounded-2xl'>Add&nbsp;Photo</button>
            </div>
            <div className='mt-3 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 text-2xl p-6 text-gray-600'>
              <button className='flex justify-center border bg-transparent rounded-2xl p-6'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                </svg>Upload&nbsp;here</button>
            </div>

            {getInput('Description','Give a brief description about your Place')}
            <textarea value={description} onChange={e=> setDescription(e.target.value)} placeholder='Type here...' />

            {getInput('Perks','Select your Perks')}
            <Perks selected={perks} onChange={setPerks}/>

            <h2 className='mt-6 text-2xl'>Extra Info</h2>
            <p className='text-sm'>Rules and Regulations to be followed</p>
            <textarea value={extrainfo} onChange={e=> setExtrainfo(e.target.value)} placeholder='Type here...' />

            {getInput('Check in & out times','Make sure to have some time for cleaning of Apartment before giving key to new customers')}
            <CheckinCheckout {...{checkin, checkout, setCheckin, setCheckout,maxguest,setMaxguest}}/>

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