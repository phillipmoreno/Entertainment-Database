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
          <li>Title ID: <span id="imdb-id">${movie.imdbID}</span></li>
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
          <li>Title ID: <span id="imdb-id">${movie.imdbID}</span></li>
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
      <li>Release Date: ${selected.Released} (${selected.Country})</li>
      <li>Genre: ${selected.Genre}</li>
      <li>Rated: ${selected.Rated}</li>
      <li>Type: ${selected.Type}</li>
      <li>IMDB Rating: ${selected.imdbRating}</li>
      <li>Runtime: ${selected.Runtime}</li>
      <li>Total Seasons: ${selected.totalSeasons}</li>
      <li>Written by: ${selected.Writer}</li>
      <li>Title ID: <span id="imdb-id">${selected.imdbID}</span></li>
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
      <li>Release Date: ${selected.Released} (${selected.Country})</li>
      <li>Genre: ${selected.Genre}</li>
      <li>Rated: ${selected.Rated}</li>
      <li>Type: ${selected.Type}</li>
      <li>IMDB Rating: ${selected.imdbRating}</li>
      <li>Runtime: ${selected.Runtime}</li>
      <li>Total Seasons: ${selected.totalSeasons}</li>
      <li>Written by: ${selected.Writer}</li>
      <li>Title ID: <span id="imdb-id">${selected.imdbID}</span></li>
      <button class="add-to-list-button">Add To Favorites<i class="fas fa-heart"></i></button>
      </ul>
      </div>
      </div>`;
    }

    this.movieContainer.innerHTML = output;

    const saveToListBtn = document
      .querySelector(".add-to-list-button")
      .addEventListener("click", () => {
        if (document.querySelector(".success-list")) {
          document.querySelector(".success-list").remove();
        }
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

        const success = document.createElement("div");
        const showcase = document.querySelector(".selected-item-container");
        success.className = "success-list";
        if (unique === true) {
          success.innerHTML = `
          <h1>Success! ${selected.Title} Has Been Added To Favorites<i class="fas fa-check"></i></h1>`;
          savedTitles.push(selected);
          localStorage.setItem("savedTitles", JSON.stringify(savedTitles));
        } else {
          success.innerHTML = `
          <h1>${selected.Title} Is Already In Your Favorites<i class="fas fa-info-circle"></i></h1>`;
        }

        this.movieContainer.insertBefore(success, showcase);
        setTimeout(() => {
          success.remove();
        }, 3000);
      });
  }

  showFavorites() {
    let output = "";
    if (localStorage.getItem("savedTitles") === null) {
      output += `<h1 class="num-of-titles"> You currently have no titles saved</h1>`;
      this.favoritesContainer.innerHTML = output;
    } else {
      let savedTitles = JSON.parse(localStorage.getItem("savedTitles"));
      output += `<h1 class="num-of-titles"> You Have ${savedTitles.length} Title(s) Saved</h1>`;
      savedTitles.forEach((title) => {
        output += `
        <div class="favorite-item-container">
          <div class="flex-showcase"
            <h1><span class="title-name">${title.Title}</span> (${title.Year})</h1>
            <img src="${title.Poster}" alt="${title.Title}">
          </div>
          <div class="flex-details">
            <ul>
              <li>Plot: ${title.Plot}</li>
              <li>Starring: ${title.Actors}</li>
              <li>Release Date: ${title.Released}</li>
              <li>Genre: ${title.Genre}</li>
              <li>Type: ${title.Type}</li>
              <li>Runtime: ${title.Runtime}</li>
              <li>Total Seasons: ${title.totalSeasons}</li>
              <li>IMDB Rating: ${title.imdbRating}</li>
              <li>Written By: ${title.Writer}</li>
              <li>IMDB ID: <span class="title-id">${title.imdbID}</span></li>
            </ul>
          </div>
          <div class="remove-container">
            <button class="remove-favorite-button"><i class="fas fa-trash-alt fa-lg"></i></button>
          </div>
        </div>`;
      });
      this.favoritesContainer.innerHTML = output;
      const removeFromFav = document.querySelectorAll(
        ".remove-favorite-button"
      );
      if (removeFromFav !== null) {
        for (let i = 0; i < removeFromFav.length; i++) {
          removeFromFav[i].addEventListener("click", () => {
            let savedTitles = JSON.parse(localStorage.getItem("savedTitles"));
            const spanID = removeFromFav[
              i
            ].parentElement.parentElement.querySelector(".title-id");
            const spanTitle = removeFromFav[
              i
            ].parentElement.parentElement.querySelector(".title-name");
            const name = spanTitle.innerHTML;
            const id = spanID.innerHTML;
            const removeBanner = document.createElement("div");
            removeBanner.className = "remove-banner";
            removeBanner.innerHTML = `<h1> ${name} has been removed<i class="fas fa-info-circle"></i></h1>`;
            spanID.parentElement.parentElement.parentElement.parentElement.replaceWith(
              removeBanner
            );

            setTimeout(() => {
              removeBanner.remove();
            }, 2500);
            for (let x = 0; x < savedTitles.length; x++) {
              if (savedTitles[x].imdbID === id) {
                console.log(savedTitles[x].imdbID);
                savedTitles.splice(x, 1);
              }
            }
            if (savedTitles.length > 0) {
              localStorage.setItem("savedTitles", JSON.stringify(savedTitles));
              this.favoritesContainer.querySelector(
                ".num-of-titles"
              ).innerHTML = `You Have ${savedTitles.length} Title(s) Saved`;
            } else {
              localStorage.removeItem("savedTitles");
              this.favoritesContainer.innerHTML = `<h1 class="num-of-titles"> You currently have no titles saved</h1>`;
            }
          });
        }
      }
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
