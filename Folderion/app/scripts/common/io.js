(function () {
    var fs = require('fs');

    var fObjHelper = {
        create: function (name, path, stats) {
            var fObj = {
                name: name,
                path: path,
                size: stats.size,
                createDate: stats.ctime,
                updateDate: stats.mtime,
                isDirectory: stats.isDirectory()
            };
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
        }
    };

    this.getDirectorySubItems = function (path, callback) {
        try {
            if (fs.statSync(path).isDirectory()) {
                var files = fs.readdirSync(path);
                var fObjList = [];
                for (var i = 0; i < files.length; i++) {
                    if (!files[i].startsWith(".")) {
                        var filePath = fObjHelper.combinePath(files[i], path);
                        var fstat = fs.statSync(filePath);
                        var fObj = fObjHelper.create(files[i], filePath, fstat);
                        fObjList.push(fObj);
                    }
                }
                return callback(null, fObjList);
            }
            else
                throw "'" + path + "'' is not a directory"
        }
        catch (ex) {
            callback(ex, null);
        }
    }

    return this;
}
)();