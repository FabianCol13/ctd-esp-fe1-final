import "./grilla-personajes.css";
import TarjetaPersonaje from "./tarjeta-personaje.componente";
import { IRootState } from "../../store/store";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";
import React, { FC } from "react";

export const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;
/**
 * Grilla de personajes para la pagina de inicio
 * @author Fabian Garcia
 * @returns {JSX.Element}
 */
const GrillaPersonajes: FC = (): JSX.Element => {
  const { personajes, status } = useSelector((state) => state.personajes);

  if (status === "CARGANDO") return <div>Cargando personajes...</div>;
  if (!personajes || personajes.length === 0)
    return <>No hay personajes que coincidan con la busqueda</>; //! ver si funca que no explote todo cuando buscas cualca

  return (
    <div className="grilla-personajes">
      {personajes.map((personaje) => {
        return (
          <TarjetaPersonaje
            name={personaje.name}
            image={personaje.image}
            id={personaje.id}
            key={personaje.id}
          />
        );
      })}
    </div>
  );
};

export default GrillaPersonajes;
