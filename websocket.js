"use strict";

var websocketConnection;
function InitWebsocket( url )
{
    if ("WebSocket" in window)
    {
        try
        {
            if (typeof MozWebSocket === 'function')
            {
                window.WebSocket = MozWebSocket;
            }
            websocketConnection = new WebSocket( url );

            websocketConnection.onopen = function (evt )
            {
                setTimeout( function ()
                        {
                            // do something when we connect
                            onWebsocketConnect();
                        }, 0);
                                
            };
            websocketConnection.onclose = function ( evt )
            {
                setTimeout( function ()
                        {
                            onWebsocketClose();
                        }, 0 );
            };
            websocketConnection.onmessage = function ( evt )
            {
                setTimeout( function ()
                        {
                            onWebsocketMessage( evt.data );
                        }, 0 );
            };
            // don't care about websocketConnection.onError
        }
        catch(err)
        {
            alert(err);
        }
    }
    else
    {
        alert( "no websocket support" );
    }
}

function onWebsocketConnect()
{
    alert("connect");
    var obj = {};
    var arrayOfRequests = [];
    arrayOfRequests.push({ // push as much as you want into here
        "id":42, // 42 is boatspeed                                                                             
        "repeat":false
    });
    obj.DataReq = arrayOfRequests;
    var stringToSend = JSON.stringify(obj);
    websocketConnection.send( stringToSend );
}

function onWebsocketClose()
{
    alert("close");
}

function onWebsocketMessage( incoming )
{
    alert(incoming);
    var javascriptObject = JSON.parse( incoming );
    if( javascriptObject.hasOwnProperty("Data"))
    {
        var dataArray = javascriptObject.Data;
        for( var i = 0; i < dataArray.length; i++ )
        {
            var data = dataArray[i];
            if( data.valid === false )
            {
                alert(data.id + " : invalid");
            }
            else
            {
                alert(data.id + " : " + data.val);
            } 

        }
    }
}
