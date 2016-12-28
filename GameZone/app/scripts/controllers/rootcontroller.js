; gamezone.controller("root", function ($scope) {
    $scope.gamelist = [
    {
        Title: "Black Box",
        Name: "blackbox"
    }];
    $scope.loadGame = function(gamename){
        $scope.$broadcast("LoadGame", gamename);
    };
});