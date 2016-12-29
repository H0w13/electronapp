; gamezone.controller("board", function ($scope, $http, $compile, gameservice) {
    $scope.$on('LoadGame', function (event, gamename) {
        $scope.gamename = gamename;
        $scope.drawBoard($scope.gamename);        
    });
    $scope.drawBoard = function (gamename) {
        $("#board").empty();
        $http.get("templates/"+gamename+".html").then(function (result) {
            var scope = angular.element(document.getElementById("board")).scope();
            var compile = $compile(result.data)(scope.$new());
            $("#board").append(compile);

            var gamescope = gameservice.initGame(gamename);
            $scope.boardscope = gamescope;
        });
        
    };
});