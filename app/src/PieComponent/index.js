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
        };
    }

    render() {
        data = this.props.data[this.props.input];
        
        if(typeof data != "undefined") {
            reqDataY = [];
            reqDataX = [];
            graphData = [];

            data[this.props.info].forEach(req => {
                reqDataY.push(req[1]);
                reqDataX.push(req[0]);
            });
    
            for(var i = 0; i < reqDataX.length; i++) {
                graphData.push({x: reqDataX[i], y: reqDataY[i]});
            }
            
            return (
                <div>
                    <div className="pie">
                        <VictoryPie
                            theme={VictoryTheme.material}
                            colorScale={"qualitative"}
                            animate={{
                                duration: 200,
                                onLoad: { duration: 0 }
                            }}
                            radius={90}
                            labelRadius={100}
                            style={{ labels: {fontSize: 12} }}
                            data={graphData}
                        />
                    </div>
                </div>
            );
        }
        else {
            return (null);
        }
    }
}

export default PieComponent;