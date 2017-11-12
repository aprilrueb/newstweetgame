import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDeSlDSixrOg7qjrm2EgKauwIxIi4tX7Co",
  authDomain: "april-stackathon.firebaseapp.com",
  databaseURL: "https://april-stackathon.firebaseio.com",
  projectId: "april-stackathon",
  storageBucket: "april-stackathon.appspot.com",
  messagingSenderId: "964545777027"
};

firebase.initializeApp(config);
var db = firebase.database();

function chooseRandomTweet(){
  return db.ref().child('tweets').orderByChild('rand')
    .startAt(Math.random())
    .limitToFirst(1)
    .once('value')
    .then(_ => {
      const oneTweet = _.val()
      if (oneTweet) return oneTweet[Object.keys(oneTweet)[0]]
      return chooseRandomTweet()
    }
  )
}

function checkTweet(tweet){
  if (tweet.indexOf('http') > -1){
    tweet = tweet.slice(0, tweet.indexOf('http')-1);
  }
  if (tweet.indexOf('&amp;') > -1){
    let pre = tweet.slice(0, tweet.indexOf('&amp;'));
    let post = tweet.slice(tweet.indexOf('&amp;')+5)
    tweet = pre + '&' + post;
  }
  return tweet;
}

function checkForAmpersand(tweet){
  if (tweet.indexOf('http') > -1){
    tweet = tweet.slice(0, tweet.indexOf('http')-1);
  }
  return tweet;
}

// MAIN COMPONENT
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweet: null,
      answer: null,
      link: null,
      counter: 10,
      score: null,
      isResetButtonDisabled: true,
      isBrandButtonDisabled: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  next = () =>
    chooseRandomTweet().then(tweet => this.setState({tweet}))

  componentDidMount() {
    this.next()
  }

  handleClick() {
    this.setState({
      answer: "Answer: " + this.state.tweet.brand,
      link: this.state.tweet.hyperlink,
      counter: this.state.counter+1,
      score: this.state.score,
      isResetButtonDisabled: false,
      isBrandButtonDisabled: true
    })
  }

  handleReset() {
    this.next()
    this.setState({
      answer: null,
      link: null,
      score: this.state.score+1,
      isResetButtonDisabled: true,
      isBrandButtonDisabled: false
    })
  }

  render() {
    const tweet = this.state.tweet;
    const answer = this.state.answer;
    const link = this.state.link;
    const score = Math.floor(this.state.score/this.state.counter*100)+"%";
    if (!tweet) return null

    return (
      <div className="App">
        <div className="App-header">
          <header>
            <h1 className="App-title">
              WHO TWEETED THAT NEWS
            </h1>
          </header>
        </div>

        <div className="App-intro">
          <p>Below is a tweet from CNN, MSNBC, or Fox News. Can you identify who sent it?</p>
        </div>

        <div className="Tweet">
          <h3>{checkTweet(tweet.tweet)}</h3>
        </div>

        <div>
          <button className="Button" onClick={this.handleClick} disabled={this.state.isBrandButtonDisabled}>CNN</button>
          <button className="Button" onClick={this.handleClick} disabled={this.state.isBrandButtonDisabled}>MSNBC</button>
          <button className="Button" onClick={this.handleClick} disabled={this.state.isBrandButtonDisabled}>FOX NEWS</button>
          <h2>{answer}&nbsp;</h2>
          <h3>Score: {score}</h3>
          <h4>Source: <a href={link} target="_blank">ORIGINAL TWEET</a></h4>
        </div>

        <div>
          <button className="Button-reset" onClick={this.handleReset} disabled={this.state.isResetButtonDisabled}>SEE A NEW TWEET</button>
        </div>

      </div>
    );
  }
}

export default App;
