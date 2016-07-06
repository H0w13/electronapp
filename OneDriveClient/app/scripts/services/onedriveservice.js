;
onedriveclient.service('onedriveservice', function () {

	var updateSize = function (size) {
		if (size < 1024)
			return size + "B";
		else if (size < 1024 * 1024)
			return Math.round(size / 1024) + "K";
		else
			return Math.round(size / (1024 * 1024)) + "M";
	};

	this.getFolder = function (url, callback) {
		var https = require('https');
		var request = https.get(url, function (response) {
			response.on('data', (data) => {
				if (data) {
					console.log(data);
					var items = [];
					var children = data.children || data.value;
					if (children && children.length > 0) {
						$.each(children, function (i, item) {
							var it = {
								name: item.name,
								isDirectory: item.folder,
								createDate: item.createdDateTime,
								size: item.size,
								displaySize: updateSize(item.size),
								isLoaded: false,
								path: ""
							};
							if (item.file) {
								it.downloadUrl = item['@content.downloadUrl'];
								it.hashcode = item.file.hashes;
							}
							items.push(it);
						});
					}
					callback(items);
				}
			});
		});
	};
});