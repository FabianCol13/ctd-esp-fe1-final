import { Personaje,Episodios } from "../types/type";
import { PersonajesActions } from "../actions/personajeActions";

type Status = "Loading" | "Completed";

interface PersonajeState {
  busqueda: string;
  favoritos: Personaje[];
  personajes: Personaje[];
  arrayEpisodios: Episodios[];
  currentPersonaje: Personaje | null;
  currentPage: number;
  totalPages: number;
  status: Status;
  error: string | null;
}

const initialState: PersonajeState = {
  busqueda: "",
  favoritos: [],
  personajes: [],
  arrayEpisodios: [],
  currentPersonaje: null,
  currentPage: 1,
  totalPages: 1,
  status: "Completed",
  error: null,
};

const personajesReducer = (
  state: PersonajeState = initialState,
  action: PersonajesActions
) => {
  switch (action.type) {
    case 'FETCH-PERSONAJE':
      const { name } = action.payload;
      return {
        ...state,
        busqueda: name,
        status: "Loading",
        error: null,
      };
      case 'FETCH-PERSONAJE-SUCCESS':
        const { personajes, totalPages, currentPage } = action.payload;
        return {
          ...state,
          personajes,
          totalPages,
          currentPage,
          status: "Completed",
          error: null,
        };
      case 'FETCH-PERSONAJE-ERROR':
        const { error } = action.payload;
        return {
          ...state,
          status: "Error",
          error,
        };
        default:
        return state;
      }
    };


export default personajesReducer;
