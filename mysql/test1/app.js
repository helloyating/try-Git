/**
 * Created by lenovo on 2016/11/15.
 */

var express=require("express");
var ejs=require("ejs");
var path=require("path");
var bodyParese=require("body-parser");
var app=express();



    //���������ʽ
app.set("view engine","html");
    //��Ⱦ�����Ϊhtml
app.engine("html",ejs.__express);

app.set('views',path.join(__dirname,"views"));

/*app.get("/",function(req,res){
    use.user(req,res);
})*/

app.set('port',process.env.PORT || 8000);



app.use(bodyParese.urlencoded({extended:false}));

var routes=require("./routes")(app);

app.listen(app.get('port'),function(){
    console.log("listen port at 8080!");
})