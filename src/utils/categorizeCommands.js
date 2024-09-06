// utils.js
export function categorizeCommands(data) {
    const categories = {
      fileOperations: ['cd', 'ls', 'mkdir'],
      systemProcesses: ['top', 'ps', 'kill'],
      versionControl: ['git'],
      developmentCommands: ['npm', 'yarn'],
    };
  
    const commandCounts = {
      fileOperations: {},
      systemProcesses: {},
      versionControl: {},
      developmentCommands: {},
    };
  
    data.forEach(({ command }) => {
      if (categories.fileOperations.includes(command)) {
        commandCounts.fileOperations[command] = (commandCounts.fileOperations[command] || 0) + 1;
      } else if (categories.systemProcesses.includes(command)) {
        commandCounts.systemProcesses[command] = (commandCounts.systemProcesses[command] || 0) + 1;
      } else if (categories.versionControl.includes(command)) {
        commandCounts.versionControl[command] = (commandCounts.versionControl[command] || 0) + 1;
      } else if (categories.developmentCommands.includes(command)) {
        commandCounts.developmentCommands[command] = (commandCounts.developmentCommands[command] || 0) + 1;
      }
    });
  
    return commandCounts;
  }
  