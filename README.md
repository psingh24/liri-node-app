LIRI NODE.JS APP
----------------

##LIRI is a command line node app that allows users to choose what type of data they wish to search for and what to information to search under each category. It returns the information to the console and also stores the data in the log.txt file

Categories users can search from:

Twitter
-------
This allows the user to access the latest 20 tweets from my Twitter

Command:
```
node liri.js my-tweets
```
Results:
```
//Your last 5 tweets
Sun Jun 18 03:04:51 +0000 2017

Boston will regret trading fultz
- pstest
=============================================================
```

Also you can search twitter using and keyword(s)
Command:
```
node liri.js search-twitter "Global Warming"
```
Results(displays 5 latest tweets. Only display one for example)
```
Mon Jun 19 23:02:38 +0000 2017

Connelly: Perry says carbon is not 'primary contributor' to global warming https://t.co/PoV3Wc1VS8
- mark
=============================================================
```

Spotify
-------
This allows the user to search for a song and access information about that song from Spotify

Command:
```
node liri.js spotify-this-song "I believe I can fly"
```
Results:
```
//Displays the Artist, Album, Song Name and preview url
Artist: R. Kelly
Album: R.
Song Name: I Believe I Can Fly
Preview Url: https://p.scdn.co/mp3-preview/a2ba83e13c343e380e5872e5c60d2ca3c6880738?cid=83181921eed2490091eaa49fd8785f48

```


OMDB
----
This allows the user to search for a movie title and return specific IMDB information about that movie


Command:
```
node liri.js movie-this "Space Jam"
```
Results:
```
//Displays the some relevant movie info
Title: Space Jam
Year Released: 1996
IMDB Rating: 6.3
Produced In: USA
Lanuage(s): English
Plot: In a desperate attempt to win a basketball match and earn their freedom, the Looney Tunes seek the aid of retired basketball champion, Michael Jordan.
Actors: Michael Jordan, Wayne Knight, Theresa Randle, Manner Washington
Rotten Tomatoes Rating: 37%

```
