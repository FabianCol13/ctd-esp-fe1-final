import { Action, ActionCreator, ThunkAction } from "@reduxjs/toolkit";
import { filtrarPersonajesAPI, cambiarPagina } from "../services/personaje.services";
import { IRootState } from "../store/store";
import PaginaInfo from "../types/infoPagina.types";
import Personaje from "../types/personaje.types";

export interface FiltrarPersonajesAction extends Action {
  type: "FILTRAR_PERSONAJES";
  query: string;
}

export interface FiltrarPersonajesSuccessAction extends Action {
  type: "FILTRAR_PERSONAJES_SUCCESS";
  personajes: Personaje[];
  paginaInfo: PaginaInfo;
}

export interface FiltrarPersonajesErrorAction extends Action {
  type: "FILTRAR_PERSONAJES_ERROR";
  mensaje: string | number;
}

export interface FiltrarPersonajesThunk
  extends ThunkAction<void, IRootState, unknown, PersonajeActions> {}

export const filtrarPersonajesThunk = (
  query: string
): FiltrarPersonajesThunk => {
  return async (dispatch, getState) => {
    getState();
    dispatch(filtrarPersonajes(query));
    try {
      const response = await filtrarPersonajesAPI(query);
      const [personajes, info, status] = response;
      if (status === 200) {
        dispatch(filtrarPersonajesSuccessAction(personajes, info));
      } else {
        dispatch(filtrarPersonajesErrorAction(status));
      }
    } catch (e) {
      dispatch(filtrarPersonajesErrorAction(e));
    }
  };
};

export const cambiarPaginaThunk = (url: string): FiltrarPersonajesThunk => {
    return async (dispatch, getState) => {
      getState();
      try {
        const [personajes, info] = await cambiarPagina(url);
        dispatch(filtrarPersonajesSuccessAction(personajes, info));
      } catch (e) {
        dispatch(filtrarPersonajesErrorAction(e));
      }
    };
  };

export const filtrarPersonajes: ActionCreator<FiltrarPersonajesAction> = (
  query: string
) => {
  return {
    type: "FILTRAR_PERSONAJES",
    query: query,
  };
};

export const filtrarPersonajesSuccessAction: ActionCreator<
  FiltrarPersonajesSuccessAction
> = (personajes: Personaje[], paginaInfo: PaginaInfo) => {
  return {
    type: "FILTRAR_PERSONAJES_SUCCESS",
    personajes: personajes,
    paginaInfo: paginaInfo,
  };
};

export const filtrarPersonajesErrorAction: ActionCreator<
  FiltrarPersonajesErrorAction
> = (mensaje: string | number) => {
  return {
    type: "FILTRAR_PERSONAJES_ERROR",
    mensaje: mensaje,
  };
};

export type PersonajeActions =
  | ReturnType<typeof filtrarPersonajes>
  | ReturnType<typeof filtrarPersonajesSuccessAction>
  | ReturnType<typeof filtrarPersonajesErrorAction>;
