/**
 * Created by lenovo on 2016/11/15.
 */

var _home=require("./home");
var _login=require("./login");
var _submit=require("./submit");

module.exports=function(app){
    app.get("/",_home.home);
    app.get("/login",_login.login);
    app.post("/submit",_submit.submit);
}