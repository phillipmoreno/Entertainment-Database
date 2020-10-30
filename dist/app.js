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
        .catch((err) => console.log(err));
    } else {
      ui.clearSearch();
    }
  });
