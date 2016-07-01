define(["onedriveclient"], function (onedriveclient) {
    onedriveclient.controller("tree", function ($scope) {
        $scope.$on('RootDrawTree', function (event, files) {
            $scope.files = files;
            requirejs(["jquery"], function ($) {
                $.fn.zTree.init($("#tree"), {
                    treeId: "filetree",
                    callback: {
                        onClick: function (event, treeId, treeNode) {
                            if (treeNode.isDirectory)
                                $scope.$emit("SwitchPath", treeNode.children);
                            else
                                $scope.$emit("SwitchPath", [treeNode]);
                        }
                    }
                }, files);
            });
        });
    });
});