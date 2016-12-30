;
module.exports = (function () {
    var constant = {};
    constant.MoveDirection = {
        LEFT: 0,
        RIGHT: 1,
        TOP: 2,
        BOTTOM: 3,
        RETURN_LEFT: 4,
        RETURN_RIGHT: 5,
        RETURN_TOP: 6,
        RETURN_BOTTOM: 7
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
        RETURN_LEFT: 4,
        RETURN_RIGHT: 8,
        RETURN_TOP: 1,
        RETURN_BOTTOM: 2,
        RETURN_HORIZONTAL: 17,
        RETURN_VERTICAL: 18
    };
    constant.CellType = {
        CORNER_BUTTON: "CORNER_BUTTON",
        CORNER: "CORNER",
        EDGE: "EDGE",
        CELL: "CELL",
    };
    return constant;
})();