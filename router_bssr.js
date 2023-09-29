const express = require("express");
const router_bssr = express.Router();
const furnisController = require("./controllers/furnisController");

/************************************************
 *                       BSSR EJS                               *
 ************************************************/

// router.get("/",memberController.home);
router_bssr.get("/signup", furnisController.getSignUpMyFurnis);
router_bssr.post("/signup", furnisController.signupProcess);

router_bssr.get("/login", furnisController.getLoginUpMyFurnis);
router_bssr.post("/login", furnisController.loginProcess);

router_bssr.get("/logout", furnisController.logout);

router_bssr.get("/products/list", furnisController.getMyFurnisData);

module.exports = router_bssr;
