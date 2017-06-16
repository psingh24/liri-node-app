console.log("Testing")


var Twit = require("twit");
var config = require("./keys")
var Spotify = require('node-spotify-api');
var request = require("request")
var fs = require("fs")

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
var movieParam = {
    url: "http://www.omdbapi.com/?t=",
    query: query,
    plotAndApiKey: "&y=&plot=short&apikey=40e9cece"
}

if (searchTerm === "search-twitter") {
    T.get('search/tweets', tweetParam, getTwitterData)

}
else if (searchTerm === "spotify-this-song") {
    S.search(spotifyParam, getSpotifyData)

}
else if (searchTerm === "movie-this") {
    request(movieParam.url+movieParam.query+movieParam.plotAndApiKey, getMovieData);
}


function getTwitterData(err, data, response) {
    var tweets = data.statuses
    // console.log(tweets)
    for (var i=0; i < tweets.length; i++) {
        console.log(tweets[i].created_at)
        console.log(tweets[i].text)
        console.log(tweets[i].user.name)
        console.log("=============================================================")
    }

     var output = "\nTwitter Search: "+query+"\n======================" 

    fs.appendFile("random.txt", output, function(error){

	if(error) {
		console.log(error)
	}
})
}

function getSpotifyData(err, data) {
    if (err) {
    return console.log('Error occurred: ' + err);
  }
 
// console.log(data); 
var artist = data.tracks.items[0].artists[0].name
var songName = data.tracks.items[0].name
var preview = data.tracks.items[0].preview_url
var album = data.tracks.items[0].album.name

console.log("Artist: "+artist)
console.log("Album: "+album)
console.log("Song Name: "+songName)
console.log("Preview Url: "+preview)

 var output = "\nSpotify Search: "+songName+", "+artist+"\n======================" 

    fs.appendFile("random.txt", output, function(error){

	if(error) {
		console.log(error)
	}
})
}
 
function getMovieData(error, response, body) {
    // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Year Released: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Produced In: " + JSON.parse(body).Country);
    console.log("Lanuage(s): " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    
    var output = "\nMovie Search: "+JSON.parse(body).Title+"\n======================" 

    fs.appendFile("random.txt", output, function(error){

	if(error) {
		console.log(error)
	}
})
    
  }
}

// fs.writeFile("random.txt", total, function(error){

// 	if(error) {
// 		console.log(error)
// 	}
	
	
// })
	

	