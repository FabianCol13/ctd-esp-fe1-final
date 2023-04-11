import { FC } from "react";
import { useSelector } from "../store/personajeStore";

import Filtros from "../componentes/personajes/filtros.componente"
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente"
import Paginacion from "../componentes/paginacion/paginacion.componente";
import { useDispatch } from "react-redux";
import { findPersonajesThunk } from "../actions/personajeActions";

/**
 * Esta es la pagina principal. Aquí se debera ver el panel de filtros junto con la grilla de personajes.
 * 
 * Uso: 
 * ``` <PaginaInicio /> ```
 * 
 * @returns la pagina de inicio
 */
const PaginaInicio: FC = () => {
    const dispatch = useDispatch();
    const { personajes } = useSelector((state) => state.personaje);

    const limpiarFiltros = () => {
        dispatch(findPersonajesThunk("", 1));
    };

    return (
        <div className="container">
            <div className="actions">
                <h3>Catálogo de Personajes</h3>
                <button className="danger" onClick={limpiarFiltros}>
                    Limpiar Filtros
                </button>
            </div>
            <Filtros />
            <Paginacion />
            {personajes && <GrillaPersonajes personajes={personajes} />}
            <Paginacion />
        </div>
    );
};

export default PaginaInicio;
