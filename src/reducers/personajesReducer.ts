import { Reducer } from "@reduxjs/toolkit";
import { PersonajeActions } from "../actions/personajesActions";
import Personaje from "../types/personaje.types";
import PaginaInfo from "../types/infoPagina.types";

export interface PersonajesState {
  status: "IDLE" | "LOADING" | "COMPLETED" | "FAILED";
  personajes: Personaje[];
  query: string;
  paginaInfo: PaginaInfo;
  error: string | number | null;
}

const initialState: PersonajesState = {
  status: "IDLE",
  personajes: [],
  query: "",
  paginaInfo: { count: 0, pages: 0, next: "", prev: "" },
  error: null,
};

/**
 * personajes reducer
 *
 * @param {State} state
 * @param {DataStore.Reducer<PersonajesState, PersonajeActions>} action
 *
 * @returns {State}
 */

const personajesReducer: Reducer<PersonajesState, PersonajeActions> = (
  state = initialState,
  action
): PersonajesState => {
  switch (action.type) {
    case "FILTRAR_PERSONAJES":
      return {
        ...state,
        status: "LOADING",
        personajes: [],
        query: action.query,
        error: null,
      };
    case "FILTRAR_PERSONAJES_SUCCESS":
      return {
        ...state,
        status: "COMPLETED",
        personajes: action.personajes,
        paginaInfo: action.paginaInfo,
      };
    case "FILTRAR_PERSONAJES_ERROR":
      return {
        ...state,
        status: "FAILED",
        personajes: [],
        error: action.mensaje,
      };
    default:
      return { ...state };
  }
};
export default personajesReducer;
