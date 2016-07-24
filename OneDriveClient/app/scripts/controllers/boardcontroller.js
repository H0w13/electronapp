; onedriveclient.controller("board", function ($scope, $http, chartservice, $compile) {
    $scope.boardType = "filelist";
    $scope.$on('RootDrawBoard', function (event, files) {
        $scope.files = files;
        $scope.boardType = "filelist";
        var root = {
            name: "flare",
            children: files
        };
        $scope.drawBoard($scope.boardType);
    });
    $scope.$on('RefreshBoard', function (event, files) {
        $scope.files = files;
        $scope.drawBoard($scope.boardType);
    });

    $scope.openFile = function (file) {
        if (file.isDirectory)
            $scope.$emit("LoadFolder", file);
        else (!file.isDirectory && file.isSynced == 0)
        {
            $scope.$emit("SyncFile", file);
        }
    };

    $scope.drawBoard = function (type) {
        $scope.boardType = type;
        $("#board").empty();
        if ($scope.boardType == 'filetable') {
            $http.get("templates/filetable.html").then(function (result) {
                var scope = angular.element(document.getElementById("board")).scope();
                var compile = $compile(result.data)(scope.$new());
                $("#board").append(compile);
            });
        }
        else if ($scope.boardType == 'filelist') {
            $http.get("templates/filelistview.html").then(function (result) {
                var scope = angular.element(document.getElementById("board")).scope();
                var compile = $compile(result.data)(scope.$new());
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
    };
});