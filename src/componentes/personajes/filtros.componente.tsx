import {ChangeEvent, FC} from 'react';

import {
    TypedUseSelectorHook, useDispatch, useSelector as useReduxSelector, } from 'react-redux';
import { filtrarPersonajesThunk } from '../../actions/personajesActions';
import { IRootState } from "../../store/store";
import './filtros.css';

/**
 *
 *
 * @returns {React.ReactElement} JSX element
 */

const Filtros: FC = () => {
    const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;
  const query = useSelector((state) => state.personajes.query);
    const dispatch = useDispatch();

    const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        let query = e.target.value;
        dispatch(filtrarPersonajesThunk(query));
      };

    return(
         <div className="filtros">
        <label htmlFor="nombre">Filtrar por nombre:</label>
        <input 
            type="text" 
            onChange={onChange}
            placeholder="Rick, Morty, Beth, Alien, ...etc"
            value={query}
            name="nombre" 
            autoFocus={true} 
        />
    </div>
    );
};

export default Filtros;