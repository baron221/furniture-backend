const express = require("express");
const router_bssr = express.Router();
const furnisController = require("./controllers/furnisController");
const productController = require("./controllers/productController");
const {uploadProductImage} = require("./utils/upload-multer")

/************************************************
 *                       BSSR EJS                               *
 ************************************************/

// router.get("/",memberController.home);
router_bssr.get("/signup", furnisController.getSignUpMyFurnis);
router_bssr.post("/signup", furnisController.signupProcess);

router_bssr.get("/login", furnisController.getLoginUpMyFurnis);
router_bssr.post("/login", furnisController.loginProcess);

router_bssr.get("/logout", furnisController.logout);
router_bssr.get("/check-me", furnisController.checkSession);
router_bssr.get("/products/list", furnisController.getMyFurnisData);

router_bssr.post(
  "/products/create",
  furnisController.validateAuthRestaurant,
  uploadProductImage.single('product_image'),
  productController.addNewProduct
);
router_bssr.post("products/edit/:id", productController.updateChosenProduct);

module.exports = router_bssr;
