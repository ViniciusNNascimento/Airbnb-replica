import React, { useState } from 'react'
import Perks from './Perks';
import { Navigate } from 'react-router-dom';
import axios from "axios";
import { useUserContext } from '../contexts/UserContext';
import PhotoUploader from './PhotoUploader';

const NewPlace = () => {
    const { user } = useUserContext();
    const [title, setTitle] = useState("");
    const [city, setCity] = useState("");
    const [photos, setPhotos] = useState([]);
    const [perks, setPerks] = useState([]);
    const [descripition, setDescripition] = useState("");
    const [extras, setExtras] = useState("");
    const [price, setPrice] = useState("");
    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");
    const [guests, setGuests] = useState("");
    const [redirect, setRedirect] = useState(false)
    const [photoslink, setPhotosLink] = useState("");



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title &&
            city &&
            // photos.length > 0 &&
            descripition &&
            price &&
            checkin &&
            checkout &&
            guests
        ) {
            try {
                const NewPlace = await axios.post('/places', {
                    owner: user._id,
                    title,
                    city,
                    // photos,
                    descripition,
                    extras,
                    perks,
                    price,
                    checkin,
                    checkout,
                    guests,
                });

                console.log(NewPlace)

                setRedirect(true)
            } catch (error) {
                console.error(JSON.stringify(error));
                alert('deu erro ao tentar criar um novo lugar')
            };

        } else {
            alert("preencha todas as informações antes de enviar")
        }





    };

   
    if (redirect) return <Navigate to="/account/places" />;




    return (

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 px-8">
            <div className='flex flex-col gap-1'>
                <label htmlFor='title' className='ml-2 text-2xl font-bold'>Titulos</label>
                <input
                    type="text"
                    placeholder="Digite o titulo do seu anuncio"
                    className="rounded-full border border-gray-300 px-4 py-2"
                    id='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className='flex flex-col gap-1'>

                <label htmlFor='city' className='ml-2 text-2xl font-bold cursor-pointer'>Cidade e País</label>
                <input
                    type="text"
                    placeholder="Digite a cidade e país anuncio"
                    className="rounded-full border border-gray-300 px-4 py-2"
                    id='city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)} />

            </div>

            <PhotoUploader {...{photoslink, setPhotosLink, setPhotos, photos}} />

            <div className='flex flex-col gap-1'>
                <label htmlFor='descripition' className='ml-2 text-2xl font-bold'>Descrição</label>
                <textarea
                    placeholder="Digite a descrição seu anuncio"
                    className="rounded-2xl border border-gray-300 px-4 py-2 h-56 resize-none"
                    id='descripition'
                    value={descripition}
                    onChange={(e) => setDescripition(e.target.value)} />
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor='perks' className='ml-2 text-2xl font-bold'>Comodidades</label>

                <Perks {...{ perks, setPerks }} />


            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor='extras' className='ml-2 text-2xl font-bold'>Informações extras</label>
                <textarea
                    placeholder="Coloque aqui qualquer tipo de informação extra sobre esse anuncio"
                    className="rounded-2xl border border-gray-300 px-4 py-2 h-56 resize-none"
                    id='extras'
                    value={extras}
                    onChange={(e) => setExtras(e.target.value)} />
            </div>

            <div className='flex flex-col gap-1'>
                <h2 htmlFor='extras' className='ml-2 text-2xl font-bold'>Restrições e preços</h2>

                <div className='grid grid-cols-[repeat(auto-fit,minmax(225px,1fr))] gap-6'>
                    <div className='flex flex-col gap-2'>
                        <label className='ml-2 text-xl font-bold' htmlFor="price">Preços</label>
                        <input
                            type="number"
                            placeholder="500"
                            className="rounded-full border border-gray-300 px-4 py-2"
                            value={price}
                            id='price'
                            onChange={(e) => setPrice(e.target.value)} />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='ml-2 text-xl font-bold' htmlFor="checkin">Check-in</label>
                        <input
                            type="text"
                            placeholder="16:00"
                            className="rounded-full border border-gray-300 px-4 py-2"
                            value={checkin}
                            id='checkin'
                            onChange={(e) => setCheckin(e.target.value)} />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='ml-2 text-xl font-bold' htmlFor="checkout">Check-out</label>
                        <input
                            type="text"
                            placeholder="08:00"
                            className="rounded-full border border-gray-300 px-4 py-2"
                            value={checkout}
                            id='checkout'
                            onChange={(e) => setCheckout(e.target.value)} />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='ml-2 text-xl font-bold' htmlFor="guests">N° Convidados</label>
                        <input
                            type="number"
                            placeholder="5"
                            className="rounded-full border border-gray-300 px-4 py-2"
                            value={guests}
                            id='guests'
                            onChange={(e) => setGuests(e.target.value)} />
                    </div>
                </div>
            </div>

            <button className="gap-2 hover:bg-primary-500 bg-primary-400 min-w-44 cursor-pointer rounded-full px-4 py-2 text-white transition"  >Salvar informaçôes</button>



        </form>
    );
};

export default NewPlace

