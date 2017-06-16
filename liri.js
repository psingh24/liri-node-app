console.log("Testing")


var Twit = require("twit");
var config = require("./keys")
var Spotify = require('node-spotify-api');
var request = require("request")

var T = new Twit(config.twitterKeys);
var S = new Spotify(config.spotifyKeys)

var searchTerm = process.argv[2]
var query = process.argv[3]

var tweetParam = {
     q: query, 
     count: 10
}

var spotifyParam = {
    type: 'track', 
    query: query
}

if (searchTerm === "search-tweets") {
    T.get('search/tweets', tweetParam, getTwitterData)

}else if (searchTerm === "spotify-this-song") {
    S.search(spotifyParam, getSpotifyData)

}


function getTwitterData(err, data, response) {
    var tweets = data.statuses
    // console.log(tweets)
    for (var i=0; i < tweets.length; i++) {
        console.log(tweets[i].text)
        console.log(tweets[i].user.name)
        console.log("=============================================================")
    }
}

function getSpotifyData(err, data) {
    if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
}
 
// spotify.search(spotifyParam, getSpotifyData)
 
// S.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
 
// console.log(data); 
// });