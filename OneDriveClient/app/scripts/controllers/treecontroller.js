define(["onedriveclient"], function (onedriveclient) {
    onedriveclient.controller("tree", function ($scope) {
        $scope.$on('RootDrawTree', function (event, files) {
            $scope.files = files;            
        });

        $scope.loadSub = function(file){
            $scope.$emit("LoadFolder", file);
        };
    });
});