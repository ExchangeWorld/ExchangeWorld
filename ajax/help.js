$(document).ready(function ()
{
    $("#help").on("click", function (event)
    {
        document.getElementById("seek").className = "";
        document.getElementById("post").className = "";
        document.getElementById("about").className = "";
        document.getElementById("help").className = "";
        introJs().start();

    });

});