var app_id=false;
chrome.management.getAll(function(items) 
{
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if(item.type=='packaged_app' && item.name.includes("OneOm"))
        {
            app_id=item.id;
        }
    }
});
chrome.runtime.onMessageExternal.addListener(
    function(request, sender, callback) 
    {
        if (request.action == "xhttp") {
            var xhttp = new XMLHttpRequest();
            var method = request.method ? request.method.toUpperCase() : 'GET';

            xhttp.onload = function() {
                callback(xhttp.responseText);
            };
            xhttp.onerror = function() {
                // Do whatever you want on error. Don't forget to invoke the
                // callback to clean up the communication port.
                callback();
            };
            xhttp.open(method, request.url, true);
            
            if(request.type)
            {
                xhttp.responseType = request.type;
            }
            else
            {
                xhttp.responseType = 'text';
            }
            if(method=='POST')
            {
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            }
            xhttp.send(request.send_array);
            console.log(request);
            return true; // prevents the callback from being called too early on return
        }
    }
);

chrome.runtime.onMessage.addListener(
    function(request, sender, callback) 
    {
        //*
        if (request.action == "xhttp") {
            var xhttp = new XMLHttpRequest();
            var method = request.method ? request.method.toUpperCase() : 'GET';

            xhttp.onload = function() {
                callback(xhttp.response);
            };
            xhttp.onerror = function() {
                // Do whatever you want on error. Don't forget to invoke the
                // callback to clean up the communication port.
                callback();
            };
            xhttp.open(method, request.url, true);
            
            if(request.type)
            {
                xhttp.responseType = request.type;
            }
            xhttp.send(request.data);
            return true; // prevents the callback from being called too early on return
        }
        else if(request.action == "download")
        {
            chrome.downloads.download({url:request.url},
                function(downloadId)
                {
                    console.log("download begin, the downId is:" + downloadId);
                }
            );
        }
        //*/
    }
);

chrome.webRequest.onBeforeSendHeaders.addListener(
    function(info) {
        // Replace the User-Agent header
        var headers = info.requestHeaders;
        headers.forEach(function(header, i) {
            if (header.name.toLowerCase() == 'user-agent') { 
                header.value = 'Mozilla/5.0 (Linux; U; Android 4.0.3; de-ch; HTC Sensation Build/IML74K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30';
            }
        });  
        return {requestHeaders: headers};
    },
    // Request filter
    {
        // Modify the headers for these pages
        urls: [
            "*://vodlocker.com/*", 
            "*://vidto.me/*", 
            "*://vidzi.tv/*", 
            "*://subsmovies.com/*", 
            "*://thepiratebay.cr/*", 
            "*://rutor.org/*", 
            "*://rutracker.org/*", 
            "*://bitsnoop.com/*", 
            "*://torrentz.eu/*", 
            "*://extratorrent.cc/*", 
            "*://eztv.ag/*", 
            "*://kat.cr/*", 
            "*://rarbg.to/*", 
            "*://www.opensubtitles.org/*"
        ],
        // In the main window and frames
        types: ["xmlhttprequest"]
    },
    ["blocking", "requestHeaders"]
);