const db = require("../models");
const Users = db.users;
const simpleSub = require("../helpers/simpleSubstitution");
const cryotorc4 = require("../helpers/rc4");
const doubleTransposition = require("../helpers/doubleTransposition");
const simpleSubstitution = require("../helpers/simpleSubstitution");
const { Console } = require("console");
const fs = require("fs").promises;
const des = require("../helpers/des");

exports.encryptFile = async (req, res) => {
    
    const userId = req.session.userId;

    if(!userId) {
        return res.status(404).send({ message: "not logged in" });
    }
    

    try{
        const content = req.body.cryptoAlgo;

        const user = await Users.findByPk(userId);

        if (!user) {
            return res.status(404).send({ message: "user not found" });
        }

        let encryptedContent;
        let fileContents
        const file = req.file;

        if (!file) {

            return res.status(404).send({ message: "File not found" });

        }
        fileContents = await fs.readFile(file.path, 'utf8');

        if (content === 'rc4') {
            const rc4Key = 'your-rc4-key';
            encryptedContent = cryotorc4.rc4(rc4Key, fileContents);
        } else if (content === 'simpleSubstitution') {
            const substitutionKey = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';
            encryptedContent = simpleSub.simpleSubstitutionEncrypt(fileContents, substitutionKey);
        } else if (content === 'doubleTranposition') {
            const key1 = '1234';
            const key2 = '5678';
            encryptedContent = doubleTransposition.encrypt(key1, key2, fileContents);
        } 
        
        else if (content === 'des') {
            const deskey = '00112233445566778899AABBCCDDEEFF0011223344556677';
            encryptedContent = des.encryptDES(deskey,fileContents);
        }else {
            return res.status(400).json({ message: "Unsupported encryption algorithm" });
        }

        const result = {
            fileName: file.originalname,
            encrytedData: encryptedContent
            
        }

        // Return the encrypted content in the response without saving it
        return res.status(200).send(result);


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}


exports.decryptFile = async (req, res) => {
    
    const userId = req.session.userId;

    if(!userId) {
        return res.status(404).send({ message: "not logged in" });
    }
    

    try{
        const content = req.body.cryptoAlgo;

        const user = await Users.findByPk(userId);

        if (!user) {
            return res.status(404).send({ message: "user not found" });
        }

        let decryptedContent;
        let fileContents
        const file = req.file;

        if (!file) {

            return res.status(404).send({ message: "File not found" });

        }
        fileContents = await fs.readFile(file.path, 'utf8');

        if (content === 'rc4') {
            const rc4Key = 'your-rc4-key';
            decryptedContent = cryotorc4.rc4(rc4Key, fileContents);
        } else if (content === 'simpleSubstitution') {
            const substitutionKey = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';
            decryptedContent = simpleSub.simpleSubstitutionDecrypt(fileContents, substitutionKey);
        } else if (content === 'doubleTranposition') {
            const key1 = '1234';
            const key2 = '5678';
            decryptedContent = doubleTransposition.decrypt(key1, key2, fileContents);
        } 
        else if (content === 'des') {
            const deskey = '00112233445566778899AABBCCDDEEFF0011223344556677';
            decryptedContent = des.decryptDES(deskey,fileContents);
        }
          else {
            return res.status(400).json({ message: "Unsupported encryption algorithm" });
        }

        const result = {
            fileName: file.originalname,
            encrytedData: decryptedContent
            
        }

        // Return the encrypted content in the response without saving it
        return res.status(200).send(result);


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}




exports.encrpytStoreContent = async (req, res) => {

    try {
        const userId = req.session.userId;
        const content = req.body.cryptoAlgo;
        console.log(content);

        const user = await Users.findByPk(userId);

        if (!user) {
            return res.status(404).send({ message: "user not found" });
        }

        let encryptedContent;
        const textInput = req.body.text;
        console.log(textInput);

        if (content === 'rc4') {
            const rc4Key = 'your-rc4-key';
            encryptedContent = cryotorc4.rc4(rc4Key, textInput);
        } else if (content === 'simpleSubstitution') {
            const substitutionKey = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';
            encryptedContent = simpleSub.simpleSubstitutionEncrypt(textInput, substitutionKey);
        } else if (content === 'doubleTranposition') {

            const key1 = '1234';
            const key2 = '5678';
            encryptedContent = doubleTransposition.encrypt(key1, key2, textInput);
            console.log(encryptedContent);
            
        } else if (content === 'des') {
            const deskey = '00112233445566778899AABBCCDDEEFF0011223344556677';
            encryptedContent = des.encryptDES(deskey,textInput);
        }
    
        else {
            return res.status(400).json({ message: "Unsupported encryption algorithm" });
        }

        const data_crypto = {
            userId: userId,    
            encryptedData: encryptedContent,
            encryptionAlgorithm: content
        }

        await db.data.create(data_crypto);

        res.status(200).json({ message: 'Content encrypted and stored successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};



exports.dataTable = async (req, res) => {

    const userId = req.session.userId;

    try {
        const user = await db.users.findByPk(userId, {
          include: [{ model: db.data, as: 'data' }],
        });
    
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        res.status(200).json(user.data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}


exports.decryptStoreContent = async (req, res) => {
    try {
        const userId = req.session.userId;
        const dataId = req.params.fileId; // Assuming you have the fileId in the route params

        const user = await Users.findByPk(userId);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const content = await db.data.findByPk(dataId);

        if (!content) {
            return res.status(404).send({ message: "Content not found" });
        }

        const algorithm = content.encryptionAlgorithm; 
        const encryptedData = content.encryptedData; 

        

        let decryptedContent;

        if (algorithm === 'simpleSubstitution') {
            const key = 'ZYXWVUTSRQPONMLKJIHGFEDCBA'; // Substitution key
            decryptedContent = simpleSubstitution.simpleSubstitutionDecrypt(content.encryptedData, key);
        } else if (algorithm === 'rc4') {
            // Decrypt using RC4 algorithm, replace with your actual RC4 decryption function
            const key = 'your-rc4-key';
            decryptedContent = cryotorc4.rc4(key, content.encryptedData);
        } 
        else if (algorithm === 'doubleTranposition') {
            const key1 = '1234'; // Replace with your
            const key2 = '5678'; // Replace with your

            decryptedContent = doubleTransposition.decrypt(key1, key2, content.encryptedData);
        }
        else if (content === 'des') {
            const deskey = '00112233445566778899AABBCCDDEEFF0011223344556677';
            decryptedContent = des.decryptDES(deskey,textInput);
        }
        
        
        else {
            return res.status(400).json({ message: "Unsupported algorithm" });
        }
        

        

        // Remove trailing newline characters
        decryptedContent = decryptedContent.trim();

        

        console.log(decryptedContent);

        res.status(200).json(decryptedContent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

