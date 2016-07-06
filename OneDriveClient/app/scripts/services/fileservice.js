;
onedriveclient.service('fileservice', function () {

	this.getSubItems = function (path, callback) {
		getLocalFodler(path, callback);
	};

	var getNextLevel = function (path, node, level) {
		getLocalFodler(path, function (err, files) {
			if (err)
				throw err;
			else {
				var nodes = [];
				for (var i = 0; i < files.length; i++) {
					if (files[i].isDirectory) {
						getNextLevel(files[i].path, files[i], level + 1);
					}
					nodes.push(files[i]);
				}
				node.children = nodes;
			}
		});
	};
	this.getAllSubFiles = function (path) {
		getLocalFodler(path, function (err, files) {
			if (err)
				throw err;
			else {
				for (var i = 0; i < files.length; i++) {
					if (files[i].isDirectory) {
						files[i].children = getNextLevel(files[i].path, files[i], 1);
					}
				}
				$scope.$emit("LoadFilesCompleted", files);
			}
		});
	};
	var getLocalFodler = function (path, callback) {
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
	};
});
