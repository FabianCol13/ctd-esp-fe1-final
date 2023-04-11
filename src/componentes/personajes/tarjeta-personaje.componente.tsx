
import { FC, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';
import { Personaje } from "../../types/type";
import { useDispatch } from "react-redux";
import {
    deleteFavoritoPersonaje,
    addFavoritoPersonajeAction,
    findPersonajeByIdThunk
} from "../../actions/personajeActions";


interface TarjetaPersonajeProps {
    personaje: Personaje;
    favoritos: Personaje[];
};

const TarjetaPersonaje: FC<TarjetaPersonajeProps> = ({ personaje, favoritos }) => {
    const dispatch = useDispatch();

    const [favoritoState, setFavoritoState] = useState(!!favoritos.find(element => element.id === personaje.id));

    const handleFavoritoClick = useCallback(() => {
        if (favoritos.find(element => element.id === personaje.id)) {
            dispatch(deleteFavoritoPersonaje(personaje));
            setFavoritoState(false);
        } else {
            dispatch(addFavoritoPersonajeAction(personaje));
            setFavoritoState(true);
        }
    }, [dispatch, favoritos, personaje]);

    const handleClick = useCallback(() => {
        dispatch(findPersonajeByIdThunk(personaje.id));
    }, [dispatch, personaje.id]);

    return (
        <div className="tarjeta-personaje">
            <Link to="/detalle" onClick={handleClick}>
                <img src={personaje.image} alt={personaje.name} />
            </Link>
            <div className="tarjeta-personaje-body">
                <Link to="/detalle" onClick={handleClick}>
                    <span>{personaje.name}</span>
                </Link>
                <div onClick={handleFavoritoClick}>
                    <BotonFavorito esFavorito={favoritoState} />
                </div>
            </div>
        </div>
    );
};

export default TarjetaPersonaje;
