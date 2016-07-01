define(["onedriveclient"], function(onedriveclient) {
	onedriveclient.service('fileservice', function() {		

		this.getSubItems = function(path, callback) {
			requirejs(["common/io"], function(io){
				io.getDirectorySubItems(path, callback);
			});
		};
	});
});
