const jwt = require('jsonwebtoken');
const config = require("../config/auth.config.js");
const db = require("../models");

verifyToken = (req, res, next) => {

    let token = req.headers['authorization'];

    console.log(token);

    if(!token) {
        return res.status(403).send({
            message : "No token provided"

        });

    }

    jwt.verify(token ,
        config.secret,
        (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "unauthorized",
                });
            }
            req.id = decoded.id;
            next();
        });


    };

    const authJwt = {
        verifyToken: verifyToken
    };


module.exports = authJwt;