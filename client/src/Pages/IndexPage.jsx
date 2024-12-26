import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
function IndexPage() {
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    axios.get('/accommodations').then((response) => {
      setAccommodations([...response.data,...response.data,...response.data,...response.data]);
    });
  }, []);

  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
      {accommodations.length > 0 &&
        accommodations.map((accommodation) => (
          <Link to={'/accommodation/'+accommodation._id} className="w-full max-w-xs mx-auto">
            <div className="rounded-2xl bg-gray-400 overflow-hidden relative aspect-[5/3]">
              {accommodation.photos?.[0] && (
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src={`http://localhost:4000/uploads/${accommodation.photos?.[0]}`}
                  alt={accommodation.title}
                />
              )}
            </div>
            <h2 className="font-semibold">{accommodation.address}</h2>
            <h3 className="text-sm text-gray-600">{accommodation.title}</h3>
            <div className='mt-1'>
              <span className='font-bold'> ${accommodation.price} </span> Per night
            </div>
          </Link>
        ))}
    </div>
  );
}

export default IndexPage;
