;
const blackboxCellModel = require("../models/blackboxmodel.js");
const commonHelper = require("../lib/common.js");
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
        var moveDirection = {
            LEFT: 0,
            RIGHT: 1,
            TOP: 2,
            BOTTOM: 3
        };
        var LineType = {
            BLANK: 0,
            BOTTOM_LEFT: 6,
            BOTTOM_LEFT_RIGHT: 14,
            BOTTOM_RIGHT: 10,
            CROSS: 15,
            HORIZONTAL: 12,
            TOP_BOTTOM_LEFT: 7,
            TOP_BOTTOM_RIGHT: 11,
            TOP_LEFT: 5,
            TOP_LEFT_RIGHT: 13,
            TOP_RIGHT: 9,
            VERTICAL: 3,
        };
        var moveNext = function (cell, direction) {
            var x = cell.indexX;
            var y = cell.indexY;
            console.log(x + ", " + y);
            var nextCell = null;
            var newDirection = direction;
            if (direction == moveDirection.RIGHT) {
                if(blackbox.board[x][y + 1].isSysMarked)
                {
                    blackbox.board[x][y].lineType |= LineType.HORIZONTAL;
                    nextCell = blackbox.board[x][y + 1];
                }
                else if (blackbox.board[x - 1][y + 1].isSysMarked) {
                    blackbox.board[x][y].lineType |= LineType.BOTTOM_LEFT;
                    nextCell = blackbox.board[x + 1][y];
                    newDirection = moveDirection.BOTTOM;
                }
                else if (blackbox.board[x + 1][y + 1].isSysMarked) {
                    blackbox.board[x][y].lineType |= LineType.TOP_LEFT;
                    nextCell = blackbox.board[x - 1][y];
                    newDirection = moveDirection.TOP;
                }
                else {
                    blackbox.board[x][y].lineType |= LineType.HORIZONTAL;
                    nextCell = blackbox.board[x][y + 1];
                }
            }
            else if (direction == moveDirection.LEFT) {
                if(blackbox.board[x][y - 1].isSysMarked)
                {
                    blackbox.board[x][y].lineType |= LineType.HORIZONTAL;
                    nextCell = blackbox.board[x][y - 1];
                }
                else if (blackbox.board[x - 1][y - 1].isSysMarked) {
                    blackbox.board[x][y].lineType |= LineType.BOTTOM_RIGHT;
                    nextCell = blackbox.board[x + 1][y];
                    newDirection = moveDirection.BOTTOM;
                }
                else if (blackbox.board[x + 1][y - 1].isSysMarked) {
                    blackbox.board[x][y].lineType |= LineType.TOP_RIGHT;
                    nextCell = blackbox.board[x - 1][y];
                    newDirection = moveDirection.TOP;
                }
                else {
                    blackbox.board[x][y].lineType |= LineType.HORIZONTAL;
                    nextCell = blackbox.board[x][y - 1];
                }
            }
            else if (direction == moveDirection.TOP) {
                if(blackbox.board[x - 1][y].isSysMarked)
                {
                    blackbox.board[x][y].lineType |= LineType.VERTICAL;
                    nextCell = blackbox.board[x - 1][y];
                }
                else if (blackbox.board[x - 1][y - 1].isSysMarked) {
                    blackbox.board[x][y].lineType |= LineType.BOTTOM_RIGHT;
                    nextCell = blackbox.board[x][y + 1];
                    newDirection = moveDirection.RIGHT;
                }
                else if (blackbox.board[x - 1][y + 1].isSysMarked) {
                    blackbox.board[x][y].lineType |= LineType.BOTTOM_LEFT;
                    nextCell = blackbox.board[x][y - 1];
                    newDirection = moveDirection.LEFT;
                }
                else {
                    blackbox.board[x][y].lineType |= LineType.VERTICAL;
                    nextCell = blackbox.board[x - 1][y];
                }
            }
            else if (direction == moveDirection.BOTTOM) {
                if(blackbox.board[x + 1][y].isSysMarked)
                {
                    blackbox.board[x][y].lineType |= LineType.VERTICAL;
                    nextCell = blackbox.board[x + 1][y];
                }
                else if (blackbox.board[x + 1][y - 1].isSysMarked) {
                    blackbox.board[x][y].lineType |= LineType.TOP_RIGHT;
                    nextCell = blackbox.board[x][y + 1];
                    newDirection = moveDirection.RIGHT;
                }
                else if (blackbox.board[x + 1][y + 1].isSysMarked) {
                    blackbox.board[x][y].lineType |= LineType.TOP_LEFT;
                    nextCell = blackbox.board[x][y - 1];
                    newDirection = moveDirection.LEFT;
                }
                else {
                    blackbox.board[x][y].lineType |= LineType.VERTICAL;
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
            var direction = moveDirection.RIGHT;
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
            var direction = moveDirection.BOTTOM;
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
            var direction = moveDirection.LEFT;
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
            var direction = moveDirection.TOP;
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