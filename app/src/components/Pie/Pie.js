import React from "react";
import { VictoryPie, VictoryTheme } from "victory";
import "./Pie.css";

const Pie = props => {
  // data starts at 0, select starts at 1
  const data = props.data[props.input - 1];

  if (typeof data != "undefined") {
    let reqDataY = [];
    let reqDataX = [];
    let graphData = [];

    data[props.info].forEach(req => {
      reqDataY.push(req[1]);
      reqDataX.push(req[0]);
    });

    for (let i = 0; i < reqDataX.length; i++) {
      graphData.push({ x: reqDataX[i], y: reqDataY[i] });
    }

    return (
      <div>
        <h2 className="title">{props.title}</h2>
        <div className="pie">
          <VictoryPie
            theme={VictoryTheme.material}
            colorScale={"qualitative"}
            animate={{
              duration: 200,
              onLoad: { duration: 0 }
            }}
            radius={90}
            labelRadius={105}
            style={{ labels: { fontSize: 12 } }}
            data={graphData}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Pie;
