import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import Perk from '../components/Perk';
import Booking from '../components/Booking';

const Place = () => {
    const { id } = useParams();
    const { user } = useUserContext();
    const [place, setPlace] = useState(null);
    const [overlay, setOverlay] = useState(false);
    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");
    const [guests, setGuests] = useState("");
    const [booking, setBooking] = useState(null);
    const [redirect, setRedirect] = useState(false);


    const numberOfDays = (date1, date2) => {
        const date1GMT = date1 + "GMT-03:00";
        const date2GMT = date2 + "GMT-03:00";

        const dateCheckin = new Date(date1GMT);
        const dateCheckout = new Date(date2GMT);

        return (
            (dateCheckout.getTime() - dateCheckin.getTime()) / (1000 * 60 * 60 * 24)
        );
    };

    useEffect(() => {

        if (place) {
            const axiosGet = async () => {
                const { data } = await axios.get("/bookings/owner");
                setBooking(
                    data.filter((booking) => {
                        console.log(booking.place._id, place._id);

                        return booking.place._id === place._id;
                    })[0],
                );

            };

            axiosGet();
        }
    }, [place]);


    useEffect(() => {

        if (id) {
            const axiosGet = async () => {
                const { data } = await axios.get(`/places/${id}`);

                setPlace(data)
            };
            axiosGet();
        }
    }, [id]);

    useEffect(() => {
        overlay
            ? document.body.classList.add('overflow-hidden')
            : document.body.classList.remove('overflow-hidden')
    }, [overlay])

    const handleBooking = async (e) => {
        e.preventDefault();

        if (checkin && checkout && guests) {
            const nights = numberOfDays(checkin, checkout)

            const objBooking = {
                place: id,
                user: user._id,
                price: place.price,
                total: place.price * nights,
                checkin,
                checkout,
                guests,
                nights,
            };

            const { data } = await axios.post("/bookings", objBooking);
            
            setRedirect(true)

        } else {
            alert("Preencha todas as informações antes de fazer uma reserva")
        }
    };

    if (redirect) return <Navigate to='/account/bookings' />;


    if (!place) return <></>

    return (

        <section>
            <div className="flex flex-col gap-4 sm:gap-6 mx-auto  max-w-7xl  sm:p-8 p-4">
                <div className='flex flex-col sm:gap-4 gap-2'>
                    <div className='text-xl sm:text-3xl font-bold'>{place.title}</div>


                    <div className='flex gap-1 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        <p>{place.city}</p>
                    </div>

                    {/* booking */}

                    {booking ? <Booking booking={booking} place={true} /> : ""}



                    <div className="relative grid sm:grid-cols-[2fr_1fr] aspect-square grid-rows- gap-4 sm:aspect-[3/2] rounded-2xl overflow-hidden ">
                        {place.photos
                            .filter((photo, index) => index < 3)
                            .map((photo, index) => (
                                <img
                                    className={`${index === 0 ? "row-span-2 h-full object-center" : ""} aspect-square w-full  cursor-pointer sm:object-cover transition hover:opacity-75`}
                                    src={photo}
                                    alt="imagem da acomodacao"
                                    onClick={() => setOverlay(true)}
                                    key={photo} />
                            ))};
                        <div
                            className='absolute right-2 bottom-2 gap-2 flex  bg-white border border-black rounded-xl px-2 py-1 transition hover:scale-105 cursor-pointer'
                            onClick={() => setOverlay(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />

                            </svg>

                            <p>Mostrar mais imagens</p>

                        </div>


                    </div>

                    {/* colunas */}
                    <div className={`grid ${booking ? "" : 'grid-cols-1 md:grid-cols-2 p-4'} `}>
                        <div className='order-2 md:order-none p-6 flex flex-col gap-5'>
                            <div className='flex flex-col gap-2'>
                                <p className='sm:text-2xl text-lg font-bold'>Descrição</p>
                                <p>{place.descripition}</p>
                            </div>

                            <div>
                                <p className='sm:text-2xl text-lg font-bold'>Horarios e Restrições</p>
                                <div className='flex flex-col gap-2'>
                                    <p>Checkin: {place.checkin}</p>
                                    <p>Checkout: {place.checkout}</p>
                                    <p>Maximo de convidados: {place.guests}</p>
                                </div>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <p className='sm:text-2xl text-lg font-bold'>Diferenciais</p>
                            </div>

                            <div className='flex flex-col gap-1'>
                                {place.perks.map((perk) => (
                                    <div key={perk} className='flex gap-2 items-center'>
                                        <Perk perk={perk}></Perk>

                                    </div>
                                ))}
                            </div>

                        </div>


                        {booking ? "" :
                            <form className='order-1 md:order-none justify-self-center border self-center  border-gray-300 rounded-2xl px-4 py-3 sm:px-8 sm:py-4  flex flex-col gap-4'>
                                <p className='sm:text-2xl text-lg font-bold text-center'>Preço: R$ {place.price} por noite</p>


                                <div className='flex flex-col sm:flex-row '>
                                    <div className='rounded-tl-2xl rounded-tr-2xl border border-gray-300 px-4 py-2 sm:rounded-tr-none sm:rounded-bl-2xl'>
                                        <p className='font-bold'>Checkin</p>
                                        <input
                                            className='w-full sm:w-auto'
                                            type="date"
                                            value={checkin}
                                            onChange={(e) => setCheckin(e.target.value)} />
                                    </div>
                                    <div className='rounded-br-2xl rounded-bl-2xl border border-t-0 sm:border-l-0 border-gray-300 px-4 py-2 sm:rounded-tr-2xl sm:rounded-bl-none sm:border'>
                                        <p className='font-bold'>Checkout</p>
                                        <input
                                            className='w-full sm:w-auto'
                                            type="date"
                                            value={checkout}
                                            onChange={(e) => setCheckout(e.target.value)} />
                                    </div>
                                </div>


                                <div className='border border-gray-300 rounded-2xl  px-4 py-2 flex flex-col gap-2'>
                                    <p className='font-bold'>N de convidados</p>
                                    <input
                                        type="number"
                                        placeholder='2'
                                        value={guests}
                                        onChange={(e) => setGuests(e.target.value)} />
                                </div>

                                {user ? (
                                    <button
                                        className="bg-primary-400 w-full cursor-pointer rounded-full border border-gray-300 px-4 py-2 font-bold text-center text-white"

                                        onClick={handleBooking}
                                    >
                                        Reservar
                                    </button>) : (
                                    <Link
                                        to="/login"
                                        className="bg-primary-400 w-full cursor-pointer rounded-full border border-gray-300 px-4 py-2 font-bold text-white text-center"

                                    >
                                        Faça seu login
                                    </Link>)}

                            </form>}


                    </div>

                    {/* extras */}
                    <div className='rounded-2xl bg-gray-200 p-6 flex flex-col gap-2'>
                        <p className='sm:text-2xl text-lg font-bold'>Informações Extras</p>
                        <p>{place.extras}</p>
                    </div>

                    {/* overlay */}
                    <div className={`${overlay ? "flex" : "hidden"} bg-black inset-0 fixed overflow-y-auto text-white items-start`}>
                        <div className="flex flex-col gap-8 mx-auto  max-w-7xl  p-8">
                            <div className="grid sm:grid-cols-2 gap-4 ">
                                {place.photos.map((photo, index) => (
                                    <img
                                        className={`aspect-square w-full object-cover `}
                                        src={photo}
                                        alt="imagem da acomodacao"
                                        key={index} />
                                ))}
                            </div>
                        </div>

                        <button
                            className='absolute right-2 top-2 text-black bg-white rounded-full aspect-square w-8 font-bold hover:scale-105 trasition '
                            onClick={() => setOverlay(false)}>X</button>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Place
