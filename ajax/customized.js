var currentStage = "seek";
var gobackStack = [];
var gobackSearchResultDataValue = 0;
var gobackSearchResultDataValueNeedToBeReplaced = false;
var gobackOwnerDataValue = 0;


$(document).ready(function ()
{
    // attach fancybox on all elements that use it
    $(function ()
    {
        $(".fancybox").fancybox();
    });


    $("#leftSideSwitch").on("click", "#goback", function (event)
    {
        console.log("goback!");
        console.log(gobackStack);

        if(mapOverlay!==null)
          mapOverlay.onRemove();

        //select where to goback
        switch (gobackStack[gobackStack.length - 1])
        {
            case "exchange":
                console.log("case Exchange");
                gobackStack.pop();
                gobackSearchResultDataValueNeedToBeReplaced = true;
                load_exchange(event);
                break;
            case "seek":
                gobackStack.pop();
                $("#seek").trigger("click");
                break;
            case "post":
                gobackStack.pop();
                load_post();
                break;
            case "owner":
                console.log("case owner");
                gobackStack.pop();
                load_profile();
                break;
        }
    });


    // Overlay Effect
    $('body').on('click', '.popup-close, #mask', function ()
    {
        $('#mask , .popup').fadeOut(300, function ()
        {
            $('#mask').remove();
        });
        return false;
    });

    $('.popup-close').hover(
        function ()
        {
            $(this).addClass('emphasis');
        },
        function ()
        {
            $(this).removeClass('emphasis');
        }
    );

});


$('#profile').on("click", function (event)
{
    gobackOwnerDataValue = 0;

});

$(window).load(function ()
{
    // $('#seek').click();
});
