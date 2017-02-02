// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((data) => {
//     let table = `<table border=1px>
//         <tr>
//           <th>username</th>
//           <th>itemname</th>
//           <th>category</th>
//           <th>comment</th>
//         </tr>
//         <tr>
//           <td>${data[0].username}</td>
//           <td>${data[0].itemname}</td>
//           <td>${data[0].cat}</td>
//           <td>${data[0].comment}</td>
//         </tr>
//         </table>
//         `;
//         $(".addItem").append(table);

$(document).ready(function() {

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

          let url = 'http://www.omdbapi.com/?t=scream';
          $.ajax({
            url: url,
            type: "GET",
            success: function(data) {
              console.log(data);
            }
          })
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
          let url = 'http://www.omdbapi.com/?t=scream';
          $.ajax({
            url: url,
            type: "GET",
            success: function(data) {
              console.log(data);
            }
          })
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
