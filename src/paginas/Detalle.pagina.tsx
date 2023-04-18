import "./Detalle.css";
import BotonFavorito from "../componentes/botones/boton-favorito.componente";
import TarjetaEpisodio from "../componentes/episodios/tarjeta-episodio.componente";
import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { IRootState } from "../store/store";
import Episodio from "../types/episodio.types";
import { obtenerEpisodiosThunk } from "../actions/episodiosActions";
import Personaje from "../types/personaje.types";

/**
 * Esta es la pagina de detalle. Aqui se puede mostrar la vista sobre el personaje seleccionado junto con la lista de episodios en los que aparece
 *
 * EL TRABAJO SOBRE ESTE ARCHIVO ES OPCIONAL Y NO ES REQUISITO DE APROBACION
 *
 *
 *
 * Uso:
 * ``` <PaginaDetalle /> ```
 *
 * @returns {React.ReactElement} JSX element
 */
const PaginaDetalle: FC = () => {
  const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;
  const { episodios, status } = useSelector((state) => state.episodios);
  const dispatch = useDispatch();

  const location = useLocation();
  const state: any = location.state;
  const personaje: Personaje = { ...state.personaje };

  const [episodioId, setEpisodioId] = useState<(string | undefined)[]>([]);

  useEffect(() => {
    /**
     *  Array de episodios ID
     */
    const array: (string | undefined)[] = personaje.episode.map((episodio) => {
      return episodio.split("/").at(-1);
    });
    setEpisodioId(array);
  }, [personaje.episode]);

  useEffect(() => {
    dispatch(obtenerEpisodiosThunk(episodioId));
  }, [dispatch, episodioId]);

  return (
    <div className="container">
      <h3>{personaje.name}</h3>
      <div className={"detalle"}>
        <div className={"detalle-header"}>
          <img src={personaje.image} alt={personaje.name} />
          <div className={"detalle-header-texto"}>
            <p>{personaje.name}</p>
            <p>Planeta: {personaje.origin.name}</p>
            <p>Genero: {personaje.gender}</p>
          </div>
          <BotonFavorito personaje={personaje} />
        </div>
      </div>
      <h4>Lista de episodios donde apareció el personaje</h4>
      <div className={"episodios-grilla"}>
        {status === "LOADING" ? (
          <div>Cargando personajes...</div>
        ) : status === "FAILED" ? (
          <div>No se pudo cargar los personajes.</div>
        ) : !episodios ? (
          <></>
        ) : Array.isArray(episodios) ? (
          episodios.map((episodio: Episodio) => {
            return (
              <div key={`episodio_${episodio.id}_${personaje?.name}`}>
                <TarjetaEpisodio episodio={episodio} />
              </div>
            );
          })
        ) : (
          <TarjetaEpisodio episodio={episodios} />
        )}
      </div>
    </div>
  );
};

export default PaginaDetalle;
