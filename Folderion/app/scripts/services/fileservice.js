angular.service('fileservice', function () {
	var fs = require('fs');

	var fObjHelper = {
		create: function (name, path, stats) {
			var fObj = {
				name: name,
				path: path,
				size: stats.size,
				createDate: stats.ctime,
				updateDate: stats.mtime,
				isDirectory: stats.isDirectory()
			};
			return fObj;
		},
		combinePath: function (filename, directory) {
			if (directory.startsWith('/')) {
				//guess it is posix system
				if (directory.endsWith('/'))
					return directory + filename;
				else
					return directory + '/' + filename;
			}
			else {
				//guess it is nt system
				return directory + '\\' + filename;
			}
		}
	};

	this.getSubItems = function (path, callback) {
		
	};
});