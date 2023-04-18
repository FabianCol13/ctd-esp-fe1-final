import './boton-favorito.css';
/**
 * Boton que indica si un elemento es favorito o no, y da 
 * la posibilidad de marcarlo/desmarcarlo
 * @author Fabian Garcia
 * @param {boolean} esFavorito
 * @param {Function} onClick  
 * @returns {JSX.Element}
 */

type BotonProps = {
    esFavorito:boolean;
    onClick:any;
}

const BotonFavorito = ({esFavorito, onClick}:BotonProps): JSX.Element => {
    const src = esFavorito ? "/imagenes/star-filled.png" : "/imagenes/star.png"

    return <div className="boton-favorito">
        <img src={src} alt={"favorito"} onClick={onClick} />
    </div>
}

export default BotonFavorito;