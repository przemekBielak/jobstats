import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLegend } from 'victory';
import './style.css';

const JobNumber = props => {
    if(typeof props.data != "undefined" && props.data.length > 0) {
        return (
            <div>
                <VictoryChart
                    theme={VictoryTheme.material}
                    colorScale={"qualitative"}
                    domainPadding={20}
                >
                    <VictoryAxis
                        tickValues={props.ticks}
                    />
                    <VictoryAxis
                        dependentAxis
                    />
                    <VictoryLegend 
                        x={170} 
                        y={10}
                        orientation="horizontal"
                        gutter={15}
                        colorScale={"qualitative"}
                        style={{ border: { stroke: "black" }, title: {fontSize: 16 } }}
                        data={[
                            { name: "Number of jobs"},
                        ]}
                    />
                    <VictoryBar
                        animate={{
                            duration: 200,
                            onLoad: { duration: 0 }
                        }}
                        barWidth={10}
                        data={props.data}
                        x="id"
                        y="count"
                    />
                </VictoryChart>
          </div>
        );
    }
    else {
        return (null);
    }
}

export default JobNumber;
