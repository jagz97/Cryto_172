const { authJwt, upload } = require('../middleware');
const crypt = require('../controllers/crypt.controller');



module.exports = function (app) {
    app.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "authorization, Origin, Content-Type, Accept"
    );
    next();
    });

    app.post(
        "/api/uploadFile",
        upload.single('textFile'),
        crypt.encryptFile
        );

    app.post(
         "/api/dataEncrypt",
         upload.single('textFile'),
         crypt.encrpytStoreContent
         );

    app.post(
        "/api/uploadDecryptFile",
        upload.single('textFile'),
        crypt.decryptFile

    );

    app.get(
         "/api/getcontents/:fileId",
          crypt.decryptStoreContent
        );

    app.get(
        "/api/getcontents",
        crypt.dataTable

    );







};