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

		var drawMap = function (root) {
			$("#map").empty();
			var margin = {
				top: 40,
				right: 10,
				bottom: 10,
				left: 10
			},
				width = 960 - margin.left - margin.right,
				height = 500 - margin.top - margin.bottom;

			var color = d3.scale.category20c();

			var treemap = d3.layout.treemap()
				.size([width, height])
				.sticky(true)
				.value(function (d) {
					return d.size;
				});

			var div = d3.select("#map").append("div")
				.style("position", "relative")
				.style("width", (width + margin.left + margin.right) + "px")
				.style("height", (height + margin.top + margin.bottom) + "px")
				.style("left", margin.left + "px")
				.style("top", margin.top + "px");

			var node = div.datum(root).selectAll(".node")
				.data(treemap.nodes)
				.enter().append("div")
				.attr("class", "node")
				.call(position)
				.style("background", function (d) {
					return d.children ? color(d.name) : null;
				})
				.text(function (d) {
					return d.children ? null : d.name;
				});

			function position() {
				this.style("left", function (d) {
					return d.x + "px";
				})
					.style("top", function (d) {
						return d.y + "px";
					})
					.style("width", function (d) {
						return Math.max(0, d.dx - 1) + "px";
					})
					.style("height", function (d) {
						return Math.max(0, d.dy - 1) + "px";
					});
			}
		};

		$scope.folderPath = "";
		$scope.loadFolder = function () {
			fileservice.getSubItems($scope.folderPath, function (err, files) {
				if (err)
					throw err;
				else {
					var nodes = [];
					for (var i = 0; i < files.length; i++) {
						if (files[i].isDirectory) {
							getNextLevel(files[i].path, files[i], 1);
						}
						nodes.push(files[i]);
					}
					requirejs(["jquery"], function ($) {
						requirejs(["ztree"], function (ztree) {
							$.fn.zTree.init($("#tree"), {}, nodes);
						});
						requirejs(["d3"], function (d3) {
							var root = {
								name: "flare",
								children: nodes
							};
							drawMap(root);
						});
					});
				}
			});
		};
	});
});
