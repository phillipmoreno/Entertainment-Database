const moviedb = new MovieDB();
const ui = new UI();
const clearSearchButton = document.querySelector(".clear-search-button");
const searchBar = document.getElementById("movie-show-title");
const filterButtons = document.querySelectorAll(".filter-button");
var selectedFilter = "All";

searchBar.addEventListener("keyup", callSearchResults);

for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", () => {
    filterButtons[0].classList.remove("clicked");
    filterButtons[1].classList.remove("clicked");
    filterButtons[2].classList.remove("clicked");
    filterButtons[3].classList.remove("clicked");
    filterButtons[i].classList.add("clicked");
    let prevFilter = selectedFilter;
    selectedFilter = filterButtons[i].firstChild.getAttribute("id");

    var filmTitle = document.getElementById("movie-show-title").value;

    if (prevFilter !== selectedFilter && filmTitle !== "") {
      moviedb
        .getTitle(selectedFilter, filmTitle)
        .then((data) => {
          ui.showMovie(data);
        })
        .then(() => {
          const infoBtns = document.getElementsByClassName("btn-info");
          for (let i = 0; i < infoBtns.length; i++) {
            infoBtns[i].addEventListener("click", () => {
              const parent = infoBtns[i].parentElement.parentElement;
              const movieId = parent.querySelector("#imdb-id").textContent;
              moviedb.getSelected(movieId).then((selectedMovie) => {
                ui.showSelectedTitle(selectedMovie);
              });
            });
          }
          console.log(infoBtns);
        })
        .catch((err) => console.log(err));
    }
  });
}

clearSearchButton.addEventListener("click", () => {
  if (clearSearchButton.innerHTML !== "") {
    searchBar.value = "";
    ui.clearSearch();
    clearSearchButton.innerHTML = "";
  }
});

function callSearchResults() {
  const filmTitle = searchBar.value;
  if (filmTitle !== "") {
    clearSearchButton.innerHTML = `<i class="fas fa-times"></i>`;
    moviedb
      .getTitle(selectedFilter, filmTitle)
      .then((data) => {
        ui.showMovie(data);
      })
      .then(() => {
        const infoBtns = document.getElementsByClassName("btn-info");
        for (let i = 0; i < infoBtns.length; i++) {
          infoBtns[i].addEventListener("click", () => {
            const parent = infoBtns[i].parentElement.parentElement;
            const movieId = parent.querySelector("#imdb-id").textContent;
            moviedb.getSelected(movieId).then((selectedMovie) => {
              ui.showSelectedTitle(selectedMovie);
              const returnToResultsButton = document.querySelector(
                ".go-back-button"
              );
              returnToResultsButton.addEventListener("click", () => {
                callSearchResults();
                return;
              });
            });
          });
        }
      })
      .catch((err) => console.log(err));
  } else {
    ui.clearSearch();
    clearSearchButton.innerHTML = "";
  }
}
