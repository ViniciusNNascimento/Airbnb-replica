import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NewPlace from './NewPlace';
import axios from 'axios';

const AccPlaces = () => {
  const { action } = useParams();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const axiosGet = async () => {
      const { data } = await axios.get("/places/owner");
      setPlaces(data);
    };

    axiosGet();
  }, [action]);


  return (
    <div className="w-full max-w-7xl text-left flex flex-col items-center">

      {action !== 'new' ? (
        <div className='flex flex-col gap-6 items-center'>
          <Link
            to="/account/places/new"
            className="flex font-bold gap-2 hover:bg-primary-500 bg-primary-400 min-w-44 cursor-pointer rounded-full px-4 py-2 text-white transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Adicionar novo lugar
          </Link>

          {places.map((place) => (
            <Link to={`/account/places/new/${place._id}`} className='flex gap-6 items-center bg-gray-100 rounded-2xl p-6 '
            key={place._id}>

              <img
                src={place.photos[0]}
                alt="foto da acomodacao"
                className='max-w-56 object-center aspect-square rounded-2xl ' />
              <div className='flex flex-col gap-2'>
                <p className='text-2xl font-medium'>{place.title}</p>
                <p>{place.descripition}</p>
              </div>
            </Link>
          ))}

        </div>
      ) : (
        <NewPlace />
      )
      }

    </div>

  );
};

export default AccPlaces;
