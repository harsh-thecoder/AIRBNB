import React from 'react'
import { useState } from 'react';
import Perks from '../Components/Perks';
import CheckinCheckout from '../Components/CheckinCheckout';
import axios from 'axios'
import PhotosUploader from '../Components/PhotosUploader';
import AccountNavigation from '../Components/AccountNavigation';
import { Navigate } from 'react-router-dom';

function AccomodationForumPage() {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addimage, setAddImage] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extrainfo, setExtrainfo] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [maxguest, setMaxguest] = useState(1);
  const [redirect,setRedirect] = useState(false);

  function inputHeader(text) {
    return (<h2 className='mt-4 text-2xl'>{text}</h2>);
  }

  function inputDescription(text) {
    return (<p className='text-sm'>{text}</p>);
  }

  function getInput(header, description) {
    return (
      <div>
        {inputHeader(header)}
        {inputDescription(description)}
      </div>
    )
  }

   async function addNewPlace(ev) {
       ev.preventDefault(); 
       const placeData = {title,address,addimage,description,perks,extrainfo,checkin,checkout,maxguest};
       await axios.post('/accommodations', placeData);
       setRedirect(true);
   }

   if(redirect) {
       return <Navigate to = {'/account/accommodations'} />
   }

  return (
    <div>
          <AccountNavigation/>
          <form onSubmit={addNewPlace}>
            {getInput('Title', 'Give an short,catchy and attractive title for your Place')}
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder='title, Ex : My most comfort place' />

            {getInput('Address', 'Please provide complete place of your location')}
            <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder='Address' />

            {getInput('Photos', 'Upload attractive photos to attract the worldwide tourists')}
            <PhotosUploader addimage={addimage} onChange={setAddImage} />


            {getInput('Description', 'Give a brief description about your Place')}
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder='Type here...' />

            {getInput('Perks', 'Select your Perks')}
            <Perks selected={perks} onChange={setPerks} />

            <h2 className='mt-6 text-2xl'>Extra Info</h2>
            <p className='text-sm'>Rules and Regulations to be followed</p>
            <textarea value={extrainfo} onChange={e => setExtrainfo(e.target.value)} placeholder='Type here...' />

            {getInput('Check in & out times', 'Make sure to have some time for cleaning of Apartment before giving key to new customers')}
            <CheckinCheckout {...{ checkin, checkout, setCheckin, setCheckout, maxguest, setMaxguest }} />

            <div className='flex justify-center'>
              <button className='primary max-w-sm my-4'>Save</button>
            </div>

          </form>
        </div>
  )
}

export default AccomodationForumPage