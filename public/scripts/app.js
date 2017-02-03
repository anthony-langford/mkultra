$(document).ready(function() {

  let userid = "";
  let userItems = [];

  // Submit item and send GET req to oMDB to scrape for item data, then POST to save data to db
  $(function() {

    let post = (newItem) => {
      // let data = { item: newItem, comment: "sdfsfafaf" }
      $.ajax({
        url: "/api/users",
        type: "POST",
        data: data,
        success: (newItem) => {
          console.log("Successful db entry");
          // append new html element
        }
      });
    }

    function getImdbItem(itemName) {
      return new Promise((resolve, reject) => {
        $.ajax({
          method: "GET",
          url: "/imdb",
          data: itemName,
          success: (itemData) => {
            console.log("Successful iMDB API request")
            console.log(itemData);
            resolve(itemData);
          }
        });
      })
    }

    function createMovieItem(movie, comment, date) {
      return `<article class="movie">
        <header>
          <h2 class="title">${movie.title}</h2>
          <h3 class="rating">${movie.imdb.rating}/10</h3>
          <p class="comment">- ${comment}</p>
        </header>
        <div class="container">
          <img class="poster" src=${movie.poster}>
          <div class="flex">
            <div class="genres">Genre(s): ${movie.genres}</div>
            <div class="rated">Rated: ${movie.rated}</div>
            <div class="director">Director(s): ${movie.director}</div>
            <div class="year">Year: ${movie.year}</div>
            <div class="runtime">Runtime: ${movie.runtime} mins</div>
            <div class="plot">Plot:<br>${movie.plot}</div>
          </div>
          <footer>Item added on ${Date(date)}</footer>
        </div>
        <div class="bottom"></div>
      </article>`
    }
    // const newItem = {
    //         title: itemData.title,
    //         year: itemData.year,
    //         rating: itemData.imdb.rating,
    //         comment: userInput.inputComment,
    //         poster: itemData.poster,
    //         genre: itemData.genres,
    //         rated: itemData.rated,
    //         director: itemData.director,
    //         length: itemData.runtime,
    //         plot: itemData.plot,
    //         date: Date.now()
    //       }

    let newItemButton = $(".addItem .addItemBtn");
    newItemButton.click(function() {
      event.preventDefault();

      // let itemName = $(".addItem .inputItem").serialize();
      // let inputComment = $(".addItem .inputComment").val();
      let userInput = { itemName: $(".addItem .inputItem").serialize(),
                        inputComment: $(".addItem .inputComment").val()}
      // console.log(itemName);
      // console.log(inputComment);
      console.log(userInput);
      console.log("Submit item button clicked, performing Ajax call...");

      // Check for empty form and return alert error
      if (userInput.itemName === "text=") {
        console.log("Empty form");
        if ($("alert")) {
          $("alert").remove();
          let alert = $("<alert>").addClass("alert").text("Write something dummy!");
          $(".addItem").addClass("alert").append(alert);
          return;
        } else {
          let alert = $("<alert>").addClass("alert").text("Write something dummy!");
          $(".addItem").addClass("alert").append(alert);
          return;
        }
      } else {
        if ($("alert")) {
          $("alert").remove();
          getImdbItem(userInput.itemName)
          .then((movieData) => {
            console.log(movieData);
            let movieItem = createMovieItem(movieData, userInput.inputComment, Date.now());
            $(".movieList").append(movieItem);
          })
        } else {
          getImdbItem(userInput.itemName)
          .then((movieData) => {
            console.log(movieData);
            let movieItem = createMovieItem(movieData, userInput.inputComment, Date.now());
            $(".movieList").append(movieItem);
          })
        }
      }
          // userItems.push(newItem);
          // post(newItem);
    });
  // getUsers();
  });
});

// show/hide the movie details by clicking on the movie item
$(function() {
  $(".movieList").on("click", '.movie', function() {
    if ($(this).children('.container').css('display') === 'none') {
      $(this).children('.container').css('display', 'block');
    } else {
      $(this).children('.container').css('display', 'none');
    }
  });

});

