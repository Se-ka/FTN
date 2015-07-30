'use strict';


FTN.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
        otherwise({
          redirectTo: '/login'
        });
  }]);
