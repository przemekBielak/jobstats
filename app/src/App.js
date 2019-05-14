import React, { useState, useEffect } from "react";
import Select from "./components/Select/Select";
import Footer from "./components/Footer/Footer";
import Pie from "./components/Pie/Pie";
import Os from "./components/Os/Os";
import JobNumber from "./components/JobNumber/JobNumber";
import Salary from "./components/Salary/Salary";
import "./App.css";

const contractType = ["B2B", "UoP", "UZ", "UoD"];

const seniorityLevel = ["Any", "Trainee", "Junior", "Mid", "Senior", "Expert"];

const App = () => {
  const [data, setData] = useState([]);
  const [mustHaveInput, setMustHaveInput] = useState("Any");
  const [cityInput, setCityInput] = useState("Any");
  const [contractTypeInput, setContractTypeInput] = useState("B2B");
  const [seniorityLevelInput, setSeniorityLevelInput] = useState("Any");
  const [specificInput, setSpecificInput] = useState("1");
  const [mustHaveList, setMustHaveList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [axisTicks, setAxisTicks] = useState([]);  


  const handleMustHaveInput = event => {
    setMustHaveInput(event.target.value);
  };

  const handleCityInput = event => {
    setCityInput(event.target.value);
  };

  const handleContractTypeInput = event => {
    setContractTypeInput(event.target.value);
  };

  const handleSeniorityLevelInput = event => {
    setSeniorityLevelInput(event.target.value);
  };

  const handleSpecificInput = event => {
    setSpecificInput(event.target.value);
  };

  const getLangCount = (lang, city, seniority, contract) => {
    fetch("/lang-count", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        lang: lang,
        city: city,
        seniority: seniority,
        contract: contract
      })
    })
      .then(response => response.json())
      .then(dataIn => {
        if (dataIn.count !== 0) {
          console.log(axisTicks);
          setAxisTicks(
            [...axisTicks, data.length + 1]
          );
          setData([
            ...data,
            {
              // known parameters
              id: data.length + 1,
              language: lang,
              city: city,
              seniority: seniority,
              contract: contract,
              // received parameters
              count: dataIn.count,
              salaryMinAvg: dataIn.salaryMinAvg,
              salaryMaxAvg: dataIn.salaryMaxAvg,
              mustHaveRequirements: dataIn.mustHaveRequirements,
              requirementsNices: dataIn.requirementsNices,
              os: dataIn.os
            }
          ]);
          console.log(dataIn);
        } else {
          console.log("no matches found");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getMustHaveList = () => {
    fetch("/must-have-list")
      .then(response => response.json())
      .then(data => {
        setMustHaveList(data.requirementsMustHaveAll.sort());
      })
      .catch(err => console.log(err));
  };

  const getCitiesList = () => {
    fetch("/cities-list")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCitiesList(data.citiesAll.sort());
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getMustHaveList();
    getCitiesList();

    getLangCount("Java", "Any", "Any", "B2B");
    getLangCount("JavaScript", "Any", "Any", "B2B");
    getLangCount(".NET", "Any", "Any", "UoP");
  }, []);

  return (
    <div className="App">
      <div className="header-options">
        <Select
          name={"Seniority"}
          values={seniorityLevel}
          input={seniorityLevelInput}
          handleInput={handleSeniorityLevelInput}
          default={"Any"}
        />

        <Select
          name={"City"}
          values={citiesList}
          input={cityInput}
          handleInput={handleCityInput}
          default={"Any"}
        />

        <Select
          name={"Technology"}
          values={mustHaveList}
          input={mustHaveInput}
          handleInput={handleMustHaveInput}
          default={"Any"}
        />

        <Select
          name={"Contract"}
          values={contractType}
          input={contractTypeInput}
          handleInput={handleContractTypeInput}
        />

        <button
          onClick={() =>
            getLangCount(
              mustHaveInput,
              cityInput,
              seniorityLevelInput,
              contractTypeInput
            )
          }
        >
          Update
        </button>

        <Select
          name={"Active view"}
          values={axisTicks}
          input={specificInput}
          handleInput={handleSpecificInput}
        />
      </div>

      <div className="chart-flex">
        <div className="chart">
          <JobNumber data={data} ticks={axisTicks} />
        </div>

        <div className="chart">
          <Salary data={data} ticks={axisTicks} />
        </div>

        <div className="chart">
          <Os data={data} ticks={axisTicks} />
        </div>

        <div className="chart">
          <Pie
            data={data}
            info={"mustHaveRequirements"}
            input={specificInput}
            title={"Must have requirements"}
          />
        </div>

        <div className="chart">
          <Pie
            data={data}
            info={"requirementsNices"}
            input={specificInput}
            title={"Nice to have requirements"}
          />
        </div>
      </div>
      <Footer data={data} />
    </div>
  );
};

export default App;
