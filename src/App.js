// App.js
import React, { useState, useEffect } from 'react';
import BarChart from './BarChart';
import { parseConsoleData } from './utils/parseConsoleData';
import './App.css'; // Import CSS file for styling
import Navbar from './Navbar'; // Import Navbar component
import Chart from 'chart.js/auto';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const normalizeCommand = (command) => {
    // Regular expression to capture the command part before any arguments
    const match = command.match(/^\w+/);
    return match ? match[0] : command;
  }

  // Function to aggregate command counts
  const aggregateData = (data) => {
    const aggregated = data.reduce((acc, item) => {
      const normalizedCommand = normalizeCommand(item.command);
      acc[normalizedCommand] = (acc[normalizedCommand] || 0) + item.count; // Use item.count for aggregation
      return acc;
    }, {});
  
    return Object.keys(aggregated).map(command => ({
      command,
      count: aggregated[command],
    }));
  }

  // Function to categorize commands
  const categorizeCommands = (data) => {
    // Define categories and their respective commands
    const categories = {
      'File Operations': ['cd', 'ls', 'mkdir'],
      'System/Process': ['top', 'ps', 'kill'],
      'Version Control': ['git'],
      'Development Commands': ['npm', 'yarn']
    };
  
    // Initialize an object to hold the categorized data
    const categorizedData = {};
  
    // Loop through each category
    for (const [category, commands] of Object.entries(categories)) {
      // Filter data based on commands for the current category
      const filteredCommands = data.filter(item => commands.includes(item.command));
  
      // Add the filtered commands to the categorizedData object under the current category
      categorizedData[category] = filteredCommands;
  
      // Log the results for debugging purposes
      console.log(`Category: ${category}`);
      console.log(`Commands: ${commands}`);
      console.log(`Filtered Data:`, filteredCommands);
    }
  
    // Return the categorized data
    return categorizedData;
  };

  useEffect(() => {
    fetch('/terminal_commands.json')
      .then(response => response.json())
      .then(fetchedData => {
        const parsedData = parseConsoleData(fetchedData);
        const aggregatedData = aggregateData(parsedData);
        console.log(aggregatedData);
        const categorizedData = categorizeCommands(aggregatedData);
        console.log(categorizedData);
        setData(categorizedData);
        setLoading(false);
      });
  }, []);

  const [repoInfo, setRepoInfo] = useState(null);
  const [repoLanguages, setRepoLanguages] = useState(null);
  

  // Fetch GitHub repository information and languages
  useEffect(() => {
    // Fetch repository languages
    async function fetchRepoLanguages() {
      const response = await fetch('http://localhost:3001/api/repo-languages');
      const languages = await response.json();
      setRepoLanguages(languages); // Save fetched languages data
    }

    // Fetch repository information
    async function fetchRepoInfo() {
      const response = await fetch('http://localhost:3001/api/repo');
      const data = await response.json();
      setRepoInfo(data); // Save fetched repository info
    }

    fetchRepoLanguages();
    fetchRepoInfo();
  }, []);

  if (loading) return <div>Loading...</div>;

  // Preparing data for the languages bar chart
  const languageData = repoLanguages
    ? Object.entries(repoLanguages).map(([language, count]) => ({
        command: language,
        count: count, // Use the language byte size as count
      }))
    : [];


  return (
    <div className="app-container">
      
      <Navbar /> {/* Include the Navbar component */}

      <div className="charts-container">
      {Object.entries(data).map(([category, categoryData]) => (
        <div key={category} className="chart">
          <h2>{category}</h2>
          <BarChart data={categoryData} title={undefined} />
        </div>
      ))}
      </div>

      <h1>GitHub Repository Information</h1>
      {repoInfo && (
        <div>
          <p><strong>Repo Name:</strong> {repoInfo.name}</p>
          <p><strong>Description:</strong> {repoInfo.description}</p>
          <p><strong>Created At:</strong> {new Date(repoInfo.created_at).toLocaleDateString()}</p>
          <p><strong>Language:</strong> {repoInfo.language}</p>
        </div>
      )}

      <h2>Languages Used</h2>
      <canvas id="languageChart" width="400" height="400"></canvas>
    </div>
  );
};

export default App;


