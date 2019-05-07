import React, { Component } from 'react';
import Select from './components/Select/Select';
import Footer from './components/Footer/Footer';
import Pie from './components/Pie/Pie';
import Os from './components/Os/Os';
import JobNumber from './components/JobNumber/JobNumber';
import Salary from './components/Salary/Salary';
import './App.css';

const contractType = [
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

      mustHaveInput: 'Any',
      cityInput: 'Any',
      contractTypeInput: 'B2B',
      seniorityLevelInput: 'Any',
      specificInput: '1',

      mustHaveList: [],
      citiesList: [],

      // axis values
      axisTicks: [],
      selectedPie: 0
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

  handleSpecificInput = (event) => {
    this.setState({specificInput: event.target.value});
  }

  
  getLangCount = (lang, city, seniority, contract) => {
    fetch('/lang-count', {
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
      if(data.count != 0) {
        this.setState(prevState => ({
          data: [...prevState.data, {
            // known parameters
            id: prevState.data.length + 1,
            language: lang, 
            city: city,
            seniority: seniority,
            contract: contract,
            // received parameters
            count: data.count,
            salaryMinAvg: data.salaryMinAvg,
            salaryMaxAvg: data.salaryMaxAvg,
            mustHaveRequirements: data.mustHaveRequirements,
            requirementsNices: data.requirementsNices,
            os: data.os
          }],
          axisTicks: [...prevState.axisTicks, prevState.data.length + 1]
        }));
        console.log(data);
      }    
      else {
        console.log("no matches found")
      }  
    })
    .catch(err => {
      console.log(err);
    });
  }


  getMustHaveList = () => {
    fetch('/must-have-list')
    .then(response => response.json())
    .then(data => {
      this.setState(() => ({
        mustHaveList: data.requirementsMustHaveAll.sort(),
      }));
    })
    .catch(err => console.log(err));
  }


  getCitiesList = () => {
    fetch('/cities-list')
    .then(response => response.json())
    .then(data => {
      this.setState(() => ({
        citiesList: data.citiesAll.sort(),
      }));
    })
    .catch(err => console.log(err));
  }


  componentDidMount() {
    this.getMustHaveList();
    this.getCitiesList();

    this.getLangCount("Java", "Any", "Any", "B2B");
    this.getLangCount("JavaScript", "Any", "Any", "B2B");
    this.getLangCount(".NET", "Any", "Any", "UoP");
  }


  render() {
    return (
      <div className="App">

      <div className="header-options">
        <Select 
          name={'Seniority'}
          values={seniorityLevel}
          input={this.state.seniorityLevelInput}
          handleInput={this.handleSeniorityLevelInput} 
          default={"Any"}
        />

        <Select 
          name={'City'}
          values={this.state.citiesList}
          input={this.state.cityInput}
          handleInput={this.handleCityInput} 
          default={"Any"}
        />

        <Select 
          name={'Technology'}
          values={this.state.mustHaveList}
          input={this.state.mustHaveInput}
          handleInput={this.handleMustHaveInput} 
          default={"Any"}
        />

        <Select 
          name={'Contract'}
          values={contractType}
          input={this.state.contractTypeInput}
          handleInput={this.handleContractTypeInput} 
        />

        <button 
          onClick={() => this.getLangCount(
          this.state.mustHaveInput, 
          this.state.cityInput,
          this.state.seniorityLevelInput,
          this.state.contractTypeInput
          )}>
          Update
        </button>

        <Select 
          name={'Active view'}
          values={this.state.axisTicks}
          input={this.state.specificInput}
          handleInput={this.handleSpecificInput} 
        />
      </div>

      <div className="chart-flex">
        <div className="chart">
          <JobNumber
            data={this.state.data}
            ticks={this.state.axisTicks}
          />
        </div>

        <div className="chart">
          <Salary
            data={this.state.data}
            ticks={this.state.axisTicks}
          />
        </div>


        <div className="chart">
          <Os
            data={this.state.data}
            ticks={this.state.axisTicks}
          />
        </div>


        <div className="chart">
          <Pie 
            data={this.state.data}
            info={"mustHaveRequirements"}
            input={this.state.specificInput}
            title={"Must have requirements"}
          />
        </div>

        <div className="chart">
          <Pie 
            data={this.state.data}
            info={"requirementsNices"}
            input={this.state.specificInput}
            title={"Nice to have requirements"}
          />
        </div>

      </div>
        <Footer
          data={this.state.data}
        />
      </div>
    );
  }
}

export default App;
