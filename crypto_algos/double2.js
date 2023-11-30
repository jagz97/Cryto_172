function doubleTranspositionCipher(message, key1, key2) {
    // Remove spaces and convert the message to uppercase
    message = message.replace(/\s/g, '').toUpperCase();
  
    // Calculate the number of columns for the transposition
    const cols1 = key1.length;
    const cols2 = key2.length;
  
    // Calculate the number of rows for the transposition
    const rows1 = Math.ceil(message.length / cols1);
    const rows2 = Math.ceil(rows1 / cols2);
  
    // Pad the message to fit the complete grid
    const paddedMessage = message.padEnd(rows1 * cols1, 'X');
  
    // Create a 2D array to represent the grid
    let grid = [];
    for (let i = 0; i < rows1; i++) {
      grid[i] = paddedMessage.slice(i * cols1, (i + 1) * cols1).split('');
    }
  
    // Apply the first transposition using key1
    grid = transpose(grid, key1);
  
    // Flatten the grid to a single string
    const transposedMessage1 = grid.flat().join('');
  
    // Create a new grid for the second transposition
    const newRows2 = Math.ceil(transposedMessage1.length / cols2);
    const newPaddedMessage = transposedMessage1.padEnd(newRows2 * cols2, 'X');
    let newGrid = [];
    for (let i = 0; i < newRows2; i++) {
      newGrid[i] = newPaddedMessage.slice(i * cols2, (i + 1) * cols2).split('');
    }
  
    // Apply the second transposition using key2
    newGrid = transpose(newGrid, key2);
  
    // Flatten the final grid to get the encrypted message
    const encryptedMessage = newGrid.flat().join('');
  
    return encryptedMessage;
  }
  
  function transpose(grid, key) {
    return key
      .split('')
      .map(Number)
      .map((val, index) => grid.map(row => row[index]))
      .sort((a, b) => key.indexOf(a[0]) - key.indexOf(b[0]))
      .map(row => row.join(''));
  }
  


  function doubleTranspositionDecipher(encryptedMessage, key1, key2) {
    // Calculate the number of columns for the transposition
    const cols2 = key2.length;
  
    // Calculate the number of rows for the transposition
    const rows2 = Math.ceil(encryptedMessage.length / cols2);
  
    // Create a 2D array to represent the grid
    let grid = [];
    for (let i = 0; i < rows2; i++) {
      grid[i] = encryptedMessage.slice(i * cols2, (i + 1) * cols2).split('');
    }
  
    // Apply the first transposition using key2
    grid = transpose(grid, key2);
  
    // Flatten the grid to a single string
    const transposedMessage1 = grid.flat().join('');
  
    // Create a new grid for the second transposition
    const cols1 = key1.length;
    const rows1 = Math.ceil(transposedMessage1.length / cols1);
    const newGrid = [];
    for (let i = 0; i < rows1; i++) {
      newGrid[i] = transposedMessage1.slice(i * cols1, (i + 1) * cols1).split('');
    }
  
    // Apply the second transposition using key1
    const decryptedGrid = transpose(newGrid, key1);
  
    // Flatten the final grid to get the decrypted message
    const decryptedMessage = decryptedGrid.flat().join('');
  
    return decryptedMessage;
  }
  
  // Example usage:

  
  
  

  
  // Example usage:
  const message = "Hello World";
  const key1 = "2143";
  const key2 = "3241";
  
  const encryptedMessage = doubleTranspositionCipher(message, key1, key2);
  console.log("Encrypted Message:", encryptedMessage);
  
  const decryptedMessage = doubleTranspositionDecipher(encryptedMessage, key1, key2);
  console.log("Decrypted Message:", decryptedMessage);