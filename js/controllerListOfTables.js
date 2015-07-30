/**
 * Created by sergiy on 21.05.15.
 */

FTN.config(['$routeProvider',
 function($routeProvider) {
  $routeProvider.
      when('/listOfTables', {
       templateUrl: 'template/listOfTables.html',
       controller: 'listOfTables'
      });
 }]);

FTNControllers.controller('listOfTables', ['$scope', '$http',
    function($scope, $http) {

        console.log("listOfTables was caused");

        $http.jsonp('http://freethenumbers.com/api.php?action=getListOfAbaxes&type=table&callback=JSON_CALLBACK&_ftnAccessToken=' + amplify.store("sessionToken")).

            success(function(data, status, headers, config) {

                $scope.tables = data.items;
                console.log(data.items);

         }).
         error(function(data, status, headers, config) {


         });

    }]);
