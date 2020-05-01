var express = require('express');
var blogsModel = require('../modules/blogs')
const jwt = require('jsonwebtoken');

var router = express.Router();

var blogs = blogsModel.find({})



if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}


function checkLogin(req,res,next){
  mytoken = localStorage.getItem('mytoken')
  try {
    jwt.verify(mytoken, "loginToken");
  } catch (err) {
    // err
    res.send("Login asap")
  }
  next()

}



/* GET home page. */
router.get('/',checkLogin, function(req, res, next) {
  blogs.exec().then((data)=>{
    res.render("index", { title: "Blogs", Records:data });
  }) 
});
router.get("/login", function (req, res, next) {
    var token = jwt.sign({ foo: "bar" }, "loginToken");
    localStorage.setItem('mytoken',token)
    res.send("login success")
});
router.get("/logout", function (req, res, next) {
  localStorage.removeItem("mytoken");
  res.send("logout success");
});


router.post("/", function (req, res, next) {
  console.log(req.body);
  var data = {
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
  };
  console.log(data)
  var postBlog = new blogsModel({
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
  });
  postBlog.save().then(() => {
    console.log("Data entered ");
    blogs.exec().then((data) => {
      res.render("index", { title: "Blogs", Records: data });
    });
  });
});


module.exports = router;
