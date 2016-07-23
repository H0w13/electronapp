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
    var mergeFiles = function (local, remote) {
        if (remote && remote.length > 0) {
            if (!local) {
                local = remote;
                return;
            }
            for (var i = 0; i < remote.length; i++) {
                var found = false;
                for (var j = 0; j < local.length; j++) {
                    if (local[j].name == remote[i].name) {
                        found = true;
                        if (local[j].isDirectory) {
                            mergeFiles(local[j].children, remote[i].children);
                        }
                        else {
                            local[j].remotePath = remote[i].remotePath;
                            local[j].updateStatus(1);

                        }
                        break;
                    }
                }
                if (!found) {
                    local.push(remote[i]);
                }
            }
        }
    }
    //load configuration
    var config = require("./scripts/config.js");
    $scope.folderPath = config.localfolder;
    $scope.onedriveApiRoot = config.onedriveApiRoot;
    $scope.authConfig = require('electron').remote.getGlobal('config');
    fileservice.getAllSubFiles($scope.folderPath, function (localFiles) {
        getSub(null, function (files) {
            mergeFiles(localFiles, files);
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
                    mergeFiles(node.children, files);
                    node.isLoaded = true;
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
            onedriveservice.downloadFile(file.downloadUrl, file.localPath, function () {
                $scope.$apply(function () {
                    $scope.masked = false;
                    $scope.$broadcast("DownloadCompleted", file);
                });
            });
        }
        else {
            alert("Invalid download URL");
        }
    });
});