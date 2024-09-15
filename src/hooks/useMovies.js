import { useState, useRef, useMemo, useCallback } from "react";
import { searchMovies } from "../services/searchMovies";

//CREANDO UN CUSTOM HOOK USANDO UNA FUNCION "USEMOVIES"
export const useMovies = ({ search, sort }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(null);

  //Usando useRef para guardar la busqueda anterior
  const previousSearch = useRef(search);//useRef no cambia en cada renderizado y guardara la busqueda anterior

  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return;//Si la busqueda es igual a la anterior, no se hace la peticion ni el renderizado
    try {
      setLoading(true);
      setError(null);
      previousSearch.current = search;//Guardando la primera busqueda
      const newMovies = await searchMovies({ search })
      setMovies(newMovies);
    } catch (error) {
      setError(error.message);
    } finally {//Esto se ejecuta siempre, al finalizar el Try o el Catch
      setLoading(false);
    }
  }, [])

  //Usando useMemo para optimizar el renderizado
  const sortedMovies = useMemo(() => {
    return sort ? [...movies].sort((a, b) => a.year - b.year) : movies;//Ordenando con "Sort" por año de forma ascendente  
  }, [movies, sort])//Renderiza solo cuando cambia la variables "movies" o "sort"

  return { movies: sortedMovies, getMovies, loading }; //Devolviendo el objeto la funcion y las variables
}
