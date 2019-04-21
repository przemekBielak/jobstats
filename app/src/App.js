import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import SelectComponent from './SelectComponent';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      mustHaveInput: '',
      cityInput: '',
      mustHaveList: [],
      citiesList: []
    };

    this.handleCityInput = this.handleCityInput.bind(this);
    this.handleMustHaveInput = this.handleMustHaveInput.bind(this);
  }


  handleMustHaveInput = (event) => {
    this.setState({mustHaveInput: event.target.value});
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
        mustHaveList: data.requirementsMustHaveAll.sort(),
        // update default select value
        mustHaveInput: data.requirementsMustHaveAll[0]
      }));
    })
    .catch(err => console.log(err));
  }


  getCitiesList = () => {
    fetch('http://localhost:8080/cities-list')
    .then(response => response.json())
    .then(data => {
      this.setState(() => ({
        citiesList: data.citiesAll.sort(),
        // update default select value
        cityInput: data.citiesAll[0]
      }));
    })
    .catch(err => console.log(err));
  }


  componentDidMount() {
    this.getMustHaveList();
    this.getCitiesList();
  }


  render() {
    return (
      <div className="App">

        <SelectComponent 
          values={this.state.citiesList}
          input={this.state.cityInput}
          handleInput={this.handleCityInput} 
        />

        <SelectComponent 
          values={this.state.mustHaveList}
          input={this.state.mustHaveInput}
          handleInput={this.handleMustHaveInput} 
        />

        <button onClick={() => this.getLangCount(this.state.mustHaveInput, this.state.cityInput)}>
          Update
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
