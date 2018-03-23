
var formidable = require("formidable");
var db = require("../models/db.js");
var md5 = require("../models/md5.js");
var path = require("path");
var fs = require("fs");
var util = require('util');
//var gm = require("gm");

//首页
exports.showIndex = function (rq, rs, n) {
    
};
// 简历  /rsume 
exports.showRsume = function (rq, rs, n) {
    rs.status(200);
    rs.send({"name": "bianjunping"})
}
//  管理员登录接口
exports.showAdmin = function(rq, rs, n){
    var form = new formidable.IncomingForm()
    
    form.parse(rq, function(err, fields, files) {
        var username = fields.username,
            password = fields.password;
            
        var jiamihou = md5(md5(password) + "bjp");
        //查询数据库，看看有没有个这个人
        db.find("adminDB", {"username": username}, function (err, result) {
            if (err) {
                rs.send("-5");
                return;
            }
            //没有这个人
            if (result.length == 0) {
                rs.send("-1"); //用户名不存在
                return;
            }
            //有的话，进一步看看这个人的密码是否匹配
            if (jiamihou == result[0].password) {

                rq.session.username = username;
                
                rs.writeHead(200, {'content-type': 'text/plain'});
                rs.end(util.inspect({fields: fields, files: files}))
                return;
            } else {
                rs.send("-2");  //密码错误
                return;
            }
        });
    });
}