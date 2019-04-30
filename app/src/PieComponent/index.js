import React, { Component } from 'react';
import { VictoryPie, VictoryTheme } from 'victory';

import './style.css';

var data;
var reqDataY = [];
var reqDataX = [];
var graphData = [];

class PieComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            element: 0
        };
    }

    
    render() {
        data = this.props.data[this.state.element];
        
        if(typeof data != "undefined") {
            reqDataY = [];
            reqDataX = [];
            graphData = [];

            data.mustHaveRequirements.forEach(req => {
                reqDataY.push(req[1]);
                reqDataX.push(req[0]);
            });
    
            for(var i = 0; i < reqDataX.length; i++) {
                graphData.push({x: reqDataX[i], y: reqDataY[i]});
            }
            console.log(graphData);
            return (
                <div>
                    <button>test</button>
                    <VictoryPie
                        theme={VictoryTheme.material}
                        colorScale={"qualitative"}
                        animate={{
                            duration: 200,
                            onLoad: { duration: 0 }
                          }}
                        radius={80}
                        // labels={(d) => `${d.x}: ${d.y}`}
                        data={graphData}
                    />
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

export default PieComponent;