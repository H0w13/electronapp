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
    obj.isUserMarked = false;
    obj.edgeText = "";
    obj.lineType = 0;
    obj.click = function () {

    };
    obj.updateStyle = function () {
        if (obj.cellType == constant.CellType.CELL) {
            var bgp = /blackbox-cell-bg-\w+/g;
            if (obj.isSysMarked) {
                obj.style = obj.style.replace(bgp, "blackbox-cell-bg-marked");
            }
            else {
                if (obj.lineType == constant.LineType.BLANK)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-blank");
                else if (obj.lineType == constant.LineType.BOTTOM_LEFT)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-bottomleft");
                else if (obj.lineType == constant.LineType.BOTTOM_LEFT_RIGHT)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-bottomleftright");
                else if (obj.lineType == constant.LineType.BOTTOM_RIGHT)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-bottomright");
                else if (obj.lineType == constant.LineType.CROSS)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-cross");
                else if (obj.lineType == constant.LineType.HORIZONTAL)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-horizontal");
                else if (obj.lineType == constant.LineType.TOP_BOTTOM_LEFT)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-topbottomleft");
                else if (obj.lineType == constant.LineType.TOP_BOTTOM_RIGHT)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-topbottomright");
                else if (obj.lineType == constant.LineType.TOP_LEFT)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-topleft");
                else if (obj.lineType == constant.LineType.TOP_LEFT_RIGHT)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-topleftright");
                else if (obj.lineType == constant.LineType.TOP_RIGHT)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-topright");
                else if (obj.lineType == constant.LineType.VERTICAL)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-vertical");
                else if (obj.lineType == constant.LineType.RETURN_TOP)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-returntop");
                else if (obj.lineType == constant.LineType.RETURN_BOTTOM)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-returnbottom");
                else if (obj.lineType == constant.LineType.RETURN_LEFT)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-returnleft");
                else if (obj.lineType == constant.LineType.RETURN_RIGHT)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-returnright");
                else if (obj.lineType == constant.LineType.RETURN_HORIZONTAL)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-returnhorizontal");
                else if (obj.lineType == constant.LineType.RETURN_VERTICAL)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-returnvertical");
                else if (((obj.lineType & constant.LineType.RETURN_HORIZONTAL) == constant.LineType.RETURN_HORIZONTAL)
                    && ((obj.lineType & constant.LineType.VERTICAL) == constant.LineType.VERTICAL))
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-returnhorizontalvertical");
                else if (((obj.lineType & constant.LineType.RETURN_VERTICAL) == constant.LineType.RETURN_VERTICAL)
                    && ((obj.lineType & constant.LineType.HORIZONTAL) == constant.LineType.HORIZONTAL))                    
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-returnverticalhorizontal");
            }
        }
    };
    return obj;
};