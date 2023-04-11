import { FC } from "react";
import { useSelector } from "../../store/personajeStore";
import './grilla-personajes.css';
import TarjetaPersonaje from './tarjeta-personaje.componente';
import { Personaje } from "../../types/type";

/**
 * Grilla de personajes para la pagina de inicio
 * 
 * Deberás agregar las funciones necesarias para mostrar y paginar los personajes
 * 
 * 
 * @returns un JSX element 
 */
interface Props {
  personajes: Personaje[];
}

const GrillaPersonajes: FC<Props> = ({ personajes }) => {
  const { error, status, favoritos } = useSelector(state => state.personaje);

  return (
    <div className="grilla-personajes">
      {status === 'Loading' ? (
        <div>Cargando.......</div>
      ) : error ? (
        <div>No existe....</div>
      ) : (
        personajes.map(item => (
          <TarjetaPersonaje key={item.id} personaje={item} favoritos={favoritos} />
        ))
      )}
    </div>
  );
};

export default GrillaPersonajes;