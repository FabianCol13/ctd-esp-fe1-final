interface Origin {
  name: string;
} 

export interface Personaje {
  id: number;
  name: string;
  gender: string;
  origin: Origin;
  image: string;
  episode: string[];
}

export interface Episodios {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}
