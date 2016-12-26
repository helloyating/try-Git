var fs = require("fs");
var path = require("path");
//ԭ�ļ���·��
var source_dir = "./js";
//Ŀ���ļ���·��
var target_dir = "./copyjs";
/*
 * dir Ŀ��·��
 * floder ���ļ�������
 * callback �ص�����
 * file �����ļ���
 * datas ����
 */
var setDirectory = function (dir, floder, callback, file, datas) {
    //�ж��費��Ҫ������Ŀ¼ null��������Ŀ¼������ƴ����Ŀ¼��·��
    var _dir = floder == null ? dir : path.join(dir, floder);
    fs.exists(_dir, function (exists) {
        //���Ŀ¼����
        if (exists) {
            //ִ�лص�����д���ȡ���ļ�
            callback(_dir, file, datas);
            return true;
        } else {
            //���Ŀ¼�����ڣ�����Ŀ¼��������ɺ�ִ�лص�����
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
//д���ļ�
/*
 * dir Ŀ���ļ�·��
 * filename Ŀ���ļ�����
 * data ����
 */
var writeFile = function (dir, filename, data) {
    fs.writeFile(path.join(dir, filename), data, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("write done");
    });
}
//��ȡ�ļ�
var readFile = function (readPath, name) {
    fs.readdir(readPath, function (err, files) {
        if (err) {
            console.log(err);
        }
        //����Ŀ¼
        files.forEach(function (filename) {
            //�ж��ļ�����
            fs.stat(path.join(readPath, filename), function (err, stats) {
                if (err) {
                    console.log(err);
                }
                //������ļ�
                if (stats.isFile()) {
                    //��ȡ�ļ����ݣ�д���ļ�
                    fs.readFile(path.join(readPath, filename), function (err, data) {
                        if (err) {
                            console.log(err);
                        }
                        //�����ļ�Ŀ¼
                        setDirectory(target_dir, name, writeFile, filename, data);
                    });
                } else if (stats.isDirectory()) {//������ļ��У����ú�����������Ŀ¼
                    readFile(path.join(sourceDir, filename), name + "/" + filename);
                    readFile(path.join(sourceDir, filename), filename);
                }
            });
        });
    });
}
//��ȡ�ļ�Ŀ¼
var readdir = function (sourceDir) {
    //��ȡ�ļ����ڵ��ļ�
    fs.readdir(sourceDir, function (err, files) {
        //ѭ�������ļ����ڵ�ÿ���ļ�����
        files.forEach(function (file) {
            //�ж��ļ�����
            fs.stat(path.join(sourceDir, file), function (err, stats) {
                if (err) {
                    return console.error(err);
                }
                //������ļ�
                if (stats.isFile()) {
                    //��ȡ�ļ�����д���ļ�
                    fs.readFile(path.join(sourceDir, file), function (err, data) {
                        if (err) {
                            console.log(err);
                        }
                        //�����ļ�Ŀ¼
                        setDirectory(target_dir, null, writeFile, file, data);
                    });
                } else if (stats.isDirectory()) {//������ļ��У����ú�����������Ŀ¼
                    readFile(path.join(sourceDir, file), file);
                }
            })
        })
    })
}
readdir(source_dir);