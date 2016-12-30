;
const blackboxCellModel = require("../models/blackboxmodel.js");
const commonHelper = require("../lib/common.js");
const constant = require("../lib/consts.js");
module.exports = (function () {
    var blackbox = {
        board: []
    };
    blackbox.init = function () {
        for (var i = 0; i < 10; i++) {
            var row = [];
            for (var j = 0; j < 10; j++) {
                row.push(blackboxCellModel(i, j));
            }
            blackbox.board.push(row);
        }
        //generate puzzle
        
        var moveNext = function (cell, direction) {
            var x = cell.indexX;
            var y = cell.indexY;
            var nextCell = null;
            var newDirection = direction;
            if (direction == constant.MoveDirection.RIGHT) {
                if(blackbox.board[x][y + 1].isSysMarked)
                {
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
                if(blackbox.board[x][y - 1].isSysMarked)
                {
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
                if(blackbox.board[x - 1][y].isSysMarked)
                {
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
                if(blackbox.board[x + 1][y].isSysMarked)
                {
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
            blackbox.board[x][y].updateStyle();
            return [nextCell, newDirection];
        };

        for (var i = 0; i < 5; i++) {
            var x = commonHelper.getRandomIntInclusive(1, 8);
            var y = commonHelper.getRandomIntInclusive(1, 8);
            while (blackbox.board[x][y].isSysMarked) {
                x = commonHelper.getRandomIntInclusive(1, 8);
                y = commonHelper.getRandomIntInclusive(1, 8);
            }
            blackbox.board[x][y].isSysMarked = true;
            blackbox.board[x][y].updateStyle();
        }
        for (var i = 1; i < 9; i++) {
            var isEnd = false;
            var xIndex = i;
            var yIndex = 1;
            var direction = constant.MoveDirection.RIGHT;
            while (!isEnd) {
                var value = moveNext(blackbox.board[xIndex][yIndex], direction);
                if (value[0] == null)
                    isEnd = true;
                else if (value[0].indexX == 0 || value[0].indexX == 9 || value[0].indexY == 0 || value[0].indexY == 9)
                    isEnd = true;
                else if (value[0].isSysMarked)
                    isEnd = true;
                else {
                    direction = value[1]
                    xIndex = value[0].indexX;
                    yIndex = value[0].indexY;
                }
            }
        } 
        for (var i = 1; i < 9; i++) {
            var isEnd = false;
            var xIndex = 1;
            var yIndex = i;
            var direction = constant.MoveDirection.BOTTOM;
            while (!isEnd) {
                var value = moveNext(blackbox.board[xIndex][yIndex], direction);
                if (value[0] == null)
                    isEnd = true;
                else if (value[0].indexX == 0 || value[0].indexX == 9 || value[0].indexY == 0 || value[0].indexY == 9)
                    isEnd = true;
                else if (value[0].isSysMarked)
                    isEnd = true;
                else {
                    direction = value[1]
                    xIndex = value[0].indexX;
                    yIndex = value[0].indexY;
                }
            }
        } 
        for (var i = 1; i < 9; i++) {
            var isEnd = false;
            var xIndex = i;
            var yIndex = 8;
            var direction = constant.MoveDirection.LEFT;
            while (!isEnd) {
                var value = moveNext(blackbox.board[xIndex][yIndex], direction);
                if (value[0] == null)
                    isEnd = true;
                else if (value[0].indexX == 0 || value[0].indexX == 9 || value[0].indexY == 0 || value[0].indexY == 9)
                    isEnd = true;
                else if (value[0].isSysMarked)
                    isEnd = true;
                else {
                    direction = value[1]
                    xIndex = value[0].indexX;
                    yIndex = value[0].indexY;
                }
            }
        } 
        for (var i = 1; i < 9; i++) {
            var isEnd = false;
            var xIndex = 8;
            var yIndex = i;
            var direction = constant.MoveDirection.TOP;
            while (!isEnd) {
                var value = moveNext(blackbox.board[xIndex][yIndex], direction);
                if (value[0] == null)
                    isEnd = true;
                else if (value[0].indexX == 0 || value[0].indexX == 9 || value[0].indexY == 0 || value[0].indexY == 9)
                    isEnd = true;
                else if (value[0].isSysMarked)
                    isEnd = true;
                else {
                    direction = value[1]
                    xIndex = value[0].indexX;
                    yIndex = value[0].indexY;
                }
            }
        }        
    };
    blackbox.showLines = function () {

    };
    blackbox.init();
    return blackbox;
})();