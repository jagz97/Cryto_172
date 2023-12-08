
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





const simpleSubstitution = {
    
    simpleSubstitutionDecrypt,
    simpleSubstitutionEncrypt,


};

module.exports = simpleSubstitution;


