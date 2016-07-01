define('onedriveclient', ['angular'], function(angular) {
  'use strict';
  var app = angular.module('onedriveclient', []);
  return app;
});

//services
requirejs(['services/fileservice','services/chartservice', 'services/oauthservice']);
//controllers
var controllers = [
  "root",
  "board",
  "operation",
  "tree"
];
requirejs(controllers.map(function(item, i){
  return 'controllers/' + item + 'controller';
}));
