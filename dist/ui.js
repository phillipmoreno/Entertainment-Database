class UI {
  constructor() {
    this.movieContainer = document.querySelector(".movie-container");
  }

  showMovie(searchResult) {
    console.log(searchResult);
    if (searchResult.movies.Response === "False") {
      this.showError();
    } else {
      const movieArr = searchResult.movies.Search;
      let output = "";
      if (movieArr.length === 1) {
        output += `<div class ="alert-message"><h1>${movieArr.length} match found</h1></div>`;
      } else {
        output += `<div class ="alert-message"><h1>${movieArr.length} matches found</h1></div>`;
      }

      movieArr.forEach((movie) => {
        if (movie.Poster !== "N/A") {
          output += `
          <div class ="movie-item-container">
          <img src = "${movie.Poster}" alt = "${movie.Title} Poster" class = "flex-img">
          <ul class = "flex-list">
          <li class = "movie-title">${movie.Title}</li>
          <li>Release Year: ${movie.Year}</li>
          <li>Type: ${movie.Type}</li>
          <li>IMBD ID: <span id="imdb-id">${movie.imdbID}</span></li>
          <li><button class="btn-info">More Info</button></li>
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
          <li>IMBD ID: <span id="imdb-id">${movie.imdbID}</span></li>
          <li><button class="btn-info">More Info</button></li>
          </ul>
          </div>`;
        }
      });
      this.movieContainer.innerHTML = output;
    }
  }

  showSelectedTitle(title) {
    const selected = title.selectedTitle;
    const searchBar = document.getElementById("movie-show-title");
    searchBar.value = selected.Title;
    console.log(selected);
    let output = `
    <div class ="selected-item-container">
    <h1>${selected.Title} (${selected.Year})</h1>
    <img src = "${selected.Poster}" alt = "${selected.Title} Poster">
    <ul class = "info-list">
    <li>Plot: ${selected.Plot}</li>
    <li>Starring: ${selected.Actors}</li>
    <li>Released on: ${selected.Released} (${selected.Country})</li>
    <li>Type: ${selected.Type}</li>
    <li>IMDB Rating: ${selected.imdbRating}</li>
    <li>Runtime: ${selected.Runtime}</li>
    <li>Total Seasons: ${selected.totalSeasons}</li>
    <li>Written by: ${selected.Writer}</li>
    <li>Language: ${selected.Language}</li>
    <li>IMDB ID: <span id="imdb-id">${selected.imdbID}</span></li>
    </ul>
    </div>`;
    this.movieContainer.innerHTML = output;
  }

  showSelectedMovie() {}

  showSelectedSeries() {}

  showSelectedGame() {}

  showError() {
    this.clearAlert();
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert-message";
    alertDiv.innerHTML = `<h1>No Matches Found</h1>`;

    this.movieContainer.appendChild(alertDiv);
    setTimeout(() => {
      if (alertDiv.parentNode == this.movieContainer) {
        this.movieContainer.removeChild(alertDiv);
      }
    }, 2800);
  }

  clearAlert() {
    this.clearSearch();
    const alertDiv = document.querySelector(".alert-message");

    if (alertDiv) {
      alertDiv.remove();
    }
  }

  clearSearch() {
    this.movieContainer.innerHTML = "";
  }
}
