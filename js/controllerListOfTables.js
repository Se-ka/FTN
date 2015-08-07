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

    $scope.varEventListener = function (event) {
        if ( $('[name=nameOfTable] input:checkbox:checked').length != 0 && event.keyCode==13) {
            console.log('111111111');
            $scope.deleteTheTable();
        }
        if ( $('[name=nameOfTable] input:checkbox:checked').length == 0 && event.keyCode==13) {
            console.log('jhjkgjk');
            $scope.createTheNewTable();
        }
    };

    document.body.addEventListener('keyup', $scope.varEventListener);


    // Controller renders HTML code immediately, and the list of tables
    // in html code will be empty until we get list of tables from the server
    // But we can render tables which were saved in previous controller's call (see code below)
    // These tables are saved in localStorage, so let's check if we have some tables in localStorage

    $scope.tables = amplify.store('ListOfTables');

    var renderingListTable = function () {

    // Now we send http request to get list of tables and sign this request with sessionToken
    $http.jsonp('http://freethenumbers.com/api.php?' +
        'action=getListOfAbaxes&type=table&callback=JSON_CALLBACK&_ftnAccessToken='
        + amplify.store("sessionToken")).

        // we got an response !
        success(function (data) {
            console.log(data.items[0].id);
            // save tables into $scope to pass them into html
            $scope.tables = data.items;
            // and let's save currrent list of tables into localStorage to let them render next time
            // before we send http request
            amplify.store('ListOfTables', data.items);
        }).
        // damn, some error happened, let's handle that
        error(function () {
        });
    };
    renderingListTable();

    // this is a click event listener for the button "Create"
    // which should open new UI and let user to create new table
    $scope.createTheNewTable = function () {
        $location.url('/newTable');
        $scope.$apply();
        console.log('button "Create" was triggered');
    };

    // this is a click event listener for the button "Logout"
    // here we have to clear sessionToken and redirect user to "Login" page
    $scope.logout = function () {
        amplify.store("sessionToken", null);
        $location.url('/login');
        $scope.$apply();
    };

    $scope.deleteTheTable = function () {

    var allCheckboxes = $('[name=nameOfTable] input:checkbox:checked')
            .map(function() { return parseInt($(this).attr("tableid"))}).get();

        //$scope.allCheckboxes = $("[name = 'nameOfTable'] input:checkbox:enabled");
        console.log(allCheckboxes);

        $http.jsonp('http://freethenumbers.com/api.php?action=removeAbax&callback=JSON_CALLBACK' +
            '&_ftnAccessToken=' + amplify.store("sessionToken") +
            "&list=" + JSON.stringify(allCheckboxes)).
            // we got an response !
            success(function () {
                renderingListTable();
            }).
            // damn, some error happened, let's handle that
            error(function () {
            });
        if (2) {}
    };
}]);

//////////////////////////////////////////////



























