const crypto = require('crypto');

function encryptDES(key, plaintext) {
    // Convert the key and plaintext to Buffers
    const keyBuffer = Buffer.from(key, 'hex');
    const textBuffer = Buffer.from(plaintext, 'utf-8');

    // Create a DES cipher with the key
    const cipher = crypto.createCipheriv('des-ede3', keyBuffer, Buffer.alloc(0));

    // Encrypt the plaintext
    let encrypted = cipher.update(textBuffer, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
}

function decryptDES(key, ciphertext) {
    // Convert the key and ciphertext to Buffers
    const keyBuffer = Buffer.from(key, 'hex');
    const encryptedTextBuffer = Buffer.from(ciphertext, 'hex');

    // Create a DES decipher with the key
    const decipher = crypto.createDecipheriv('des-ede3', keyBuffer, Buffer.alloc(0));

    // Decrypt the ciphertext
    let decrypted = decipher.update(encryptedTextBuffer, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
}




const des = {
    decryptDES,
    encryptDES
};

module.exports = des;


// // Example usage:
// const key = '00112233445566778899AABBCCDDEEFF0011223344556677'; // 24-byte key (192 bits)
// const plaintext = '0123456789ABCDEF'; // 64-bit plaintext

// console.log('Plaintext: ', plaintext);

// // Encrypt
// const ciphertext = encryptDES(key, plaintext);
// console.log('Ciphertext: ', ciphertext);

// // Decrypt
// const decryptedText = decryptDES(key, ciphertext);
// console.log('Decrypted Text: ', decryptedText);

