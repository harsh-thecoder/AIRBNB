import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SingleAccommodationPage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [showallphotos, setShowallphotos] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/accommodations/' + id).then(response => {
            setPlace(response.data);
        });
    }, [id]);

    if (!place) {
        return '';
    }

    if (showallphotos) {
        return (
            <div className="absolute inset-0 bg-slate-900 text-white min-h-screen overflow-auto">
                <button
                    onClick={() => setShowallphotos(false)}
                    className="fixed top-6 right-6 flex items-center gap-2 bg-white text-black rounded-xl p-2 shadow-md z-50"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                    Close Photos
                </button>
                <div className="flex flex-col gap-6 p-8">
                    {place?.photos?.length > 0 &&
                        place.photos.map((photo, index) => (
                            <div
                                key={index}
                                className="relative group overflow-hidden rounded-lg shadow-lg"
                            >
                                <img
                                    className="w-full h-auto max-h-[80vh] object-cover transform transition duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl"
                                    src={'http://localhost:4000/uploads/' + photo}
                                    alt={`Photo ${index + 1}`}
                                />
                            </div>
                        ))}
                </div>
            </div>
        );
    }

    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
            <h1 className="text-2xl">{place.title}</h1>
            <a
                className="my-2 block font-semibold underline"
                target="_blank"
                rel="noopener noreferrer"
                href={'https://maps.google.com/?q=' + place.address}
            >
                {place.address}
            </a>
            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr]">
                    <div>
                        {place.photos?.[0] && (
                            <div>
                                <img
                                    className="aspect-square object-cover"
                                    src={`http://localhost:4000/uploads/` + place.photos[0]}
                                    alt=""
                                />
                            </div>
                        )}
                    </div>
                    <div>
                        <div>
                            {place.photos?.[1] && (
                                <img
                                    className="aspect-square object-cover"
                                    src={`http://localhost:4000/uploads/` + place.photos[1]}
                                    alt=""
                                />
                            )}
                        </div>
                        <div className="overflow-hidden relative">
                            {place.photos?.[2] && (
                                <img
                                    className="aspect-square object-cover relative top-2"
                                    src={`http://localhost:4000/uploads/` + place.photos[2]}
                                    alt=""
                                />
                            )}
                            <button
                                onClick={() => setShowallphotos(true)}
                                className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 0113.182 0l5.159 5.159M15.75 14.25l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M6 18h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z"
                                    />
                                </svg>
                                Show more Photos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleAccommodationPage;
