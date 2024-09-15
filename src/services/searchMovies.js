const API_KEY = "4287ad07";

export const searchMovies = async ({ search }) => {
    if (search === "") return [];//Si la busqueda es igual a vacio, no se hace el renderizado y devuelve un array vacio
    try {
        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
        );
        const data = await response.json();
        //Almacenando el objeto Json en la variable "movies"
        const movies = data.Search;
        //Retornando y Mapeando el objeto MOVIES
        return movies?.map((movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
        }));
    } catch (error) {
        throw new error("Error searching movies");
    }
};
