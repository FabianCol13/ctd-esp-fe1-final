import { useDispatch } from 'react-redux';

import { useSelector } from '../../store/personajeStore';
import './paginacion.css';
import { findPersonajesThunk } from '../../actions/personajeActions';

/**
 * Componente que contiene los botones para paginar
 * 
 * Deberás agregar las propiedades necesarias para que funcione correctamente
 * 
 * 
 * @returns un JSX element 
 */
const Paginacion = () => {
    const dispatch = useDispatch();
    const { busqueda, currentPage, totalPages } = useSelector(
        (state) => state.personaje
    );

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const buttonText = event.currentTarget.innerText;
        const newPage =
            buttonText === "Anterior" ? currentPage - 1 : currentPage + 1;
        dispatch(findPersonajesThunk(busqueda, newPage));
    };

    return (
        <div className="paginacion">
            <button
                className="primary"
                onClick={handleButtonClick}
                disabled={currentPage === 1}
            >
                Anterior
            </button>
            <button
                className="primary"
                onClick={handleButtonClick}
                disabled={currentPage === totalPages}
            >
                Siguiente
            </button>
        </div>
    );
};

export default Paginacion;
