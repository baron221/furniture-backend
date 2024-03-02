const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController");
const productController = require("./controllers/productController");
const furnisController = require("./controllers/furnisController");
const orderController = require("./controllers/orderController");
const communityController = require("./controllers/communityController");

const uploader_community = require("./utils/upload-multer")("community");
const uploader_member = require("./utils/upload-multer")("members");

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

router.get(
  "/products/:id",
  memberController.retrieveAuthMember,
  productController.getChosenProduct
);

// Market related routers
router.get(
  "/markets",
  memberController.retrieveAuthMember,
  furnisController.getMarkets
);

router.get(
  "/markets/:id",
  memberController.retrieveAuthMember,
  furnisController.getChosenMarket
);

//Order related routers
router.post(
  "/orders/create",
  memberController.retrieveAuthMember,
  orderController.createOrder
);

router.get(
  "/orders",
  memberController.retrieveAuthMember,
  orderController.getMyOrders
);
router.post(
  "/orders/edit",
  memberController.retrieveAuthMember,
  orderController.editChosenOrder
);

/**Community related routers */

router.post(
  "/community/image",
  uploader_community.single("community_image"),
  communityController.imageInsertion
);

router.post("/community/create" , memberController.retrieveAuthMember , communityController.createArticle)

module.exports = router;
