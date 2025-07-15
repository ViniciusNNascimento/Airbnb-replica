import axios from 'axios';

const PhotoUploader = ({ photoslink, setPhotosLink, setPhotos, photos }) => {

    const uploadByLink = async (e) => {
        e.preventDefault()


        if (photoslink) {
            try {
                const { data: filename } = await axios.post("/places/upload/link", { link: photoslink, });

                setPhotos((prevValue) => [...prevValue, filename]);

            } catch (error) {
                alert('deu erro na hora do upload por link', JSON.stringify(error))
            }
        } else {
            alert("nao existe nenhum link a ser enviado")
        }

    };

    const uploadPhoto = async (e) => {
        const { files } = e.target;
        const filesArray = [...files]

        const formData = new FormData();

        filesArray.forEach((file) => formData.append("files", file));

        try {
            const { data: urlArray } = await axios.post("/places/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setPhotos((prevValue) => [...prevValue, ...urlArray]);

        } catch (error) {
            alert('deu erro na hora do upload', JSON.stringify(error));
        }


    };

    const deletePhoto = (fileURL) => {
        const newPhotos = photos.filter(photo => photo !== fileURL)


        setPhotos(newPhotos)
    };

    const promotePhoto = (fileURL) => {
        const newPhotos = [fileURL, ...photos.filter(photo => photo !== fileURL)];
        setPhotos(newPhotos)
    };

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
                        <div className='relative'>
                            <img
                                className='aspect-square object-cover rounded-2xl'
                                src={`${photo}`}
                                alt="imagem do lugar"
                                key={photo} />

                            <div className='absolute flex right-2 bottom-2 gap-1'>
                                <div
                                    onClick={() => promotePhoto(photo)} className='bg-gray-100 opacity-75 rounded-full p-2 cursor-pointer transition hover:bg-primary-400 hover:text-white'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                    </svg>
                                </div>

                                <div
                                    onClick={() => deletePhoto(photo)}
                                    className='bg-gray-100 opacity-75 rounded-full p-2 cursor-pointer transition hover:bg-primary-400 hover:text-white'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </div>



                            </div>
                        </div>

                    ))}
                    <label htmlFor="file" className='items-center justify-center flex gap-2 cursor-pointer aspect-square border rounded-2xl border-gray-300' >
                        <input
                            onChange={uploadPhoto} className='hidden'
                            type="file" id="file"
                            multiple
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
