const db = require("../models");
const Users = db.users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");




exports.register = async (req, res) => {
    if(!req.body.email ||!req.body.password)
    return res.status(400).json({error: "Please provide email and password"});


    const userFound = await Users.findOne({
        where: {
            email: req.body.email
        }
    });
    if(userFound) return res.status(400).json({error: "User already exists"});

    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    // save user to database
    Users.create(user)
    .then(data => {
        res.send(data);
        console.log(data);
        console.log(data.dataValues);
        console.log(data.dataValues.userId);
        console.log(data.dataValues.username);
        console.log(data.dataValues.email);
    })
    .catch(err => {
        res.status(500).json(err);
        console.log(err);
    });


};


exports.signin= async(req, res) => {



    try {
        const user = await Users.findOne({
          where: {
            email: req.body.email,
          },
        });
    
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
    
        const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        const lastLoggedIn = await user.lastLoggedIn;
        // Determine firstTimeLogin based on lastLoggedIn
        const firstTimeLogin = lastLoggedIn === null ? true : false;


        user.lastLoggedIn = new Date();
        await user.save();

        if (!passwordIsValid) {
          return res.status(401).send({
            message: "Invalid Password!",
          });
        }
    
        const token = jwt.sign({ id: user.userId },
                               config.secret,
                               {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                               });
                           
        return res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          accesstoken: token,
          firsTimeLogin: firstTimeLogin
        });
      } catch (error) {
        return res.status(500).send({ message: error.message });
      }

      

};
