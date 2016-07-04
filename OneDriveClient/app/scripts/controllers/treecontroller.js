define(["onedriveclient"], function (onedriveclient) {
    onedriveclient.controller("tree", function ($scope) {
        $scope.$on('RootDrawTree', function (event, files) {
            $scope.files = files;
            requirejs(["jquery"], function ($) {                
                $.each(files, function(i, file){
                    $("#tree").append("<li><span class='leaf'><span class='icon mif-folder'></span>" + file.name + "</span></li>");
                });
            });
        });

        $scope.loadSub = function(file){
            
        };
    });
});