; onedriveclient.service('onedriveservice', function () {

	this.getFolder = function (url, callback) {
		var fileModel = require("./scripts/models/file.js");
		$.ajax({
			url: url,
			dataType: 'json',
			success: function (data) {
				if (data) {
					var items = [];
					var children = data.children || data.value;
					if (children && children.length > 0) {
						$.each(children, function (i, item) {
							var it = fileModel(item.name, "", "", item.size, item.createdDateTime, item.folder !== undefined);							
							it.updateStatus(0);							
							if (item.file) {
								it.downloadUrl = item['@content.downloadUrl'];
								it.hashcode = item.file.hashes;
							}
							items.push(it);
						});
					}
					callback(items);
				}
			}
		});
	};

	this.downloadFile = function (url, stream, callback) {
		var https = require('https');
		https.get(url, function (response) {
			response.on('data', function (data) {
				stream.write(data);
			}).on('end', function () {
				stream.end();
				callback();
			});
		});
	};
});