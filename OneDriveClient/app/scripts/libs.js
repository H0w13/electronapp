requirejs.config({
  baseUrl: 'scripts',
  paths: {
    jquery: 'external/jquery.all',
    angular: 'external/angular',
    d3: 'external/d3',
    punycode: 'external/punycode'
  },
  shim: {
    angular: {
      exports: 'angular'
    },
    jquery:{
      exports: 'jquery'
    }, 
    punycode:{
      exports: 'punycode'
    }
  }
});
requirejs(['onedriveclient'], function(onedriveclient) {});