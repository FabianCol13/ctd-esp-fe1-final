import { Action, ActionCreator } from "@reduxjs/toolkit";
import Personaje from "../types/personaje.types";

//crear interfaces
export interface AgregarFavoritoAction extends Action {
  type: "AGREGAR_FAVORITO";
  personaje: Personaje;
}

export interface SacarFavoritoAction extends Action {
  type: "SACAR_FAVORITO";
  personaje: Personaje;
}

export interface SacarTodosLosFavoritosAction extends Action {
  type: "SACAR_TODOS_LOS_FAVORITOS";
}

export const agregarFavorito: ActionCreator<AgregarFavoritoAction> = (
  personaje: Personaje
) => {
  return {
    type: "AGREGAR_FAVORITO",
    personaje,
  };
};

export const sacarFavorito: ActionCreator<SacarFavoritoAction> = (
  personaje: Personaje
) => {
  return {
    type: "SACAR_FAVORITO",
    personaje,
  };
};

export const sacarTodosLosFavoritos: ActionCreator<
  SacarTodosLosFavoritosAction
> = () => {
  return {
    type: "SACAR_TODOS_LOS_FAVORITOS",
  };
};

export type FavoritosAction =
  | AgregarFavoritoAction
  | SacarFavoritoAction
  | SacarTodosLosFavoritosAction;
