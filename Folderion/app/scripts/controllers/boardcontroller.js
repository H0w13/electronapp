define(["folderion"], function (folderion) {
    folderion.controller("board", function ($scope, $http, chartservice, $compile) {
        $scope.boardType = "filelist";
        $scope.$on('RootDrawTreeMap', function (event, files) {
            $scope.files = files;
            $scope.boardType = "filelist";
            var root = {
                name: "flare",
                children: files
            };
            requirejs(["jquery"], function ($) {
                $("#board").empty();
                $http.get("templates/filelist.html").then(function (result) {
                    var scope = angular.element(document.getElementById("board")).scope();
                    var compile = $compile($(result.data))(scope.$new());
                    $("#board").append(compile);
                });
            });
        });

        $scope.drawBoard = function (type) {
            $scope.boardType = type;
            requirejs(["jquery"], function ($) {
                $("#board").empty();
                if ($scope.boardType == 'filelist') {
                    $http.get("templates/filelist.html").then(function (result) {
                        var scope = angular.element(document.getElementById("board")).scope();
                        var compile = $compile($(result.data))(scope.$new());
                        $("#board").append(compile);
                    });
                }
                else if ($scope.boardType == 'treemap') {
                    var root = {
                        name: "flare",
                        children: $scope.files
                    };
                    chartservice.drawTreeMap(root, "board");
                }
            });
        };
    });
});