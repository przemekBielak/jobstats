import React, { Component } from 'react';
import { VictoryChart, VictoryAxis, VictoryLegend, VictoryGroup, VictoryBar, VictoryTheme } from 'victory';

import './style.css';

var osData = [];

class OsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }


    render() {

        if(typeof this.props.data != "undefined") {

            
            for(var i = osData.length; i < this.props.data.length; i++) {
                var item = this.props.data[i];
                var total = item.os.windows + item.os.linux + item.os.mac;
                var windowsAdjusted = item.os.windows * (100 / total);
                var macAdjusted = item.os.mac * (100 / total);
                var linuxAdjusted = item.os.linux * (100 / total);
                var os = {
                    windows: windowsAdjusted,
                    mac: macAdjusted,
                    linux: linuxAdjusted
                }

                osData = [...osData, {                    
                    sum: total,
                    os: os,
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
                        </VictoryGroup>
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