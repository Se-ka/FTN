/**
 * Created by sergiy on 20.03.15.
 */

define (function (require){

	require("cssLoader!css/login.css");

    var $ = require("jquery"),
        store = require("store"),
	    loginTemplate = require("text!template/login.html"),
        serverMessageTransform = require("js/serverMessageTransform");

    var buttonLoginClick = function () {
        if (checkData() === true) {
            sendLoginData();
        }
    };

    var buttonSingUpClick = function () {
        if (checkData() === true) {
            sendRegistrationData();
        }
    };
    
    var checkData = function () {
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

    var sendLoginData = function () {
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
                var text = serverMessageTransform.transform(dataFromServer.reason);
                error.addClass("error").text(text);
            }else{
                alert("You have successfully logged!!!");
            }
            console.log("I'm here!", dataFromServer );

            store.store("sessionToken", dataFromServer.authInfo.authToken);

            require (["js/listOfTables"]);

        }).fail(function() {
            error.addClass("error").text('ERROR!!!');
        });
    };

    var sendRegistrationData = function () {
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
                var text = serverMessageTransform.transform(dataFromServer.reason);
                error.addClass("error").text(text);
            }else{
                alert("You have successfully registered");
            }

            console.log("I'm here!", dataFromServer );

            store.store("sessionToken", dataFromServer.authInfo.authToken);

        }).fail(function() {
            error.addClass("error").text('ERROR');
        });
    };

    return {
        run: function() {
            $("body").empty().append(loginTemplate);
            
            $("[name = buttonLogin]").click(buttonLoginClick);
            $("[name = buttonSingUp]").click(buttonSingUpClick);
        }
    };
});
