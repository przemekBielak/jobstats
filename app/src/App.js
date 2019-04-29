import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';
import SelectComponent from './SelectComponent';
import PresentComponent from './PresentComponent';
import './App.css';


const contractType = [
  'Any',
  'B2B',
  'UoP',
  'UZ',
  'UoD'
];

const seniorityLevel = [
  'Any',
  'Trainee',
  'Junior',
  'Mid',
  'Senior',
  'Expert'
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],

      mustHaveInput: '',
      cityInput: '',
      contractTypeInput: '',
      seniorityLevelInput: '',

      mustHaveList: [],
      citiesList: [],
    };
  }


  handleMustHaveInput = (event) => {
    this.setState({mustHaveInput: event.target.value});
  }

  handleCityInput = (event) => {
    this.setState({cityInput: event.target.value});
  }

  handleContractTypeInput = (event) => {
    this.setState({contractTypeInput: event.target.value});
  }

  handleSeniorityLevelInput = (event) => {
    this.setState({seniorityLevelInput: event.target.value});
  }
  
  getLangCount = (lang, city, seniority, contract) => {
    fetch('http://localhost:8080/lang-count', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lang: lang, 
        city: city,
        seniority: seniority,
        contract: contract
      })
    })
    .then(response => response.json())
    .then(data => {
      this.setState(prevState => ({
        data: [...prevState.data, {
          // known parameters
          id: prevState.data.length,
          language: lang, 
          city: city,
          seniority: seniority,
          contract: contract,
          // received parameters
          count: data.count,
          salaryMinAvg: data.salaryMinAvg,
          salaryMaxAvg: data.salaryMaxAvg,
          mustHaveRequirements: data.mustHaveRequirements
        }]
      }));
      console.log(data);
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

    // default select values
    this.setState({
      contractTypeInput: contractType[0],
      seniorityLevelInput: seniorityLevel[0],
    })
  }


  render() {
    return (
      <div className="App">

      <div className="header-options">
        <SelectComponent 
          name={'Seniority'}
          values={seniorityLevel}
          input={this.state.seniorityLevelInput}
          handleInput={this.handleSeniorityLevelInput} 
        />

        <SelectComponent 
          name={'City'}
          values={this.state.citiesList}
          input={this.state.cityInput}
          handleInput={this.handleCityInput} 
        />

        <SelectComponent 
          name={'Technology'}
          values={this.state.mustHaveList}
          input={this.state.mustHaveInput}
          handleInput={this.handleMustHaveInput} 
        />

        <SelectComponent 
          name={'Contract'}
          values={contractType}
          input={this.state.contractTypeInput}
          handleInput={this.handleContractTypeInput} 
        />

        <button onClick={() => this.getLangCount(
          this.state.mustHaveInput, 
          this.state.cityInput,
          this.state.seniorityLevelInput,
          this.state.contractTypeInput
          )}>
          Update
        </button>

      </div>


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
            style={{ data: { fill: "#c43a31" } }}
            alignment="middle"
            animate={{
              duration: 200,
              onLoad: { duration: 0 }
            }}
            data={this.state.data}
            x="id"
            y="count"
          />
        </VictoryChart>

        <PresentComponent
          data={this.state.data}
        />
      </div>
    );
  }
}

export default App;
