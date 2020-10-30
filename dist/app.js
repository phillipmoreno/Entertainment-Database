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
    }
  });

/*
moviedb.getMovie().then((data) => {
  console.log(data);
  const arr = data.movies.Search;
  console.log(arr);
});
*/

/*
moviedb
  .getMovie()
  .then((data) => {
    ui.showMovie(data);
  })
  .catch((err) => console.log(err));
*/
