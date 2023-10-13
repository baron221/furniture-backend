class Definer{
    //General Error
    
    static general_err1 = "att: something went wrong!";
    static general_err2 = "there is no data with this params!";
    static general_err3 = "att: file upload error!"
  
    //member auth/
  
    static auth_err1 = "att: MongoDb validation error!"   ;
    static auth_err3 = "att:no Member with that mb_nick!" ;
    static auth_err4 = "att: your credential do not match !"  ;
  
    //products related errors/
  
  static product_err1 = "att:product creation failed!"
  };
   
  module.exports = Definer;