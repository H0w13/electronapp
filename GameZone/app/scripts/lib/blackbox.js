;
const blackboxCellModel = require("../models/blackboxmodel.js");
const commonHelper = require("../lib/common.js");
const constant = require("../lib/consts.js");
module.exports = (function () {
    var blackbox = {
        board: [],
        showValidate: false
    };
    blackbox.init = function () {
        for (var i = 0; i < 10; i++) {
            var row = [];
            for (var j = 0; j < 10; j++) {
                row.push(blackboxCellModel(i, j));
            }
            blackbox.board.push(row);
        }
        //generate marks
        for (var i = 0; i < 5; i++) {
            var x = commonHelper.getRandomIntInclusive(1, 8);
            var y = commonHelper.getRandomIntInclusive(1, 8);
            while (blackbox.board[x][y].isSysMarked) {
                x = commonHelper.getRandomIntInclusive(1, 8);
                y = commonHelper.getRandomIntInclusive(1, 8);
            }
            blackbox.board[x][y].isSysMarked = true;
        }

        //laser tracer
        var edgeGroup = 1;
        var moveNext = function (cell, direction) {
            var x = cell.indexX;
            var y = cell.indexY;
            var nextCell = null;
            var newDirection = direction;
            if (direction == constant.MoveDirection.RIGHT) {
                if (blackbox.board[x - 1][y + 1].isSysMarked && blackbox.board[x + 1][y + 1].isSysMarked) {
                    blackbox.board[x][y].lineType = constant.LineType.RETURN_LEFT;
                    nextCell = blackbox.board[x][y - 1];
                    newDirection = constant.MoveDirection.RETURN_LEFT;
                }
                else if (blackbox.board[x][y + 1].isSysMarked) {
                    blackbox.board[x][y].lineType |= constant.LineType.HORIZONTAL;
                    nextCell = blackbox.board[x][y + 1];
                }
                else if (blackbox.board[x - 1][y + 1].isSysMarked) {
                    blackbox.board[x][y].lineType |= constant.LineType.BOTTOM_LEFT;
                    nextCell = blackbox.board[x + 1][y];
                    newDirection = constant.MoveDirection.BOTTOM;
                }
                else if (blackbox.board[x + 1][y + 1].isSysMarked) {
                    blackbox.board[x][y].lineType |= constant.LineType.TOP_LEFT;
                    nextCell = blackbox.board[x - 1][y];
                    newDirection = constant.MoveDirection.TOP;
                }
                else {
                    blackbox.board[x][y].lineType |= constant.LineType.HORIZONTAL;
                    nextCell = blackbox.board[x][y + 1];
                }
            }
            else if (direction == constant.MoveDirection.LEFT) {
                if (blackbox.board[x - 1][y - 1].isSysMarked && blackbox.board[x + 1][y - 1].isSysMarked) {
                    blackbox.board[x][y].lineType = constant.LineType.RETURN_RIGHT;
                    nextCell = blackbox.board[x][y + 1];
                    newDirection = constant.MoveDirection.RETURN_RIGHT;
                }
                else if (blackbox.board[x][y - 1].isSysMarked) {
                    blackbox.board[x][y].lineType |= constant.LineType.HORIZONTAL;
                    nextCell = blackbox.board[x][y - 1];
                }
                else if (blackbox.board[x - 1][y - 1].isSysMarked) {
                    blackbox.board[x][y].lineType |= constant.LineType.BOTTOM_RIGHT;
                    nextCell = blackbox.board[x + 1][y];
                    newDirection = constant.MoveDirection.BOTTOM;
                }
                else if (blackbox.board[x + 1][y - 1].isSysMarked) {
                    blackbox.board[x][y].lineType |= constant.LineType.TOP_RIGHT;
                    nextCell = blackbox.board[x - 1][y];
                    newDirection = constant.MoveDirection.TOP;
                }
                else {
                    blackbox.board[x][y].lineType |= constant.LineType.HORIZONTAL;
                    nextCell = blackbox.board[x][y - 1];
                }
            }
            else if (direction == constant.MoveDirection.TOP) {
                if (blackbox.board[x - 1][y - 1].isSysMarked && blackbox.board[x - 1][y + 1].isSysMarked) {
                    blackbox.board[x][y].lineType = constant.LineType.RETURN_BOTTOM;
                    nextCell = blackbox.board[x + 1][y];
                    newDirection = constant.MoveDirection.RETURN_BOTTOM;
                }
                else if (blackbox.board[x - 1][y + 1].isSysMarked) {
                    blackbox.board[x][y].lineType |= constant.LineType.VERTICAL;
                    nextCell = blackbox.board[x - 1][y];
                }
                else if (blackbox.board[x - 1][y - 1].isSysMarked) {
                    blackbox.board[x][y].lineType |= constant.LineType.BOTTOM_RIGHT;
                    nextCell = blackbox.board[x][y + 1];
                    newDirection = constant.MoveDirection.RIGHT;
                }
                else if (blackbox.board[x - 1][y + 1].isSysMarked) {
                    blackbox.board[x][y].lineType |= constant.LineType.BOTTOM_LEFT;
                    nextCell = blackbox.board[x][y - 1];
                    newDirection = constant.MoveDirection.LEFT;
                }
                else {
                    blackbox.board[x][y].lineType |= constant.LineType.VERTICAL;
                    nextCell = blackbox.board[x - 1][y];
                }
            }
            else if (direction == constant.MoveDirection.BOTTOM) {
                if (blackbox.board[x + 1][y + 1].isSysMarked && blackbox.board[x + 1][y - 1].isSysMarked) {
                    blackbox.board[x][y].lineType = constant.LineType.RETURN_TOP;
                    nextCell = blackbox.board[x - 1][y];
                    newDirection = constant.MoveDirection.RETURN_TOP;
                }
                else if (blackbox.board[x + 1][y].isSysMarked) {
                    blackbox.board[x][y].lineType |= constant.LineType.VERTICAL;
                    nextCell = blackbox.board[x + 1][y];
                }
                else if (blackbox.board[x + 1][y - 1].isSysMarked) {
                    blackbox.board[x][y].lineType |= constant.LineType.TOP_RIGHT;
                    nextCell = blackbox.board[x][y + 1];
                    newDirection = constant.MoveDirection.RIGHT;
                }
                else if (blackbox.board[x + 1][y + 1].isSysMarked) {
                    blackbox.board[x][y].lineType |= constant.LineType.TOP_LEFT;
                    nextCell = blackbox.board[x][y - 1];
                    newDirection = constant.MoveDirection.LEFT;
                }
                else {
                    blackbox.board[x][y].lineType |= constant.LineType.VERTICAL;
                    nextCell = blackbox.board[x + 1][y];
                }
            }
            else if (direction == constant.MoveDirection.RETURN_LEFT) {
                blackbox.board[x][y].lineType = constant.LineType.RETURN_HORIZONTAL | (blackbox.board[x][y].lineType & constant.LineType.VERTICAL);
                nextCell = blackbox.board[x][y - 1];
            }
            else if (direction == constant.MoveDirection.RETURN_RIGHT) {
                blackbox.board[x][y].lineType = constant.LineType.RETURN_HORIZONTAL | (blackbox.board[x][y].lineType & constant.LineType.VERTICAL);
                nextCell = blackbox.board[x][y + 1];
            }
            else if (direction == constant.MoveDirection.RETURN_TOP) {
                blackbox.board[x][y].lineType = constant.LineType.RETURN_VERTICAL | (blackbox.board[x][y].lineType & constant.LineType.HORIZONTAL);
                nextCell = blackbox.board[x - 1][y];
            }
            else if (direction == constant.MoveDirection.RETURN_BOTTOM) {
                blackbox.board[x][y].lineType = constant.LineType.RETURN_VERTICAL | (blackbox.board[x][y].lineType & constant.LineType.HORIZONTAL);
                nextCell = blackbox.board[x + 1][y];
            }
            return [nextCell, newDirection];
        };
        //left
        for (var i = 1; i < 9; i++) {
            if (blackbox.board[i][1].isSysMarked) {
                blackbox.board[i][0].edgeText = "H";
                continue;
            }
            else if (blackbox.board[i - 1][1].isSysMarked || blackbox.board[i + 1][1].isSysMarked) {
                blackbox.board[i][0].edgeText = "R";
                continue;
            }
            else if (blackbox.board[i][0].edgeText != "")
                continue;
            var isEnd = false;
            var xIndex = i;
            var yIndex = 1;
            var direction = constant.MoveDirection.RIGHT;
            while (!isEnd) {
                var value = moveNext(blackbox.board[xIndex][yIndex], direction);
                if (value[0] == null)
                    isEnd = true;
                else if (value[0].indexX == 0 || value[0].indexX == 9 || value[0].indexY == 0 || value[0].indexY == 9) {
                    isEnd = true;
                    if (value[0].indexX == i && value[0].indexY == 0)
                        blackbox.board[i][0].edgeText = "R";
                    else {
                        blackbox.board[i][0].edgeText = edgeGroup.toString();
                        blackbox.board[value[0].indexX][value[0].indexY].edgeText = edgeGroup.toString();
                        edgeGroup++;
                    }
                }
                else if (value[0].isSysMarked) {
                    isEnd = true;
                    blackbox.board[i][0].edgeText = "H";
                }
                else {
                    direction = value[1]
                    xIndex = value[0].indexX;
                    yIndex = value[0].indexY;
                }
            }
        }
        //top
        for (var i = 1; i < 9; i++) {
            if (blackbox.board[1][i].isSysMarked) {
                blackbox.board[0][i].edgeText = "H";
                continue;
            }
            else if (blackbox.board[1][i - 1].isSysMarked || blackbox.board[1][i + 1].isSysMarked) {
                blackbox.board[0][i].edgeText = "R";
                continue;
            }
            else if (blackbox.board[0][i].edgeText != "")
                continue;
            var isEnd = false;
            var xIndex = 1;
            var yIndex = i;
            var direction = constant.MoveDirection.BOTTOM;
            while (!isEnd) {
                var value = moveNext(blackbox.board[xIndex][yIndex], direction);
                if (value[0] == null)
                    isEnd = true;
                else if (value[0].indexX == 0 || value[0].indexX == 9 || value[0].indexY == 0 || value[0].indexY == 9) {
                    isEnd = true;
                    if (value[0].indexX == 0 && value[0].indexY == i)
                        blackbox.board[0][i].edgeText = "R";
                    else {
                        blackbox.board[0][i].edgeText = edgeGroup.toString();
                        blackbox.board[value[0].indexX][value[0].indexY].edgeText = edgeGroup.toString();
                        edgeGroup++;
                    }
                }
                else if (value[0].isSysMarked) {
                    isEnd = true;
                    blackbox.board[0][i].edgeText = "H";
                }
                else {
                    direction = value[1]
                    xIndex = value[0].indexX;
                    yIndex = value[0].indexY;
                }
            }
        }
        //right
        for (var i = 1; i < 9; i++) {
            if (blackbox.board[i][8].isSysMarked) {
                blackbox.board[i][9].edgeText = "H";
                continue;
            }
            else if (blackbox.board[i - 1][8].isSysMarked || blackbox.board[i + 1][8].isSysMarked) {
                blackbox.board[i][9].edgeText = "R";
                continue;
            }
            else if (blackbox.board[i][9].edgeText != "")
                continue;
            var isEnd = false;
            var xIndex = i;
            var yIndex = 8;
            var direction = constant.MoveDirection.LEFT;
            while (!isEnd) {
                var value = moveNext(blackbox.board[xIndex][yIndex], direction);
                if (value[0] == null)
                    isEnd = true;
                else if (value[0].indexX == 0 || value[0].indexX == 9 || value[0].indexY == 0 || value[0].indexY == 9) {
                    isEnd = true;
                    if (value[0].indexX == i && value[0].indexY == 9)
                        blackbox.board[i][9].edgeText = "R";
                    else {
                        blackbox.board[i][9].edgeText = edgeGroup.toString();
                        blackbox.board[value[0].indexX][value[0].indexY].edgeText = edgeGroup.toString();
                        edgeGroup++;
                    }
                }
                else if (value[0].isSysMarked) {
                    isEnd = true;
                    blackbox.board[i][9].edgeText = "H";
                }
                else {
                    direction = value[1]
                    xIndex = value[0].indexX;
                    yIndex = value[0].indexY;
                }
            }
        }
        //bottom
        for (var i = 1; i < 9; i++) {
            if (blackbox.board[8][i].isSysMarked) {
                blackbox.board[9][i].edgeText = "H";
                continue;
            }
            else if (blackbox.board[8][i - 1].isSysMarked || blackbox.board[8][i + 1].isSysMarked) {
                blackbox.board[9][i].edgeText = "R";
                continue;
            }
            else if (blackbox.board[9][i].edgeText != "")
                continue;
            var isEnd = false;
            var xIndex = 8;
            var yIndex = i;
            var direction = constant.MoveDirection.TOP;
            while (!isEnd) {
                var value = moveNext(blackbox.board[xIndex][yIndex], direction);
                if (value[0] == null)
                    isEnd = true;
                else if (value[0].indexX == 0 || value[0].indexX == 9 || value[0].indexY == 0 || value[0].indexY == 9) {
                    isEnd = true;
                    if (value[0].indexX == 9 && value[0].indexY == i)
                        blackbox.board[9][i].edgeText = "R";
                    else {
                        blackbox.board[9][i].edgeText = edgeGroup.toString();
                        blackbox.board[value[0].indexX][value[0].indexY].edgeText = edgeGroup.toString();
                        edgeGroup++;
                    }
                }
                else if (value[0].isSysMarked) {
                    isEnd = true;
                    blackbox.board[9][i].edgeText = "H";
                }
                else {
                    direction = value[1]
                    xIndex = value[0].indexX;
                    yIndex = value[0].indexY;
                }
            }
        }
    };
    blackbox.click = function (cell) {
        if (cell.cellType == constant.CellType.EDGE) {
            cell.hideEdgeText = false;
            if (cell.edgeText != "R" && cell.edgeText != "H") {
                for (var i = 0; i < 10; i++) {
                    for (var j = 0; j < 10; j++) {
                        if (blackbox.board[i][j].cellType == constant.CellType.EDGE) {
                            if (blackbox.board[i][j].edgeText == cell.edgeText
                                && i != cell.indexX && j != cell.indexY) {
                                blackbox.board[i][j].hideEdgeText = false;
                                return;
                            }
                        }
                    }
                }
            }
        }
        else if (cell.cellType == constant.CellType.CELL) {
            cell.isUserMarked = !cell.isUserMarked;
            var bgp = /blackbox-cell-bg-\w+/g;
            if (cell.isUserMarked) {
                cell.style = cell.style.replace(bgp, "blackbox-cell-bg-marked");
            }
            else
                cell.style = cell.style.replace(bgp, "blackbox-cell-bg-blank");

            var count = 0;
            for (var i = 1; i < 9; i++) {
                for (var j = 1; j < 9; j++) {
                    if (blackbox.board[i][j].cellType == constant.CellType.CELL && blackbox.board[i][j].isUserMarked) {
                        count++;
                    }
                }
            }
            blackbox.showValidate = count >= 5;
        }
    };
    blackbox.validate = function () {
        var bgp = /blackbox-cell-bg-\w+/g;
        for (var i = 1; i < 9; i++) {
            for (var j = 1; j < 9; j++) {
                if (blackbox.board[i][j].cellType == constant.CellType.CELL) {
                    if (blackbox.board[i][j].isUserMarked && blackbox.board[i][j].isSysMarked)
                        continue;                    
                    else if (blackbox.board[i][j].isUserMarked)
                        blackbox.board[i][j].style = blackbox.board[i][j].style.replace(bgp, "blackbox-cell-bg-wrongmarked");
                    else if (blackbox.board[i][j].isSysMarked)
                        blackbox.board[i][j].style = blackbox.board[i][j].style.replace(bgp, "blackbox-cell-bg-redmarked");
                }
            }
        }
    };
    blackbox.init();
    return blackbox;
})();