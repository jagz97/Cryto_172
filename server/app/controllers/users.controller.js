const db = require("../models");
const Users = db.users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");




const Files = db.files;
const fs = require("fs").promises;




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
       


   
       

        if (!passwordIsValid) {
          return res.status(401).send({
            message: "Invalid Password!",
          });
        }
    
       

         // Set the user ID in the session
        req.session.userId = user.userId;

        // Set the token as a cookie
        res.cookie("crypto-session", req.sessionID, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Set to true in production
          sameSite: "strict",
          maxAge: 86400 * 1000, // 24 hours in milliseconds
        });
                           
        return res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
        });
      } catch (error) {
        return res.status(500).send({ message: error.message });
      }

      

};

exports.checkId = async (req, res) => {

    try{

        const userId = req.session.userId;
    console.log(userId);

    res.status(200).send({message:userId});



    }catch (error){
        return res.status(500).send({message: error.message});
    }



};

exports.logout = async (req, res) => {
    try {
        // Set userId to null before clearing the session cookie
        req.session.userId = null;
    
        // Clear the session cookie
        req.session = null;
    
        res.clearCookie('crypto-session');
    
        return res.status(200).send({ message: 'Logout successful.' });
      } catch (error) {
        return res.status(500).send({ message: error.message });
      }
};



  




