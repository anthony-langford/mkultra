$(document).ready() => {
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

  function submitNewItem() {
    let newItemButton = $(".addItem input");
    newItemButton.click(function() {
      let itemName = $(".addItem form").serialize();
      console.log(itemName);
      event.preventDefault();
      console.log("Submit item button clicked, performing Ajax call...");

      $.ajax({
        method: "GET",
        url: "/api/users"
      }).success(() => {
        console.log("Success");
        renderLists();
      });
    });

  getUsers();
};
