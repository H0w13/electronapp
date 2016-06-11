define(["folderion"], function (folderion) {

	folderion.controller("operation", function ($scope, fileservice) {

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

		$scope.folderPath = "/home/howie/dev/Github/electronapp/Folderion/app";
		$scope.loadFolder = function () {
			fileservice.getSubItems($scope.folderPath, function (err, files) {
				if (err)
					throw err;
				else {
					for (var i = 0; i < files.length; i++) {
						if (files[i].isDirectory) {
							files[i].children = getNextLevel(files[i].path, files[i], 1);
						}
					}
					requirejs(["jquery"], function ($) {
						$.fn.zTree.init($("#tree"), {}, files);
						$scope.$emit("LoadFilesCompleted", files);
					});
				}
			});
		};
	});
});
