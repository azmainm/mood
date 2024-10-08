// components/LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data }) => {
  const chartData = {
    labels: data.map(entry => entry.date),  // x-axis: dates
    datasets: [
      {
        label: 'Mood in the past 7 days',
        data: data.map(entry => entry.moodValue),  // y-axis: mood values
        borderColor: 'lightgray',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="w-full md:w-4/5 mb-3">
      <Line data={chartData} />
    </div>
  );
};

export default LineChart;
