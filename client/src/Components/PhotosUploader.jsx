import React from 'react'
import axios from 'axios';

function PhotosUploader({ addimage, setAddImage, photolink, setPhotolink }) {

    async function addPhotobylink(ev) {
    ev.preventDefault();
    try {
        const { data: filenames } = await axios.post('/upload-by-link', { link: photolink });
        setAddImage(prev => [...prev, ...filenames]);
        setPhotolink('');
    } catch (error) {
        console.error('Upload by link failed', error);
    }
}


    function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();

        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }


        axios.post('/upload', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            const { data: uploadedFiles } = response;
            setAddImage(prev => [...prev, ...uploadedFiles.map(file => file.filename)]);
        }).catch(err => {
            console.error('Upload failed', err);
        });
    }

    return (
        <div>
            <div className='flex gap-2'>
                <input type="text" value={photolink} onChange={e => setPhotolink(e.target.value)}
                    placeholder='Add Image using a Link ... jpg' />
                <button onClick={addPhotobylink} className='bg-gray-300 p-4 rounded-2xl'>Add&nbsp;Photo</button>
            </div>
            <div className='mt-3 grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6 text-2xl p-6 text-gray-600'>
                {addimage.length > 0 && addimage.map((link, index) => (
                    <div className='h-32 flex' key={`${link}-${index}`}>
                        <img className='rounded-2xl w-full object-cover' src={'http://localhost:4000/uploads/' + link} alt="" />
                    </div>
                ))}
                <label className='cursor-pointer flex items-center justify-center border bg-transparent rounded-2xl p-6'>
                    <input type="file" className='hidden' onChange={uploadPhoto} multiple />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                    </svg>Upload&nbsp;here
                </label>
            </div>

        </div>
    )
}

export default PhotosUploader