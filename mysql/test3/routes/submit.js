/**
 * Created by lenovo on 2016/11/16.
 */

var express=require("express");
var routes=express.Router();
var use=require("../dao/userData");

routes.post("/submit",function(req,res){
    //res.render("submit");
        //�õ�body�������
    var username=req.body.username,
        password=req.body.password;
    var user=use.queryUser(req,res,username,password);



  /* if(userName==user.username && password==user.password){
       var data={name:"xiaohei",password:"123456",data:"success"};
       res.json(data);
   }else{
       var data={data:"false"};
       res.json(data);
   }*/
    //console.log(userName);
    //console.log(password);
    //����һ��json����


})

module.exports.submit=routes;
