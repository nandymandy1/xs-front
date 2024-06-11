import { Area, AreaChart, Tooltip, XAxis } from "recharts";
import { useSubscription, gql } from "@apollo/client";
import { useState } from "react";
import dayjs from "dayjs";

const TEST_WS_SUBSCRIPTION = gql`
  subscription TestWs {
    testWs
  }
`;

const SampleAreaChart = () => {
  const [data, setData] = useState([]);

  useSubscription(TEST_WS_SUBSCRIPTION, {
    onData: ({
      data: {
        data: { testWs },
      },
    }) => {
      const factor = Math.floor(Math.random() * 11) + 90;
      const ofactor = Math.floor(Math.random() * 11) + 9;

      const updatedValues = [
        ...data,
        {
          random: ofactor,
          pv: (testWs / factor).toFixed(2),
          factor: (factor / ofactor).toFixed(2),
          name: dayjs(new Date()).format("h:mm:ss A"),
        },
      ].slice(-10);

      setData(updatedValues);
    },
  });

  return (
    <AreaChart
      width={400}
      data={data}
      height={250}
      margin={{ top: 10, right: 15, left: 15, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="15%" stopColor="#fff" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorFactor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="20%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorRandom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#E74C3C" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#E74C3C" stopOpacity={0} />
        </linearGradient>
      </defs>
      {/* <XAxis dataKey="name" /> */}
      <Tooltip />
      <Area
        name="Factor"
        fillOpacity={1}
        type="monotone"
        dataKey="factor"
        stroke="#8884d8"
        fill="url(#colorFactor)"
      />
      <Area
        dataKey="pv"
        name="Pressure"
        type="monotone"
        fillOpacity={1}
        stroke="#82ca9d"
        fill="url(#colorPv)"
      />
      <Area
        dataKey="random"
        name="Random"
        type="monotone"
        fillOpacity={1}
        stroke="#E74C3C"
        fill="url(#colorRandom)"
      />
    </AreaChart>
  );
};

export default SampleAreaChart;
