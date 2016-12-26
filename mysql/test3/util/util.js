/**
 * Created by lenovo on 2016/11/17.
 */
module.exports = {
    extend: function(target, source, flag) {
        for(var key in source) {
            if(source.hasOwnProperty(key))
                flag ?
                    (target[key] = source[key]) :
                    (target[key] === void 0 && (target[key] = source[key]));
        }
        return target;
    },
    creatJson: function (code, msg, flag, data) {
        var oJson = {
            errCode: code,
            errMsg: msg,
            isSuccess: flag,
            datas: data
        };
        return oJson;
    }
};