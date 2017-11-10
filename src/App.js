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
    })
}

// MAIN COMPONENT
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweet: null,
      answer: null,
      link: null
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
      answer: this.state.tweet.brand,
      link: this.state.tweet.hyperlink
    })
  }

  handleReset() {
    this.next()
    this.setState({
      answer: null,
      link: null
    })
  }

  render() {
    const tweet = this.state.tweet;
    const answer = this.state.answer;
    const link = this.state.link;
    console.log(tweet)
    if (!tweet) return null

    return (
      <div className="App">
        <div className="App-header">
          <header>
            <h1 className="App-title">
              GUESS WHO TWEETED THAT NEWS
            </h1>
          </header>
        </div>

        <div className="App-intro">
          <p>Below is a tweet from CNN, MSNBC, or Fox News. Can you identify who sent it?</p>
        </div>

        <div className="Tweet">
          <p>&nbsp;</p>
          <h3>{tweet.tweet}</h3>
          <p>&nbsp;</p>
        </div>

        <div>
          <button className="Button" onClick={this.handleClick}>CNN</button>
          <button className="Button" onClick={this.handleClick}>MSNBC</button>
          <button className="Button" onClick={this.handleClick}>FOX NEWS</button>
          <h2>Correct Answer: {answer}</h2>
          <h4>Original tweet: <a href={link} target="_blank">{link}</a></h4>
        </div>


        <div>
          <button className="Button-reset" onClick={this.handleReset}>PLAY AGAIN</button>
        </div>

        <div className="App-footer">
          <footer>
            About me: <a href="http://aprilrueb.com/" target="blank">aprilrueb</a> •
            About my code: <a href="https://github.com/aprilrueb" target="blank">GitHub</a>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
