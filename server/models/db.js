var dbconifg = require('./conifg.js');
var MongoClient = require('mongodb').MongoClient;

// 连接数据库模块
function _connectDB(callBack) {
    // 数据库的连接路径
    var url = dbconifg._db_url_;

    MongoClient.connect(url, function (err, db){
        if(err){
            callBack(err, null);
            return 
        }
        callBack(err, db)
    })
}

// 连接数据库并进行初始化
function init() {
    _connectDB(function(err, db) {
        if(err){
            console.log(err);
            return 
        }
        var collection = db.collection('adminDB');
        collection.createIndex(
            { "username": 1},
            null,
            function(err, results) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("索引建立成功");
            }
        );
    })
}
// 每次打开必须先连接数据库
init();

//  插入一条数据
exports.insertOne = function (collectionName, json, callback) {
    _connectDB(function (err, db) {
        db.collection(collectionName)
            .insertOne(json, function (err, result) {
                callback(err, result);
                db.close(); //关闭数据库
            })
    })
};
exports.find = function (collectionName, json, callBack) {
    var results = [];
    _connectDB(function (err, db) {
        var con = db.collection(collectionName).find(json);
        con.each(function(err, data){
            if(err){
                callback(err, null);
                db.close();
                return
            }
            if(data != null){
                results.push(data)
            }else{
                //  把查找的数据全部装到 results 数组并返回
                callBack(err, results);
                db.close()
            }
        })
    })
}