define(["folderion"], function (folderion) {

    folderion.controller("board", function ($scope, chartservice) {
        $scope.$on('RootLoadFilesCompleted', function (event, files) {
            console.log(files);
            $scope.files = files;
            var root = {
                name: "flare",
                children: files
            };
            $("#board").empty();
            chartservice.drawTreeMap(root, "board");
        });

    });
});