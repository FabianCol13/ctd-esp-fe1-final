import { Action, ActionCreator, ThunkAction } from "@reduxjs/toolkit";
import { Episodios, Personaje } from "../types/type";
import { IRootState } from "../store/personajeStore";


const getPersonajes = async (name: string, page: number): Promise<GetPersonajes> => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`);
  const { results, info } = await response.json();

  return {
    personajes: results,
    totalPages: info.pages
  };
};


export const getPersonaje = async (id: number): Promise<GetPersonaje> => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const personaje = await response.json();
  const episodiosUrls = personaje.episode;
  const episodiosResponses = await Promise.all(episodiosUrls.map((url : any) => fetch(url)));
  const episodios = await Promise.all(episodiosResponses.map(response => response.json()));

  return {
    personaje,
    arrayEpisodios: episodios
  }
}


const findPersonajesAction: ActionCreator<FindPersonajesAction> = (
  name: string
): FindPersonajesAction => {
  return {
    type: "FETCH-PERSONAJE",
    payload: { name: name },
  };
};

const findPersonajesSuccess: ActionCreator<FindPersonajesSuccessAction> = (
  personajes: Personaje[],
  currentPage: number,
  totalPages: number
): FindPersonajesSuccessAction => {
  return {
    type: "FETCH-PERSONAJE-SUCCESS",
    payload: {
      personajes,
      currentPage,
      totalPages,
    },
  };
};

const findPersonajesError: ActionCreator<FindPersonajesErrorAction> = (
  error: string
): FindPersonajesErrorAction => {
  return {
    type: "FETCH-PERSONAJE-ERROR",
    payload: { error: error },
  };
};

export const findPersonajesThunk = (name: string, currentPage: number): FindPersonajesThunkAction => {
  return async (dispatch, getState) => {
    dispatch(findPersonajesAction(name));
    try {
      const response = await getPersonajes(name, currentPage);
      dispatch(
        findPersonajesSuccess(
          response.personajes,
          currentPage,
          response.totalPages
        )
      );
    } catch (error) {
      console.log(error);

      dispatch(findPersonajesError(error));
    }
  };
};

const findPersonajeByIdAction: ActionCreator<FindPersonajeByIdAction> = (
  id: number
): FindPersonajeByIdAction => {
  return {
    type: "FIND_PERSONAJE_BY_ID",
    payload: { id: id },
  };
};

const findPersonajeByIdSuccess: ActionCreator<
  FindPersonajeByIdSuccessAction
> = (personaje: Personaje, arrayEpisodios:Episodios[]): FindPersonajeByIdSuccessAction => {
  return {
    type: "FIND_PERSONAJE_BY_ID_SUCCESS",
    payload: { personaje, arrayEpisodios },
  };
};

const findPersonajeByIdError: ActionCreator<FindPersonajeByIdErrorAction> = (
  error: string
): FindPersonajeByIdErrorAction => {
  return {
    type: "FIND_PERSONAJE_BY_ID_ERROR",
    payload: { error: error },
  };
};

export const findPersonajeByIdThunk = (id: number): FindPersonajeByIdThunkAction => {
  return async (dispatch, getState) => {
    dispatch(findPersonajeByIdAction(id));
    try {
      const response = await getPersonaje(id);
      dispatch(
        findPersonajeByIdSuccess(
          response.personaje,
          response.arrayEpisodios
        )
      );
    } catch (error) {
      console.log(error);

      dispatch(findPersonajeByIdError(error));
    }
  };
};
export const addFavoritoPersonajeAction: ActionCreator<
  AddFavoritoPersonajeAction
> = (personaje: Personaje): AddFavoritoPersonajeAction => {
  return {
    type: "ADD_FAVORITO_PERSONAJE",
    payload: { personaje: personaje },
  };
};

export const deleteFavoritoPersonaje: ActionCreator<
  DeleteFavoritoPersonajeAction
> = (personaje: Personaje): DeleteFavoritoPersonajeAction => {
  return {
    type: "DELETE_FAVORITO_PERSONAJE",
    payload: { personaje: personaje },
  };
};

export const deleteAllFavoritoPersonaje: ActionCreator<
  DeleteAllFavoritoPersonajeAction
> = (personaje: Personaje): DeleteAllFavoritoPersonajeAction => {
  return {
    type: "DELETE_ALL_FAVORITO_PERSONAJE",
  };
};


interface GetPersonajes {
  personajes: Personaje[];
  totalPages: number;
}

interface GetPersonaje {
  personaje: Personaje;
  arrayEpisodios:Episodios[];
}


interface FindPersonajeByIdThunkAction
  extends ThunkAction<
    void,
    IRootState,
    unknown,
    | FindPersonajeByIdAction
    | FindPersonajeByIdSuccessAction
    | FindPersonajeByIdErrorAction
  > { }

interface FindPersonajesAction extends Action {
  type: "FETCH-PERSONAJE";
  payload: { name: string };
}

interface FindPersonajesSuccessAction extends Action {
  type: "FETCH-PERSONAJE-SUCCESS";
  payload: {
    personajes: Personaje[];
    currentPage: number;
    totalPages: number;
  };
}

interface FindPersonajesErrorAction extends Action {
  type: "FETCH-PERSONAJE-ERROR";
  payload: { error: string };
}

interface FindPersonajeByIdAction extends Action {
  type: "FIND_PERSONAJE_BY_ID";
  payload: { id: number };
}

interface FindPersonajeByIdSuccessAction extends Action {
  type: "FIND_PERSONAJE_BY_ID_SUCCESS";
  payload: { personaje: Personaje, arrayEpisodios: Episodios[]};
}

interface FindPersonajeByIdErrorAction extends Action {
  type: "FIND_PERSONAJE_BY_ID_ERROR";
  payload: { error: string };
}

interface AddFavoritoPersonajeAction extends Action {
  type: "ADD_FAVORITO_PERSONAJE";
  payload: { personaje: Personaje };
}

interface DeleteFavoritoPersonajeAction extends Action {
  type: "DELETE_FAVORITO_PERSONAJE";
  payload: { personaje: Personaje };
}

interface DeleteAllFavoritoPersonajeAction extends Action {
  type: "DELETE_ALL_FAVORITO_PERSONAJE";
}

interface FindPersonajesThunkAction
  extends ThunkAction<
    void,
    IRootState,
    unknown,
    | FindPersonajesAction
    | FindPersonajesSuccessAction
    | FindPersonajesErrorAction
  > { }



export type PersonajesActions =
  | FindPersonajesAction
  | FindPersonajesSuccessAction
  | FindPersonajesErrorAction
  | FindPersonajeByIdAction
  | FindPersonajeByIdSuccessAction
  | FindPersonajeByIdErrorAction
  | AddFavoritoPersonajeAction
  | DeleteFavoritoPersonajeAction
  | DeleteAllFavoritoPersonajeAction;
