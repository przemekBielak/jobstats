import React from "react";
import {
  VictoryChart,
  VictoryAxis,
  VictoryLegend,
  VictoryStack,
  VictoryBar,
  VictoryTheme,
  Border
} from "victory";
import "./Os.css";

let osData = [];

const Os = props => {
  // check if array exists and has more than 0 elements
  if (typeof props.data != "undefined" && props.data.length > 0) {
    // create data structure for Os chart
    for (let i = osData.length; i < props.data.length; i++) {
      const item = props.data[i];
      const total = item.os.windows + item.os.linux + item.os.mac;

      osData = [
        ...osData,
        {
          os: {
            windows: item.os.windows * (100 / total),
            mac: item.os.mac * (100 / total),
            linux: item.os.linux * (100 / total)
          },
          id: item.id
        }
      ];
    }

    return (
      <div>
        <h2 className="title">OS marketshare</h2>
        <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
          <VictoryAxis
            tickValues={props.ticks}
            style={{
              tickLabels: { fontSize: 12, padding: 2 }
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={t => `${t}%`}
            style={{
              tickLabels: { fontSize: 12, padding: 2 }
            }}
          />
          <VictoryLegend
            x={70}
            y={10}
            orientation="horizontal"
            gutter={15}
            colorScale={"qualitative"}
            borderComponent={<Border width={230} />}
            style={{ border: { stroke: "black" }, title: { fontSize: 16 } }}
            data={[{ name: "Windows" }, { name: "Linux" }, { name: "MacOS" }]}
          />

          <VictoryStack
            animate={{
              duration: 200,
              onLoad: { duration: 0 }
            }}
            colorScale={"qualitative"}
          >
            <VictoryBar barWidth={10} data={osData} x="id" y="os.windows" />
            <VictoryBar barWidth={10} data={osData} x="id" y="os.linux" />
            <VictoryBar barWidth={10} data={osData} x="id" y="os.mac" />
          </VictoryStack>
        </VictoryChart>
      </div>
    );
  } else {
    return null;
  }
};

export default Os;
