// Function to perform the first transposition
function transpose1(text, key1) {
    const colLength = key1.length;
    const rowLength = Math.ceil(text.length / colLength);
    const matrix = new Array(rowLength);
  
    for (let i = 0; i < rowLength; i++) {
      matrix[i] = new Array(colLength);
    }
  
    let textIndex = 0;
    for (let col = 0; col < colLength; col++) {
      for (let row = 0; row < rowLength; row++) {
        if (textIndex < text.length) {
          matrix[row][col] = text[textIndex];
          textIndex++;
        }
      }
    }
  
    return matrix.flat().join('');
  }
  
  // Function to perform the second transposition
  function transpose2(text, key2) {
    const colLength = key2.length;
    const rowLength = Math.ceil(text.length / colLength);
    const matrix = new Array(rowLength);
  
    for (let i = 0; i < rowLength; i++) {
      matrix[i] = new Array(colLength);
    }
  
    let textIndex = 0;
    for (let row = 0; row < rowLength; row++) {
      for (let col = 0; col < colLength; col++) {
        if (textIndex < text.length) {
          matrix[row][col] = text[textIndex];
          textIndex++;
        }
      }
    }
  
    return matrix.flat().join('');
  }
  
  // Function to encrypt using a double transposition cipher
  function encryptDoubleTransposition(text, key1, key2) {
    const transposedText1 = transpose1(text, key1);
    const transposedText2 = transpose2(transposedText1, key2);
    return transposedText2;
  }
  
// Function to decrypt using a double transposition cipher
function decryptDoubleTransposition(text, key1, key2) {
    // Inverse keys for decryption
    const inverseKey1 = key1.split('').map(Number).sort();
    const inverseKey2 = key2.split('').map(Number).sort();
  
    const transposedText1 = transpose1(text, inverseKey2);
    const transposedText2 = transpose2(transposedText1, inverseKey1);
    return transposedText2;
  }
  
  
  // Example usage
  const plaintext = "HELLO_WORLD";
  const key1 = "2413"; // First transposition key
  const key2 = "312";  // Second transposition key
  
  const encryptedText = encryptDoubleTransposition(plaintext, key1, key2);
  console.log("Encrypted Text:", encryptedText);
  
  const decryptedText = decryptDoubleTransposition(encryptedText, key1, key2);
  console.log("Decrypted Text:", decryptedText);
  






  /*  **********RC4****************************
    ********************************
   */ 
  function rc4(key, text) {
    // Initialize the S-box and key-scheduling algorithm
    const S = [];
    for (let i = 0; i < 256; i++) {
      S[i] = i;
    }
    let j = 0;
    for (let i = 0; i < 256; i++) {
      j = (j + S[i] + key[i % key.length].charCodeAt()) % 256;
      // Swap S[i] and S[j]
      const temp = S[i];
      S[i] = S[j];
      S[j] = temp;
    }
  
    // Generate the keystream
    let i = 0;
    j = 0;
    const keystream = [];
    for (let k = 0; k < text.length; k++) {
      i = (i + 1) % 256;
      j = (j + S[i]) % 256;
      // Swap S[i] and S[j]
      const temp = S[i];
      S[i] = S[j];
      S[j] = temp;
      const keyByte = S[(S[i] + S[j]) % 256];
      keystream.push(keyByte);
    }
  
    // Encrypt/decrypt the text using the keystream
    const result = [];
    for (let k = 0; k < text.length; k++) {
      const encryptedByte = text.charCodeAt(k) ^ keystream[k];
      result.push(String.fromCharCode(encryptedByte));
    }
  
    return result.join('');
  }
  
  // Example usage
  const key = 'SecretKey';
  const plaintextrc4 = 'Hello, RC4!';
  const encryptedTextrc4 = rc4(key, plaintextrc4);
  console.log('Encrypted:', encryptedTextrc4);
  
  const decryptedTextrc4 = rc4(key, encryptedTextrc4);
  console.log('Decrypted:', decryptedTextrc4);
  



  ////// Simple Substitution

  function simpleSubstitutionEncrypt(text, key) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let encryptedText = '';
  
    for (let i = 0; i < text.length; i++) {
      const char = text[i].toUpperCase(); // Convert the character to uppercase for consistency
      const isUpperCase = text[i] === char; // Check if the original character is uppercase
  
      if (alphabet.includes(char)) {
        const index = alphabet.indexOf(char);
        const encryptedChar = key[index];
  
        // Preserve the original character's case
        encryptedText += isUpperCase ? encryptedChar : encryptedChar.toLowerCase();
      } else {
        // If the character is not in the alphabet, leave it unchanged
        encryptedText += char;
      }
    }
  
    return encryptedText;
  }
  
  function simpleSubstitutionDecrypt(encryptedText, key) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let decryptedText = '';
  
    for (let i = 0; i < encryptedText.length; i++) {
      const char = encryptedText[i].toUpperCase(); // Convert the character to uppercase for consistency
      const isUpperCase = encryptedText[i] === char; // Check if the original character was uppercase
  
      if (alphabet.includes(char)) {
        const index = key.indexOf(char);
        const decryptedChar = alphabet[index];
  
        // Preserve the original character's case
        decryptedText += isUpperCase ? decryptedChar : decryptedChar.toLowerCase();
      } else {
        // If the character is not in the alphabet, leave it unchanged
        decryptedText += char;
      }
    }
  
    return decryptedText;
  }
  
  // Example usage
  const plaintextSimple = 'HELLO';
  const substitutionKey = 'ZYXWVUTSRQPONMLKJIHGFEDCBA'; // Substitution key
  
  const encryptedTextSimple = simpleSubstitutionEncrypt(plaintextSimple, substitutionKey);
  console.log('Encrypted Text:', encryptedTextSimple);
  
  const decryptedTextSimple = simpleSubstitutionDecrypt(encryptedTextSimple, substitutionKey);
  console.log('Decrypted Text:', decryptedTextSimple);
  