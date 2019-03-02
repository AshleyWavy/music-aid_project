
"use strict";

/*

note: 
expressjs.com

*/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var bodyParser = require('body-parser');
//var querystring = require("querystring");
var path = require('path'); //searches for files
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: '8556fac6382e427db8d7bc79875d6652',
    secret: '628c8ac0b1504dd6bead6f6f2f9ab459'
  });
  

//set up for the express app to handle data parsing

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" })); //?

app.get ('/', function (req, res){
		 res.sendFile(path.join(__dirname + '/index.html'));
}); 

//for css
app.use(express.static(__dirname + '/public'));

//POST
var data = "";

app.post('/albums', function(req,res){
		            
            var clientQuery = req.body.albumName;
            
            //var clientType = params.musicType;
            console.log("----------------------------------test--------------------------------");
        
            spotify.search({ type: 'album', query: clientQuery}, function(err, data) {
                if ( err ) 
                {
                console.log('Error occurred: ' + err);
                return;
                }
                var myArray = [];
                //try to interpret this for-loop
                var items = data.albums.items;
                for (var i = 0; i<items.length; i++)
                {
                    var item = items[i];
                    //console.log(item.name);
                    var artists = item.artists;
//                    for (var j = 0; j<artists.length; j++) 
//                    {
//                    var artist = artists[j];
//                    console.log("artist: " + artist.name);
//                    console.log("–––");
//                    }
//                    console.log("***");
                    
                    var specificAlbumData = {
                        albumID: item.id,
                        albumName: item.name,
                        albumArtist: item.artists[0].name,
                        //trackLength: millisToMinutesAndSeconds(item.duration_ms),
                        //trackAlbum: item.preview_url,
                        type: item.type,
                        albumImage: item.images[2].url
                    };
                    console.log(specificAlbumData);
                    myArray.push(specificAlbumData);
                    //console.log(data.albums);
                    //console.log("***");
                    
                }
                //res.json(JSON.stringify(data.albums)); //res responds things back to the browser
                res.json(JSON.stringify(myArray)); //res responds things back to the browser 
                //console.log(data.albums);
                console.log(myArray);
                
            });
});
	
app.post('/artists', function(req,res){
		            
            var clientQuery = req.body.artistName;
            //var clientQuery = 'flying lotus';
           
            console.log("----------------------------------test--------------------------------");
        
            spotify.search({ type: 'artist', query: clientQuery}, function(err, data) {
                if ( err ) 
                {
                console.log('Error occurred: ' + err);
                return;
                }

                var myArray = [];
                //try to interpret this for-loop
                var items = data.artists.items;
                for (var i = 0; i<items.length; i++)
                {
                    var item = items[i];
                    console.log(item.name);
                    
                    console.log(item.id);
                    var name = item.name;
                    var genres = item.genres;
                    //var genre = items.genres;
                    //for (var j = 0; j<name.length; j++) 
                    //{
                    //var artist = name[j];
                    //console.log("genre: " );
                    console.log("–––");
                    //}
                    console.log("***");
                    
                    var specificArtistData = {
                        artistID: item.id,
                        artistName: name,
                        artistGenres: genres,
                        artistImage: item.images[2],
                        //trackArtist: item.artists,
//                        trackArtist: item.artists[0].name,
//                        trackLength: millisToMinutesAndSeconds(item.duration_ms),
//                        trackAlbum: item.album.name,
//                        trackPreview: item.preview_url,
                        type: item.type
                        
                    };
                    
                     console.log(items);
                    myArray.push(specificArtistData);
                }
                res.json(JSON.stringify(myArray)); //res responds things back to the browser
                
                console.log(myArray);
               
            });
});

app.post('/tracks', function(req,res){
		            
            var clientQuery = req.body.trackName;
            //var clientQuery = 'fashion week';
            console.log(clientQuery);
            console.log("----------------------------------test--------------------------------");
        
            spotify.search({ type: 'track', query: clientQuery}, function(err, data) {
                if ( err ) 
                {
                console.log('Error occurred: ' + err);
                return;
                }
                console.log(data);

                var myArray = [];
                
                //try to interpret this for-loop
                var items = data.tracks.items;
                for (var i = 0; i<items.length; i++)
                {
                    var item = items[i];
//Yes!!
//                    console.log(item.name);
//                    
//                    console.log(item.id);
//                    console.log(item.type);
                    
                    var name = item.name;
                    //var genre = items.genres;
                    //for (var j = 0; j<name.length; j++) 
                    //{
                    //var artist = name[j];
                    //console.log("genre: " );
                    console.log("–––");
                    //}
                    console.log("***");
                    var specificTrackData = {
                        trackID: item.id,
                        trackName: name,
                        //trackArtist: item.artists,
                        
                        trackLength: millisToMinutesAndSeconds(item.duration_ms),
                        trackArtist: item.artists[0].name,
                        trackAlbum: item.album.name,
                        trackPreview: item.preview_url,
                        type: item.type
                        
                    };
                    myArray.push(specificTrackData);
                }
                res.json(JSON.stringify(myArray)); //res responds things back to the browser. the object i made is being sent back to the browser (client side)
                //console.log(data);
                //console.log(data.tracks);// whole object
                console.log(myArray);
            });
});

//Thank You <3
function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}



//DATABASE
//var Album = require("../models/albums.js");

//app.listen(8080);
var port = process.env.PORT || 8080;
app.listen(port);





