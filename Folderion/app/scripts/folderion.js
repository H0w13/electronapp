define('folderion', ['angular'], function(angular) {
  'use strict';
  var app = angular.module('folderion', []);
  return app;
});

//services
requirejs(['services/fileservice','services/chartservice']);
//controllers
var controllers = [
  "root",
  "board",
  "operation"
];
requirejs(controllers.map(function(item, i){
  return 'controllers/' + item + 'controller';
}));
