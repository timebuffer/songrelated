import { Bar } from 'react-chartjs-2';
import { categorizeCommands } from './utils';

// Chart component
export function DynamicBarCharts({ data }) {
  const categorizedData = categorizeCommands(data);

  const renderBarChart = (categoryName, commandCounts) => {
    const labels = Object.keys(commandCounts);
    const counts = Object.values(commandCounts);

    const chartData = {
      labels,
      datasets: [
        {
          label: `${categoryName} Command Counts`,
          data: counts,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    return <Bar data={chartData} />;
  };

  return (
    <div>
      {Object.keys(categorizedData).map((categoryName) => (
        <div key={categoryName}>
          <h3>{categoryName} Bar Chart</h3>
          {renderBarChart(categoryName, categorizedData[categoryName])}
        </div>
      ))}
    </div>
  );
}
