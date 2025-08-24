import React from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Title,
  Legend,
} from "chart.js";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Title,
  Legend
);

const WorkoutCharts = ({ workouts }) => {
  if (!workouts || workouts.length === 0)
    return <p>No data to show in chart.</p>;

  const labels = workouts.map((workout) =>
    new Date(workout.date).toLocaleDateString()
  );

  const durations = workouts.map((workout) => Number(workout.duration));

  const data = {
    labels,
    datasets: [
      {
        label: "Duration (minutes)",
        data: durations,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Workout Duration Over Time",
        font: { size: 18 },
      },
    },
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        background: "#f4f4f4",
        padding: "1rem",
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
};

export default WorkoutCharts;
