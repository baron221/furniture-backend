const { shapeIntoMongooseObjectId } = require("../lib/config");
const Definer = require("../lib/mistake");
const ProductModel = require("../schema/product.model");
const assert = require("assert");

class Product {
  constructor() {
    this.productModel = ProductModel;
  }

  async addNewProductData(data,member) {
    try{
        data.market_mb_id = shapeIntoMongooseObjectId(member._id);

        const new_product = new this.productModel(data);
        const result = await new_product.save();

        assert.ok(result, Definer.product_err1);
        return true
    }catch(err){
        throw err;
    }
  }
}

module.exports = Product;
