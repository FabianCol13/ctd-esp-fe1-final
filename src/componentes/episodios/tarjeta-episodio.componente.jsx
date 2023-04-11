// import React, { useEffect, useState } from "react";

import './tarjeta-episodio.css';

/**
 * Tarjeta para cada episodio dentro de la vista de personaje.
 * 
 * Deberás agregar las propiedades necesarias para mostrar los datos de los episodios
 * 
 * 
 * @returns un JSX element 
 */
const TarjetaEpisodio = ({ arrayEpisodios }) => (
    <div className="tarjeta-episodio">
        <h4>{arrayEpisodios.name}</h4>
        <div>
            <span>{arrayEpisodios.episode}</span>
            <span>Lanzado el: {arrayEpisodios.air_date}</span>
        </div>
    </div>
);

export default TarjetaEpisodio;