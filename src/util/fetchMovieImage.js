const { VITE_THE_MOVIE_DB_API_KEY } = import.meta.env;

const fetchMovieImage = async (movie) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${VITE_THE_MOVIE_DB_API_KEY}&query=${movie}`,
    {
      method: 'GET',
    }
  );

  if (response.status !== 200) {
    return;
  }
  const data = await response.json();
  if (data && data.results && data.results.length > 0) {
    const movie = data.results[0];
    const image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    return image;
  }
};

export default fetchMovieImage;
