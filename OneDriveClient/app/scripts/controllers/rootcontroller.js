//for broadcase events
; onedriveclient.controller("root", function ($scope, onedriveservice, fileservice) {
    $scope.masked = false;
    $scope.maskMessage = "";

    $scope.$on('SwitchPath', function (event, files) {
        $scope.$broadcast("RefreshBoard", files);
    });

    var getSub = function (path, callback) {
        var odurl = $scope.onedriveApiRoot + "/drive/root:" + path + ":/children?access_token=" + $scope.authConfig.access_token;
        onedriveservice.getFolder(odurl, function (items) {
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
                        else
                            local[j].updateStatus(1);
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
        getSub("", function (files) {
            for (var i = 0; i < files.length; i++) {
                files[i].path = "/" + encodeURIComponent(files[i].name);
            }
            mergeFiles(localFiles, files);
            $scope.rootFiles = localFiles;
            $scope.$broadcast("RootDrawBoard", localFiles);
            $scope.$broadcast("RootDrawTree", localFiles);
        })
    });


    $scope.$on('LoadFolder', function (event, folder) {
        if (folder.isLoaded || folder.isSynced != 0) {
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
                if (node) {
                    mergeFiles(node.children, files);
                    node.isLoaded = true;
                }
            }
            $scope.$broadcast("RootDrawTree", $scope.rootFiles);
        })
    });

    $scope.$on('SyncFile', function (event, file) {
        if (file.downloadUrl) {
            $scope.masked = true;
            $scope.maskMessage = "Downloading......";
            onedriveservice.downloadFile(file.downloadUrl, $scope.folderPath + decodeURIComponent(file.path), function () {
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