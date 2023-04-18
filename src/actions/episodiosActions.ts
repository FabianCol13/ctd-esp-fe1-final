import { Action, ActionCreator, ThunkAction } from "@reduxjs/toolkit";
import { fetchEpisodios } from "../services/personaje.services";
import { IRootState } from "../store/store";
import Episodio from "../types/episodio.types";

interface obtenerEpisodioAction extends Action {
  type: "OBTENER_EPISODIO";
  query: string;
}
interface obtenerEpisodioActionSuccessAction extends Action {
  type: "OBTENER_EPISODIO_SUCCESS";
  episodios: Episodio | Episodio[];
}
interface obtenerEpisodioErrorAction extends Action {
  type: "OBTENER_EPISODIO_ERROR";
  error: string;
}

const obtenerEpisodio: ActionCreator<obtenerEpisodioAction> = (query: string) => {
  return {
    type: "OBTENER_EPISODIO",
    query: query,
  };
};

const obtenerEpisodioActionSuccess: ActionCreator<obtenerEpisodioActionSuccessAction> = (
  episodios: Episodio | Episodio[]
) => {
  return {
    type: "OBTENER_EPISODIO_SUCCESS",
    episodios: episodios,
  };
};

const obtenerEpisodioError: ActionCreator<obtenerEpisodioErrorAction> = (
  mensaje: string
) => {
  return {
    type: "OBTENER_EPISODIO_ERROR",
    error: mensaje,
  };
};

export type EpisodiosActions =
  | ReturnType<typeof obtenerEpisodio>
  | ReturnType<typeof obtenerEpisodioActionSuccess>
  | ReturnType<typeof obtenerEpisodioError>;

interface FetchEpisodiosThunkAction
  extends ThunkAction<void, IRootState, unknown, EpisodiosActions> {}

export const obtenerEpisodiosThunk = (
  episodioId: (string | undefined)[]
): FetchEpisodiosThunkAction => {
  return async (dispatch, getState) => {
    try {
      const response = await fetchEpisodios(episodioId);
      if (response !== undefined) {
        dispatch(obtenerEpisodioActionSuccess(response));
      }
    } catch (e) {
      dispatch(obtenerEpisodioError(e));
    }
  };
};
