import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount(){
  // fetch from database
  }

  render() {
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
          <p>------------------</p>
          <p>TWEET WILL GO HERE</p>
          <p>------------------</p>
        </div>

        <div>
          <button className="Button">CNN</button>
          <button className="Button">MSNBC</button>
          <button className="Button">FOX NEWS</button>
        </div>

        <div>
          <p>Answer: [After button click, this displays with handle]</p>
          <p>Source: [After button click, this displays with hyperlink to tweet]</p>
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
