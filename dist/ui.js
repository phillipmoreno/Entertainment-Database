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
