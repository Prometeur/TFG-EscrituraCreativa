"use strict"

const { verifySignUp } = require("../middlware");
const controller_auth = require("../controllers/controllerAuth");
const express = require("express");
const router = express.Router();

router.use(function(request, response,next) {
    response.header(
        "Access-Control-Allow-Headers",
       "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post("/signup", [ verifySignUp.checkDuplicateUsernameOrEmail, controller_auth.signUp ]);

router.post("/signin", controller_auth.signIn);

router.post("/editProfile",controller_auth.editProfile);

router.post("/disableProfile",controller_auth.disableProfile);
/*---------------------------------------------------------*/
//Data export
module.exports = router;