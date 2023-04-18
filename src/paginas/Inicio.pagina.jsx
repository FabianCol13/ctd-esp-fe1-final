import Filtros from "../componentes/personajes/filtros.componente"
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente"
import Paginacion from "../componentes/paginacion/paginacion.componente";
import {buscarPersonajesThunk} from "../actions/personajesActions";
import {useDispatch} from "react-redux";
import {limpiarFiltro} from "../actions/personajesActions"

/**
 * Esta es la pagina principal. Aquí se debera ver el panel de filtros junto con la grilla de personajes.
 * 
 * Uso: 
 * ``` <PaginaInicio /> ```
 * 
 * @returns la pagina de inicio
 */
const PaginaInicio = () => {

    const dispatch = useDispatch();

    /**
     * Funcion que se ejecuta cuando queremos limpiar el filtro del input 
     * despachando una accion que trae a los personajes de la api y 
     * otra que cambia el valor de la propiedad busqueda del estado global a un string vacio
     * @author Fabian Garcia
     */
    const handleClick = ()=> {
        dispatch(buscarPersonajesThunk());
        dispatch(limpiarFiltro());
    }

    return <div className="container">
        <div className="actions">
            <h3>Catálogo de Personajes</h3>
            <button className="danger" onClick={handleClick} >Limpiar filtro</button>
        </div>
        <Filtros />
        <Paginacion />
        <GrillaPersonajes />
        <Paginacion />
    </div>
}

export default PaginaInicio