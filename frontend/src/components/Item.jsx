import React from "react";

const item = ({ place }) => {
  return (
    <a href="/" className="flex flex-col gap-2">
      <img
        src={place.photos[0]}
        alt="Imagem da acomodação"
        className="aspect-square rounded-2xl object-cover"
      />
      <div className="">
        <h3 className="text-xl font-semibold">
          {place.city}
        </h3>
        <p className="truncate text-gray-600">
          {place.descripition}
        </p>
      </div>

      <p>
        <span className="font-semibold">R$ 550</span> por noite
      </p>
    </a>
  );
};

export default item;
