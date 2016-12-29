;
module.exports = function (x, y) { 
    var obj = {
        indexX: x,
        indexY: y
    };
    var style = "";
    if((x==0&&y==0) || (x==0&&y==9) || (x==9&&y==0) || (x==9&&y==9))
        style += "blackbox-cell-corner ";
    else if(x == 0 || y == 0 || x == 9 || y == 9)
        style += "blackbox-cell-edge ";
    else
        style += "blackbox-cell ";
    obj.style = style;
    return obj;
};