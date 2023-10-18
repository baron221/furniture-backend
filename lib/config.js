const mongoose = require("mongoose");

exports.member_type_enums = ["USER", "ADMIN", "DELIVERY" , "MARKET"];
exports.member_status_enums=["ONPAUSE", "ACTIVE", "DELETED" ];
exports.ordernary_enums = ["Y" , "N"];
exports.product_collection_enums = ['chair', 'sofa', 'closet', 'table', 'desk','etc'];
exports.product_size_enums = ["small", "normal", "large"];
exports.product_status_enums = ["PAUSED", "PROCESS", "DELETED"];


//**********MONGODB RELATED COMMANDS*********/

exports.shapeIntoMongooseObjectId = (target) =>{
    if(typeof target === 'string'){
      return new mongoose.Types.ObjectId(target);
    }else return target;
  }