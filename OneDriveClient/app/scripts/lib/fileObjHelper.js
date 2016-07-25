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
    mergeFiles: function (localFiles, remoteFiles) {
        var merge = function (local, remote) {
            if (!local) {
                local = remote;
                return;
            }
            if (remote) {
                if (local.name == remote.name && local.isDirectory == remote.isDirectory) {
                    local.remotePath = remote.remotePath;
                    if (!local.isDirectory) {
                        local.downloadUrl = remote.downloadUrl;
                        local.hashcode = remote.hashcode;
                    }
                    else {
                        if (remote.children && remote.children.length > 0) {
                            if (!local.children || local.children.length == 0) {
                                local.children = remote.children;
                            }
                            else {
                                for (var i = 0; i < remote.children.length; i++) {
                                    var found = false;
                                    for (var j = 0; j < local.children.length; j++) {
                                        if (localFiles[j].name == localFiles[i].name) {
                                            found = true;
                                            merge(local[j], remote[i]);
                                            break;
                                        }
                                    }
                                    if (!found) {
                                        local.children.push(remote[i]);
                                    }
                                }
                            }
                        }
                    }
                    if (local.createDate == remote.createDate && local.size == remote.size)
                        local.updateStatus(1);
                    else {
                        local.createDate = remote.createDate;
                        local.size = remote.size;
                        local.updateStatus(0);
                    }
                }
            }
        }

        if (remoteFiles && remoteFiles.length > 0) {
            if (!localFiles) {
                localFiles = remoteFiles;
                return;
            }
            for (var i = 0; i < remoteFiles.length; i++) {
                var found = false;
                for (var j = 0; j < localFiles.length; j++) {
                    if (localFiles[j].name == remoteFiles[i].name) {
                        found = true;
                        merge(localFiles[j], remoteFiles[i]);
                        break;
                    }
                }
                if (!found) {
                    localFiles.push(remoteFiles[i]);
                }
            }
        }
    }
};