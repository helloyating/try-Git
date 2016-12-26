/**
 * Created by lenovo on 2016/11/17.
 */
(function(){
    var submit=$("#submit");
    init();
    function init(){
        submit.on("click",function(){
            var data={
                user: $("#username").val(),
                pwd: $("#password").val()
            }
            $.ajax({
                type:"POST",
                url:"/submit",
                dataType:"json",
                data:data,
                success:function(res){
                    if(res.errCode==0 && res.isSuccess){
                        alert("登录成功");
                        location.href = "http://localhost:3000/index";
                    }
                }
            })
        })
    }

})()