import axios from 'axios';
import React from 'react'

const PhotoUploader = ({ photoslink, setPhotosLink, setPhotos, photos }) => {

    const uploadByLink = async (e) => {
        e.preventDefault()


        if (photoslink) {
            const { data: filename } = await axios.post("/places/upload/link", { link: photoslink, });



            setPhotos((prevValue) => [...prevValue, filename]);
        } else {
            alert("nao existe nenhum link a ser enviado")
        }

    }

    return (
        <div>

            <div className='flex flex-col gap-1 '>

                <label htmlFor='photos' className='ml-2 text-2xl font-bold'>Fotos</label>
                <div className='flex gap-2'>
                    <input
                        type="text"
                        placeholder="Adicione uma foto pelo link dela"
                        className="rounded-full border border-gray-300 px-4 py-2 grow"
                        value={photoslink}
                        id='photoslink'
                        onChange={(e) => setPhotosLink(e.target.value)} />
                    <button onClick={uploadByLink} className='rounded-full cursor-pointer border border-gray-300 px-4 hover:bg-gray-300 transition py-2 bg-gray-100'>Enviar foto</button>
                </div>

                <div className='grid grid-cols-5 gap-4 mt-2'>

                    {photos.map((photo) => (
                        <img
                            className='aspect-square object-cover rounded-2xl'
                            src={`${axios.defaults.baseURL}/tmp/${photo}`}
                            alt="imagem do lugar"
                            key={photo} />

                    ))}
                    <label htmlFor="file" className='items-center justify-center flex gap-2 cursor-pointer aspect-square border rounded-2xl border-gray-300' > <input className='hidden' type="file" id="file"
                    />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                        </svg>

                        Upload
                    </label>



                </div>
            </div>


        </div>
    )
}

export default PhotoUploader
