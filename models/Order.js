const { shapeIntoMongooseObjectId } = require("../lib/config");
const Definer = require("../lib/mistake");
const OrderModel = require("../schema/order.model");
const OrderItemModel = require("../schema/order_item.model");
const assert = require("assert");


class Order {
  constructor() {
    this.orderModel = OrderModel;
    this.orderItemModel = OrderItemModel;
  }
  async createOrderData(member, data) {
    try {
      let order_total_amount = 0,
        delivery_cost = 0;
      const mb_id = shapeIntoMongooseObjectId(member._id);
      data.map((item) => {
        order_total_amount = +item["quantity"] * item["price"];
      });

      if (order_total_amount < 100) {
        delivery_cost = 2;
        order_total_amount += delivery_cost;
      }

      const order_id = await this.saveOrderData(
        order_total_amount,
        delivery_cost,
        mb_id
      );
      console.log("order_id:::", order_id);

      return order_id
    } catch (err) {
      throw err;
    }
  }

  async saveOrderData(order_total_amount, delivery_cost, mb_id) {
    try {
      const new_order = new this.orderModel({
        order_total_amount: order_total_amount,
        order_delivery_cost: delivery_cost,
        mb_id: mb_id,
      });
      const result = await new_order.save();
      assert.ok(result ,Definer.order_err1);
      console.log("result :::" ,result)

    } catch (err) {
      throw new Error(Definer.order_err1);
    }
  }
}
module.exports = Order;
