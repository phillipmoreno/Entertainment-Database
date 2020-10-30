class MovieDB {
  async getMovie(name) {
    const headersResponse = await fetch("../config.json");
    const headers = await headersResponse.json();

    const movieResponse = await fetch(
      `https://movie-database-imdb-alternative.p.rapidapi.com/?page=1&r=json&s=${name}`,
      {
        method: "GET",
        headers: headers,
      }
    );

    const movies = await movieResponse.json();

    return {
      movies,
    };
  }
}
