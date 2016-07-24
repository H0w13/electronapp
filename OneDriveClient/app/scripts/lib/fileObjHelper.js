;
const fileModel = require("../models/file.js");
module.exports = {
    create: function (name, path, stats) {
        var fObj = fileModel(name, path, "", stats.size, stats.ctime, stats.isDirectory());
        fObj.updateStatus(-1);
        return fObj;
    },
    combinePath: function (filename, directory) {
        if (directory.startsWith('/')) {
            //guess it is posix system
            if (directory.endsWith('/'))
                return directory + filename;
            else
                return directory + '/' + filename;
        }
        else {
            //guess it is nt system
            return directory + '\\' + filename;
        }
    },
    mergeFiles: function (local, remote) {
        if (!local)
            return remote;
        if (remote) {
            if (local.name == remote.name && local.isDirectory == remote.isDirectory) {
                local.remotePath = remote.remotePath;
                local.downloadUrl = remote.downloadUrl;
                local.hashcode = remote.hashcode;
                if (local.createDate == remote.createDate && local.size == remote.size)
                    local.updateStatus(1);
                else {
                    local.createDate = remote.createDate;
                    local.size = remote.size;
                    local.updateStatus(0);
                }
            }
        }
        return local;
    }
};