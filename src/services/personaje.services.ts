import Personaje from "../types/personaje.types";
import PaginaInfo from "../types/infoPagina.types";
import Episodio from "../types/episodio.types";

/**
 * 
Función que devuelve todos los personajes por página y filtrados por nombre si es necesario.
 *
 * @param {string | undefined} name
 * @returns {Promise<[Personaje[], PaginaInfo, number] | [any, any, number]>} retornar personajes e informacion
 */

export const filtrarPersonajesAPI = async (
  name?: string
): Promise<[Personaje[], PaginaInfo, number] | [any, any, number]> => {
  let nameParam = "";
  if (name !== "" && name !== undefined) {
    nameParam = `name=${name}`;
  }
  return fetch(`https://rickandmortyapi.com/api/character?${nameParam}`).then(
    function (response) {
      return response
        .json()
        .then((data) => [data.results, data.info, response.status]);
    }
  );
};

/**
 *  
Función que devuelve personajes por página.
 *
 * @param {string }url
 * @returns {Promise<[Personaje[], PaginaInfo]>} retorna personajes e informacion.
 */
export const cambiarPagina = async (
  url: string
): Promise<[Personaje[], PaginaInfo]> => {
  return fetch(url)
    .then((data) => data.json())
    .then((data) => [data.results, data.info]);
};

/**
 *
 *
 * @param {Array<number>} arrayEpisodeID
 * @returns {Promise<Episodio | Episodio[]>}
 */
export const fetchEpisodios = async (id: (string | undefined)[]): Promise<Episodio> => {
  const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
  const data = await response.json();
  return data;
};
