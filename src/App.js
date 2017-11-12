import React, { Component } from 'react';
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

var seenTweets = [];
function chooseRandomTweet(){
  return db.ref().child('tweets').orderByChild('rand')
    .startAt(Math.random())
    .limitToFirst(1)
    .once('value')
    .then(_ => {
      const oneTweet = _.val()
      if (oneTweet && seenTweets.indexOf(Object.keys(oneTweet)[0]) === -1){
        seenTweets.push(Object.keys(oneTweet)[0])
        return oneTweet[Object.keys(oneTweet)[0]]
      }
      return chooseRandomTweet()
    }
  )
}

function checkTweet(tweet){
  if (tweet.indexOf('http') > -1){
    tweet = tweet.slice(0, tweet.indexOf('http')-1);
  }
  if (tweet.indexOf('&amp;') > -1){
    const pre = tweet.slice(0, tweet.indexOf('&amp;'));
    const post = tweet.slice(tweet.indexOf('&amp;')+5)
    tweet = pre + '&' + post;
  }
  return tweet;
}

function scoreCheck(value) {
  if (isNaN(value)){
    return "";
  } else {
    return value+"%";
  }
}

// MAIN COMPONENT
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweet: null,
      answer: null,
      link: null,
      counter: 0,
      score: 0,
      isResetButtonDisabled: true,
      isBrandButtonDisabled: false
    };
    this.handleCNNClick = this.handleCNNClick.bind(this);
    this.handleFOXClick = this.handleFOXClick.bind(this);
    this.handleMSNBCClick = this.handleMSNBCClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  next = () =>
    chooseRandomTweet().then(tweet => this.setState({tweet}))

  componentDidMount() {
    this.next()
  }

  handleCNNClick() {
    this.state.tweet.brand === "CNN" ?
      this.setState({score: this.state.score+1}) :
      this.setState({score: this.state.score})
    this.setState({
      answer: "Answer: " + this.state.tweet.brand,
      link: this.state.tweet.hyperlink,
      counter: this.state.counter+1,
      isResetButtonDisabled: false,
      isBrandButtonDisabled: true
    })
  }

  handleFOXClick() {
    this.state.tweet.brand === "FOX NEWS" ?
      this.setState({score: this.state.score+1}) :
      this.setState({score: this.state.score})
    this.setState({
      answer: "Answer: " + this.state.tweet.brand,
      link: this.state.tweet.hyperlink,
      counter: this.state.counter+1,
      isResetButtonDisabled: false,
      isBrandButtonDisabled: true
    })
  }

  handleMSNBCClick() {
    this.state.tweet.brand === "MSNBC" ?
      this.setState({score: this.state.score+1}) :
      this.setState({score: this.state.score})
    this.setState({
      answer: "Answer: " + this.state.tweet.brand,
      link: this.state.tweet.hyperlink,
      counter: this.state.counter+1,
      isResetButtonDisabled: false,
      isBrandButtonDisabled: true
    })
  }

  handleReset() {
    this.next()
    this.setState({
      answer: null,
      link: null,
      isResetButtonDisabled: true,
      isBrandButtonDisabled: false
    })
  }

  render() {
    const tweet = this.state.tweet;
    const answer = this.state.answer;
    const link = this.state.link;
    const score = Math.floor(this.state.score/this.state.counter*100);

    if (!tweet) return null

    return (
      <div className="App">
        <div className="App-header">
          <header>
            <h1 className="App-title">
              THE NEWS TWEET GAME
            </h1>
          </header>
        </div>

        <div className="App-intro">
          <p>Below is a tweet from CNN, MSNBC, or Fox News. Can you identify who sent it?</p>
        </div>

        <div className="Padding">
          <h3>{checkTweet(tweet.tweet)}</h3>
        </div>

        <div>
          <button id="CNN" className="Button" onClick={this.handleCNNClick} disabled={this.state.isBrandButtonDisabled}>CNN</button>
          <button id="MSNBC" className="Button" onClick={this.handleMSNBCClick} disabled={this.state.isBrandButtonDisabled}>MSNBC</button>
          <button id="FOX" className="Button" onClick={this.handleFOXClick} disabled={this.state.isBrandButtonDisabled}>FOX NEWS</button>
          <h2>{answer}&nbsp;</h2>
        </div>

        <div>
          <button className="Button-reset" onClick={this.handleReset} disabled={this.state.isResetButtonDisabled}>SEE A NEW TWEET</button>
        </div>

        <div className="Main">
          <p>Score: {scoreCheck(score)}</p>
          <p>Source: <a href={link} target="_blank">Original Tweet</a></p>
        </div>

      </div>
    );
  }
}

export default App;
