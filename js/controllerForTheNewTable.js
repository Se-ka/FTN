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

FTNControllers.controller('newTable', ['$scope', '$location', '$http', function($scope, $location, $http) {

    $('[name=inputNameOfNewTable]').focus();

    $scope.return = function (){
        $location.url('/listOfTables');
        //$scope.$apply();
        console.log('button "Return" a triggered');
    };



    $('body').keyup(function(){

        if(event.keyCode==13)
            console.log('9999999');
        {
            $(this).click();
            return false;
        }
    });



    $scope.save = function () {

    var valueOfInput = $('[name=inputNameOfNewTable]').val(),
        inputNameOfNewTable = $('[name=signToEnterTheNameOfTheNewTable]');

    if(valueOfInput === ''){
        inputNameOfNewTable.addClass("error");
        console.log('IF worked!');
        return;
    }
        var requestParams = [
            "callback=JSON_CALLBACK",
            "_ftnAccessToken=" + amplify.store("sessionToken"),
            "action=saveAbax",
            "title=" + valueOfInput,
            "type=table",
            "config[names][ls]=table",
            "config[names][Us]=Table",
            "config[names][lp]=tables",
            "config[names][Up]=Tables",
            "config[type]=table",
            "config[abax_id]=-1",
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
            success(function() {
                $location.url('/listOfTables');
            }).
            error(function(data) {
            });

        console.log('button "Save" was triggered');
    };
}]);






