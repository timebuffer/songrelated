import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const BarChart = ({ data, title }) => {
  const chartData = {
    labels: data.map(item => item.command),
    datasets: [{
      label: title,
      data: data.map(item => item.count),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  return (
    <div className="chart-container">
      <Bar
        data={chartData}
        options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: title,
                
                padding: {
                  top: 5,   // Reduce space above the title
                  bottom: -20 // Reduce space below the title
                },
                font: {
                  size: 14 // Adjust font size as needed
                }
              },
            },
          }}
      />
    </div>
  );
};

export default BarChart;
