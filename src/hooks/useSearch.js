import { useState, useEffect, useRef } from "react";

export const useSearch = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  //useRef es útil porque su valor (current) persiste entre renders sin causar que el componente se vuelva a renderizar,
  //lo que lo convierte en una buena opción para almacenar información que no necesita disparar una nueva renderización,
  //como este caso de control de la primera entrada.
  const isFirstInput = useRef(true); //Verificando si es el primer renderizado para no mostrar las validaciones

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ""; //Si search es igual a vacio devolvera true y no se hará la validación
      return;
    }
    if (search.startsWith(" ")) {
      setError("La Pelicula no puede comenzar con un espacio vacío");
      return;
    }
    if (search === "") {
      setError("Ingresar Pelicula");
      return;
    }
    if (search.length < 3) {
      setError("La Pelicula debe tener al menos 3 caracteres");
      return;
    }
    setError(null);
  }, [search]); //Renderiza solo cuando cambia la variable "search"

  return { search, setSearch, error }; //Devolviendo las variables
};
