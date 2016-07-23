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
    }
};