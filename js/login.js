/**
 * Created by sergiy on 20.03.15.
 */

define (function (require){

	require("cssLoader!css/login.css");

    var $ = require("jquery");
	var loginTemplate = require("text!template/login.html");

	$("body").empty().append(loginTemplate);


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
        }).done(function (data) {
            if (data.status === false) {
                error.addClass("error").text('ERROR:' + data.reason +'!!!');
             }else{
                alert("You have successfully registered!!!");
            }
            console.log("I'm here!");
        })
            .fail(function() {
                error.addClass("error").text('ERROR!!!');
                return;
            });




    };

    var buttonSingUpClick = function () {
        if (checkData() === true) {
            sendRegistrationData();
        }
    };

    var buttonSingUp = $("[name = buttonSingUp]");
    buttonSingUp.click(buttonSingUpClick);









    var sendLogin = function () {
        var email = $("[name = email]").val(),
            password = $("[name = password]").val();

        checkData();
        $.ajax({
            url: "http://freethenumbers.com/auth/user.php?action=loginViaEmail",
            type:"POST",
            data: {
                identity: email,
                password: password
            },
            dataType: "jsonp"
        }).done(function(){
        });
    };
    var buttonLogin = $("[name = buttonLogin]");
    buttonLogin.click(sendLogin);




/*
    function addCo  mment () {
        var nameVal = $('#name').val(),
            nE = '#nam',
            cE = '#com',// = //
            comVal = $('#aCom').val();

        if(nameVal === '') {
            $(nE).addClass("error").text('You forgot to enter a name!!!');
        }else {
            $(nE).removeClass("error");
            $(nE).text("The author's name:");
        }
        if(comVal === '') {
            $(cE).addClass("error");
            $(cE).text('You forgot to enter a comment!!!');

        }else {
            $(cE).removeClass("error");
            $(cE).text("The author's comment:");

            $.ajax({
                url: server + "?action=add&author="
                + nameVal + "&text=" + comVal + "&v=2",
                dataType: "jsonp"
            })
                .done(addCommentsToBuffer);
//            .fail(messageError);
            console.log('add comment');
        }
    }
*/
});






