var twit = require('twit');
var config = require('./config.js');
var fs = require('fs');

var T = new twit(config);

function tweetStatus(message) {

    var tweet = {
        status: message
    }

    T.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response) {
        if (err) {
            console.log("Something went wrong");
            console.log(err);
            console.log();
        } else {
            console.log("Success!");
        }
    }
}

function tweetEvent(tweetMSG) {

    setTimeout(function () {
        var text = tweetMSG.text;
        var from = tweetMSG.user.screen_name;

        console.log('From: ' + from);
        console.log(text);

        var newTweet = ('@' + from + ' http://smarturl.it/zTESTING TSTNG.co - Official TESTING Album Site #TESTINGALBUM');
        tweetStatus(newTweet);
    }, 10000); 
}

function followed(eventMessage) {

    var name = eventMessage.source.name;
    var screenName = eventMessage.source.screen_name;
    tweetStatus('@' + screenName + ' Thank you for following me!');
}

var stream = T.stream('statuses/filter', { track: ["ASAP Rocky", "TESTING Album", "ASAP Testing", "Daytona", "Pusha T"], language: 'en' });
stream.on('tweet', tweetEvent);

// var stream = T.stream('user');
// stream.on('follow', followed);
