import React, { Component } from 'react';
import { VictoryChart, VictoryAxis, VictoryLegend, VictoryStack, VictoryBar, VictoryTheme } from 'victory';

import './style.css';

var osData = [];

class OsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }


    render() {

        if(typeof this.props.data != "undefined" && this.props.data.length > 0) {

            
            for(var i = osData.length; i < this.props.data.length; i++) {
                const item = this.props.data[i];
                const total = item.os.windows + item.os.linux + item.os.mac;

                osData = [...osData, {                    
                    os: {
                        windows: item.os.windows * (100 / total),
                        mac: item.os.mac * (100 / total),
                        linux: item.os.linux * (100 / total)
                    },
                    id: item.id
                }];
            };

            return (
                <div>
                    <VictoryChart
                        theme={VictoryTheme.material}
                    >
                        <VictoryAxis
                            tickValues={this.props.ticks}
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
                                { name: "Windows"},
                                { name: "Linux"},
                                { name: "MacOS"}
                            ]}
                        />

                        <VictoryStack
                            animate={{
                            duration: 200,
                            onLoad: { duration: 0 }
                            }}
                            colorScale={"qualitative"}
                        >
                            <VictoryBar
                                barWidth={10}
                                data={osData}
                                x="id"
                                y="os.windows"
                            />
                            <VictoryBar
                                barWidth={10}
                                data={osData}
                                x="id"
                                y="os.linux"
                            />
                            <VictoryBar
                                barWidth={10}
                                data={osData}
                                x="id"
                                y="os.mac"
                            />
                        </VictoryStack>
                    </VictoryChart>
                </div>
            );
        }
        else {
            return (
                <h1></h1>
            );
        }
    }
}

export default OsComponent;