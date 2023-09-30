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
    console.log(req.member);

    //TODO:prod creation developo
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
