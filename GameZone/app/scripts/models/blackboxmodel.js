;
module.exports = function (x, y) {
    var CellType = {
        CORNER_BUTTON: "CORNER_BUTTON",
        CORNER: "CORNER",
        EDGE: "EDGE",
        CELL: "CELL",
    };
    var LinePosition = {
        TOP: 1,
        BOTTOM: 2,
        LEFT: 4,
        RIGHT: 8
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

    var obj = {
        indexX: x,
        indexY: y
    };
    var style = "";
    var cellType = CellType.CELL;
    if ((x == 0 && y == 0) || (x == 0 && y == 9) || (x == 9 && y == 0) || (x == 9 && y == 9)) {
        style += "blackbox-cell-corner ";
        if (x == 0 && y == 0)
            cellType = CellType.CORNER_BUTTON;
        else
            cellType = CellType.CORNER;
    }
    else if (x == 0 || y == 0 || x == 9 || y == 9) {
        style += "blackbox-cell-edge ";
        cellType = CellType.EDGE;
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
        if (obj.cellType == CellType.CELL) {
            var bgp = /blackbox-cell-bg-\w+/g;
            if (obj.isSysMarked) {
                obj.style = obj.style.replace(bgp, "blackbox-cell-bg-marked");
            }
            else {
                if (obj.lineType == LineType.BLANK)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-blank");
                else if (obj.lineType == LineType.BOTTOM_LEFT)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-bottomleft");
                else if (obj.lineType == LineType.BOTTOM_LEFT_RIGHT)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-bottomleftright");
                else if (obj.lineType == LineType.BOTTOM_RIGHT)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-bottomright");
                else if (obj.lineType == LineType.CROSS)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-cross");
                else if (obj.lineType == LineType.HORIZONTAL)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-horizontal");
                else if (obj.lineType == LineType.TOP_BOTTOM_LEFT)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-topbottomleft");
                else if (obj.lineType == LineType.TOP_BOTTOM_RIGHT)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-topbottomright");
                else if (obj.lineType == LineType.TOP_LEFT)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-topleft");
                else if (obj.lineType == LineType.TOP_LEFT_RIGHT)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-topleftright");
                else if (obj.lineType == LineType.TOP_RIGHT)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-topright");
                else if (obj.lineType == LineType.VERTICAL)
                    obj.style = obj.style.replace(bgp, "blackbox-cell-bg-vertical");
            }
        }
    };
    return obj;
};