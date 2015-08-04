'use strict';

    //Router

FTN.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
        when('/login', {
          templateUrl: 'template/login.html',
          controller: 'login'
        });
  }]);

    //Controller

FTNControllers.controller('login', ['$scope', '$location',
  function($scope, $location) {

    //checked whether there is a "sessionToken" in "Local Storage"
    // (when login, the data coming from the server, stores them in the variable "sessionToken"
    // and save "Local Storage") and if logged in then go to the "List of tables"
    // when button "Create", will call this function and "angular" redirect on another page "New table"
    if (amplify.store("sessionToken")) {
      $location.url('/listOfTables');
      $scope.$apply();
      return
    }


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

    // checked "email" and "password"
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
      }
      if (password === '') {
        error.addClass("error").text('Fill in the fields!!!');
        return false;
      } else {
        error.removeClass("error").text('');
      }
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

        // when login, the data coming from the server,
        // stores them in the variable "sessionToken" and save "Local Storage"
        // it necessary each once for requests to server
        amplify.store("sessionToken", dataFromServer.authInfo.authToken);

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

        amplify.store("sessionToken", dataFromServer.authInfo.authToken);

        $location.url('/listOfTables');
        $scope.$apply();

      }).fail(function() {
          error.addClass("error").text('ERROR');
      });
    };


    $scope.buttonLogin = function() {
      $scope.buttonLoginClick();
    };

    $scope.buttonSingUp = function() {
      $scope.buttonSingUpClick();
    };

  }]);
