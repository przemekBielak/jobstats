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
            selectInput: 0,
        };
    }

    handleInput = (event) => {
        this.setState({selectInput: event.target.value});
    }

    render() {
        data = this.props.data[this.state.selectInput];
        
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
            
            var items = this.props.data.map(it => <option value={it.id}>{it.id}, {it.seniority}, {it.language}</option>);

            return (
                <div>
                    <label htmlFor={"id"}>id</label>
                    <select 
                        id={"id"}
                        input={this.state.selectInput} 
                        onChange={this.handleInput}
                        >
                        {items}
                    </select>
                    <div className="pie">
                        <VictoryPie
                            theme={VictoryTheme.material}
                            colorScale={"qualitative"}
                            animate={{
                                duration: 200,
                                onLoad: { duration: 0 }
                            }}
                            radius={90}
                            // labels={(d) => `${d.x}: ${d.y}`}
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