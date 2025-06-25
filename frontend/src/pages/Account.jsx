import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AccProfile from "../components/AccProfile";
import AccPlaces from "../components/AccPlaces";
import AccBookings from "../components/AccBookings";
import { useUserContext } from "../contexts/UserContext";

const Account = () => {
  const { subpage } = useParams();
  const { user, ready } = useUserContext();

  const buttonClass = (button) => {
    let finalClass =
      "rounded-full hover:bg-primary-400 px-4 py-2 hover:text-white cursor-pointer transition";

    if (button === subpage) finalClass += " bg-primary-400 text-white";

    return finalClass;
  };

  if (!user && ready) return <Navigate to="/login" />
    
  

  return (
    <section className="p-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 text-center">
        <div className="flex gap-2">
          <Link to="/account/profile" className={buttonClass("profile")}>
            Perfil
          </Link>
          <Link to="/account/bookings" className={buttonClass("bookings")}>
            Reservas
          </Link>
          <Link to="/account/places" className={buttonClass("places")}>
            Lugares
          </Link>
        </div>

        {subpage === "profile" && <AccProfile />}
        {subpage === "places" && <AccPlaces />}
        {subpage === "bookings" && <AccBookings />}
      </div>
    </section>
  );
};

export default Account;
