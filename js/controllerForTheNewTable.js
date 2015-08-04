/**
 * Created by sergiy on 30.07.15.
 */
'use strict';

FTN.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/newTable', {
                templateUrl: 'template/newTable.html',
                controller: 'newTable'
            });
    }]);

FTNControllers.controller('newTable', ['$scope', '$location', '$http',
    function($scope, $location, $http) {

        $scope.return = function (){
            $location.url('/listOfTables');
            //$scope.$apply();
            console.log('button "Return" a triggered');
        };

        $scope.save = function () {

            $http.jsonp('http://freethenumbers.com/api.php?' +
                'action=getListOfAbaxes&type=table&callback=JSON_CALLBACK&_ftnAccessToken='
                + amplify.store("sessionToken")).

                success(function(data) {
                    $location.url('/listOfTables');
                    $scope.tables = data.items;
                    amplify.store('ListOfTables', data.items);
                }).

                error(function(data) {
                });

        console.log('button "Save" was triggered');

        };





    }]);