const moviedb = new MovieDB();
const ui = new UI();

const searchBar = document
  .getElementById("movie-show-title")
  .addEventListener("keyup", (e) => {
    const filmTitle = e.target.value;
    if (filmTitle !== "") {
      moviedb
        .getMovie(filmTitle)
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
    } else {
      ui.clearSearch();
    }
  });
