const Member = require("../models/Member");
const Product = require("../models/Product");

let furnisController = module.exports;

furnisController.getMyFurnisData = async (req, res) => {
  try {
    console.log("GET:cont/getMyFurnisData");
    res.render("furnis-list");
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
    const data = req.body;
    const member = new Member();
    const new_member = await member.signupData(data);

    req.session.member = new_member;
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