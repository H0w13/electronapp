define(["onedriveclient"], function (onedriveclient) {
	onedriveclient.service('onedriveservice', function () {
		this.getFolder = function (url, callback) {
			requirejs(["jquery"], function ($) {
                $.ajax({
					url: url,
					dataType: 'json',
					success: function (data) {
						if (data) {
							var items = [];
							var children = data.children || data.value;
							if (children && children.length > 0) {
								$.each(children, function (i, item) {
									var it = {
										name: item.name,
										isDirectory: item.folder,
										createDate: item.createdDateTime,
										size: item.size
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
									size: data.size
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