const Product = require("../models/Product");
const Definer = require("../lib/mistake");
const assert = require("assert");

let productController = module.exports;

productController.getAllProducts = async (req, res) => {
  try {
    console.log(`GET: cont/getAllProducts `);
  } catch (err) {
    console.log(`Error,cont/getAllProducts,${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

productController.addNewProduct = async (req, res) => {
  try {
    console.log(`POST: cont/addNewProduct `);
    assert(req.files, Definer.general_err3);

    const product = new Product();
    let data = req.body;

    data.product_images = req.files.map((ele) => {
      return ele.path;
    });

    const result = await product.addNewProductData(data, req.member);
    const html = `<script>alert(new furniture added successfully</script>
    window.location.replace('/furnis/products/menu')`;
    res.end(html);
  } catch (err) {
    console.log(`Error,cont/addNewProduct,${err.message}`);
  }
};

productController.updateChosenProduct = async (req, res) => {
  try {
    console.log(`POST: cont/updateChosenProduct `);
  } catch (err) {
    console.log(`Error,cont/updateChosenProduct,${err.message}`);
  }
};
