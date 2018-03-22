
// var formidable = require("formidable");
// // var db = require("../models/db.js");
// // var md5 = require("../models/md5.js");
// var path = require("path");
// var fs = require("fs");
// var gm = require("gm");

//首页
exports.showIndex = function (rq, rs, n) {
    
};
// 简历  /rsume 
exports.showRsume = function (rq, rs, n) {
    rs.status(200),
    rs.send({"name": "bianjunping"})
}
