import React from 'react';
import { VictoryGroup, VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLegend } from 'victory';
import './style.css';

const Salary = props => {
    if(typeof props.data != "undefined" && props.data.length > 0) {
        return (
            <div>
                <VictoryChart
                    theme={VictoryTheme.material}
                >
                    <VictoryAxis
                        tickValues={props.axisTicks}
                    />
                    <VictoryAxis
                        dependentAxis
                    />
                    <VictoryLegend 
                        x={100} 
                        y={20}
                        orientation="horizontal"
                        gutter={15}
                        colorScale={"qualitative"}
                        style={{ border: { stroke: "black" }, title: {fontSize: 16 } }}
                        data={[
                            { name: "Salary Min"},
                            { name: "Salary Max"}
                        ]}
                    />
                    <VictoryGroup 
                        offset={10}
                        colorScale={"qualitative"}
                        animate={{
                            duration: 200,
                            onLoad: { duration: 0 }
                        }}
                    >
                    <VictoryBar
                        barWidth={10}
                        data={props.data}
                        x="id"
                        y="salaryMinAvg"
                    />
                    <VictoryBar
                        barWidth={10}
                        data={props.data}
                        x="id"
                        y="salaryMaxAvg"
                />
                </VictoryGroup>
            </VictoryChart>
          </div>
        );
    }
    else {
        return (null);
    }
}

export default Salary;