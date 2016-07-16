;
module.exports = function (name, path, size, createDate, isDirectory) {
    var updateSize = function (size) {
        if (size < 1024)
            return size + "B";
        else if (size < 1024 * 1024)
            return Math.round(size / 1024) + "K";
        else
            return Math.round(size / (1024 * 1024)) + "M";
    };

    return {
        name: name,
        isDirectory: isDirectory,
        createDate: createDate,
        size: size,
        displaySize: updateSize(size),
        isLoaded: false,
        path: path,
        downloadUrl: "",
        hashcode: undefined,
        isSynced: -1, //-1 local, 0 remote, 1 synced
        iconStyle: function () {
            if (this.isDirectory)
                return "list-icon mif-folder fg-blue";
            else {
                switch (this.isSynced) {
                    case -1:
                        return "list-icon mif-file-empty fg-red";
                    case 0:
                        return "list-icon mif-file-empty fg-blue";
                    case 1:
                        return "list-icon mif-file-empty fg-green";
                    default:
                        return "list-icon mif-file-empty";
                }
            }
        }
    };
};