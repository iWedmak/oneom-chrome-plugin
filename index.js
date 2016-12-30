var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

$( document ).ready(function() {
    $('.incoming').attr('key', 'plugin').attr('tpl-get', chrome.runtime.id);
    var script = document.createElement('script');
    script.textContent = '(' +  function () { 
        plugin= $('.incoming').attr('tpl-get') ;
        } + ')();';
    (document.head||document.documentElement).appendChild(script); //inject in controller what we have plugin on user side
    
    $('a#torrent_read').on('click', function() {
        //$(this).attr('href')
        var url=$(this).attr('href');
        console.log(url);
        /*
        var magnetURI='magnet:?xt=urn:btih:48d199e6c46b6715802ba1ac3da91fa7e7986a1f&dn=Ballers.2015.S02E05.480p.x264-mSD&tr=udp%3A//tracker.leechers-paradise.org%3A6969&tr=udp%3A//zer0day.ch%3A1337&tr=udp%3A//open.demonii.com%3A1337&tr=udp%3A//tracker.coppersurfer.tk%3A6969&tr=udp%3A//exodus.desync.com%3A6969';
        
        var torrentStream = require('torrent-stream');

        var engine = torrentStream(magnetURI);

        engine.on('ready', function() {
            engine.files.forEach(function(file) {
                console.log('filename:', file.name);
                var stream = file.createReadStream();
                // stream is readable stream to containing the file content
            });
        });
        //*/
        /*
        var WebTorrent = require('webtorrent')

        var client = new WebTorrent()
        console.log('some');
        
        client.add(magnetURI, function (torrent) {
          // Got torrent metadata!
          console.log('some');
          console.log('Client is downloading:', torrent.infoHash)

          torrent.files.forEach(function (file) {
            // Display the file by appending it to the DOM. Supports video, audio, images, and
            // more. Specify a container element (CSS selector or reference to DOM node).
            file.appendTo('body')
          })
        })
        //*/
        //*
        chrome.runtime.sendMessage
        (
            'bpmfcnmfcbhaclenfiojipblnbcfmgmb',
            {
                method: 'GET',
                action: 'download',
                type: 'arraybuffer',
                url: url
            }, 
            function(responseText) 
            {
                console.log(responseText);
            }
        );
        //*/
        return false;
    });
});