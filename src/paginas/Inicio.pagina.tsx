import Filtros from "../componentes/personajes/filtros.componente"
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente"
import Paginacion from "../componentes/paginacion/paginacion.componente";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { filtrarPersonajesThunk } from "../actions/personajesActions";

/**
 * Esta es la pagina principal. Aquí se debera ver el panel de filtros junto con la grilla de personajes.
 * 
 * Uso: 
 * ``` <PaginaInicio /> ```
 * 
 * @returns {React.ReactElement} JSX element la pagina de inicio
 */
const PaginaInicio: FC = () => {
    const dispatch = useDispatch();

    /**
   * Function that removes the filters
   */
  const eliminarFiltrosOnClick = () => {
    dispatch(filtrarPersonajesThunk(""));
  };

    return (<div className="container">
        <div className="actions">
            <h3>Catálogo de Personajes</h3>
            <button className="danger" onClick={eliminarFiltrosOnClick}>Limpiar Filtro</button>
        </div>
        <Filtros />
        <Paginacion />
        <GrillaPersonajes />
        <Paginacion />
    </div>
    );
};

export default PaginaInicio