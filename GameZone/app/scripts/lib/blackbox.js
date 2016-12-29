;
const blackboxCellModel = require("../models/blackboxmodel.js");
module.exports = (function(){
    var blackbox = {
        board: []
    };
    blackbox.init = function(){
        for(var i = 0; i < 10; i++)
        {
            var row = [];
            for(var j = 0; j < 10; j++)
            {
                row.push(blackboxCellModel(i, j));
            }
            blackbox.board.push(row);
        }
    };
    blackbox.showLines = function(){};

    blackbox.init();
    return blackbox;
})();