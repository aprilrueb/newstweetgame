var functions = require('firebase-functions');
// var {db, cnnRequest, msnbcRequest, foxRequest} = require( '../src/twitter.js');

var admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var db = admin.database();

// COUNTER
exports.counter = functions.db.ref('tweet').onWrite(event => {
  var collectionRef = event.data.ref.parent;
  var countRef = collectionRef.parent.child('tweets_count');

  return countRef.transaction(current => {
      return (current || 0) + 1;
  }).then(() => {
    console.log('Counter updated.');
  });
});
