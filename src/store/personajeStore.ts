import { TypedUseSelectorHook,useSelector as useReduxSelector } from "react-redux";
import type { } from 'redux-thunk/extend-redux';
import  thunk from "redux-thunk";
import { combineReducers } from "@reduxjs/toolkit";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import personajeReducer from "../reducer/personajeReducer";

const root = combineReducers({
  personaje: personajeReducer,
});

export type IRootState = ReturnType<typeof root>;
export const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;

export const store = createStore(
  root,
  composeWithDevTools(applyMiddleware(thunk))
);