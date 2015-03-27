/**
 * Created by sergiy on 27.03.15.
 */
define (function (require){

    require("cssLoader!css/login.css");

    var $ = require("jquery"),
        listOfTablesTemplate = require("text!template/listOfTables.html");

    $("body").empty().append(listOfTablesTemplate);









});