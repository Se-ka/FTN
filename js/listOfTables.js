/**
 * Created by sergiy on 27.03.15.
 */
define (function (require){

    require("cssLoader!css/listOfTables.css");

    var $ = require("jquery"),
        listOfTablesTemplate = require("text!template/listOfTables.html");


    $("body").empty().append(listOfTablesTemplate);


    var sendLogout = function () {

        require("store").store("sessionToken", null);

        require (["js/login"], function(login) {
            login.run();
        });

        console.log("clickButtonLogout!!!")
    };


    var buttonLogout = $("[name = buttonLogout]");
    buttonLogout.click(sendLogout);
});