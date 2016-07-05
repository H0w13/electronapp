define(["onedriveclient"], function (onedriveclient) {
	onedriveclient.service('fileservice', function () {

		this.getSubItems = function (path, callback) {
			requirejs(["common/io"], function (io) {
				io.getDirectorySubItems(path, callback);
			});
		};

		var getNextLevel = function (path, node, level) {
			requirejs(["common/io"], function (io) {
				io.getDirectorySubItems(path, function (err, files) {
					if (err)
						console.log(err);
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
			});
		};
		this.getAllSubFiles = function (path) {
			requirejs(["common/io"], function (io) {
				io.getDirectorySubItems(path, function (err, files) {
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
			});
		};
	});
});
