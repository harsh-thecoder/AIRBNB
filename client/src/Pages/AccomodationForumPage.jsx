import React from 'react'
import { useState,useEffect } from 'react';
import Perks from '../Components/Perks';
import CheckinCheckout from '../Components/CheckinCheckout';
import axios from 'axios'
import PhotosUploader from '../Components/PhotosUploader';
import AccountNavigation from '../Components/AccountNavigation';
import { Navigate,useParams } from 'react-router-dom';

function AccomodationForumPage() {
  const {id} = useParams();
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
  useEffect(() => {
     if(!id){
      return; 
     }
     axios.get('/accommodations/'+id).then(response => {
       const {data} = response;
       setTitle(data.title);
       setAddress(data.address);
       setAddImage(data.photos);
       setDescription(data.description);
       setPerks(data.perks);
       setExtrainfo(data.extrainfo);
       setCheckin(data.checkin);
       setCheckout(data.checkout);
       setMaxguest(data.maxguest);
     })
  }, [id])
  

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

   async function savePlace(ev) {
     ev.preventDefault();
     const placeData = {title,address,addimage,description,perks,extrainfo,checkin,checkout,maxguest};
       if(id){
        // update
        await axios.put('/accommodations',{
           id, ...placeData
          }); 
          setRedirect(true);
        }
       else{
        // newplace
        await axios.post('/accommodations', placeData);
        setRedirect(true);
       }
   }

   if(redirect) {
       return <Navigate to = {'/account/accommodations'} />
   }

  return (
    <div>
          <AccountNavigation/>
          <form onSubmit={savePlace}>
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

            {getInput('Extra Info', 'Rules and Regulations to be followed')}
            <textarea value={extrainfo} onChange={e => setExtrainfo(e.target.value)} placeholder='Type here...' />

            {getInput('Check in & out times', 'Make sure to have some time for cleaning of Apartment before giving key to new customers')}
            <div className='grid sm:grid-cols-3 gap-2'>
              <div>
                <h3 className='mt-2 -mb-1 border rounded-2xl p-2'>Check in Time</h3>
                <input value={checkin} onChange={e=> setCheckin(e.target.value)} type="text" placeholder='Ex: 16:00' />
              </div>
              <div>
                <h3 className='mt-2 -mb-1 border rounded-2xl p-2'>Check out Time</h3>
                <input value={checkout} onChange={e=> setCheckout(e.target.value)} type="text" placeholder='Ex: 18:00' />
              </div>
              <div>
                <h3 className='mt-2 -mb-1 border rounded-2xl p-2'>Maximum Guests</h3>
                <input value={maxguest} onChange={e=> setMaxguest(e.target.value)} type="text" placeholder='Ex: 4 to 5'/>
              </div>
            </div>

            <div className='flex justify-center'>
              <button className='primary max-w-sm my-4'>Save</button>
            </div>

          </form>
        </div>
  )
}

export default AccomodationForumPage