//for broadcase events
define(["onedriveclient"], function (onedriveclient) {
    onedriveclient.controller("root", function ($scope) {
        $scope.$on('LoadFilesCompleted', function (event, files) {
            $scope.$broadcast("RootDrawTreeMap", files);
            $scope.$broadcast("RootDrawTree", files);
        });
        $scope.$on('SwitchPath', function (event, files) {
            $scope.$broadcast("RefreshBoard", files);
        });
        //load configuration
        requirejs(["config"], function (config) {
            $scope.folderPath = config.localfolder;
            $scope.$broadcast("RootInitReady");
        });
    });
});