;
module.exports = (function () {
    var constant = {};
    constant.MoveDirection = {
        LEFT: 0,
        RIGHT: 1,
        TOP: 2,
        BOTTOM: 3
    };
    constant.LineType = {
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
    constant.CellType = {
        CORNER_BUTTON: "CORNER_BUTTON",
        CORNER: "CORNER",
        EDGE: "EDGE",
        CELL: "CELL",
    };
    return constant;
})();