/**
 * Created by sergiy on 27.03.15.
 */

define (function (require){
// при помощи require даём листу таблиц правила css
    require("cssLoader!css/listOfTables.css");

    var $ = require("jquery"),
        _ = require("underscore"),
        listOfTablesTemplate = require("text!template/listOfTables.html"),//
        tableBlockTemplate = require("text!template/tableBlock.html");//

    // compiled piece of html template which can produce personalized text
    var compiledTableBlock = _.template(tableBlockTemplate);

    var fetchingListOfTables = function () {

        $.ajax({
            url: "http://freethenumbers.com/api.php?action=getListOfAbaxes&type=table",
            dataType: "jsonp"
        }).done(function (dataFromServer) {

            var blockOfTables = $("[name=blockOfTables]").empty();

            _.each(dataFromServer.items, function(item) {
                var htmlBlock = compiledTableBlock(item);

                blockOfTables.append(htmlBlock);
            });

        })
    };

    var sendLogout = function () {
        require("store").store("sessionToken", null);
        require (["js/login"], function(login) {
            require (login.run());
        });
    };

    return {
        run: function () {
            $("body").empty().append(listOfTablesTemplate);
            $("[name = buttonLogout]").click(sendLogout);

            fetchingListOfTables();
        }
    };
});