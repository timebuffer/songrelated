// utils.js
export function parseConsoleData(data) {
    const commandCounts = data.reduce((acc, { command }) => {
      acc[command] = (acc[command] || 0) + 1;
      return acc;
    }, {});
  
    return Object.entries(commandCounts).map(([command, count]) => ({ command, count }));
  }
  