;
module.exports = function (name, localPath, remotePath, size, createDate, isDirectory) {
    var updateSize = function (size) {
        if (size < 1024)
            return size + "B";
        else if (size < 1024 * 1024)
            return Math.round(size / 1024) + "K";
        else
            return Math.round(size / (1024 * 1024)) + "M";
    };

    var obj = {
        name: name,
        isDirectory: isDirectory,
        createDate: createDate,
        size: size,
        displaySize: updateSize(size),
        isLoaded: false,
        localPath: localPath,
        remotePath: remotePath,
        downloadUrl: "",
        hashcode: undefined,
        //-1 local, 0 remote, 1 synced
        isSynced: -1,
        iconStyle: isDirectory ? "list-icon mif-folder fg-blue" : "list-icon mif-file-empty"
    };
    if(isDirectory)
        obj.children = [];
    obj.updateStatus = function (status) {
        obj.isSynced = status;
        if (!obj.isDirectory) {
            switch (status) {
                case -1:
                    obj.iconStyle = "list-icon mif-file-empty fg-red";
                    break;
                case 0:
                    obj.iconStyle = "list-icon mif-file-empty fg-blue";
                    break;
                case 1:
                    obj.iconStyle = "list-icon mif-file-empty fg-green";
                    break;
            }
        }
    };
    return obj;
};