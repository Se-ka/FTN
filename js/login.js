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
            password = $("[name = password]").val();

        $.ajax({
            url: "http://freethenumbers.com/auth/user.php?action=registerViaEmail ",
            type:"POST",
            data: {email:email, password:password},
            dataType: "jsonp"
        })
            .done();


        console.log("click Login")
    };

    $("[name = buttonSingUp]").click(sendRegistrationData);


    var sendLogin = function () {



        console.log("click Login")
    };

    $("[name = buttonLogin]").click(sendLogin);


});






