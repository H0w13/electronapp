define(["onedriveclient"], function (onedriveclient) {
	onedriveclient.controller("operation", function ($scope, fileservice, oauthservice) {
		var getNextLevel = function (path, node, level) {
			if (level > 3)
				return;
			fileservice.getSubItems(path, function (err, files) {
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
		};
		var loadAllFiles = function () {
			fileservice.getSubItems($scope.folderPath, function (err, files) {
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
		$scope.$on('RootInitReady', function (event) {
			loadAllFiles();
		});
	});
});