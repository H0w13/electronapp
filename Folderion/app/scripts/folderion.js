define('folderion', ['angular'], function(angular) {
  'use strict';
  var app = angular.module('folderion', []);
  return app;
});

//services
requirejs(['services/fileservice','services/chartservice']);
//controllers
requirejs(['controllers/operationcontroller']);
