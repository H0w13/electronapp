define('folderion', ['angular'], function(angular) {
  'use strict';
  var app = angular.module('folderion', []);
  return app;
});

requirejs(['services/fileservice', 'controllers/OperationController'], function(
  controller) {});
