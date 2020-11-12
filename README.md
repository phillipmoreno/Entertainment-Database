# Entertainment Database

Entertainment Database is a web application that was built using JavaScript, HTML5, Sass, and a Movie Database REST API. Users can search a variety of titles by name that include Movies, TV Shows, and Video Games. Additional features include viewing additional information regarding a title by clicking "More Info", and adding/removing a title from your favorites list.

## API Key Instructions

1. Create a [RapidAPI](https://rapidapi.com/) account.
2. Subscribe to the [Movie Database (IMDB Alternative)](https://rapidapi.com/rapidapi/api/movie-database-imdb-alternative) Basic plan. This REST API is free for up to 1000 requests a day and then charges one cent per request after the limit is reached.
3. Copy and paste the following lines into a new file named config.json that should go inside the root directory of the project. Be sure to modify the api key field with your own personal key.

```json
{
  "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
  "x-rapidapi-key": "YOUR KEY GOES HERE"
}
```

4. Enjoy! Remember to keep track of your requests and stay under the 1000 requests a day limit.

## Application Features

1.  Search large library of titles by name in real time. (Updates after a
    key is pressed)
2.  Filter titles by type. (All, Movies, Shows, Games)
3.  Clear search results on page on click.
4.  View additional information regarding a title.
5.  Return to search results after viewing a selected title.
6.  Add/Remove titles to/from favorites list. (Local Storage).
7.  Alert banners for adding/removing titles to favorites.
8.  Counter used and displayed in search results and favorites list.
    (Updates in real time)
9.  Personal Rating System using Local Storage.

## Author

Created by Phillip Moreno.
