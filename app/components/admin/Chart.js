import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AuctionAnalytics = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Bids Received",
        data: [50, 100, 200, 150, 300],
        backgroundColor: "rgba(82, 87, 116, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h3 className="text-xl font-bold mb-4">Bids Over Time</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default AuctionAnalytics;
