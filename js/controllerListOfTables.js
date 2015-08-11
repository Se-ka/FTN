/**
 * Created by sergiy on 21.05.15.
 */
'use strict';
// Configuring Router to call this controller in case of hash is equal to "/listOfTables"
FTN.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/listOfTables', {
        templateUrl: 'template/listOfTables.html',
        controller: 'listOfTables'
    });
}]);

// Creating controller
FTNControllers.controller('listOfTables', ['$scope', '$http', '$location', function ($scope, $http, $location) {



    $scope.varEventListener = function (event) {
        var checkedCheckbox = $('[name=nameOfTable] input:checkbox:checked');
        if (checkedCheckbox.length != 0 && event.keyCode == 13) {
            $scope.deleteTheTable();
        }
        if (checkedCheckbox.length == 0 && event.keyCode == 13) {
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
        document.body.removeEventListener('keyup', $scope.varEventListener);
        $location.url('/newTable');
        $scope.$apply();
        console.log('button "Create" was triggered');
    };

    // this is a click event listener for the button "Logout"
    // here we have to clear sessionToken and redirect user to "Login" page
    $scope.logout = function () {
        amplify.store("sessionToken", null);
        document.body.removeEventListener('keyup', $scope.varEventListener);
        $location.url('/login');
        $scope.$apply();
    };

    $scope.deleteTheTable = function () {

        var allCheckboxesChecked = $('[name=nameOfTable] input:checkbox:checked')
            .map(function () {
                return parseInt($(this).attr("tableid"))
            }).get();

        //$scope.allCheckboxesChecked = $("[name = 'nameOfTable'] input:checkbox:enabled");
        console.log(allCheckboxesChecked);

        $http.jsonp('http://freethenumbers.com/api.php?action=removeAbax&callback=JSON_CALLBACK' +
            '&_ftnAccessToken=' + amplify.store("sessionToken") +
            "&list=" + JSON.stringify(allCheckboxesChecked)).
            // we got an response !
            success(function () {
                renderingListTable();
            }).
            // damn, some error happened, let's handle that
            error(function () {
            });
    };

    $scope.renameTheTable = function () {

        var arrayOfTableNames = $('[name=nameOfTable] input:checkbox')
            .map(function () {
                return parseInt($(this).attr("tableid"))
            }).get();
        console.log(arrayOfTableNames);

        //var l = arrayOfTableNames.length;
        //console.log('button "Rename" was triggered = ' + l);
        //
        //for (var i = 0; i < l; i++) {
        //    var valueOfInput = $('[name=textNameOfTable]').val();
        //    console.log('button "Rename" was triggered' + l);
        //};


        var newNames = {},
        $divs = $("[name=blockForNameOfTable] [name=nameOfTable]");
        for (var i = 0; i < $divs.length; i++) {

            var $div = $($divs[i]),
            tableID = $div.find("input[type=checkbox]").attr("tableid"),
            tableName = $div.find("input[type=text]").val();

            newNames[tableID] = tableName;

            //console.log($divs);
            //console.log($divs[i]);
            //console.log($($divs[i]));
            //console.log(tableID);
            //console.log(tableName);
            continue;

            var requestParams = [
                "callback=JSON_CALLBACK",
                "_ftnAccessToken=" + amplify.store("sessionToken"),
                "action=saveAbax",
                "title=" + tableName,
                "type=table",
                "config[names][ls]=table",
                "config[names][Us]=Table",
                "config[names][lp]=tables",
                "config[names][Up]=Tables",
                "config[type]=table",
                "config[abax_id]=" + tableID,
                "config[title]=SOME_NAME_HERE",
                "config[rows]=3",
                "config[cols]=5",
                "config[roundTo]=1",
                "config[decimalFormat]=false",
                "config[numberSeparator]=,",
                "config[currency]=$",
                "config[tableZeroCellTitle]=",
                "config[shortUrl]=false",
                "labels[rows][]=name me",
                "labels[rows][]=name me",
                "labels[rows][]=name me",
                "labels[columns][]=M1",
                "labels[columns][]=M2",
                "labels[columns][]=M3",
                "labels[columns][]=M4",
                "labels[columns][]=M5",
                "values[0][]=0",
                "values[0][]=0",
                "values[0][]=0",
                "values[0][]=0",
                "values[0][]=0",
                "values[1][]=0",
                "values[1][]=0",
                "values[1][]=0",
                "values[1][]=0",
                "values[1][]=0",
                "values[2][]=0",
                "values[2][]=0",
                "values[2][]=0",
                "values[2][]=0",
                "values[2][]=0",
                "version=1"
            ];

            $http.jsonp("http://freethenumbers.com/api.php?" + requestParams.join("&")).
                success(function () {
                    renderingListTable();
                }).
                error(function () {
                });
            console.log('button "Rename" was triggered');
        }
    };
}]);

//////////////////////////////////////////////



























