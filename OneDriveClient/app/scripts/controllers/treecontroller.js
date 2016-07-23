; onedriveclient.controller("tree", function ($scope) {
    // $scope.$on('RootDrawTree', function (event, files) {
    //     $scope.files = files;
    // });

    $scope.loadSub = function (file) {
        if (file.isDirectory) {
            $scope.$emit("LoadFolder", file);
        }
    };
});