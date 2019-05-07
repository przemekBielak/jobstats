import React from 'react';
import { VictoryGroup, VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLegend, VictoryLabel } from 'victory';
import './Salary.css';

const Salary = props => {
    if(typeof props.data != "undefined" && props.data.length > 0) {
        return (
            <div>
                <h2 className="title">Salary</h2>
                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={20}
                >
                    <VictoryAxis
                        tickValues={props.axisTicks}
                        style={{
                            tickLabels: {fontSize: 12, padding: 2}
                        }}
                    />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={(t) => `${(t/1000).toFixed(1)}k`}
                        style={{
                            tickLabels: {fontSize: 12, padding: 2}
                        }}
                        tickLabelComponent={<VictoryLabel textAnchor="end" />}
                    />
                    <VictoryLegend 
                        x={90} 
                        y={10}
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
