class Definer {
  //General Error

  static general_err1 = "att: something went wrong!";
  static general_err2 = "there is no data with this params!";
  static general_err3 = "att: file upload error!";

  //member auth/

  static auth_err1 = "att: MongoDb validation error!";
  static auth_err2 = "att:jwt error!";
  static auth_err3 = "att:no Member with that mb_nick!";
  static auth_err4 = "att: your credential do not match !";
  static auth_err5 = "att: your are not authenticated !";

  //products related errors/

  static product_err1 = "att:product creation failed!";

  /**Order related error */

  static order_err1 = "att: order creation failed"
  static order_err2 = "att: order creation failed"
  static order_err3 = "att: no order with that params exists!"

}

module.exports = Definer;
