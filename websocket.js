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
        "id":42,                                                                              
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

function onWebsocketMessage( data )
{
    alert(data);
    var javascriptObject = JSON.parse( data );
    if( javascriptObject.valid === true )
    {
        alert(javascriptObject.val);
    }
    else
    {
        alert(javascriptObject.val);
    }
}
