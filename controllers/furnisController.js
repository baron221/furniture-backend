const Member = require("../models/Member");
const Product = require("../models/Product");
const Definer = require("../lib/mistake");

const assert = require("assert");


let furnisController = module.exports;

furnisController.home = async (req, res) => {
  try {
    console.log("GET:cont/home");
    res.render('home-page')
  } catch (err) {
    console.log(`ERROR , cont/home , ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

furnisController.getMyFurnisData = async (req, res) => {
  try {
    console.log("GET:cont/getMyFurnisData");
    const product = new Product();
    
    const data = await product.getAllProductsDataFurnis(res.locals.member)
    res.render("furnis-list", {market_data:data});
  } catch (err) {
    console.log(`ERROR , cont/getSignUpMyFurnis , ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

furnisController.getSignUpMyFurnis = async (req, res) => {
  try {
    console.log("GET:cont/getSignUpMyFurnis");
    res.render("signup");
  } catch (err) {
    console.log(`ERROR , cont/getSignUpMyFurnis , ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

furnisController.signupProcess = async (req, res) => {
  try {
    console.log("POST cont.signup");
    assert(req.file , Definer.general_err3);

    let new_member = req.body;
    new_member.mb_type="MARKET";
    new_member.mb_image = req.file.path;

    const member = new Member();
    const result = await member.signupData(new_member);
    assert(req.file , Definer.general_err1);

    req.session.member = result;
    res.redirect("/furnis/products/list");

    // res.json({state : 'succeed' , data:new_member})
  } catch (err) {
    console.log(`Error,cont/signup,${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

furnisController.loginProcess = async (req, res) => {
  try {
    console.log("POST cont.login");
    const data = req.body;
    const member = new Member();
    const result = await member.loginData(data);

    req.session.member = result;
    req.session.save(function () {
      res.redirect("/furnis/products/list");
    });
  } catch (err) {
    console.log(`Error,cont/signup,${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

furnisController.getLoginUpMyFurnis = async (req, res) => {
  try {
    console.log("GET:cont/getLoginMyFurnis");
    res.render("login-page");
  } catch (err) {
    console.log(`ERROR , cont/getLoginMyFurnis , ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

furnisController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("logout sahifasidasiz");
};

furnisController.validateAuthRestaurant = (req , res,next) => {
    if(req.session?.member?.mb_type === "MARKET"){
        req.member = req.session.member;
        next()
    }else res.json({state:"fail" , error :"only authenticated members with market type"})
}
 
furnisController.checkSession = (req,res ) =>{
   if(req.session?.member){
    res.json({state: 'succeed', data:req.session.member})
   }else{
    res.json({state:'fail' ,message:'You are not authenticated'})
   }
}