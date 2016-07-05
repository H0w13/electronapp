define(["onedriveclient"], function (onedriveclient) {
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
			requirejs(["jquery"], function ($) {
                $.ajax({
					url: url,
					dataType: 'json',
					success: function (data) {
						if (data) {
							var items = [];
							var children = data.children || data.value;
							if (children) {
								$.each(children, function (i, item) {
									var it = {
										name: item.name,
										isDirectory: item.folder,
										createDate: item.createdDateTime,
										size: item.size,
										displaySize: updateSize(item.size),
										isLoaded: false,
										path: "",
										hashcode: item.hashes
									};
									items.push(it);
								});
							}
							else {
								var it = {
									name: data.name,
									isDirectory: data.folder,
									downloadUrl: data['@content.downloadUrl'],
									createDate: data.createdDateTime,
									size: data.size,
									displaySize: updateSize(data.size),
									isLoaded: false,
									path: "",
									hashcode: data.hashes
								};
								items.push(it);
							}
							callback(items);
						}
					}
				});
            });
		};
	});
});