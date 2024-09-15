//Importando Debounce IT
import debounce from "just-debounce-it";
import { useState, useCallback } from "react";
import { useMovies } from "./hooks/useMovies.js";
import { MoviesList } from "./components/Movies.jsx";
import { useSearch } from "./hooks/useSearch.js";

//DEFINIENDO LA FUNCION DEBOUNCE FUERA DE USECALLBACK  Y DEL COMPONENTE APP
const debounceFn = debounce((search, getMovies) => {
  getMovies({ search });
}, 2000);

//DEFINIENDO EL COMPONENTE APP PRINCIPAL
function App() {
  const [sort, setSort] = useState(false);
  //usando customs hooks creados
  const { search, setSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort });

  //USANDO DEBOUNCE PARA LA BUSQUEDA Y NO RENDERIZAR CADA VEZ QUE SE ESCRIBE EN EL INPUT CON USECALLBACK
  const debounceGetMovies = useCallback(
    (search) => {
      debounceFn(search, getMovies);
    },
    [getMovies]
  );

  //CONTROLADOR DEL EVENTO SUBMIT DEL FORM COMO SI FUERA UN CLICK DEL BOTON
  const handleSubmit = (event) => {
    event.preventDefault(); //Evitando el control de envio por defecto del Form

    //USANDO DE MANERA CONTROLADA CON EL CHANGE DEL INPUT
    getMovies({ search });

    // USANDO DE MANERA DESCONTROLADA CON JAVASCRIPT VANILLA
    //"Object.fromEntries" convierte un arreglo de pares clave-valor en un objeto
    // const { search } = Object.fromEntries(new FormData(event.target)); //"FormData" captura todos los campos del formulario en pares clave-valor.
  };

  const handleSort = () => {
    setSort(!sort);
  };

  //CONTROLADOR DEL EVENTO CHANGE DEL INPUT DE BUSQUEDA
  const handleChange = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    debounceGetMovies(newSearch); //Llamando a la función "debounceGetMovies" cada vez que voy escribiendo en el input para la busqueda(debounce)
  };

  //RENDERIZADO TOTAL DE COMPONENTES
  return (
    <div className="page">
      <header>
        <h1>BUSCADOR DE PELICULAS</h1>

        <form onSubmit={handleSubmit}>
          <div className="error">{error && <span>{error}</span>}</div>
          <div className="input-group">
            <input
              onChange={handleChange}
              value={search}
              name="search"
              placeholder="Ingresar Pelicula....!!!!!"
            />
            <button type="submit">BUSCAR</button>
          </div>
          <div className="check-group">
            <label>
              <input
                type="checkbox"
                name="sort"
                onChange={handleSort}
                checked={sort}
              />
              Orden Year
            </label>
          </div>
        </form>
      </header>

      <main>
        {/* RESULTADO LISTA DE PELICULAS */}
        {loading ? (
          <p style={{ textAlign: "center" }}>Cargando...</p>
        ) : (
          <MoviesList movies={movies} />
        )}
      </main>
    </div>
  );
}

export default App;
