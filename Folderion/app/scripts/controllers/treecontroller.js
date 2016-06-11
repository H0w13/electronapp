define(["folderion"], function (folderion) {
    folderion.controller("tree", function ($scope) {
        $scope.$on('RootDrawTree', function (event, files) {
            $scope.files = files;
            requirejs(["jquery"], function ($) {
                $.fn.zTree.init($("#tree"), {}, files);
            });
        });
    });
});