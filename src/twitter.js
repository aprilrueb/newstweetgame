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

function getTweets(brandHandle, brandCheck, brandAnswer){
  client.get('statuses/user_timeline', {screen_name: brandHandle}, (error, tweets, response) => {
    if (!error) {
      tweets.filter((tweet) => {
        if (tweet.text.toLowerCase().indexOf(brandCheck) === -1 && !tweet.retweeted_status){
          db.ref('tweets').child(tweet.id_str).transaction(current => {
            if (current) {
              return
            } else {
              return {
                brand: brandAnswer,
                tweet: tweet.text,
                rand: Math.random(),
                hyperlink: 'https://twitter.com/' + brandHandle + '/status/' + tweet.id_str
              }
            }
          })
        }
      })
    } else {
      throw error;
    }
  })
}

getTweets('foxnews', 'fox', 'FOX NEWS');
getTweets('cnn', 'cnn', 'CNN');
getTweets('msnbc', 'nbc', 'MSNBC');
