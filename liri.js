//Requirements
require("dotenv").config();
var axios = require('axios');
var Spotify = require('node-spotify-api');
var keys = require("./keys");
var fs = require('fs');
var moment = require('moment');

var spotify = new Spotify(keys.spotify);
//Store input as variables
var type = process.argv[2];
var specific = process.argv[3];
//Conditonal logic begins
//Spotify
if (type === 'spotify-this-song') {
    spotify
        .search({
            type: 'track',
            query: specific
        })
        .then(function (response) {
            if (response.tracks.total === 0) {
                console.log('Sorry, there is no data to display :0(')
            }
            console.log('\x1b[36m%s\x1b[0m',
                '|------------------------------|')

            for (var i = 0; i < response.tracks.items.length; i++) {
                console.log('Artist: ' + response.tracks.items[i].artists[0].name)
                console.log('Preview URL: ' + response.tracks.items[i].preview_url)
                console.log('Song Title: ' + response.tracks.items[i].name)
                console.log('Album: ' + response.tracks.items[i].album.name)
                console.log('\x1b[36m%s\x1b[0m',
                    '|------------------------------|')

            }
        })

        .catch(function (err) {
            console.log(err);
        });
}
//OMDB
else if (type === 'movie-this') {
    axios.get("http://www.omdbapi.com/?t=" + specific + "&y=&plot=short&apikey=18b932ed").then(
        function (response) {
            console.log('\x1b[36m%s\x1b[0m',
                '|------------------------------|')
            console.log('Title: ' + response.data.Title);
            console.log("The movie was produced in: " + response.data.Country);
            console.log('THe movie is in this language: ' + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log('Actors : ' + response.data.Actors);
            console.log("The IMDB rating rating is: " + response.data.imdbRating);
            console.log('The Rotten Tomatoes rating is: ' + response.data.Ratings[1].Value);
            console.log('\x1b[36m%s\x1b[0m',
                '|------------------------------|')
        }
    );
}

//Bands In Town
else if (type === 'concert-this') {
    var queryUrl = "https://rest.bandsintown.com/artists/" + specific + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(function (response) {
        console.log('\x1b[36m%s\x1b[0m',
            '|------------------------------|')
        for (var i = 0; i < response.data.length; i++) {
            console.log('Venue name: ' + response.data[i].venue.name);

            console.log('The venue is located in: ' + response.data[i].venue.city + ', ' + response.data[i].venue.country);
            console.log('The day of the show is: ' + moment(response.data[i].datetime, "YYYY-MM-DD[T]HH:mm:ss").format("MM/DD/YY"));
            console.log('\x1b[36m%s\x1b[0m',
                '|------------------------------|')
        }
    })
}

//Do what it says
else if (type === 'do-what-it-says') {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        if (data.indexOf(",") !== -1) {
            var dataArr = data.split(",");
            type = dataArr[0];
            specific = dataArr[1];
        } else {
            type = data;
        }

        if (type === 'spotify-this-song') {
            spotify
                .search({
                    type: 'track',
                    query: specific
                })
                .then(function (response) {
                    console.log('\x1b[36m%s\x1b[0m',
                        '|------------------------------|')
                    for (var i = 0; i < response.tracks.items.length; i++) {
                        console.log('Artist: ' + response.tracks.items[i].artists[0].name)
                        console.log('Preview URL: ' + response.tracks.items[i].preview_url)
                        console.log('Song Title: ' + response.tracks.items[i].name)
                        console.log('Album: ' + response.tracks.items[i].album.name)
                        console.log('\x1b[36m%s\x1b[0m',
                            '|------------------------------|')
                    }
                })

                .catch(function (err) {
                    console.log(err);
                });
        };

    });
}

//No valid input
else {
    console.log('\x1b[36m%s\x1b[0m',
        '|------------------------------|')
    console.log('Sorry, that is not a valid command.')
    console.log('Try one of these: spotify-this-song, do-what-it-says, movie-this, concert-this.')
    console.log('\x1b[36m%s\x1b[0m',
        '|------------------------------|')
};