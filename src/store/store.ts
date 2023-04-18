import {
  combineReducers,
  applyMiddleware,
  compose,
  createStore,
} from "@reduxjs/toolkit";

// Importamos applyMiddleware de Redux, para poder agregar Thunk o Saga como Middleware
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";
import personajesReducer from "../reducers/personajesReducer";
import thunk from "redux-thunk";
import episodiosReducer from "../reducers/episodiosReducer";
import favoritosReducer from "../reducers/favoritosReducer";

const rootReducer = combineReducers({
  personajes: personajesReducer,
  episodios: episodiosReducer,
  favoritos: favoritosReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
// Tipamos el hook useSelector
export const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)) // Aqui aplicaremos los middlewares
);
