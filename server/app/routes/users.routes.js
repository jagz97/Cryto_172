
const { verifySignUp, passwordCheck} = require("../middleware");

module.exports = app => {
    const users = require("../controllers/users.controller.js");
    var router = require("express").Router();
    

    app.use(function(req, res, next) {

      res.header(
        "Access-Control-Allow-Headers", 
        "authoriztion, Origin, Content-Type, Accept"
        );

        next();
    
    });
   
    

   
    router.post(
        "/auth/signup",
        [verifySignUp.checkDuplicateUsernameOrEmail],
        [passwordCheck.checkPassword],
        users.register
      );
      router.post("/auth/signin", users.signin);
      router.post("/auth/logout", users.logout);
        
      router.get("/auth/checkId", users.checkId);





    app.use('/api/users', router);
};