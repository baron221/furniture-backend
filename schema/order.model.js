const mongoose = require("mongoose");
const { order_status_enums } = require("../lib/config");
const Schema = mongoose.Schema;

const OrderSchema = new mongoose.Schema(
  {
    order_total_amount: { type: Number, reuqired: true },
    order_delivery_cost: { type: Number, reuqired: true },
    order_status: {
      type: String,
      reuqired: false,
      default: "PAUSED",
      enum: {
        values: order_status_enums,
        message: "{VALUE is not among permitted values}",
      },
    },
    mb_id: { type: Schema.Types.ObjectId, ref: "Member", reuqired: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
