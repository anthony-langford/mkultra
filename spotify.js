const request = require('request');

var BASE_URL = "http://api.spotify.com/v1/search?q=";
var URL_OPTS = "&type=track";


function spotify(query, cb) {

  let urlQuery = query.split(" ").join("%20");
  // 1. Append query to url, create our full url string
  let url = BASE_URL + urlQuery + URL_OPTS;
  console.log(url);

  // 2. send a get request
  request(url, (err, res, body) => {
    if (!err && res.statusCode == 200) {
      // 3. On success parse our movie data in to a nice object
      let data = JSON.parse(body);
      // 4. return movie data, and potential error
      cb(null, data);
    } else {
      cb(err, body);
    }
  });

};

module.exports = spotify;
