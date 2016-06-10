requirejs.config({
  baseUrl: 'scripts',
  paths: {
    jquery: 'external/jquery',
    angular: 'external/angular',
    d3: 'external/d3',
    ztree: 'external/jquery.ztree.core-3.5',
  },
  shim: {
    angular: {
      exports: 'angular'
    }
  }
});
requirejs(['folderion'], function(folderion) {});
