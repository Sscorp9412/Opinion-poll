const app = require("express").Router();
const controller = require("../../controllers/polls");

/**
 *  @description API for viewing users
 *  @method POST /view
 */
 app.get("/view", controller.view);

 /**
  *  @description API to view selected option
  *  @method POST /view/:option
  */
 app.get("/view/:option", controller.viewCategory);
 
 /**
  *  @description API for updating user
  *  @method PUT /upate
  */
 app.put("/update/:id", controller.update);


module.exports = app;
