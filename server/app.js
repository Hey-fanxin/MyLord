var express = require("express");
var app = express();

var router = require("./router/router.js");

app.use(express.static("./public"));

// home
app.get("/", router.showIndex); 
// rsume 
app.get("/resume", router.showRsume);


app.listen(8088);
