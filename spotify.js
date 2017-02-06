const request = require('request');

var BASE_URL = "http://api.wolframalpha.com/v2/query?input=";
var URL_OPTS = "&appid=X3LWG7-TY8XGTGR5W&output=json&ignorecase=true";


function wolfram(query, cb) {

  // 1. Append query to url, create our full url string
  let url = BASE_URL + query + URL_OPTS;
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

module.exports = wolfram;
wolfram("star%20wars", (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data);
});
