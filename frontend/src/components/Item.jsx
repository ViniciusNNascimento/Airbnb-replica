import React from "react";

const item = () => {
  return (
    <a href="/" className="flex flex-col gap-2">
      <img
        src="https://i0.wp.com/blog.bonitour.com.br/wp-content/uploads/2022/04/Destaque01-11-lugares-paradisiacos-no-Brasil-para-conhecer-_-1127x600-1.jpg?ssl=1"
        alt="Imagem da acomodação"
        className="aspect-square rounded-2xl object-cover"
      />
      <div className="">
        <h3 className="text-xl font-semibold">
          Fernando de Noronha, Pernanbuco
        </h3>
        <p className="truncate text-gray-600">
          Fernando de Noronha/PE é um dos destinos brasileiros mais famosos por
          suas belezas paradisíacas. Com praias de águas cristalinas e repletas
          de vida marinha, aliás o destino encanta os turistas com passeios de
          barco e atividades como trilhas e mergulho ao lado de tartarugas,
          tubarões e golfinhos.
        </p>
      </div>

      <p>
        <span className="font-semibold">R$ 550</span> por noite
      </p>
    </a>
  );
};

export default item;
