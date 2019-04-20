import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      langInput: '',
      cityInput: ''
    };

    this.handleCityInput = this.handleCityInput.bind(this);
    this.handleLangInput = this.handleLangInput.bind(this);
  }

  handleLangInput = (event) => {
    this.setState({langInput: event.target.value});
  }

  handleCityInput = (event) => {
    this.setState({cityInput: event.target.value});
  }

  getLangCount = (lang, city) => {
    fetch('http://localhost:8080/lang-count', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({lang: lang, city: city})
    })
    .then(response => response.json())
    .then(data => {
      let valLang = `${lang} ${city}`
      this.setState(prevState => ({
        data: [...prevState.data, {language: valLang, count: data.count}]
      }));
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="App">

        <select value={this.state.cityInput} onChange={this.handleCityInput}>
          <option value="Warsaw">Warsaw</option>
          <option value="Wrocław">Wrocław</option>
          <option value="Kraków">Kraków</option>
          <option value="Gdańsk">Gdańsk</option>
        </select>

        <input type="text" value={this.state.langInput} onChange={this.handleLangInput}/>

        <button onClick={() => this.getLangCount(this.state.langInput, this.state.cityInput)}>
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
