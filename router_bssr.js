const express = require("express");
const router_bssr = express.Router();
const furnisController = require("./controllers/furnisController");
const productController = require("./controllers/productController");
const uploader_product = require("./utils/upload-multer")("products");

/************************************************
 **                       BSSR EJS             **                    
 ************************************************/

router_bssr.get("/", furnisController.home);
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
  uploader_product.array("product_images", 5),
  productController.addNewProduct
);
router_bssr.post(
  "/products/edit/:id",
  furnisController.validateAuthRestaurant,
  productController.updateChosenProduct
);

module.exports = router_bssr;
