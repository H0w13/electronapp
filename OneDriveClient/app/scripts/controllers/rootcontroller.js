//for broadcase events
; onedriveclient.controller("root", function ($scope, onedriveservice, fileservice) {
    $scope.masked = false;
    $scope.maskMessage = "";
    var fObjHelper = require("./scripts/lib/fileObjHelper.js");

    $scope.$on('SwitchPath', function (event, files) {
        $scope.$broadcast("RefreshBoard", files);
    });

    var getSub = function (folder, callback) {
        var remotePath = "";
        var localPath = $scope.folderPath;
        if (folder) {
            remotePath = folder.remotePath;
            localPath = folder.localPath;
        }
        var odurl = $scope.onedriveApiRoot + "/drive/root:" + remotePath + ":/children?access_token=" + $scope.authConfig.access_token;
        onedriveservice.getFolder(odurl, function (items) {
            for (var i = 0; i < items.length; i++) {
                items[i].localPath = fObjHelper.combinePath(items[i].name, localPath);
                items[i].remotePath = remotePath + "/" + encodeURIComponent(items[i].name);
            }
            callback(items);
        });
    };
    //load configuration
    var config = require("./scripts/config.js");
    $scope.folderPath = config.localfolder;
    $scope.onedriveApiRoot = config.onedriveApiRoot;
    $scope.authConfig = require('electron').remote.getGlobal('config');
    fileservice.getAllSubFiles($scope.folderPath, function (localFiles) {
        getSub(null, function (files) {
            fObjHelper.mergeFiles(localFiles, files);
            $scope.rootFiles = localFiles;
            $scope.$broadcast("RootDrawBoard", localFiles);
        });
    });

    $scope.$on('LoadFolder', function (event, folder) {
        if (folder.isLoaded || folder.isSynced != 0) {
            $scope.$broadcast("RefreshBoard", folder.children);
            return;
        }
        getSub(folder, function (files) {
            var getNodeByPath = function (folder, nodePath) {
                if (folder.isDirectory) {
                    if (folder.remotePath == nodePath)
                        return folder;
                    else if (nodePath.startsWith(folder.remotePath)) {
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
                var node = getNodeByPath($scope.rootFiles[i], folder.remotePath);
                if (node) {
                    fObjHelper.mergeFiles(node.children, files);
                    node.isLoaded = true;
                    break;
                }
            }
            $scope.$broadcast("RefreshBoard", files);
            $scope.$broadcast("RootDrawTree", $scope.rootFiles);
        })
    });

    $scope.$on('SyncFile', function (event, file) {
        if (file.downloadUrl) {
            $scope.masked = true;
            $scope.maskMessage = "Downloading......";
            var fileStream = fileservice.createFile(file.localPath);
            onedriveservice.downloadFile(file.downloadUrl, fileStream, function () {
                $scope.$apply(function () {
                    $scope.masked = false;
                    file.updateStatus(1);
                    $scope.$broadcast("DownloadCompleted", file);
                });
            });
        }
        else {
            alert("Invalid download URL");
        }
    });
});