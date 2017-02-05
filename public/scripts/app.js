$(document).ready(function() {

  let userid = 1;
  let userItems = [];
  let newItem = {};

  let saveSearch = (userInput, userid) => {
      let data = {searchValue: userInput.itemName, comment: userInput.inputComment, user_id: userid };
      console.log(data);
      $.ajax({
        method: "POST",
        url: "/api/users/search",
        data: data,
        success: () => {
          console.log("Successfully saved search to db");
        },
        error: () => {
          console.log("Failed to save search to db");
        }
      });
    };

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

    let saveNewMovie = (newItem) => {
      $.ajax({
        method: "POST",
        url: "/api/users/save",
        data: newItem,
        success: () => {
          console.log("Successfully saved movie to db");
          // append new html element
        },
        error: () => {
          console.log("Failed to save movie to db");
        }
      });
    };

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
          getImdbItem(userInput.itemName)
          .then((movieData) => {
            let movieItem = createMovieItem(movieData, userInput.inputComment, Date.now());
            $(".movieList").append(movieItem);
          })
        } else {
          saveSearch(userInput, userid);
          getImdbItem(userInput.itemName)
          .then((movieData) => {
            let movieItem = createMovieItem(movieData, userInput.inputComment, Date.now());
            $(".movieList").append(movieItem);
          })
        }
      }
    });

  // getUsers();
  });

});

$(function() {
  $(".movieList").on("click", '.movie', function() {
    if ($(this).children('.movieContainer').css('display') === 'none') {
      $(this).children('.movieContainer').css('display', 'block');
    } else {
      $(this).children('.movieContainer').css('display', 'none');
    }
  });
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
