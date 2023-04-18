import { FC } from "react";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import TarjetaPersonaje from "../componentes/personajes/tarjeta-personaje.componente";
import { IRootState } from "../store/store";
import { removeAllFavorito } from "../actions/favoritosAction";

/**
 * Esta es la pagina de favoritos. Aquí se deberan ver todos los personajes marcados como favoritos
 *
 * Uso:
 * ``` <PaginaFavoritos /> ```
 *
 * @returns {React.ReactElement} JSX element
 */
const PaginaFavoritos: FC = () => {
  const dispatch = useDispatch();
  const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;
  const favoritoMap = useSelector((state) => state.favoritos.favoritosMapa);

  return (
    <div className="container">
      <div className="actions">
        <h3>Personajes Favoritos</h3>

        <button
          className="danger"
          onClick={() => dispatch(removeAllFavorito())}
        >
          Eliminar todos
        </button>
      </div>
      {favoritoMap.size === 0 ? (
        <>No hay favoritos</>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridGap: "20px",
            justifyItems: "center",
          }}
        >
          {Array.from(favoritoMap.values()).map((personaje, index) => {
            return (
              <div key={personaje.id}>
                <TarjetaPersonaje personaje={personaje} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PaginaFavoritos;
