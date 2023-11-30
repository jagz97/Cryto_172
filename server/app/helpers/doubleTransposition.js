class DoubleTransposition {
    // Splitting key into an array
    splitKey(keyInput) {
        let key = [];
        for (let i = 0; i < keyInput.length; i++) {
            key[i] = keyInput[i];
        }
        return key;
    }

    // Finding order of the characters in the key (permutation order)
    findKeyOrder(key) {
        let order = new Array(key.length).fill(-1);
        let tempArr = key.slice();
        tempArr.sort();
        for (let i = 0; i < tempArr.length; i++) {
            for (let j = 0; j < key.length; j++) {
                if (tempArr[i] === key[j] && order[j] === -1) {
                    order[j] = i;
                    break;
                }
            }
        }
        return order;
    }

    encrypt(key1, key2, text) {
        let ciphertext = this.columnarEncrypt(key1, text);
        ciphertext = this.columnarEncrypt(key2, ciphertext);
        return ciphertext;
    }

    columnarEncrypt(keyInput, text) {
        let key = this.splitKey(keyInput);
        let order = this.findKeyOrder(key);
        let numColumns = key.length;
        let numRows = Math.ceil(text.length / numColumns);

        // Initializing and setting up pre-transpose 2D array for ciphertext
        let ciphertext = [];
        let textLocation = 0;
        for (let row = 0; row < numRows; row++) {
            ciphertext[row] = [];
            for (let column = 0; column < numColumns; column++) {
                if (textLocation < text.length) {
                    ciphertext[row][column] = text[textLocation];
                } else {
                    ciphertext[row][column] = '|';
                }
                textLocation++;
            }
        }

        // Transposing ciphertext and inputting into newCipherText
        let newCipherText = "";
        for (let i = 0; i < order.length; i++) {
            let j = 0;
            while (order[j] !== i) {
                j++;
            }
            for (let row = 0; row < numRows; row++) {
                newCipherText += ciphertext[row][j];
            }
        }
        newCipherText = newCipherText.replace('|', '');

        return newCipherText;
    }

    decrypt(key1, key2, ciphertext) {
        let text = this.columnarDecrypt(key1, ciphertext);
        text = this.columnarDecrypt(key2, text);
        return text;
    }

    columnarDecrypt(keyInput, encryptedText) {
        let key = this.splitKey(keyInput);
        let order = this.findKeyOrder(key);
        let numColumns = key.length;
        let numRows = Math.ceil(encryptedText.length / numColumns);
    
        let ciphertext = new Array(numRows).fill(0).map(() => new Array(numColumns).fill(""));
    
        // Filling empty slots of 2D array to avoid characters-out-of-order transpositions
        let emptySlots = (numRows * numColumns) - encryptedText.length;
        for (let j = numColumns - emptySlots; j < numColumns; j++) {
            ciphertext[numRows - 1][j] = '|';
        }
    
        // Transposing
        let newCipherText = "";
        let textLocation = 0;
    
        for (let i = 0; i < order.length; i++) {
            let j = 0;
            while (order[j] !== i) {
                j++;
            }
            for (let row = 0; row < numRows; row++) {
                if (ciphertext[row][j] === '|') {
                    break;
                } else {
                    ciphertext[row][j] = encryptedText[textLocation];
                    textLocation++;
                }
            }
        }
    
        // newCipherText will have the entire decrypted text as a string
        for (let row = 0; row < numRows; row++) {
            for (let column = 0; column < numColumns; column++) {
                newCipherText += ciphertext[row][column];
            }
        }
    
        newCipherText = newCipherText.replace('|', '');
    
        return newCipherText;
    }
}    


// Instantiate the DoubleTransposition class
let doubleTransposition = new DoubleTransposition();

// Test case
let key1 = "KEY1";
let key2 = "KEY2";
let plaintext = "This is the contents of the file";

// Encrypt the plaintext
let ciphertext = doubleTransposition.encrypt(key1, key2, plaintext);
console.log("Encrypted Text: ", ciphertext);

// Decrypt the ciphertext
let decryptedText = doubleTransposition.decrypt(key1, key2, ciphertext);
console.log("Decrypted Text: ", decryptedText);

// Verify if the decryption is successful
if (decryptedText === plaintext) {
    console.log("Decryption successful. Test passed!");
} else {
    console.log("Decryption failed. Test not passed.");
}


module.exports = doubleTransposition;