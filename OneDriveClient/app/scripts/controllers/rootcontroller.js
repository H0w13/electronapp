//for broadcase events
define(["onedriveclient"], function (onedriveclient) {
    onedriveclient.controller("root", function ($scope, onedriveservice) {
        $scope.$on('SwitchPath', function (event, files) {
            $scope.$broadcast("RefreshBoard", files);
        });

        var getSub = function (path, callback) {
            var odurl = $scope.onedriveApiRoot + "/drive/root:" + path + ":/children?access_token=" + $scope.authConfig.access_token;
            onedriveservice.getFolder(odurl, function (items) {
                callback(items);
            });
        };

        //load configuration
        requirejs(["config"], function (config) {
            $scope.folderPath = config.localfolder;
            $scope.onedriveApiRoot = config.onedriveApiRoot;
            $scope.authConfig = require('electron').remote.getGlobal('config');
            getSub("", function (files) {
                for (var i = 0; i < files.length; i++) {
                    files[i].path = "/" + encodeURIComponent(files[i].name);
                }
                $scope.rootFiles = files;
                $scope.$broadcast("RootDrawBoard", files);
                $scope.$broadcast("RootDrawTree", files);
            })
        });

        $scope.$on('LoadFolder', function (event, folder) {
            if(folder.isLoaded)
            {
                $scope.$broadcast("RefreshBoard", folder.children);
                $scope.$broadcast("RootDrawTree", $scope.rootFiles);
                return;
            }
            getSub(folder.path, function (files) {
                for (var i = 0; i < files.length; i++) {
                    files[i].path = folder.path + "/" + encodeURIComponent(files[i].name);
                }
                $scope.$broadcast("RefreshBoard", files);

                var getNodeByPath = function (folder, nodePath) {
                    if (folder.isDirectory) {
                        if (folder.path == nodePath)
                            return folder;
                        else if (nodePath.startsWith(folder.path)) {
                            if (folder.children && folder.children.length > 0) {
                                for (var i = 0; i < folder.children.length; i++) {
                                    var node = getNodeByPath(folder.children[i], nodePath);
                                    if (node)
                                        return node;
                                }
                            }
                            return undefined;
                        }
                        else
                            return undefined;
                    }
                    return undefined;
                };
                for (var i = 0; i < $scope.rootFiles.length; i++) {
                    var node = getNodeByPath($scope.rootFiles[i], folder.path);
                    if (node)
                     {
                         node.children = files;
                         node.isLoaded = true;
                     }
                }
                $scope.$broadcast("RootDrawTree", $scope.rootFiles);
            })
        });

    });
});