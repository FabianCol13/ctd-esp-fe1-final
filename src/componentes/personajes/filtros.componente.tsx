import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { findPersonajesThunk } from "../../actions/personajeActions";
import "./filtros.css";

const Filtros = () => {
    const dispatch = useDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value;
        dispatch(findPersonajesThunk(searchValue, 1));
    };

    useEffect(() => {
        dispatch(findPersonajesThunk("", 1));
    }, [dispatch]);

    return (
        <div className="filtros">
            <label htmlFor="nombre">Filtrar por nombre:</label>
            <input
                type="text"
                placeholder="Rick, Morty, Beth, Alien, ...etc"
                name="nombre"
                onChange={handleChange}
            />
        </div>
    );
};


export default Filtros;