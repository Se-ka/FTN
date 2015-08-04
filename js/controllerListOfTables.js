/**
 * Created by sergiy on 21.05.15.
 */
// Configuring Router to call this controller in case of hash is equal to "/listOfTables"
FTN.config(['$routeProvider',function ($routeProvider) {
    $routeProvider.when('/listOfTables', {
        templateUrl: 'template/listOfTables.html',
        controller: 'listOfTables'
    });
}]);

// Creating controller
FTNControllers.controller('listOfTables', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    // Controller renders HTML code immediately, and the list of tables
    // in html code will be empty until we get list of tables from the server
    // But we can render tables which were saved in previous controller's call (see code below)
    // These tables are saved in localStorage, so let's check if we have some tables in localStorage

    $scope.tables = amplify.store('ListOfTables');

    // Now we send http request to get list of tables and sign this request with sessionToken
    $http.jsonp('http://freethenumbers.com/api.php?' +
        'action=getListOfAbaxes&type=table&callback=JSON_CALLBACK&_ftnAccessToken='
        + amplify.store("sessionToken")).

        // we got an response !
        success(function (data) {
            // save tables into $scope to pass them into html
            $scope.tables = data.items;
            // and let's save currrent list of tables into localStorage to let them render next time
            // before we send http request
            amplify.store('ListOfTables', data.items);

        }).
        // damn, some error happened, let's handle that
        error(function (data) {
        });

    // this is a click event listener for the button "Create"
    // which should open new UI and let user to create new table
    $scope.createTheNewTable = function () {
        $location.url('/newTable');
        //$scope.$apply();
        console.log('button "Create" was triggered');
    };

    // this is a click event listener for the button "Logout"
    // here we have to clear sessionToken and redirect user to "Login" page
    $scope.logout = function () {
        amplify.store("sessionToken", null);
        $location.url('/login');
        //$scope.$apply();
    };

    $scope.deleteTheTable = function () {

        $scope.allCheckboxes = $("[name = 'nameOfTable'] input:checkbox:checked")
        .map(function() {
            return this.value;
        }).get();

        //$scope.allCheckboxes = $("[name = 'nameOfTable'] input:checkbox:enabled");
        console.log($scope.allCheckboxes);

        //var notChecked = allCheckboxes.not(':checked');
        //allCheckboxes.removeAttr('checked');
        //notChecked.attr('checked', 'checked');

      if (2) {}
    };
}]);