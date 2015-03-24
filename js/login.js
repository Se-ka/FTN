/**
 * Created by sergiy on 20.03.15.
 */

define (function (require){

	require("cssLoader!css/login.css");

    var $ = require("jquery");
	var loginTemplate = require("text!template/login.html");

	$("body").empty().append(loginTemplate);


    var sendRegistrationData = function () {

        var email = $("[name = email]").val(),
            password = $("[name = password]").val(),
            error = $("[name=divForError]"),
            check = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            checkEmail = check.test(email);

        if(email === '') {
            error.addClass("divForError").text('Fill in the fields!!!');
            return;
        }else {
            error.removeClass("divForError");
            if(checkEmail === false) {
                error.addClass("divForError").text('Enter a valid email!!!');
                return;
            }else {
                error.removeClass("divForError").text('');
            }
            console.log(email);
        }

        if(password === '') {
            error.addClass("divForError").text('Fill in the fields!!!');
            return;
        }else {
            error.removeClass("divForError").text('');

        }
        $.ajax({
            url: "http://freethenumbers.com/auth/user.php?action=registerViaIdentity",
            type:"POST",
            data: {
	            identity: email,
	            password: password
            },
            dataType: "jsonp"
        }).done(function(){
        });
        console.log("click Sing Up")
    };
    $("[name = buttonSingUp]").click(sendRegistrationData);


    var sendLogin = function () {
        var email = $("[name = email]").val(),
            password = $("[name = password]").val(),
            error = $("[name=divForError]");

        if (email === '') {
            error.addClass("divForError").text('Fill in the fields!!!');
            return;
        }else {
            error.removeClass("divForError");
        }

        if(password === '') {
            error.addClass("divForError").text('Fill in the fields!!!');
            return;
        }else {
            error.removeClass("divForError").text('');

        }
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
        console.log("click Login")


        console.log("click Login")
    };

    $("[name = buttonLogin]").click(sendLogin);





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






