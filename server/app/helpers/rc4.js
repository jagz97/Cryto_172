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








const rc4crypto = {
    rc4,
    


};

module.exports = rc4crypto;