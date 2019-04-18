import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    text: 'text'
  };

  get = () => {
    fetch('http://localhost:8080/api')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState({text: data[0].companyName});
    })
    .catch(err => {
      console.log(err);
    });

  }

  render() {
    return (
      <div className="App">

        <button onClick={this.get}>
          click here
        </button>

        <h1>{this.state.text}</h1>
        
      </div>
    );
  }
}

export default App;
