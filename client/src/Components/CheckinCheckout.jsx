import React from 'react'

function CheckinCheckout({ checkin, checkout, setCheckin, setCheckout,maxguest,setMaxguest }) {
  return (
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
  )
}

export default CheckinCheckout