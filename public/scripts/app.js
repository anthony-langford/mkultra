$(document).ready(function() {

  let userid = "";
  let userItems = [];

  // Submit item and send GET req to oMDB to scrape for item data, then POST to save data to db
  $(function() {
    let newItemButton = $(".addItem input");

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

    let getImdbItem = (itemName) => {
      $.ajax({
        method: "GET",
        url: "/imdb",
        data: itemName,
        success: (itemData) => {
          console.log("Successful iMDB API request")
          $("<div>").text(itemData.title + " " + itemData.year + " " + itemData.genres + " " + itemData.imdb.rating).appendTo($(".addItem"));
          let date = Date.now();
          const newItem = {
            title: itemData.title,
            year: itemData.year,
            rating: itemData.imdb.rating,
            // comment: itemData.,
            poster: itemData.poster,
            genre: itemData.genres,
            rated: itemData.rated,
            director: itemData.director,
            length: itemData.runtime,
            plot: itemData.plot,
            date: date,
          }
          userItems.push(newItem);
          post(newItem);
        }
      });
    }

    newItemButton.click(function() {
      event.preventDefault();

      let itemName = $(".addItem form").serialize();
      console.log(itemName);
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
          getImdbItem(itemName);
        } else {
          getImdbItem(itemName);
        }
      }
    });

  // getUsers();
  });

});
