import { useSelector } from "../store/personajeStore";
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente";
import { useDispatch } from "react-redux";
import { deleteAllFavoritoPersonaje } from "../actions/personajeActions";

/**
 * Esta es la pagina de favoritos. Aquí se deberan ver todos los personajes marcados como favoritos
 * 
 * Uso: 
 * ``` <PaginaFavoritos /> ```
 * 
 * @returns la pagina de favoritos
 */
const PaginaFavoritos = () => {
    // Obtener dispatch desde el hook useDispatch
    const dispatch = useDispatch();
    // Obtener el estado favoritos desde el store usando useSelector
    const { favoritos } = useSelector((state: any) => state.personaje);

    // Manejar el clic en el botón de eliminar todos
    const handleDeleteAllClick = () => {
        // Llamar a la acción deleteAllFavoritoPersonaje para eliminar todos los favoritos
        dispatch(deleteAllFavoritoPersonaje());
    };

    return (
        <div className="container">
            <div className="actions">
                <h3>Personajes Favoritos</h3>
                <button className="danger" onClick={handleDeleteAllClick}>
                    Eliminar Todos
                </button>
            </div>
            <GrillaPersonajes personajes={favoritos} />
        </div>
    );
};

export default PaginaFavoritos;