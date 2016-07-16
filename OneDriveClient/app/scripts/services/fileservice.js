; onedriveclient.service('fileservice', function () {
	var fs = require('fs');
	var fileModel = require("./scripts/models/file.js");

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
	this.getAllSubFiles = function (path, callback) {
		getLocalFodler(path, function (err, files) {
			if (err)
				throw err;
			else {
				for (var i = 0; i < files.length; i++) {
					if (files[i].isDirectory) {
						files[i].children = getNextLevel(files[i].path, files[i], 1);
					}
				}
				callback(files);
			}
		});
	};
	var getLocalFodler = function (path, callback) {
		var fObjHelper = {
			create: function (name, path, stats) {
				var fObj = fileModel(name, path, stats.size, stats.ctime, stats.isDirectory());
				fObj.isSynced = -1;
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
