var Twitter = require('twitter');
var {consumer_key, consumer_secret, access_token_key, access_token_secret} = require('../data/twitter_config');

// FIREBASE
var admin = require('firebase-admin');
var serviceAccount = require('../data/april-stackathon-firebase.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://april-stackathon.firebaseio.com/'
});
var db = admin.database();

// FOR TWITTER API
var client = new Twitter({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  access_token_key: access_token_key,
  access_token_secret: access_token_secret
});

// FOR FILTERING
var {msnbcBanned, cnnBanned, foxBanned} = require('./banned')

var cnn = {screen_name: 'cnn'};
var msnbc = {screen_name: 'msnbc'};
var fox = {screen_name: 'foxnews'};

// GET FILTERED TWEETS
// CNN
var cnnRequest = client.get('statuses/user_timeline', cnn, (error, tweets, response) => {
  if (!error) {
    tweets.filter((tweet) => {
      let hostExists = cnnBanned.filter((name) => tweet.text.toLowerCase().indexOf(name) > -1)
      if(!hostExists.length && !tweet.retweeted_status){
        db.ref('tweets').child(tweet.id_str).transaction(current => {
          if (current) {
            return
          } else {
            return {
              brand: 'CNN',
              tweet: tweet.text,
              rand: Math.random(),
              hyperlink: 'https://twitter.com/CNN/status/' + tweet.id_str
            }
          }
        })
      }
    })
  } else {
      throw error;
  }
})

// MSNBC
var msnbcRequest = client.get('statuses/user_timeline', msnbc, (error, tweets, response) => {
  if (!error) {
    tweets.filter((tweet) => {
      let hostExists = msnbcBanned.filter((name) => tweet.text.toLowerCase().indexOf(name) > -1)
      if(!hostExists.length && !tweet.retweeted_status){
        db.ref('tweets').child(tweet.id_str).transaction(current => {
          if (current) {
            return
          } else {
            return {
              brand: 'MSNBC',
              tweet: tweet.text,
              rand: Math.random(),
              hyperlink: 'https://twitter.com/MSNBC/status/' + tweet.id_str
            }
          }
        })
      }
    })
  } else {
      throw error;
  }
})

// FOX NEWS
var foxRequest = client.get('statuses/user_timeline', fox, (error, tweets, response) => {
  if (!error) {
    tweets.filter((tweet) => {
      console.log(!tweet.retweeted_status)
      let hostExists = foxBanned.filter((name) => tweet.text.toLowerCase().indexOf(name) > -1)
      if(!hostExists.length && !tweet.retweeted_status){
        db.ref('tweets').child(tweet.id_str).transaction(current => {
          if (current) {
            return
          } else {
            return {
              brand: 'FOX NEWS',
              tweet: tweet.text,
              rand: Math.random(),
              hyperlink: 'https://twitter.com/FoxNews/status/' + tweet.id_str
            }
          }
        })
      }
    })
  } else {
      throw error;
  }
})

module.exports = {cnnRequest, msnbcRequest, foxRequest};
