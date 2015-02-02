$(document).ready(function ()
{
    // Handle myMessage
    $('#myMessage').click(function (event)
    {
        $.ajax({
            type: "GET",
            url: "./php_script/myMessage.php",
            dataType: "json",
            data: {
                type: "fetch",
                myid: $("#profile").attr("data-value")
            },
            success: function (response)
            {
                $('#myMessageDropdown').empty();
                $('#myMessageDetailArea').empty();

                if (response == null) $("#myMessageDropdown").append("<li>No message!</li>");
                else
                {
                    for (var i = 0; i < response.length; i++)
                    {
                        // Dropdown
                        if (response[i]["readed"] == 0)
                        {
                            $('#myMessageDropdown').append('<li ><a class="fancybox messageRow" href="#mid' + response[i]["mid"] + '"><span class="glyphicon glyphicon-certificate"></span>' + " " + response[i]["text"].substr(0, 10) + "..." + '</a></li>');
                        }
                        else
                        {
                            $('#myMessageDropdown').append('<li ><a class="fancybox messageRow" href="#mid' + response[i]["mid"] + '"><span class="glyphicon glyphicon-certificate" style="display:none"></span>' + " " + response[i]["text"].substr(0, 10) + "..." + '</a></li>');
                        }
                        if ($('#mid' + response[i]["mid"] + '').attr("id") == null)
                        {
                            $('#myMessageDetailArea').append('\
                                <div id="mid' + response[i]["mid"] + '" style="display:none" data-value="' + response[i]["sender_id"] + '"><img class="circular" src="' + response[i]["owner_photo"] + '" height="50" width="50" >' + response[i]["username"] + '<li class="list-group-item" style="padding: 5px; font-size:16px ;width:400px;height:150px"> ' + response[i]["text"] + '</li>\
                                <textarea class="form-control" rows="3" id="messageReply' + response[i]["mid"] + '" name="messageReply" placeholder="Relpy......"></textarea>\
                                <img class="circular" src="' + $("#myhead").attr('src') + '" style="width:60px;height:60px;margin-top:15px;"> <button name="Reply" data-value="' + response[i]["mid"] + '" class="btn btn-danger Reply">Reply Message</button></div>');
                        }
                    }
                }
            },
            error: function (xhr, ajaxOption, thrownError)
            {
                alert('ERROR SECTION : Handle myMessage');
                alert(thrownError);
                alert(JSON.stringify(xhr));
            }
        });
    });

    // Handle Replys
    $("body").on("click", ".Reply", function (event)
    {
        var replyMessage = $("#messageReply" + $(this).attr("data-value")).val();
        var tagetID = $("#mid" + $(this).attr("data-value")).attr("data-value");  // get others' fb id
        var myID = $("#profile").attr("data-value"); // get my fb id

        //alert($(target).val());
        $.ajax({
            type: "GET",
            url: "./php_script/myMessage.php",
            dataType: "text",
            data: {
                type: "reply",
                tID: tagetID,
                mID: myID,
                message: replyMessage
            },
            success: function (response)
            {
                //alert(response);
                parent.$.fancybox.close();
                //alert("reply success!");

                console.log(response);
            },
            error: function (xhr, ajaxOption, thrownError)
            {
                alert('ERROR SECTION : Reply');
                alert(thrownError);
                alert(JSON.stringify(xhr));
            }
        });
    });

    // Update message status to readed if clicked
    $("#myMessage").on("click", ".messageRow", function (event)
    {
        $.ajax({
            type: "GET",
            url: "./php_script/myMessage.php",
            dataType: "text",
            data: {
                type: "readmessage",
                mid: $(this).attr("href").replace("#mid", "")
            },
            success: function (response)
            {
                console.log("Unread messages = " + response);
            },
            error: function (xhr, ajaxOption, thrownError)
            {
                alert('ERROR SECTION : message box');
                alert(thrownError);
                alert(JSON.stringify(xhr));
            }
        });
    });

    // JustInTime check unread messages
    $('body').click(function (event)
    {
        $.ajax({
            type: "GET",
            url: "./php_script/myMessage.php",
            dataType: "text",
            data: {
                type: "unreadmessage",
                myid: $("#profile").attr("data-value")
            },
            success: function (response)
            {
                $("#messageIcon").empty();
                $("#messageIcon").html('<span class="glyphicon glyphicon-envelope" aria-hidden="true"></span><span class="badge">' + response + '</span>');
                console.log("unread messages = " + response);
            },
            error: function (xhr, ajaxOption, thrownError)
            {
                //alert('ERROR SECTION : JIT check Message');
                //alert(thrownError);
                //alert(JSON.stringify(xhr));
            }
        });
    });

});