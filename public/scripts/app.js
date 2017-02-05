$(document).ready(function() {

  let userid = 1;
  let userItems = [];
  let newItem = {};

  // let saveSearch = (userInput, userid) => {
  //     let data = {searchValue: userInput.itemName, comment: userInput.inputComment, user_id: userid };
  //     console.log(data);
  //     $.ajax({
  //       method: "POST",
  //       url: "/api/users/search",
  //       data: data,
  //       success: () => {
  //         console.log("Successfully saved search to db");
  //       },
  //       error: () => {
  //         console.log("Failed to save search to db");
  //       }
  //     });
  //   };

    let getImdbItem = (itemName) => {
      return new Promise((resolve, reject) => {
        $.ajax({
          method: "GET",
          url: "/imdb",
          data: itemName,
          success: (itemData) => {
            console.log("Successful iMDB API request");
            newItem = {
              title: itemData.title,
              year: itemData.year,
              rating: itemData.imdb.rating,
              poster: itemData.poster,
              genres: itemData.genres,
              rated: itemData.rated,
              director: itemData.director,
              runtime: itemData.runtime,
              plot: itemData.plot,
              date: Date.now()
            }
            userItems.push(newItem);
            saveNewMovie(newItem);
            resolve(itemData);
          },
          error: () => {
            console.log("Failed iMDB API request");
          }
        });
      });
    };

    let getSpotifyItem = (itemName) => {
      return new Promise((resolve, reject) => {
        $.ajax({
          method: "GET",
          url: "http://api.spotify.com/v1/search",
          data: { q: itemName.slice(5).split("%20").join(" "),
                  type: 'track' },
          success: (itemData) => {
            console.log(itemData);
            console.log("Successful Spotify API request");
            resolve(itemData);
          },
          error: () => {
            console.log("Failed Spotify API request");
          }
        })
      })
    }

    // let saveNewMovie = (newItem) => {
    //   $.ajax({
    //     method: "POST",
    //     url: "/api/users/save",
    //     data: newItem,
    //     success: () => {
    //       console.log("Successfully saved movie to db");
    //       // append new html element
    //     },
    //     error: () => {
    //       console.log("Failed to save movie to db");
    //     }
    //   });
    // };

    function createMovieItem(movie, comment, date) {
      return `<article class="movie">
        <header>
          <h2 class="title">${movie.title}</h2>
          <h3 class="rating">${movie.imdb.rating}/10</h3>
          <p class="comment">${comment}</p>
        </header>
        <div class="itemContainer">
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
        <div class="updateBtns">
          <button class="toMovie"><i class="fa fa-film"></i></button>
          <button class="toSong"><i class="fa fa-music"></i></button>
          <button class="toRestaurant"><i class="fa fa-cutlery"></i></button>
        </div>
      </article>`
    }

    function createSongItem(song, comment, date) {
      return `<article class="song">
        <header>
          <h2 class="title">${song.tracks.items[0].name}</h2>
          <h3 class="artist">${song.tracks.items[0].artists[0].name}</h3>
          <p class="comment">${comment}</p>
        </header>
        <div class="itemContainer">
          <img class="albumCover" src=${song.tracks.items[0].album.images[0].url}>
          <div class="flex">
            <div class="album">Album: ${song.tracks.items[0].album.name}</div>
            <div class="trackNum">Track #: ${song.tracks.items[0].track_number}</div>
          </div>
          <footer>Item added on ${Date(date)}</footer>
        </div>
        <div class="bottom"></div>
        <div class="updateBtns">
          <button class="toMovie"><i class="fa fa-film"></i></button>
          <button class="toSong"><i class="fa fa-music"></i></button>
          <button class="toRestaurant"><i class="fa fa-cutlery"></i></button>
        </div>
      </article>`
    }


  // Submit item and send GET req to oMDB to scrape for item data, then POST to save data to db
  $(function() {
    let newItemButton = $(".addItemBtn");

    newItemButton.click(function() {
      event.preventDefault();

      // let searchValue = $(".inputItem").val();
      // let itemName = $(".addItem form").serialize();

      let userInput = { itemName: $(".inputItem").serialize(),
                        inputComment: $(".inputComment").val()}
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
          let alert = $("<alert>").addClass("alert").text("You can't send an empty tweet!");
          $(".addItem").addClass("alert").append(alert);
          return;
        }
      } else {
        if ($("alert")) {
          $("alert").remove();
          saveSearch(userInput, userid);
          getSpotifyItem(userInput.itemName)
          .then((songData) => {
            let songItem = createSongItem(songData, userInput.inputComment, Date.now());
            $(".songList").append(songItem);
          })
          // getImdbItem(userInput.itemName)
          // .then((movieData) => {
          //   let movieItem = createMovieItem(movieData, userInput.inputComment, Date.now());
          //   $(".movieList").append(movieItem);
          // })
        } else {
          saveSearch(userInput, userid);
          getSpotifyItem(userInput.itemName)
          .then((songData) => {
            let songItem = createSongItem(songData, userInput.inputComment, Date.now());
            $(".songList").append(songItem);
          })
          // getImdbItem(userInput.itemName)
          // .then((movieData) => {
          //   let movieItem = createMovieItem(movieData, userInput.inputComment, Date.now());
          //   $(".movieList").append(movieItem);
          // })
        }
      }
    });

  // getUsers();
  });

});

$(function() {

  function createSimpleMovieItem(movie, comment, date) {
      return `<article class="movie">
        <header>
          <h2 class="title">${movie}</h2>
          <p class="comment">${comment}</p>
        </header>
        <div class="itemContainer">
          <footer>Item added on ${Date(date)}</footer>
        </div>
        <div class="bottom"></div>
        <div class="updateBtns">
          <button class="toMovie"><i class="fa fa-film"></i></button>
          <button class="toSong"><i class="fa fa-music"></i></button>
          <button class="toRestaurant"><i class="fa fa-cutlery"></i></button>
        </div>
      </article>`
    }

    function createSimpleSongItem(song, comment, date) {
      return `<article class="song">
        <header>
          <h2 class="title">${song}</h2>
          <p class="comment">${comment}</p>
        </header>
        <div class="itemContainer">
          <footer>Item added on ${Date(date)}</footer>
        </div>
        <div class="bottom"></div>
        <div class="updateBtns">
          <button class="toMovie"><i class="fa fa-film"></i></button>
          <button class="toSong"><i class="fa fa-music"></i></button>
          <button class="toRestaurant"><i class="fa fa-cutlery"></i></button>
        </div>
      </article>`
    }

    function createSimpleRestaurantItem(restaurant, comment, date) {
      return `<article class="restaurant">
        <header>
          <h2 class="title">${restaurant}</h2>
          <p class="comment">${comment}</p>
        </header>
        <div class="itemContainer">
          <footer>Item added on ${Date(date)}</footer>
        </div>
        <div class="bottom"></div>
        <div class="updateBtns">
          <button class="toMovie"><i class="fa fa-film"></i></button>
          <button class="toSong"><i class="fa fa-music"></i></button>
          <button class="toRestaurant"><i class="fa fa-cutlery"></i></button>
        </div>
      </article>`
    }

  $(".userLists").on("click", 'article', function() {
    // toggle list item content on click
    if ($(this).children('.itemContainer').css('display') === 'none') {
      $(this).children('.itemContainer').css('display', 'block');
    } else {
      $(this).children('.itemContainer').css('display', 'none');
    }
  });

  $(".userLists").on("click", ".toMovie", function() {
    // remove wrongly-categorized article and append it to correct list
    let updatedMovieItem = createSimpleMovieItem($(this).closest("article").find(".title").text(), $(this).closest("article").find(".comment").text(), Date.now());
    $(".movieList").append(updatedMovieItem);
    $(this).closest("article").remove();
  })

  $(".userLists").on("click", ".toSong", function() {
    // remove wrongly-categorized article and append it to correct list
    let updatedSongItem = createSimpleSongItem($(this).closest("article").find(".title").text(), $(this).closest("article").find(".comment").text(), Date.now());
    $(".songList").append(updatedSongItem);
    $(this).closest("article").remove();
  })

  $(".userLists").on("click", ".toRestaurant", function() {
    // remove wrongly-categorized article and append it to correct list
    let updatedRestaurantItem = createSimpleRestaurantItem($(this).closest("article").find(".title").text(), $(this).closest("article").find(".comment").text(), Date.now());
    $(".restaurantList").append(updatedRestaurantItem);
    $(this).closest("article").remove();
  })

});

var Conclave = (function () {
  var buArr = [], arlen;
  return {
    init: function () {
      this.addCN(); this.clickReg();
    },
    addCN: function () {
      var buarr = ["holder_bu_center", "holder_bu_awayL1", "holder_bu_awayL2", "holder_bu_awayR1", "holder_bu_awayR2"];
      for (var i = 1; i <= buarr.length; ++i) {
        $("#bu" + i).removeClass().addClass(buarr[i - 1] + " holder_bu");
      }
    },
    clickReg: function () {
      $(".holder_bu").each(function () {
        buArr.push($(this).attr('class'))
      });
      arlen = buArr.length;
      for (var i = 0; i < arlen; ++i) {
        buArr[i] = buArr[i].replace(" holder_bu", "")
      }
      $(".holder_bu").click(function (buid) {
        var me = this, id = this.id || buid, joId = $("#" + id), joCN = joId.attr("class").replace(" holder_bu", "");
        var cpos = buArr.indexOf(joCN), mpos = buArr.indexOf("holder_bu_center");
        if (cpos != mpos) {
          tomove = cpos > mpos ? arlen - cpos + mpos : mpos - cpos;
          while (tomove) {
            var t = buArr.shift();
            buArr.push(t);
            for (var i = 1; i <= arlen; ++i) {
              $("#bu" + i).removeClass().addClass(buArr[i - 1] + " holder_bu");
            }
            --tomove;
          }
        }
      })
    },
    auto: function () {
      for (i = 1; i <= 1; ++i) {
        $(".holder_bu").delay(4000).trigger('click', "bu" + i).delay(4000);
        console.log("called");
      }
    }
  };
})();

$(document).ready(function () {
    window['conclave'] = Conclave;
    Conclave.init();

    $('.forgot-pass').click(function(event) {
      $(".pr-wrap").toggleClass("show-pass-reset");
    });

    $('.pass-reset-submit').click(function(event) {
      $(".pr-wrap").removeClass("show-pass-reset");
    });
});
