//for broadcase events
define(["folderion"], function (folderion) {
     folderion.controller("root", function ($scope) {
        $scope.$on('LoadFilesCompleted', function (event, files) {
            $scope.$broadcast("RootDrawTreeMap", files);
            $scope.$broadcast("RootDrawTree", files);
        });

    });
});