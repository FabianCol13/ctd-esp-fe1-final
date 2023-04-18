import BotonFavorito from "../botones/boton-favorito.componente";
import "./tarjeta-personaje.css";
import Personaje from "../../types/personaje.types";
import { useSelector } from "./grilla-personajes.componente";
import {
  agregarFavorito,
  sacarFavorito,
} from "../../actions/personajesfavoritosActions";
import { useDispatch } from "react-redux";

/**
 * Componente que renderiza la tarjeta para cada personaje dentro de la grilla de personajes.
 * @author Fabian Garcia
 * @param {Personaje} personaje
 * @returns {JSX.Element}
 */

const TarjetaPersonaje = ({ name, image, id }: Personaje): JSX.Element => {
  const dispatch = useDispatch();

  const favoritos = useSelector((state) => state.personajesFavoritos.favoritos);
  let esFavorito = favoritos.some((favorito) => favorito.id === id);

  /**
   * Función que al clickear el boton se ejecuta,
   * marcando como favorito al personaje en el caso de que no lo sea y viceversa
   * @author Fabian Garcia
   */
  const handleClick = () => {
    if (!esFavorito) {
      dispatch(agregarFavorito({ id, name, image }));
    } else {
      dispatch(sacarFavorito({ id, name, image }));
    }
  };

  return (
    <div className="tarjeta-personaje" key={"personaje_" + id}>
      <img src={image} alt={name} />
      <div className="tarjeta-personaje-body">
        <span>{name}</span>
        <BotonFavorito esFavorito={esFavorito} onClick={handleClick} />
      </div>
    </div>
  );
};

export default TarjetaPersonaje;
