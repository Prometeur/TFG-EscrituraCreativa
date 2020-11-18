const model = require("../models/modelUsuarios");
const mysql = require("mysql");
const pool = mysql.createPool(config.mysqlConfig);
const model_user = new model(pool);
//const ROLES = db.ROLES;

function checkDuplicateUsernameOrEmail(request, response, next) {
  // Username
  model_user.findOneUsername({
    where: {
      username: request.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    // Email
    model_user.findOneEmail({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};
/*
function checkRolesExisted(request, response, next) {
  if (request.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};
*/
const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  /*checkRolesExisted: checkRolesExisted*/
};

module.exports = verifySignUp;
