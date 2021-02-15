//ruta para almacenar los enlaces

const controller = require("../controllers/controllerStudent");
const express = require('express');//voy a usar el modulo express
const router =express.Router();

router.use(function(request, response,next) {
    response.header(
        "Access-Control-Allow-Headers",
       "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});


router.post("/challenges",controller.getGroupStudent);
router.get("/getChallenges",controller.getChallenges);
router.get("/getChallenge",controller.getChallenge);
router.post("/postWriting",controller.postWriting);
router.get("/getWritings",controller.getWritings);

module.exports = router;