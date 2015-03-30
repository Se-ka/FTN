/**
 * Created by sergiy on 27.03.15.
 */
define (function (require){

    require("cssLoader!css/listOfTables.css");

    var $ = require("jquery"),
        listOfTablesTemplate = require("text!template/listOfTables.html");

    var sendLogout = function () {

        require("store").store("sessionToken", null);

        require (["js/login"], function(login) {
            require (login.run());
        });
        console.log("clickButtonLogout!!!")
    };

    return {
        run: function () {
            $("body").empty().append(listOfTablesTemplate);
            $("[name = buttonLogout]").click(sendLogout);
        }
    };
});