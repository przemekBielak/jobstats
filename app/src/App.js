import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import './App.css';
import LangSelect from './LangSelect';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      langInput: '',
      cityInput: 'Warsaw',
      mustHaveList: [],
      cities: [
        "Any",
        "Warsaw",
        "Kraków"
      ]
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


  getMustHaveList = () => {
    fetch('http://localhost:8080/must-have-list')
    .then(response => response.json())
    .then(data => {
      this.setState(() => ({
        mustHaveList: data.requirementsMustHaveAll
      }));
    })
    .catch(err => console.log(err));
  }


  componentDidMount() {
    this.getMustHaveList();
  }


  render() {
    return (
      <div className="App">

        <LangSelect 
          cities={this.state.cities}
          cityInput={this.state.cityInput}
          handleCityInput={this.handleCityInput} 
        />

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
