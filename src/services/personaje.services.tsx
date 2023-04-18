import Personaje from "../types/personaje.types";

export const buscarPersonajeAPI = async (
  nombre?: string
): Promise<Personaje[] | unknown> => {
  let params = "?";
  if (nombre) {
    if (nombre?.includes("page")) {
      params += nombre;
    } else {
      params += `name=${nombre}`;
    }
  }

  try {
    return fetch(`https://rickandmortyapi.com/api/character/${params}`)
      .then((data) => data.json())
      .then((data) => data);
  } catch (error) {
    return error;
  }
};

//TODO: hacer un try catch
