const Product = require("../models/Product");
const Definer = require("../lib/mistake");
const assert = require("assert");

let productController = module.exports;

productController.getAllProducts = async (req, res) => {
  try {
    console.log(`POST: cont/getAllProducts `);
    const product = new Product();
    const result = await product.getAllProductsData(req.member , req.body);
    res.json({ state: "success", data: result});

  } catch (err) {
    console.log(`Error,cont/getAllProducts,${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

productController.getChosenProduct = async (req, res) => {
  try {
    console.log(`GET: cont/getChosenProduct `);
    const product = new Product();
    const id = req.params.id
    const result = await product.getChosenProductData(req.member , id);
    res.json({ state: "success", data: result});

  } catch (err) {
    console.log(`Error,cont/getChosenProduct,${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};





/**BSSR related methods* */

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
    const html = `<script>alert('new furniture added successfully')
    window.location.replace('/furnis/products/list');
    </script>`
    res.end(html);
  } catch (err) {
    console.log(`Error,cont/addNewProduct,${err.message}`);
  }
};

productController.updateChosenProduct = async (req, res) => {
  try {
    console.log(`POST: cont/updateChosenProduct `);
    const product = new Product();
    const id = req.params.id;
    const result = await product.updateChosenProductData(
      id,
      req.body,
      req.member._id
    );
    await res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`Error,cont/updateChosenProduct,${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

