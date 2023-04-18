import { Reducer } from "@reduxjs/toolkit";
import Personaje from "../../types/characters.types";
import PageInfo from "../../types/pageinfo.types";
import { PersonajesAction } from "../actions/personajes.actions";


export interface PersonajesState {
    busqueda: string;
    status: "idle" | "fetching" | "success" | "error",
    personajes: Personaje[],
    pageInfo: PageInfo;
    error: string | null,
    favoritos: Personaje[],
}

const initialState: PersonajesState = {
    busqueda: '',
    status: "idle",
    personajes: [],
    pageInfo: { count: 0, pages: 0, next: "0", prev: "1" },
    error: null,
    favoritos: [],
};

/**
 * Funciones reductora de los personajes
 * 
 * @param {State} state 
 * @param {DataStore.Reducer<PersonajesState, PersonajesAction>} action 
 * @returns {State} un estado
 */

const personajesReducer: Reducer<PersonajesState, PersonajesAction> =
    (state = initialState, action): PersonajesState => {
        switch (action.type) {
            case "CHANGE_FAVORITO":
                return{
                    ...state,
                    personajes: [...state.personajes, action.payload ]
                }
            case "ADD_FAVORITO":
                return {
                    ...state,
                    favoritos:
                    [action.payload, ...state.favoritos.filter(e => e.id !== action.payload.id)] 
                }
            case "REMOVE_FAVORITO":
                return {
                    ...state,
                    favoritos: state.favoritos.filter((personaje) => personaje.id !== action.payload.id)
                }
            case "IS_ERROR_PERSONAJES":
                return {
                    ...state,
                    error: action.payload.error,
                    status: "error",
                    personajes: []
                }
            case "IS_FETCHING_PERSONAJES":
                return {
                    ...state,
                    busqueda: action.payload.name,
                    status: "fetching",
                    personajes: [],
                    error: null
                }
            case "IS_SUCCESS_PERSONAJES":
                return {
                    ...state,
                    status: "success",
                    personajes: action.payload.personajes,
                    pageInfo: action.payload.pageInfo,
                    error: null
                }
            case "REMOVE_TODO_FAVORITOS":
                return {
                    ...state,
                    favoritos: []
                }
            default:
                return { ...state };
        }
    }
export default personajesReducer;