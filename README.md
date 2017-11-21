# The News Tweet Game
http://newstweetgame.com/

## What
A single-page application that uses the Twitter API to pull in just the text of tweets from the three major cable news networks: CNN, MSNBC, and Fox News. Visitors to the site test their news knowledge by trying to identify which network sent which tweet.

## Why
In the era of "fake news" (recently named the 2017 Word of the Year by Collins Dictionary), how different news outlets cover the same story has become a hot topic. The News Tweet Game takes away any inherent bias users may have about a particular network and puts their content front and center.

## How
* [Create React App](https://github.com/facebookincubator/create-react-app)
* [Twitter API](https://developer.twitter.com/en/docs)
* [Firebase Realtime Database](https://firebase.google.com/docs/database/web/start)
* [NPM Twitter Library](https://www.npmjs.com/package/twitter)

Note: Tweets are filtered so that tweets with the name of the network are not included (for example, a @CNN tweet with "CNN" in it will not be shown). Retweets are also excluded.
