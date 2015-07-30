'use strict';

/* Controllers */


FTNControllers.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
        when('/login', {
          templateUrl: 'template/login.html',
          controller: 'login'
        });
  }]);

FTNControllers.controller('login', ['$scope', '$location',
  function($scope, $location) {

/*
    if(amplify.store("sessionToken", dataFromServer.authInfo.authToken)) {
      $location.url('/listOfTables');
      $scope.$apply();
      return
    }
*/


    $scope.buttonLoginClick = function () {
      if ($scope.checkData() === true) {
        $scope.sendLoginData();
      }
    };

    $scope.buttonSingUpClick = function () {
      if ($scope.checkData() === true) {
        $scope.sendRegistrationData();
      }
    };

    $scope.checkData = function () {
      var email = $("[name = email]").val(),
          password = $("[name = password]").val(),
          error = $("[name=divForError]"),
          check = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          checkEmail = check.test(email);

      error.removeClass("error").text('');
      if (email === '') {
        error.addClass("error").text('Fill in the fields!!!');
        return false;
      } else {
        if (checkEmail === false) {
          error.addClass("error").text('Enter a valid email!!!');
          return false;
        }
        console.log(email);
      }
      if (password === '') {
        error.addClass("error").text('Fill in the fields!!!');
        return false;
      } else {
        error.removeClass("error").text('');
      }
      console.log("check Data");
      return true;
    };

    $scope.sendLoginData = function () {
      var email = $("[name = email]").val(),
          password = $("[name = password]").val(),
          error = $("[name=divForError]");

      $.ajax({
        url: "http://freethenumbers.com/auth/user.php?action=loginViaIdentity",
        type:"POST",
        data: {
          identity: email,
          password: password
        },
        dataType: "jsonp"
      }).done(function (dataFromServer) {
        if (dataFromServer.status === false) {
          var text = transform(dataFromServer.reason);
          error.addClass("error").text(text);
        }

        //alert("You have successfully logged!");

        console.log("I'm here!", dataFromServer );

        amplify.store("sessionToken", dataFromServer.authInfo.authToken);// remember the Token
        // it necessary each once for requests to server

        $location.url('/listOfTables');
        $scope.$apply();

      }).fail(function() {
        error.addClass("error").text('ERROR!!!');
      });
    };

    $scope.sendRegistrationData = function () {
      var email = $("[name = email]").val(),
          password = $("[name = password]").val(),
          error = $("[name=divForError]");

      $.ajax({
        url: "http://freethenumbers.com/auth/user.php?action=registerViaIdentity",
        type:"POST",
        data: {
          identity: email,
          password: password
        },
        dataType: "jsonp"
      }).done(function (dataFromServer) {

        if (dataFromServer.status === false) {
          var text = transform(dataFromServer.reason);
          error.addClass("error").text(text);
          return true;
        }

        alert("You have successfully registered");

        console.log("I'm here!", dataFromServer );

        amplify.store("sessionToken", dataFromServer.authInfo.authToken);

        $location.url('/listOfTables');
        $scope.$apply();

      }).fail(function() {
        error.addClass("error").text('ERROR');
      });
    };


    $scope.buttonLogin = function() {
      $scope.buttonLoginClick();
      console.log("I worked - Login!");
    };

    $scope.buttonSingUp = function() {
      $scope.buttonSingUpClick();
      console.log("I worked - SingUp!");
    };

  }]);
