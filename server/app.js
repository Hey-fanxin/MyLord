var express = require("express");
var app = express();

var router = require("./router/router.js");
var morgan = require('morgan');

app.use(morgan('short'));
app.use(express.static("./public"));

// home
app.get("/", router.showIndex); 

// rsume 
app.get("/resume", router.showRsume);

// 管理员登录接口
app.post('/admin',router.showAdmin);


app.listen(8088);
