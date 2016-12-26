/**
 * Created by lenovo on 2016/11/15.
 */
var mysql=require("mysql");
var myoption=require("../config/config");

    //创建数据库连接
var connection=mysql.createConnection(myoption.myOption);

//var arrData;
    //连接数据库
connection.connect();
    //执行sql语句
var queryString="select * from user where username='xiaohei' && password='123456'";
connection.query(queryString,function(err,data){
    if(err){
        return console.error(err);
    }

    if(data.length>0){
        module.exports.datastaute=function(){
            return data[0];

        }
    }
    console.log(data);
    arrData=data;
     module.exports.user=function(req,res){
         res.render("index",{title:"ejs",user:arrData});
     }
})
    //断开数据库连接
connection.end();






