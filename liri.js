require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
//READ-THIS-ATTEMPT
var fs = require("fs");
//END OF READ-THIS

var action = process.argv[2];
var nodeArgs = process.argv;

var itemName = "";

for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    itemName = itemName + "+" + nodeArgs[i];
  } else {
    itemName += nodeArgs[i];
  }
}
switch (action) {
  case "movie-this":
    movie();
    break;
  case "concert-this":
    concert();
    break;
  case "spotify-this-song":
    song();
    break;
    case "do-what-it-says":
    doIt();
    break;
}

function movie() {
  if (!itemName) {
    itemName = "Mr Nobody";
  }
  var queryUrl = "http://www.omdbapi.com/?t=" + itemName + "&apikey=trilogy";
  axios
    .get(queryUrl)
    .then(function(response) {
      console.log("-----------------------------------");
      console.log("Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.Ratings[0].Value);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
      console.log("-----------------------------------");
    })
    .catch(function(error) {
      if (error.response) {
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}
function concert() {
  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    itemName +
    "/events?app_id=codingbootcamp";
  // console.log(queryUrl);
  axios
    .get(queryUrl)
    .then(function(response) {
      // if(!itemName){
      //   itemName = "This Artist"
      // }
      if (!response.data.length) {
        console.log("************************************");
        console.log(itemName + " has no concerts coming up!");
        console.log("************************************");
        return;
      }
      console.log("************************************");
      console.log(response.data[0].artist.name);
      console.log("************************************");
      for (var i = 0; i < response.data.length; i++) {
        console.log("-----------------------------------");
        console.log("Venue: " + response.data[i].venue.name);
        console.log(
          "Address : " +
            response.data[i].venue.city +
            ", " +
            response.data[i].venue.country
        );
        var time = moment(
          response.data[i].datetime,
          "YYYY-MM-DD'T'HH:mm:ss"
        ).format("MM-DD-YYYY hh:mm A");
        console.log("Time: " + time);
        console.log("-----------------------------------");
      }
    })
    .catch(function(error) {
      if (error.response) {
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}
function song() {
  if (!itemName) {
    itemName = "The Sign Ace of Base";
  }
  spotify
    .search({
      type: "track",
      query: itemName
    })
    .then(function(response) {
      // console.log(JSON.stringify(response.tracks.items));
      var result = response.tracks.items;
      // console.log(result[0].name)
      for (i = 0; i < result.length; i++) {
        console.log("-----------------------------------");
        console.log("Artist: " + result[i].artists[0].name);
        console.log("Song: " + result[i].name);
        console.log(
          "Preview URL: " + result[i].artists[0].external_urls.spotify
        );
        console.log("Album: " + result[i].album.name);
        console.log("-----------------------------------");
      }
    })
    .catch(function(err) {
      console.error("Error occurred: " + err);
    });
}

//READ-THIS-ATTEMPT
function doIt(){
fs.readFile("random.txt", "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }

  data = data.split(",");
  action = data[0];
  itemName = data[1];

  switch (action) {
    case "movie-this":
      movie();
      break;
    case "concert-this":
      concert();
      break;
    case "spotify-this-song":
      song();
      break;
  }

});
}

//END OF READ-THIS


