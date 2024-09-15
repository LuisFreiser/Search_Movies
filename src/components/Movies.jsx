import PropTypes from "prop-types";

export const MoviesList = ({ movies }) => {
  const hasMovies = movies?.length > 0; //Si es mayor a "0" devuelve true

  //Validando las propiedades de la función con PropTypes
  MoviesList.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  };
  return (
    <>{hasMovies ? <ListOfMovies movies={movies} /> : <NoResultsMovies />}</>
  );
};

export const ListOfMovies = ({ movies }) => {
  //Validando las propiedades de la función con PropTypes
  ListOfMovies.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  };
  return (
    <ul className="movies">
      {movies.map((movie) => (
        <li className="movie" key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.poster} alt={movie.title} />
        </li>
      ))}
    </ul>
  );
};

export const NoResultsMovies = () => {
  return <p>No hay resultados para tu busqueda</p>;
};
