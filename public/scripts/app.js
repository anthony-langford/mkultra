$(document).ready(function() {

  () => {
    $.ajax({
      method: "GET",
      url: "/api/users",
      success: (movieData) => {
        $("<div>").text(movieData).appendTo($(".addItem"));
      }
    });
  }


  $(function() {
    let newItemButton = $(".addItem input");

    newItemButton.click(function() {
      event.preventDefault();

    let post = (itemName) => {
      $.ajax({
        url: "/api/users",
        type: "POST",
        data: itemName,
        success: () => {
          console.log("Success");
          // render lists
        }
      });
    }

      let itemName = $(".addItem form").serialize();
      console.log(itemName);
      console.log("Submit item button clicked, performing Ajax call...");

      // Check for empty form and return alert error
      if (itemName === "text=") {
        console.log("Empty form");
        if ($("alert")) {
          $("alert").remove();
          let alert = $("<alert>").addClass("alert").text("You can't send an empty tweet!");
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
          post(itemName);
        } else {
          post(itemName);
        }
      }
    });

  // getUsers();
  });

});
