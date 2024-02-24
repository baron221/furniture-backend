const mongoose = require("mongoose");
const {
  product_status_enums,
  product_collection_enums} = require("../lib/config");

const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_collection: {
      type: String,
      required: true,
      enum: {
        values: product_collection_enums,
        message: "{ VALUE } is not among enum values",
      },
    },
    product_status: {
      type: String,
      required: false,
      default: "PAUSED",
      enum: {
        values: product_status_enums,
        message: "{VALUE} is not among permitted enum values",
      },
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_discount: {
      type: Number,
      required: false,
      default: 0,
    },
    product_left_cnt: {
      type: Number,
      required: true,
    },
    product_description: {
      type: String,
      required: true,
    },
    product_images: {
      type: Array,
      required: false,
      default: [],
    },
    product_likes: {
      type: Number,
      required: false,
      default: 0,
    },
    product_views: {
      type: Number,
      required: false,
      default: 0,
    },
    market_mb_id: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: false,
    },
  },
  { timestamps: true }
);

productSchema.index(
  { market_mb_id: 1, product_name: 1, product_size: 1 },
  { unique: true }
);

module.exports = mongoose.model("Product", productSchema);
