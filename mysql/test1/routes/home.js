/**
 * Created by lenovo on 2016/11/16.
 */

var express=require("express");
var routes=express.Router();
var use=require("../dao/use");

routes.get("/",function(req,res){
    use.user(req,res);
    //res.render("index");
})

module.exports.home=routes;
