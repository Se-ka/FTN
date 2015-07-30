/**
 * Created by sergiy on 30.07.15.
 */
'use strict';

FTNControllers.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/newTable', {
                templateUrl: 'template/newTable.html',
                controller: 'newTable'
            });
    }]);

FTNControllers.controller('newTable', ['$scope', '$location',
    function($scope, $location) {

    }]);