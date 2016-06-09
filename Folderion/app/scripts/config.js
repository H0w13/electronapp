requirejs.config({
  baseUrl: '/script',
  paths: {
    jquery: 'external/jquery/jquery.',
    angular: 'external/angular/angular',
    d3: 'external/d3/d3',
    ztree: 'external/ztree/jquery.ztree.core-3.5',
  },
  shim: {
      angular : { exports : 'angular'}
  }
});