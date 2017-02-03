$(document).ready(function() {

  let userid = 1;
  let userItems = [];
  let newItem = {};

  let saveSearch = (searchValue, userid) => {
      let data = {searchValue: searchValue, comment: "I AM A COMMENT", user_id: userid };
      console.log(data);
      $.ajax({
        method: "POST",
        url: "/api/users/search",
        data: data,
        success: () => {
          console.log("Successfully saved search to db");
        }
        error: () => {
          console.log("Failed to save search to db");
        }
      });
    };

    let getImdbItem = (itemName) => {
      $.ajax({
        method: "GET",
        url: "/imdb",
        data: itemName,
        success: (itemData) => {
          console.log("Successful iMDB API request");
          $("<div>").text(itemData.title + " " + itemData.year + " " + itemData.genres + " " + itemData.imdb.rating).appendTo($(".addItem"));
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
        }
        error: () => {
          console.log("Failed iMDB API request");
        }
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
        }
        error: () => {
          console.log("Failed to save movie to db");
        }
      });
    };

  // Submit item and send GET req to oMDB to scrape for item data, then POST to save data to db
  $(function() {
    let newItemButton = $(".addItem input");

    newItemButton.click(function() {
      event.preventDefault();

      let searchValue = $(".addItem textarea").val();
      let itemName = $(".addItem form").serialize();
      console.log("Submit item button clicked, performing Ajax call...");

      // Check for empty form and return alert error
      if (itemName === "text=") {
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
          saveSearch(searchValue, userid);
          getImdbItem(itemName);
        } else {
          saveSearch(searchValue, userid);
          getImdbItem(itemName);
        }
      }
    });

  // getUsers();
  });

});
