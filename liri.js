var Twit = require("twit");
var config = require("./keys")
var Spotify = require('node-spotify-api');
var request = require("request")
var fs = require("fs")

var T = new Twit(config.twitterKeys);
var S = new Spotify(config.spotifyKeys)

var searchTerm = process.argv[2]
var query = process.argv[3]

var params = {
    tweetParam: {
        q: query,
        count: 10
    },
    spotifyParam: {
        type: 'track', 
        query: query
    },
    movieParam: {
        url: "http://www.omdbapi.com/?t=",
        query: query,
        plotAndApiKey: "&y=&plot=short&apikey=40e9cece"
    }
}

if (searchTerm === "search-twitter") {
    T.get('search/tweets', params.tweetParam, getTwitterData)

}
else if (searchTerm === "spotify-this-song") {
    S.search(params.spotifyParam, getSpotifyData)

}
else if (searchTerm === "movie-this") {
    request(params.movieParam.url+params.movieParam.query+params.movieParam.plotAndApiKey, getMovieData);
} else if (searchTerm === "do-what-it-says") {
    doWhatItSays()
}


function getTwitterData(err, data, response) {
    var tweets = data.statuses
    // console.log(tweets)
    for (var i=0; i < tweets.length; i++) {
        var dateTweeted = tweets[i].created_at;
        var tweet = tweets[i].text;
        var personWhoTweeted = tweets[i].user.name;
        console.log(dateTweeted)
        console.log("")
        console.log(tweet)
        console.log("- "+personWhoTweeted)
        console.log("=============================================================")
    }

        var output = "\nTwitter Search: "+query+"\n======================" 

        fs.appendFile("log.txt", output, function(error){

	        if(error) {
		        console.log(error)
	        }
        })
}

function getSpotifyData(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
 
    var artist = data.tracks.items[0].artists[0].name
    var songName = data.tracks.items[0].name
    var preview = data.tracks.items[0].preview_url
    var album = data.tracks.items[0].album.name

    console.log("")
    console.log("Artist: "+artist)
    console.log("Album: "+album)
    console.log("Song Name: "+songName)
    console.log("Preview Url: "+preview)

    var output = "\nSpotify Search: "+songName+", "+artist+"\n======================" 

    fs.appendFile("log.txt", output, function(error){

	    if(error) {
		    console.log(error)
	    }
    })
}
 
function getMovieData(error, response, body) {
    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
        var data = JSON.parse(body)
        var title = data.Title;
        var year = data.Year;
        var imdbRating = data.imdbRating;
        var country = data.Country;
        var language = data.Language;
        var plot = data.Plot;
        var actors = data.Actors;
        var rottenRating = data.Ratings[1].Value;

        console.log("")
        console.log("Title: " + title);
        console.log("Year Released: " + year);
        console.log("IMDB Rating: " + imdbRating);
        console.log("Produced In: " + country);
        console.log("Lanuage(s): " + language);
        console.log("Plot: " + plot);
        console.log("Actors: " + actors);
        console.log("Rotten Tomatoes Rating: " + rottenRating);
        
        var output = "\nMovie Search: "+title+"\n======================" 

        fs.appendFile("log.txt", output, function(error){

	        if(error) {
		        console.log(error)
	        }
        })
    }
}
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data){

	        if(error) {
		        console.log(error)
	        }

            var results = data.slice(18)
            console.log(results)
          
            S.search({ type: 'track', query: results}, function(err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
            }
            var artist = data.tracks.items[0].artists[0].name
            var songName = data.tracks.items[0].name
            var preview = data.tracks.items[0].preview_url
            var album = data.tracks.items[0].album.name

            console.log("")
            console.log("Artist: "+artist)
            console.log("Album: "+album)
            console.log("Song Name: "+songName)
            console.log("Preview Url: "+preview)

            var output = "\nSpotify Search: "+songName+", "+artist+"\n======================"

            fs.appendFile("log.txt", output, function(error){

	            if(error) {
		            console.log(error)
	            }
            })
        })
        
})
}

