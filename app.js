console.log("Web Server boshlash");
const express = require("express");
const app = express();
const router = require("./router.js");
// const router_bssr = require("./router_bssr.js");

let session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
const store = new MongoDbStore({
  uri: process.env.MONGO_URL,
  collection: "sessions",
});

// 1 express ga kirib kelyatgan malumotlarga bogliq bolgan kodlar yoziladi. KIRISH kodlari
app.use(express.static("public"));
app.use(express.json()); // kirib kelyatgan json formatdagi data ni objectga ogiradi
app.use(express.urlencoded({ extended: true })); //html forumdan request qiladi

//2 Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 30, //for 30 minutes
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

// app.use(function (req, res, next) {
//   res.locals.member = req.session.member;
//   next();
// });
//3 BSSR -backend serverside render  VIEWS ga bogliq kodlar
app.set("views", "views");
app.set("view engine", "ejs");

//4 Routing
// app.use("/resto", router_bssr);
app.use("/", router);

module.exports = app;
