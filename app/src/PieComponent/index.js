import React from 'react';
import { VictoryPie, VictoryTheme } from 'victory';

import './style.css';


const PieComponent = props => {
    const data = props.data;
    if(typeof data != "undefined") {

        var reqDataY = [];
        var reqDataX = [];
        var graphData = [];

        data.mustHaveRequirements.forEach(req => {
            reqDataY.push(req[1]);
            reqDataX.push(req[0]);
        });

        for(var i = 0; i < reqDataX.length; i++) {
            graphData.push({x: reqDataX[i], y: reqDataY[i]});
        }

        return (
            <div>
                <VictoryPie
                    theme={VictoryTheme.material}
                    colorScale={"qualitative"}
                    animate={{
                        duration: 200,
                        onLoad: { duration: 0 }
                      }}
                    radius={80}
                    labels={(d) => `${d.x}: ${d.y}`}
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

export default PieComponent;