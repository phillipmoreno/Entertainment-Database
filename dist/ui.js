class UI {
  constructor() {
    this.movieContainer = document.querySelector(".movie-container");
    this.favoritesContainer = document.querySelector(".favorites-container");
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
          <li class = "movie-title">${movie.Title} (${movie.Year})</li>
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
          <li class = "movie-title">${movie.Title} (${movie.Year})</li>
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
    console.log(selected);
    let output = "";
    if (selected.Poster !== "N/A") {
      output += `
      <button class="go-back-button"><i class="fas fa-arrow-left"></i> Return To Search Results</button>
      <div class ="selected-item-container">
      <div class="flex-selected-showcase">
      <h1>${selected.Title} (${selected.Year})</h1>
      <img src = "${selected.Poster}" alt = "${selected.Title} Poster">
      </div>
      <div class="flex-selected-details">
      <ul class = "info-list">
      <li>Plot: ${selected.Plot}</li>
      <li>Starring: ${selected.Actors}</li>
      <li>Released on: ${selected.Released} (${selected.Country})</li>
      <li>Genre: ${selected.Genre}</li>
      <li>Rated: ${selected.Rated}</li>
      <li>Type: ${selected.Type}</li>
      <li>IMDB Rating: ${selected.imdbRating}</li>
      <li>Runtime: ${selected.Runtime}</li>
      <li>Total Seasons: ${selected.totalSeasons}</li>
      <li>Written by: ${selected.Writer}</li>
      <li>IMDB ID: <span id="imdb-id">${selected.imdbID}</span></li>
      <button class="add-to-list-button">Add To Favorites<i class="fas fa-heart"></i></button>
      </ul>
      </div>
      </div>`;
    } else {
      output += `
      <button class="go-back-button"><i class="fas fa-arrow-left"></i> Return To Search Results</button>
      <div class ="selected-item-container">
      <div class="flex-selected-showcase">
      <h1>${selected.Title} (${selected.Year})</h1>
      <img src = "./img/no-img.png" alt = "${selected.Title} Poster">
      </div>
      <div class="flex-selected-details">
      <ul class = "info-list">
      <li>Plot: ${selected.Plot}</li>
      <li>Starring: ${selected.Actors}</li>
      <li>Released on: ${selected.Released} (${selected.Country})</li>
      <li>Genre: ${selected.Genre}</li>
      <li>Rated: ${selected.Rated}</li>
      <li>Type: ${selected.Type}</li>
      <li>IMDB Rating: ${selected.imdbRating}</li>
      <li>Runtime: ${selected.Runtime}</li>
      <li>Total Seasons: ${selected.totalSeasons}</li>
      <li>Written by: ${selected.Writer}</li>
      <li>IMDB ID: <span id="imdb-id">${selected.imdbID}</span></li>
      <button class="add-to-list-button">Add To Favorites<i class="fas fa-heart"></i></button>
      </ul>
      </div>
      </div>`;
    }

    this.movieContainer.innerHTML = output;

    const saveToListBtn = document
      .querySelector(".add-to-list-button")
      .addEventListener("click", () => {
        console.log(selected);
        let savedTitles;
        if (localStorage.getItem("savedTitles") === null) {
          savedTitles = [];
        } else {
          savedTitles = JSON.parse(localStorage.getItem("savedTitles"));
        }

        let unique = true;
        savedTitles.forEach((listItem) => {
          if (listItem.imdbID === selected.imdbID) {
            unique = false;
          }
        });

        if (unique === true) {
          savedTitles.push(selected);
          localStorage.setItem("savedTitles", JSON.stringify(savedTitles));
        }
      });
  }

  showFavorites() {
    let savedTitles;
    let output = "";
    if (localStorage.getItem("savedTitles") === null) {
      output += `<h1> You have no movies saved</h1>`;
    } else {
      savedTitles = JSON.parse(localStorage.getItem("savedTitles"));
      savedTitles.forEach((title) => {
        output += `
        <div class="favorite-item-container">
          <img src="${title.Poster}" alt="${title.Title}">
          <ul>
            <li>${title.Title}</li>
          </ul>
        </div>`;
      });
      this.favoritesContainer.innerHTML = output;
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
