define(["folderion"], function (folderion) {
    folderion.controller("board", function ($scope, chartservice) {
        $scope.$on('RootDrawTreeMap', function (event, files) {
            $scope.files = files;
            var root = {
                name: "flare",
                children: files
            };
            requirejs(["jquery"], function ($) {
                $("#board").empty();
                chartservice.drawTreeMap(root, "board");
            });
        });

    });
});