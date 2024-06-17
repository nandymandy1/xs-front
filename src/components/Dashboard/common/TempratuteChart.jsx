import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { Tooltip } from "antd";

const getColor = (value) => {
  if (value <= 25) return "#0BCBDB";
  if (value <= 35) return "#2ECC71";
  if (value <= 45) return "#F5B041";
  return "#E74C3C";
};

const Data = [
  { time: "10:05:19 PM", value: 39.44 },
  { time: "10:05:34 PM", value: 39.44 },
  { time: "10:05:49 PM", value: 39.44 },
  { time: "10:06:05 PM", value: 39.44 },
  { time: "10:06:21 PM", value: 39.44 },
  { time: "10:06:36 PM", value: 39.44 },
  { time: "10:06:53 PM", value: 39.44 },
];

const Temprature = ({ data = [...Data] }) => {
  const lineData = [
    {
      id: "line",
      data: data.map((d) => ({ x: d.time, y: d.value })),
    },
  ];

  const CustomLineLayer = ({ series, lineGenerator, xScale, yScale }) => {
    const pathData = series[0].data.reduce((acc, point, index, array) => {
      if (index === 0) return acc;

      const prevPoint = array[index - 1];
      const color = getColor(point.data.y);
      const segment = `
        M${xScale(prevPoint.data.x)},${yScale(prevPoint.data.y)}
        L${xScale(point.data.x)},${yScale(point.data.y)}
      `;
      acc.push({ color, segment });
      return acc;
    }, []);

    return (
      <g>
        {pathData.map((path, index) => (
          <path
            key={index}
            fill="none"
            strokeWidth={2}
            d={path.segment}
            stroke={path.color}
          />
        ))}
      </g>
    );
  };

  return (
    <div style={{ width: 350 }} className="w-[250px] py-5 h-[100px]">
      <ResponsiveLine
        data={lineData}
        margin={{ top: 50, bottom: 50, left: 50, right: 50 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Time",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: -40,
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        enableArea={true}
        enableGridX={false}
        enableGridY={false}
        isInteractive={true}
        lineWidth={2}
        layers={[
          "grid",
          "markers",
          "areas",
          CustomLineLayer,
          "slices",
          "points",
          "mesh",
          "legends",
        ]}
      />
    </div>
  );
};

export default Temprature;
