/**
 * Created by sergiy on 27.03.15.
 */
define (function (require){

    require("cssLoader!css/listOfTables.css");

    var $ = require("jquery"),
        listOfTablesTemplate = require("text!template/listOfTables.html");


    var fetchingListOfTables = function () {

        $.ajax({
            url: "http://freethenumbers.com/api.php?action=getListOfAbaxes&type=table",
            dataType: "jsonp"
        }).done(function (data) {

            console.log("You can see list of tables");

        })
    };



    var sendLogout = function () {

        require("store").store("sessionToken", null);

        require (["js/login"], function(login) {
            require (login.run());
        });

    };

    console.log("Tables");

    fetchingListOfTables();



    return {
        run: function () {
            $("body").empty().append(listOfTablesTemplate);
            $("[name = buttonLogout]").click(sendLogout);
        }
    };
});