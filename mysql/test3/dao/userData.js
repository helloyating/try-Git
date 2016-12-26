/**
 * Created by lenovo on 2016/11/17.
 */
var mysql=require("mysql");
var $conf=require("../config/config");
var $util=require("../util/util");

//�������ӳ�
var pool=mysql.createPool($util.extend({},$conf.myOption,true));


// ��ǰ̨����JSON�����ļ򵥷�װ
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        var data = {errCode: '1', errMessage: 'request filed', isSuccess: false};
        res.json(data);
    } else {
        //res.json(ret);
        var data = {errCode: 0, errMessage: 'request success', name: ret.username, isSuccess: true};
        res.json(data);
    }
};

module.exports={
    queryUser: function(req,res,username,password){
        //ִ��sql���
        var mysqlString='select * from user where username=\''+username+'\'and password=\''+password+'\'';
        //�������ݿ�
        pool.getConnection(function(err,connection){
            if(err) return console.error(err);
            connection.query(mysqlString,function(err,result){
                //console.log(result);
                if(err) return console.error(err);
                jsonWrite(res,result);
                //�Ͽ�����
                connection.release();
            })
        })

    }
}