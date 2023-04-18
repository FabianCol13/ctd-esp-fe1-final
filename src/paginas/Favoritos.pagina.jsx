import {useDispatch} from 'react-redux';
import {useSelector} from "../componentes/personajes/grilla-personajes.componente";
import {sacarTodosLosFavoritos } from "../../src/actions/personajesfavoritosActions";
import TarjetaPersonaje from "../componentes/personajes/tarjeta-personaje.componente"

/**
 * Esta es la pagina de favoritos. Aquí se deberan ver todos los personajes marcados como favoritos
 * 
 * Uso: 
 * ``` <PaginaFavoritos /> ```
 *  
 * @returns la pagina de favoritos
 */
const PaginaFavoritos = () => {

    const favoritos = useSelector((state)  => state.personajesFavoritos.favoritos); //! como usar lo que viene del state
    const dispatch = useDispatch();

   const handleClick = () => {
        dispatch(sacarTodosLosFavoritos());
    };

    if(!favoritos || favoritos.length === 0)
    return <h4 className="message"> Aún no guardaste personajes favoritos </h4>

    return <div className="container">
        <div className="actions">
            <h3>Personajes Favoritos</h3>
            <button className="danger" onClick={handleClick} >Eliminar todos</button>
        </div>
         <div className="grilla-personajes">
            {favoritos.map((favorito) => {
                return (
                    <TarjetaPersonaje
                        key={favorito.id}
                        id= {favorito.id}
                        name={favorito.name}
                        image={favorito.image} 
                    />
                );
            })}

        </div> 
        
    </div>
}

export default PaginaFavoritos