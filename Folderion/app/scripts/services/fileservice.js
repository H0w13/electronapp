define(["folderion"], function(folderion) {
	folderion.service('fileservice', function() {		

		this.getSubItems = function(path, callback) {
			requirejs(["common/io"], function(io){
				io.getDirectorySubItems(path, callback);
			});
		};
	});
});
