import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import './App.css';

class App extends Component {
  state = {
    data: [],
    dataInput: ''
  };

  handleInputDataChange = (event) => {
    this.setState({dataInput: event.target.value});
  }

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


        <input type="text" value={this.state.dataInput} onChange={this.handleInputDataChange}/>

        <button onClick={() => this.getLangCount(this.state.dataInput)}>
          click here
        </button>

        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={20}
        >
          <VictoryAxis
          />
          <VictoryAxis
            dependentAxis
          />
          <VictoryBar
            animate={{
              duration: 200,
              onLoad: { duration: 0 }
            }}
            width={1200}
            data={this.state.data}
            x="language"
            y="count"
          />
        </VictoryChart>
      </div>
    );
  }
}

export default App;
