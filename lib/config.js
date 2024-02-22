const mongoose = require("mongoose");

exports.member_type_enums = ["USER", "ADMIN", "DELIVERY" , "MARKET"];
exports.member_status_enums=["ONPAUSE", "ACTIVE", "DELETED" ];
exports.ordernary_enums = ["Y" , "N"];
exports.product_collection_enums = ["LIVINGROOM","KITCHEN","BEDROOM", "MIXED",'etc'];
exports.product_status_enums = ["PAUSED", "PROCESS", "DELETED"];


exports.like_view_group_list = ["product","member","article"];

exports.board_id_enum_list = ["celebrity","evaluation","story"];





//**********MONGODB RELATED COMMANDS*********/

exports.shapeIntoMongooseObjectId = (target) =>{
    if(typeof target === 'string'){
      return new mongoose.Types.ObjectId(target);
    }else return target;
  }