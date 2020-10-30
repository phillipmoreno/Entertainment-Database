class UI {
  constructor() {
    this.movieContainer = document.querySelector(".movie-container");
  }

  showMovie(searchResult) {
    console.log(searchResult);
    const movieArr = searchResult.movies.Search;
    let output = "";
    movieArr.forEach((movie) => {
      if (movie.Poster !== "N/A") {
        output += `
        <div class ="movie-item-container">
        <img src = "${movie.Poster}" alt = "${movie.Title} Poster" class = "flex-img">
        <ul class = "flex-list">
        <li class = "movie-title">${movie.Title}</li>
        <li>Release Year: ${movie.Year}</li>
        <li>Type: ${movie.Type}</li>
        <li>IMBD ID: ${movie.imdbID}</li>
        </ul>
        </div>`;
      } else {
        output += `
        <div class ="movie-item-container">
        <img src = "./img/no-img.png" alt = "${movie.Title} Poster" class = "flex-img">
        <ul class = "flex-list">
        <li class = "movie-title">${movie.Title}</li>
        <li>Release Year: ${movie.Year}</li>
        <li>Type: ${movie.Type}</li>
        <li>IMBD ID: ${movie.imdbID}</li>
        </ul>
        </div>`;
      }
    });

    this.movieContainer.innerHTML = output;
  }
}
