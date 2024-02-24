const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController");
const productController = require("./controllers/productController");

/************************************************
 *                       REST API                                 *
 ************************************************/

//memberga dahldor routerlar
// router.get("/",memberController.home);
router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);
router.get("/check-me", memberController.checkMyAuthentication);
router.get(
  "/member/:id",
  memberController.retrieveAuthMember,
  memberController.getChosenMember
);

//product related routers
router.get("/menu", (req, res) => {
  res.send("You are in menu page");
});

router.get("/community", (req, res) => {
  res.send("Community page ");
});

router.post(
  "/products",
  memberController.retrieveAuthMember,
  productController.getAllProducts
);
module.exports = router;
