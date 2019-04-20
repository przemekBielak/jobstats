import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import './App.css';

class App extends Component {
  state = {
    data: []
  };

  getLangCount = (lang) => {
    fetch('http://localhost:8080/lang-count', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({lang: lang})
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState(prevState => ({
        data: [...prevState.data, {language: lang, count: data.count}]
      }));
    })
    .catch(err => {
      console.log(err);
    });

  }

  render() {
    return (
      <div className="App">

        <button onClick={() => this.getLangCount('Java')}>
          click here
        </button>

        <div className="graph">
        <VictoryChart
          domainPadding={20}
        >
          <VictoryAxis
          />
          <VictoryAxis
            dependentAxis
          />
          <VictoryBar
            data={this.state.data}
            x="language"
            y="count"
          />
        </VictoryChart>
        </div>
      </div>
    );
  }
}

export default App;
