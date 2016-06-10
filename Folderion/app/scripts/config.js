requirejs.config({
  baseUrl: 'scripts',
  paths: {
    jquery: 'external/jquery.all',
    angular: 'external/angular',
    d3: 'external/d3',
  },
  shim: {
    angular: {
      exports: 'angular'
    }
  }
});
requirejs(['folderion'], function(folderion) {});
