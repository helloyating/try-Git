var fs = require("fs");
var path = require("path");
//原文件夹路径
var source_dir = "./js";
//目标文件夹路径
var target_dir = "./copyjs";
/*
 * dir 目标路径
 * floder 子文件夹名称
 * callback 回调函数
 * file 创建文件夹
 * datas 数据
 */
var setDirectory = function (dir, floder, callback, file, datas) {
    //判断需不需要创建子目录 null不创建子目录，否则拼接子目录的路径
    var _dir = floder == null ? dir : path.join(dir, floder);
    fs.exists(_dir, function (exists) {
        //如果目录存在
        if (exists) {
            //执行回调函数写入读取的文件
            callback(_dir, file, datas);
            return true;
        } else {
            //如果目录不存在，创建目录，创建完成后执行回调函数
            fs.mkdir(_dir, function (err) {
                if (err) {
                    return console.error(err);
                } else {
                    callback(_dir, file, datas);
                    console.log("success");
                }
            })
        }
    })
}
//写入文件
/*
 * dir 目标文件路径
 * filename 目标文件名称
 * data 数据
 */
var writeFile = function (dir, filename, data) {
    fs.writeFile(path.join(dir, filename), data, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("write done");
    });
}
//读取文件
var readFile = function (readPath, name) {
    fs.readdir(readPath, function (err, files) {
        if (err) {
            console.log(err);
        }
        //遍历目录
        files.forEach(function (filename) {
            //判断文件类型
            fs.stat(path.join(readPath, filename), function (err, stats) {
                if (err) {
                    console.log(err);
                }
                //如果是文件
                if (stats.isFile()) {
                    //读取文件内容，写入文件
                    fs.readFile(path.join(readPath, filename), function (err, data) {
                        if (err) {
                            console.log(err);
                        }
                        //创建文件目录
                        setDirectory(target_dir, name, writeFile, filename, data);
                    });
                } else if (stats.isDirectory()) {//如果是文件夹，调用函数本身，遍历目录
                    readFile(path.join(sourceDir, filename), name + "/" + filename);
                    readFile(path.join(sourceDir, filename), filename);
                }
            });
        });
    });
}
//读取文件目录
var readdir = function (sourceDir) {
    //读取文件夹内的文件
    fs.readdir(sourceDir, function (err, files) {
        //循环遍历文件夹内的每个文件内容
        files.forEach(function (file) {
            //判断文件内容
            fs.stat(path.join(sourceDir, file), function (err, stats) {
                if (err) {
                    return console.error(err);
                }
                //如果是文件
                if (stats.isFile()) {
                    //读取文件内容写入文件
                    fs.readFile(path.join(sourceDir, file), function (err, data) {
                        if (err) {
                            console.log(err);
                        }
                        //创建文件目录
                        setDirectory(target_dir, null, writeFile, file, data);
                    });
                } else if (stats.isDirectory()) {//如果是文件夹，调用函数本身，遍历目录
                    readFile(path.join(sourceDir, file), file);
                }
            })
        })
    })
}
readdir(source_dir);