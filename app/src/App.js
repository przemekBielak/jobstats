import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import './App.css';

class App extends Component {
  state = {
    text: 'text',
    dataGraph : [
      {quarter: 'Java', earnings: 10},
      {quarter: 'JavaScript', earnings: 10},
      {quarter: 'C#', earnings: 10},
    ]
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
      this.setState({text: data.count});
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

        <h1>{this.state.text}</h1>

        <div className="graph">
        <VictoryChart
          domainPadding={20}
        >
          <VictoryAxis
            // tickValues={[1, 2, 3, 4]}
            // tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
          />
          <VictoryAxis
            dependentAxis
            // tickFormat={(x) => (`$${x / 1000}k`)}
          />
          <VictoryBar
            data={this.state.dataGraph}
            x="quarter"
            y="earnings"
          />
        </VictoryChart>
        </div>
      </div>
    );
  }
}

export default App;
