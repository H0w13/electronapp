;
const constant = require("../lib/consts.js");
module.exports = function (x, y) {
    var obj = {
        indexX: x,
        indexY: y
    };
    var style = "";
    var cellType = constant.CellType.CELL;
    if ((x == 0 && y == 0) || (x == 0 && y == 9) || (x == 9 && y == 0) || (x == 9 && y == 9)) {
        style += "blackbox-cell-corner ";
        if (x == 0 && y == 0)
            cellType = constant.CellType.CORNER_BUTTON;
        else
            cellType = constant.CellType.CORNER;
    }
    else if (x == 0 || y == 0 || x == 9 || y == 9) {
        style += "blackbox-cell-edge ";
        cellType = constant.CellType.EDGE;
    }
    else {
        style += "blackbox-cell blackbox-cell-bg-blank ";
    }
    obj.style = style;
    obj.cellType = cellType;
    obj.isSysMarked = false;
    obj.hideMark = true;
    obj.isUserMarked = false;
    obj.edgeText = "";
    obj.hideEdgeText = true;
    obj.lineType = 0;
    obj.showMark = function () {
        if (obj.cellType == constant.CellType.CELL) {
            var bgp = /blackbox-cell-bg-\w+/g;
            if (obj.isSysMarked) {
                obj.style = obj.style.replace(bgp, "blackbox-cell-bg-marked");
            }
        }
    };
    return obj;
};