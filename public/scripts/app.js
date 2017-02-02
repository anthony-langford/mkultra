$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((data) => {
    let table = `<table border=1px>
        <tr>
          <th>username</th>
          <th>itemname</th>
          <th>category</th>
          <th>comment</th>
        </tr>
        <tr>
          <td>${data[0].username}</td>
          <td>${data[0].itemname}</td>
          <td>${data[0].cat}</td>
          <td>${data[0].comment}</td>
        </tr>
        </table>
        `;
        $(".addItem").append(table);
  });
});
