import React, { useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const getColor = (value) => {
  if (value <= 30) return "#0BCBDB";
  if (value <= 40) return "#2ECC71";
  if (value <= 50) return "#F5B041";
  return "#E74C3C";
};

const prepareData = (data = []) => ({
  labels: data.map(({ time }) => time),
  datasets: [
    {
      fill: true,
      label: "Temprature",
      data: data.map(({ value }) => value),
    },
  ],
});

const options = {
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
};

const CustomLineChart = ({ data = [] }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const customPlugin = {
      id: "customPlugin",
      afterDatasetDraw: (chart) => {
        const {
          ctx,
          data,
          scales: { x, y },
          chartArea: { top, bottom },
        } = chart;

        ctx.save();

        const labels = data.labels;
        const dataset = data.datasets[0].data;

        dataset.forEach((currValue, index) => {
          if (index === 0) return;
          const prevValue = dataset[index - 1];
          const prevX = x.getPixelForValue(labels[index - 1]);
          const currX = x.getPixelForValue(labels[index]);
          const prevY = y.getPixelForValue(prevValue);
          const currY = y.getPixelForValue(currValue);

          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(currX, currY);
          ctx.strokeStyle = getColor(currValue);
          ctx.lineWidth = 2;
          ctx.stroke();
        });

        ctx.restore();
      },
    };

    ChartJS.register(customPlugin);

    chart.update();
  }, [data]);

  return (
    <div className="w-[380px]">
      <Line
        ref={chartRef}
        data={prepareData(data)}
        options={{
          ...options,
        }}
      />
    </div>
  );
};

export default CustomLineChart;
