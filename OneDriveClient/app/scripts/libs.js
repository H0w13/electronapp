// window.nodeRequire = require;
// delete window.require;
// delete window.exports;
// delete window.module;

requirejs.config({
  baseUrl: 'scripts',
  paths: {
    jquery: 'external/jquery.min',
    angular: 'external/angular',
    d3: 'external/d3',
    punycode: 'external/punycode',
    metro: 'external/metro.min'
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
