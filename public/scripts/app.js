$(document).ready(function() {
  // function renderLists() {
  //   $.ajax({
  //     method: "GET",
  //     url: "/api/users"
  //   }).success((lists) => {
  //     for(list of lists) {
  //       $("<div>").text(user.name).appendTo($("body"));
  //     }
  //   });
  // }

  $(function() {
    let newItemButton = $(".addItem input");
    console.log(newItemButton);
    newItemButton.click(function() {
      let itemName = $(".addItem form").serialize();
      console.log(itemName);
      event.preventDefault();
      console.log("Submit item button clicked, performing Ajax call...");

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
          $.ajax({
            url: "/api/users",
            type: "POST",
            data: itemName,
            success: function() {
              console.log("Success");
              // render lists
            }
          });
        } else {
          $.ajax({
            url: "/",
            type: "POST",
            data: itemName,
            success: function() {
              console.log("Success");
              // render lists
            }
          });
        }
      }
    });

  // getUsers();
  });

});
