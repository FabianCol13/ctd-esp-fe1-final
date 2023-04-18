import { combineReducers } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import personajesReducer from "../reducers/personajesReducer";
import favoritosReducer from "../reducers/favoritosReducer";

// Importamos applyMiddleware de Redux, para poder agregar Thunk o Saga como Middleware
import { createStore, applyMiddleware } from "redux";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  personajes: personajesReducer,
  personajesFavoritos: favoritosReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;

// Tipamos el hook useSelector par obtener los datos de la store:
export const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) // Aqui aplicaremos los middlewares
);
