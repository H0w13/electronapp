; onedriveclient.service('fileservice', function () {
	var fs = require('fs');
	var nodePath = require('path');
	var fileModel = require("./scripts/models/file.js");
	var fObjHelper = require("./scripts/lib/fileObjHelper.js");
	this.getSubItems = function (path, callback) {
		getLocalFolder(path, callback);
	};

	var getNextLevel = function (path, node, level) {
		getLocalFolder(path, function (err, files) {
			if (err)
				throw err;
			else {
				var nodes = [];
				for (var i = 0; i < files.length; i++) {
					if (files[i].isDirectory) {
						getNextLevel(files[i].localPath, files[i], level + 1);
					}
					nodes.push(files[i]);
				}
				node.children = nodes;
			}
		});
	};
	this.getAllSubFiles = function (path, callback) {
		getLocalFolder(path, function (err, files) {
			if (err)
				throw err;
			else {
				for (var i = 0; i < files.length; i++) {
					if (files[i].isDirectory) {
						getNextLevel(files[i].localPath, files[i], 1);
					}
				}
				callback(files);
			}
		});
	};
	var getLocalFolder = function (path, callback) {
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

	this.createFile = function (filepath) {
		var folderPath = nodePath.dirname(filepath);
		if (folderPath) {
			var mkdirs = function (dirpath) {
				try {
					fs.accessSync(dirpath);
				}
				catch (e) {
					mkdirs(nodePath.dirname(dirpath));
					fs.mkdirSync(dirpath);
				}
			};
			mkdirs(folderPath)
		}
		return fs.createWriteStream(filepath);
	};
});
